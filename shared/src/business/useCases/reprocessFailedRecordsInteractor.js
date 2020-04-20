const AWS = require('aws-sdk');
const { createISODateString } = require('../utilities/DateHandler');

/**
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @returns {object} the results of all the index calls for logging
 */
exports.reprocessFailedRecordsInteractor = async ({ applicationContext }) => {
  applicationContext.logger.info('Time', createISODateString());
  const honeybadger = applicationContext.initHoneybadger();

  const recordsToProcess = await applicationContext
    .getPersistenceGateway()
    .getElasticsearchReindexRecords({ applicationContext });

  if (recordsToProcess.length) {
    const searchClient = applicationContext.getSearchClient();

    for (const record of recordsToProcess) {
      try {
        let fullRecord;

        if (record.recordPk.includes('case|')) {
          const fullCase = await applicationContext
            .getPersistenceGateway()
            .getCaseByCaseId({
              applicationContext,
              caseId: record.recordPk.split('|')[1],
            });

          if (fullCase.caseId) {
            fullRecord = fullCase;
            record.recordSk = record.recordPk;
          } else {
            fullRecord = await applicationContext
              .getPersistenceGateway()
              .getRecord({
                applicationContext,
                recordPk: record.recordPk,
                recordSk: record.recordSk,
              });
          }
        } else {
          fullRecord = await applicationContext
            .getPersistenceGateway()
            .getRecord({
              applicationContext,
              recordPk: record.recordPk,
              recordSk: record.recordSk,
            });
        }

        await searchClient.index({
          body: { ...AWS.DynamoDB.Converter.marshall(fullRecord) },
          id: `${record.recordPk}_${record.recordSk}`,
          index: 'efcms',
        });

        await applicationContext
          .getPersistenceGateway()
          .deleteElasticsearchReindexRecord({
            applicationContext,
            recordPk: record.recordPk,
            recordSk: record.recordSk,
          });
      } catch (e) {
        applicationContext.logger.info('Error', e);
        honeybadger && honeybadger.notify(e);
      }
    }

    applicationContext.logger.info('Time', createISODateString());
  }
};
