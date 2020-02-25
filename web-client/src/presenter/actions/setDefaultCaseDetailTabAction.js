import { state } from 'cerebral';

/**
 * sets the caseDetailPage.informationTab to a default value if it is not already set.
 *
 * @param {object} providers the providers object
 * @param {object} providers.store the cerebral store used for setting the state.cases
 * @param {object} providers.props the cerebral props object
 * @param {object} providers.get the cerebral get function used for getting state from store
 */
export const setDefaultCaseDetailTabAction = ({ get, props, store }) => {
  const frozen = get(state.caseDetailPage.frozen);

  if (!frozen) {
    store.set(
      state.caseDetailPage.primaryTab,
      props.primaryTab || 'docketRecord',
    );
    store.set(state.caseDetailPage.inProgressTab, 'draftDocuments');
    store.set(state.caseDetailPage.caseInformationTab, 'overview');
  }
};
