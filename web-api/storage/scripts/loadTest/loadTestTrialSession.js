const AWS = require('aws-sdk');
const axios = require('axios');
const createApplicationContext = require('../../../src/applicationContext');
const {
  addCaseToTrialSession,
  createCase,
  createTrialSession,
  getUserToken,
} = require('./loadTestHelpers');

Error.stackTraceLimit = Infinity;

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.REGION,
});

(async () => {
  let petitionerUser;
  let docketClerkUser;

  var apigateway = new AWS.APIGateway({
    region: process.env.REGION,
  });
  const { items: apis } = await apigateway
    .getRestApis({ limit: 200 })
    .promise();

  const services = apis
    .filter(api => api.name.includes(`${process.env.ENV}-ef-cms`))
    .reduce((obj, api) => {
      obj[
        api.name.replace(`${process.env.ENV}-`, '')
      ] = `https://${api.id}.execute-api.${process.env.REGION}.amazonaws.com/${process.env.ENV}`;
      return obj;
    }, {});

  let token = await getUserToken({
    cognito,
    env: process.env.ENV,
    password: 'Testing1234$',
    username: 'petitioner1@example.com',
  });

  let response = await axios.get(`${services['ef-cms-users-green']}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  petitionerUser = response.data;

  token = await getUserToken({
    cognito,
    env: process.env.ENV,
    password: 'Testing1234$',
    username: 'docketclerk1@example.com',
  });

  response = await axios.get(`${services['ef-cms-users-green']}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  docketClerkUser = response.data;

  const trialSessionEntity = await createTrialSession({
    applicationContext: createApplicationContext(docketClerkUser),
  });
  const { trialSessionId } = trialSessionEntity;

  console.log('trial session', trialSessionId);

  let petitionFileId;
  let stinFileId;

  for (let i = 0; i < +process.env.SIZE; i++) {
    console.log(
      `Adding case #${i + 1} to Trial Session ID: ${trialSessionId}.`,
    );
    try {
      const { caseDetail, ...caseResult } = await createCase({
        applicationContext: createApplicationContext(petitionerUser),
        petitionFileId,
        stinFileId,
      });
      ({ petitionFileId, stinFileId } = caseResult);

      const { caseId } = caseDetail;
      await addCaseToTrialSession({
        applicationContext: createApplicationContext(docketClerkUser),
        caseId,
        trialSessionId,
      });
    } catch (e) {
      console.log('err', e);
    }
  }

  console.log(`Completed adding cases to Trial Session ID: ${trialSessionId}.`);
})();
