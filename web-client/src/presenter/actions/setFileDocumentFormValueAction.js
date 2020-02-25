import { state } from 'cerebral';

/**
 * sets the state.form to the pros.value passed in
 *
 * @param {object} providers the providers object
 * @param {object} providers.store the cerebral store
 * @param {object} providers.props the cerebral props object
 */
export const setFileDocumentFormValueAction = ({ get, props, store }) => {
  if (props.key === 'previousDocument') {
    const caseDetail = get(state.caseDetail);

    const previousDocument = caseDetail.documents.find(
      document => document.documentId === props.value,
    );
    store.set(state.form.previousDocument, previousDocument);
  } else {
    if (props.value !== '') {
      store.set(state.form[props.key], props.value);
    } else {
      store.unset(state.form[props.key]);
    }
  }
};
