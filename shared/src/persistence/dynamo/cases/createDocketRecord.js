const client = require('../../dynamodbClientService');

/**
 * createDocketRecord
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.caseToCreate the case data
 * @returns {object} the case data
 */
exports.createDocketRecord = async ({
  applicationContext,
  caseId,
  docketRecord,
}) => {
  return client.put({
    Item: {
      ...docketRecord,
      pk: `${caseId}`,
      sk: `docket-record|${docketRecord.id}`,
    },
    applicationContext,
  });
};
