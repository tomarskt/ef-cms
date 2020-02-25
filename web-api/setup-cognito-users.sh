#!/bin/bash -e
ENV=$1
REGION="us-east-1"

CURRENT_COLOR=$(aws dynamodb get-item --region us-east-1 --table-name "efcms-deploy-${ENV}" --key '{"pk":{"S":"deployed-stack"},"sk":{"S":"deployed-stack"}}' | jq -r ".Item.current.S")

restApiId=$(aws apigateway get-rest-apis --region="${REGION}" --query "items[?name=='${ENV}-ef-cms-users-${CURRENT_COLOR}'].id" --output text)

USER_POOL_ID=$(aws cognito-idp list-user-pools --query "UserPools[?Name == 'efcms-${ENV}'].Id | [0]" --max-results 30 --region "${REGION}")
USER_POOL_ID="${USER_POOL_ID%\"}"
USER_POOL_ID="${USER_POOL_ID#\"}"

CLIENT_ID=$(aws cognito-idp list-user-pool-clients --user-pool-id "${USER_POOL_ID}" --query "UserPoolClients[?ClientName == 'client'].ClientId | [0]" --max-results 30 --region "${REGION}")
CLIENT_ID="${CLIENT_ID%\"}"
CLIENT_ID="${CLIENT_ID#\"}"

generate_post_data() {
  email=$1
  role=$2
  barNumber=$3
  section=$4
  name=$5
  cat <<EOF
{
  "email": "$email",
  "password": "Testing1234$",
  "role": "$role",
  "section": "$section",
  "name": "$name",
  "barNumber": "$barNumber",
  "contact": {
    "address1": "234 Main St",
    "address2": "Apartment 4",
    "address3": "Under the stairs",
    "city": "Chicago",
    "countryType": "domestic",
    "phone": "+1 (555) 555-5555",
    "postalCode": "61234",
    "state": "IL"
  }
}
EOF
}

createAdmin() {
  email=$1
  role=$2
  name=$3

  aws cognito-idp sign-up \
    --region "${REGION}" \
    --client-id "${CLIENT_ID}" \
    --username "${email}" \
    --user-attributes 'Name="name",'Value="${name}" 'Name="custom:role",'Value="${role}" \
    --password "${USTC_ADMIN_PASS}" || true

  aws cognito-idp admin-confirm-sign-up \
    --region "${REGION}" \
    --user-pool-id "${USER_POOL_ID}" \
    --username "${email}" || true

  response=$(aws cognito-idp admin-initiate-auth \
    --user-pool-id "${USER_POOL_ID}" \
    --client-id "${CLIENT_ID}" \
    --region "${REGION}" \
    --auth-flow ADMIN_NO_SRP_AUTH \
    --auth-parameters USERNAME="${email}"',PASSWORD'="${USTC_ADMIN_PASS}")
  adminToken=$(echo "${response}" | jq -r ".AuthenticationResult.IdToken")
}

#createAccount [email] [role] [index] [barNumber] [section] [overrideName(optional)]
createAccount() {
  email=$1
  role=$2
  i=$3
  barNumber=$4
  section=$5
  name=${6:-Test ${role}$3}

  curl --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${adminToken}" \
    --request POST \
    --data "$(generate_post_data "${email}" "${role}" "${barNumber}" "${section}" "${name}")" \
      "https://${restApiId}.execute-api.us-east-1.amazonaws.com/${ENV}"

  response=$(aws cognito-idp admin-initiate-auth \
    --user-pool-id "${USER_POOL_ID}" \
    --client-id "${CLIENT_ID}" \
    --region "${REGION}" \
    --auth-flow ADMIN_NO_SRP_AUTH \
    --auth-parameters USERNAME="${email}"',PASSWORD="Testing1234$"')

  session=$(echo "${response}" | jq -r ".Session")

  if [ "$session" != "null" ]; then
    aws cognito-idp admin-respond-to-auth-challenge \
      --user-pool-id  "${USER_POOL_ID}" \
      --client-id "${CLIENT_ID}" \
      --region "${REGION}" \
      --challenge-name NEW_PASSWORD_REQUIRED \
      --challenge-responses 'NEW_PASSWORD="Testing1234$",'USERNAME="${email}" \
      --session="${session}"
  fi
}

createManyAccounts() {
  numAccounts=$1
  emailPrefix=$2
  role=$2
  section=$3
  for i in $(seq 1 "${numAccounts}");
  do
    createAccount "${emailPrefix}${i}@example.com" "${role}" "${i}" "" "${section}"
  done
}

createChambersAccount() {
  emailPrefix=$1
  section=$1
  role=$2
  for i in $(seq 1 5);
  do
    createAccount "${emailPrefix}${i}@example.com" "${role}" "${i}" "" "${section}"
  done
}

createPractitionerAccount() {
  index=$1
  barNumber=$2
  overrideName=$3
  name=${overrideName:-Test practitioner${index}}

  createAccount "practitioner${index}@example.com" "practitioner" "${index}" "${barNumber}" "practitioner" "${name}"
}

createRespondentAccount() {
  index=$1
  barNumber=$2
  overrideName=$3
  name=${overrideName:-Test respondent${index}}

  createAccount "respondent${index}@example.com" "respondent" "${index}" "${barNumber}" "respondent" "${name}"
}

createJudgeAccount() {
  judgeName=$1
  judgeNameLower=$(echo "${judgeName}" | tr '[:upper:]' '[:lower:]')

  createAccount "judge${judgeName}@example.com" "judge" "" "" "${judgeNameLower}sChambers" "Judge ${judgeName}"
}

createAdmin "ustcadmin@example.com" "admin" "admin"

createAccount "migrator@example.com" "admin" "" "" "admin"
createAccount "flexionustc+practitioner@gmail.com" "practitioner" "" "GM9999" "practitioner" "Practitioner Gmail"
createAccount "flexionustc+respondent@gmail.com" "respondent" "" "GM4444" "respondent" "Respondent Gmail"
createAccount "flexionustc+petitioner@gmail.com" "petitioner" "" "" "petitioner" "Petitioner Gmail"
createManyAccounts "10" "adc" "adc"
createManyAccounts "10" "admissionsclerk" "admissions"
createManyAccounts "10" "clerkofcourt" "clerkofcourt"
createManyAccounts "10" "docketclerk" "docket"
createManyAccounts "10" "petitionsclerk" "petitions"
createManyAccounts "10" "trialclerk" "trialClerks"
createManyAccounts "30" "petitioner" "petitioner"
createChambersAccount "ashfordsChambers" "chambers"
createChambersAccount "buchsChambers" "chambers"
createChambersAccount "cohensChambers" "chambers"
createPractitionerAccount "1" "PT1234"
createPractitionerAccount "2" "PT5432"
createPractitionerAccount "3" "PT1111"
createPractitionerAccount "4" "PT2222"
createPractitionerAccount "5" "PT3333"
createPractitionerAccount "6" "PT4444" "Test practitioner"
createPractitionerAccount "7" "PT5555" "Test practitioner"
createPractitionerAccount "8" "PT6666" "Test practitioner"
createPractitionerAccount "9" "PT7777" "Test practitioner"
createPractitionerAccount "10" "PT8888" "Test practitioner"
createRespondentAccount "1" "RT6789"
createRespondentAccount "2" "RT0987"
createRespondentAccount "3" "RT7777"
createRespondentAccount "4" "RT8888"
createRespondentAccount "5" "RT9999"
createRespondentAccount "6" "RT6666" "Test respondent"
createRespondentAccount "7" "RT0000" "Test respondent"
createRespondentAccount "8" "RT1111" "Test respondent"
createRespondentAccount "9" "RT2222" "Test respondent"
createRespondentAccount "10" "RT3333" "Test respondent"
