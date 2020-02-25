import { clearFormAction } from '../actions/clearFormAction';
import { clearModalAction } from '../actions/clearModalAction';
import { convertHtml2PdfSequence } from './convertHtml2PdfSequence';
import { getCaseAction } from '../actions/getCaseAction';
import { isLoggedInAction } from '../actions/isLoggedInAction';
import { redirectToCognitoAction } from '../actions/redirectToCognitoAction';
import { setCaseAction } from '../actions/setCaseAction';
import { setCurrentPageAction } from '../actions/setCurrentPageAction';
import { setDocumentToEditAction } from '../actions/setDocumentToEditAction';
import { state } from 'cerebral';
import { stopShowValidationAction } from '../actions/stopShowValidationAction';
import { unset } from 'cerebral/factories';

const gotoEditOrder = [
  unset(state.documentToEdit),
  clearModalAction,
  setCurrentPageAction('Interstitial'),
  stopShowValidationAction,
  clearFormAction,
  getCaseAction,
  setCaseAction,
  setDocumentToEditAction,
  convertHtml2PdfSequence,
  setCurrentPageAction('CreateOrder'),
];

export const gotoEditOrderSequence = [
  isLoggedInAction,
  {
    isLoggedIn: gotoEditOrder,
    unauthorized: [redirectToCognitoAction],
  },
];
