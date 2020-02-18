import { clearAlertsAction } from '../actions/clearAlertsAction';
import { getFormCombinedWithCaseDetailAction } from '../actions/getFormCombinedWithCaseDetailAction';
import { navigateToReviewPetitionAction } from '../actions/StartCaseInternal/navigateToReviewPetitionAction';
import { setValidationAlertErrorsAction } from '../actions/setValidationAlertErrorsAction';
import { showProgressSequenceDecorator } from '../utilities/sequenceHelpers';
import { startShowValidationAction } from '../actions/startShowValidationAction';
import { state } from 'cerebral';
import { stopShowValidationAction } from '../actions/stopShowValidationAction';
import { validateCaseDetailAction } from '../actions/validateCaseDetailAction';

export const navigateToReviewPetitionSequence = showProgressSequenceDecorator([
  startShowValidationAction,
  clearAlertsAction,
  getFormCombinedWithCaseDetailAction,
  validateCaseDetailAction,
  {
    error: [setValidationAlertErrorsAction],
    success: [
      stopShowValidationAction,
      ({ get, props, store }) => {
        store.set(state.form, {
          ...get(state.form),
          ...props.combinedCaseDetailWithForm,
        });
      },
      navigateToReviewPetitionAction,
    ],
  },
]);
