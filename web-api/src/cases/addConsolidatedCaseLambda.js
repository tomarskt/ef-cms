const { genericHandler } = require('../genericHandler');

/**
 * used for consolidating cases
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  genericHandler(event, async ({ applicationContext }) => {
    await applicationContext.getUseCases().addConsolidatedCaseInteractor({
      applicationContext,
      caseId: event.pathParameters.caseId,
      caseIdToConsolidateWith: JSON.parse(event.body).caseIdToConsolidateWith,
    });
  });
