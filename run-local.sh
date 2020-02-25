#!/bin/bash
echo "killing dynamo if already running"
pkill -f DynamoDBLocal

echo "starting dynamo"
./web-api/start-dynamo.sh &
DYNAMO_PID=$!
./wait-until.sh http://localhost:8000/shell

./web-api/start-elasticsearch.sh &
ESEARCH_PID=$!
./wait-until.sh http://localhost:9200/ 200

npm run build:assets

# these exported values expire when script terminates
export SKIP_VIRUS_SCAN=true
export AWS_ACCESS_KEY_ID=S3RVER
export AWS_SECRET_ACCESS_KEY=S3RVER
export SLS_DEPLOYMENT_BUCKET=S3RVER
export MASTER_DYNAMODB_ENDPOINT=http://localhost:8000 
export S3_ENDPOINT=http://localhost:9000
export DOCUMENTS_BUCKET_NAME=noop-documents-local-us-east-1
export TEMP_DOCUMENTS_BUCKET_NAME=noop-temp-documents-local-us-east-1

node ./web-api/start-s3rver &
S3RVER_PID=$!

if [ ! -z "$RESUME" ]; then
  echo "Resuming operation with previous s3 and dynamo data"
else
  echo "seeding s3"
  npm run seed:s3

  echo "creating & seeding dynamo tables"
  npm run seed:db
fi

echo "creating elasticsearch index"
npm run seed:elasticsearch

if [[ -z "${RUN_DIR}" ]]; then
  RUN_DIR="src"
fi

# set common arguments used by sls below (appearing as "$@")
set -- \
  --accountId noop \
  --domain noop \
  --efcmsTableName=efcms-local \
  --noAuth \
  --noTimeout \
  --region us-east-1 \
  --run_dir "${RUN_DIR}" \
  --stage local \
  --stageColor "blue" \
  --dynamo_stream_arn "arn:aws:dynamodb:ddblocal:000000000000:table/efcms-local/stream/*" \
  --elasticsearch_endpoint "http://localhost:9200"

echo "starting public api service"
npx sls offline start "$@" --config web-api/serverless-public-api.yml &
echo "starting api service"
npx sls offline start "$@" --config web-api/serverless-api.yml &
echo "starting cases service"
npx sls offline start "$@" --config web-api/serverless-cases.yml &
echo "starting users service"
npx sls offline start "$@" --config web-api/serverless-users.yml &
echo "starting documents service"
npx sls offline start "$@" --config web-api/serverless-documents.yml &
echo "starting work items service"
npx sls offline start "$@" --config web-api/serverless-work-items.yml &
echo "starting sections service"
npx sls offline start "$@" --config web-api/serverless-sections.yml &
echo "starting trial session service"
npx sls offline start "$@" --config web-api/serverless-trial-sessions.yml &
echo "starting case documents service"
npx sls offline start "$@" --config web-api/serverless-case-documents.yml &
echo "starting case deadlines service"
npx sls offline start "$@" --config web-api/serverless-case-deadlines.yml &
echo "starting case notes service"
npx sls offline start "$@" --config web-api/serverless-case-notes.yml &
echo "starting notifications service"
npx sls offline start "$@" --config web-api/serverless-notifications.yml &
echo "starting streams service"
npx sls offline start "$@" --config web-api/serverless-streams.yml &
echo "starting case parties service"
npx sls offline start "$@" --config web-api/serverless-case-parties.yml &
echo "starting case meta service"
npx sls offline start "$@" --config web-api/serverless-case-meta.yml &
echo "starting migrate service"
npx sls offline start "$@" --config web-api/serverless-migrate.yml &

echo "starting proxy"
node ./web-api/proxy.js

echo "proxy stopped"

if [ ! -e "$CIRCLECI" ]; then
  echo "killing dynamodb local"
  pkill -P $DYNAMO_PID
  pkill -P $ESEARCH_PID
fi
kill $S3RVER_PID
