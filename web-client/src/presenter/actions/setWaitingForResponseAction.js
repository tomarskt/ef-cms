import { state } from 'cerebral';

/**
 * sets the state.waitingForResponse to true which is used for showing the document upload or spinner
 *
 * @param {object} providers the providers object
 * @param {object} providers.store the cerebral store used for setting the state.waitingForResponse
 */
export const setWaitingForResponseAction = ({ store }) => {
  store.increment(state.waitingForResponseRequests);
  store.set(state.waitingForResponse, true);
};
