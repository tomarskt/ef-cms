import { state } from 'cerebral';
/**
 * calls the proxy/interactor to archive a document on the backend
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext contains the assignWorkItems method we will need from the getUseCases method
 * @param {object} providers.props props passed through via cerebral
 * @returns {Promise} async action
 */
export const archiveDraftDocumentAction = async ({
  applicationContext,
  get,
  store,
}) => {
  const { caseId, documentId, redirectToCaseDetail } = get(
    state.archiveDraftDocument,
  );
  await applicationContext
    .getUseCases()
    .archiveDraftDocumentInteractor({ applicationContext, caseId, documentId });

  store.set(state.alertSuccess, {
    message: 'Document deleted.',
  });

  if (redirectToCaseDetail) {
    store.set(state.saveAlertsForNavigation, true);

    return {
      caseId,
    };
  }
};
