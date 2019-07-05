import { state } from 'cerebral';

/**
 * gets and sets the case deadlines for a case
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {Function} providers.get the cerebral get helper function
 * @param {object} providers.store the cerebral store object
 */
export const getCaseDeadlinesForCaseAction = async ({
  applicationContext,
  get,
  store,
}) => {
  const caseId = get(state.caseDetail.caseId);

  const caseDeadlines = await applicationContext
    .getUseCases()
    .getCaseDeadlinesForCaseInteractor({
      applicationContext,
      caseId,
    });

  store.set(state.caseDetails.caseDeadlines, caseDeadlines);
};
