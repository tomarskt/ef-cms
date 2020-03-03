const client = require('../../dynamodbClientService');

/**
 * createDocketRecord
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.caseToCreate the case data
 * @returns {object} the case data
 */
exports.updateDocketRecord = async ({
  applicationContext,
  caseId,
  docketRecord,
}) => {
  const entry = await client.get({
    Item: {
      pk: `${caseId}`,
      sk: `docket-record|${docketRecord.id}`,
    },
    applicationContext,
  });

  return client.put({
    Item: {
      ...entry,
      ...docketRecord,
      pk: `${caseId}`,
      sk: `docket-record|${docketRecord.id}`,
    },
    applicationContext,
  });
};
