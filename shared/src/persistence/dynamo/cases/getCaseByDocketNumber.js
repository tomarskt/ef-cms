const client = require('../../dynamodbClientService');
const {
  getRecordViaMapping,
} = require('../../dynamo/helpers/getRecordViaMapping');
const { stripWorkItems } = require('../../dynamo/helpers/stripWorkItems');

/**
 * getCaseByDocketNumber
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.docketNumber the docket number to get
 * @returns {object} the case details
 */
exports.getCaseByDocketNumber = async ({
  applicationContext,
  docketNumber,
}) => {
  const theCase = await getRecordViaMapping({
    applicationContext,
    key: docketNumber,
    type: 'case',
  }).then(results =>
    stripWorkItems(results, applicationContext.isAuthorizedForWorkItems()),
  );

  const docketRecord = await client.query({
    ExpressionAttributeNames: {
      '#pk': 'pk',
      '#sk': 'sk',
    },
    ExpressionAttributeValues: {
      ':pk': theCase.caseId,
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
