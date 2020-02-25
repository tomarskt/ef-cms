const { genericHandler } = require('../genericHandler');

/**
 * used for saving a case note
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  genericHandler(event, async ({ applicationContext }) => {
    const { caseId } = event.pathParameters || {};
    const { caseNote } = JSON.parse(event.body);

    return await applicationContext.getUseCases().saveCaseNoteInteractor({
      applicationContext,
      caseId,
      caseNote,
    });
  });
