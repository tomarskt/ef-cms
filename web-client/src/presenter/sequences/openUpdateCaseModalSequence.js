import { clearAlertsAction } from '../actions/clearAlertsAction';
import { clearFormAction } from '../actions/clearFormAction';
import { defaultUpdateCaseModalValuesAction } from '../actions/defaultUpdateCaseModalValuesAction';
import { getUsersInSectionAction } from '../actions/getUsersInSectionAction';
import { setShowModalFactoryAction } from '../actions/setShowModalFactoryAction';
import { setUsersByKeyAction } from '../actions/setUsersByKeyAction';
import { showProgressSequenceDecorator } from '../utilities/sequenceHelpers';
import { stopShowValidationAction } from '../actions/stopShowValidationAction';

export const openUpdateCaseModalSequence = showProgressSequenceDecorator([
  stopShowValidationAction,
  clearFormAction,
  clearAlertsAction,
  defaultUpdateCaseModalValuesAction,
  getUsersInSectionAction({ section: 'judge' }),
  setUsersByKeyAction('modal.judgeUsers'),
  setShowModalFactoryAction('UpdateCaseModalDialog'),
]);
