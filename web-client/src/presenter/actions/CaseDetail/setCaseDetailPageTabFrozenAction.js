import { state } from 'cerebral';

/**
 * sets caseDetailPage.frozen to true (prevents tabs from being set in state, or "freezes" their values)
 *
 * @param {object} providers the providers object
 * @param {Function} providers.store the cerebral store function
 */
export const setCaseDetailPageTabFrozenAction = async ({ store }) => {
  store.set(state.caseDetailPage.frozen, true);
};
