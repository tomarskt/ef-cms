const { genericHandler } = require('../genericHandler');

/**
 * lambda for adding a case to a trial session
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  genericHandler(event, async ({ applicationContext }) => {
    const { caseId, trialSessionId } = event.pathParameters || event.path;

    return await applicationContext
      .getUseCases()
      .addCaseToTrialSessionInteractor({
        applicationContext,
        caseId,
        trialSessionId,
      });
  });
