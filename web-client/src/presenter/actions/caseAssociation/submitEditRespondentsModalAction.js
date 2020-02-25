import { state } from 'cerebral';

/**
 * submits the edit respondents modal, removing the selected respondents from the case
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context needed for getting the use case
 * @param {object} providers.get the cerebral get function used for getting state.modal and state.caseDetail.caseId
 * @param {object} providers.path the next object in the path
 * @returns {Promise<*>} the success path
 */
export const submitEditRespondentsModalAction = async ({
  applicationContext,
  get,
  path,
}) => {
  const form = get(state.modal);
  const caseId = get(state.caseDetail.caseId);

  const { respondents } = form;

  for (const respondent of respondents) {
    if (respondent.removeFromCase) {
      await applicationContext.getUseCases().deleteCounselFromCaseInteractor({
        applicationContext,
        caseId,
        userIdToDelete: respondent.userId,
      });
    } else {
      await applicationContext.getUseCases().updateCounselOnCaseInteractor({
        applicationContext,
        caseId,
        userData: respondent,
        userIdToUpdate: respondent.userId,
      });
    }
  }

  return path.success({
    alertSuccess: {
      message: 'You can view your changes below.',
      title: 'Respondent Counsel has been updated.',
    },
  });
};
