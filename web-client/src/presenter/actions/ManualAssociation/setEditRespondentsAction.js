import { cloneDeep } from 'lodash';
import { state } from 'cerebral';

/**
 * sets up the modal state for the Edit Respondents modal
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {Function} providers.get the cerebral get helper function
 * @param {object} providers.store the cerebral store object
 * @returns {Promise<*>} the promise of the completed action
 */
export const setEditRespondentsAction = async ({ get, store }) => {
  const respondents = get(state.caseDetail.respondents);

  store.set(state.modal.respondents, cloneDeep(respondents));
};
