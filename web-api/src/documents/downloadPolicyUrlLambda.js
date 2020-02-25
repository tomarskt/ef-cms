const { genericHandler } = require('../genericHandler');

/**
 * used for getting the download policy which is needed for users to download files directly from S3 via the UI
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  genericHandler(event, async ({ applicationContext }) => {
    return await applicationContext
      .getUseCases()
      .getDownloadPolicyUrlInteractor({
        applicationContext,
        caseId: event.pathParameters.caseId,
        documentId: event.pathParameters.documentId,
      });
  });
