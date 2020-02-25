const { genericHandler } = require('../genericHandler');

/**
 * lambda which is used for updating a docket entry's meta for a case
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  genericHandler(event, async ({ applicationContext }) => {
    return await applicationContext
      .getUseCases()
      .updateDocketEntryMetaInteractor({
        ...JSON.parse(event.body),
        applicationContext,
        caseId: event.pathParameters.caseId,
      });
  });
