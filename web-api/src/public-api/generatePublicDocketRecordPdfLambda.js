const { genericHandler } = require('../genericHandler');

/**
 * used for generating a printable PDF of a docket record
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  genericHandler(
    event,
    async ({ applicationContext }) => {
      const { caseId, docketRecordSort } = JSON.parse(event.body);

      return await applicationContext
        .getUseCases()
        .generateDocketRecordPdfInteractor({
          applicationContext,
          caseId,
          docketRecordSort,
          includePartyDetail: false,
        });
    },
    { logResults: false, user: {} },
  );
