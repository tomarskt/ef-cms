const { genericHandler } = require('../genericHandler');

/**
 * used for determining if a user has pending association with a case or not
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  genericHandler(event, async ({ applicationContext }) => {
    const { caseId, userId } = event.pathParameters || {};

    return await applicationContext
      .getUseCases()
      .verifyPendingCaseForUserInteractor({
        applicationContext,
        caseId,
        userId,
      });
  });
