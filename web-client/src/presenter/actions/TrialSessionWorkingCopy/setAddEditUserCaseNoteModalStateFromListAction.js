import { get as _get, find } from 'lodash';
import { state } from 'cerebral';

/**
 * set the state for the add edit user's notes modal
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.get the cerebral get function
 * @param {object} providers.store the cerebral store
 * @param {object} providers.props the cerebral props object
 */
export const setAddEditUserCaseNoteModalStateFromListAction = ({
  applicationContext,
  get,
  props,
  store,
}) => {
  const { caseId } = props;

  const notes = _get(get(state.trialSessionWorkingCopy.userNotes), [
    caseId,
    'notes',
  ]);

  const caseDetail =
    find(get(state.trialSession.calendaredCases), {
      caseId,
    }) || {};

  const caseCaptionNames = applicationContext.getCaseCaptionNames(
    caseDetail.caseCaption || '',
  );

  store.set(state.modal.caseCaptionNames, caseCaptionNames);
  store.set(state.modal.caseId, caseId);
  store.set(state.modal.notes, notes);
};
