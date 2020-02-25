const { genericHandler } = require('../genericHandler');

/**
 * used for serving a court-issued document on all parties and closing the case for some document types
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  genericHandler(
    event,
    async ({ applicationContext }) => {
      const { caseId, documentId } = event.pathParameters;

      return await applicationContext
        .getUseCases()
        .serveCourtIssuedDocumentInteractor({
          applicationContext,
          caseId,
          documentId,
        });
    },
    { logResults: false },
  );
