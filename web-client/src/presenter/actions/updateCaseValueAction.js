import { state } from 'cerebral';

/**
 * sets the state.caseDetail
 *
 * @param {object} providers the providers object
 * @param {object} providers.props the cerebral props object
 * @param {object} providers.store the cerebral store
 */
export const updateCaseValueAction = ({ props, store }) => {
  store.set(state.caseDetail[props.key], props.value);
};
