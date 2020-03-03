const client = require('../../dynamodbClientService');
const { stripWorkItems } = require('../../dynamo/helpers/stripWorkItems');

/**
 * getCaseByCaseId
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.caseId the case id to get
 * @returns {object} the case details
 */
exports.getCaseByCaseId = async ({ applicationContext, caseId }) => {
  const theCase = await client
    .get({
      Key: {
        pk: caseId,
        sk: caseId,
      },
      applicationContext,
    })
    .then(results =>
      stripWorkItems(results, applicationContext.isAuthorizedForWorkItems()),
    );

  const docketRecord = await client.query({
    ExpressionAttributeNames: {
      '#pk': 'pk',
      '#sk': 'sk',
    },
    ExpressionAttributeValues: {
      ':pk': caseId,
      ':prefix': 'docket-record',
    },
    KeyConditionExpression: '#pk = :pk and begins_with(#sk, :prefix)',
    applicationContext,
  });
  docketRecord.sort((a, b) =>
    a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0,
  );
  docketRecord.forEach((record, i) => (record.index = i + 1));

  return {
    ...theCase,
    docketRecord,
  };
};
