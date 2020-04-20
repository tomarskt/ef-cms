import { state } from 'cerebral';

/**
 * calls the addCaseToTrialSessionInteractor to add the case to the trial session
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {Function} providers.get the cerebral get function
 * @returns {object} the alertSuccess and updated caseDetail object
 */
export const addCaseToTrialSessionAction = async ({
  applicationContext,
  get,
}) => {
  const { caseId, docketNumber } = get(state.caseDetail);
  const { trialSessionId } = get(state.modal);
  const trialSessions = get(state.trialSessions);

  const selectedTrialSession =
    trialSessions &&
    trialSessions.find(session => session.trialSessionId === trialSessionId);

  const sessionIsCalendared =
    selectedTrialSession && selectedTrialSession.isCalendared;

  const caseDetail = await applicationContext
    .getUseCases()
    .addCaseToTrialSessionInteractor({
      applicationContext,
      caseId,
      trialSessionId,
    });

  let alertSuccess;
  if (sessionIsCalendared) {
    alertSuccess = {
      message: 'Case set for trial.',
    };
  } else {
    alertSuccess = {
      message: 'Case scheduled for trial.',
    };
  }
  return {
    alertSuccess,
    caseDetail,
    caseId,
    docketNumber,
    trialSessionId,
  };
};
