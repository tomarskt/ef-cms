import { closeFileUploadStatusModalAction } from '../actions/closeFileUploadStatusModalAction';
import { getFileExternalDocumentAlertSuccessAction } from '../actions/FileDocument/getFileExternalDocumentAlertSuccessAction';
import { getPrintableFilingReceiptSequence } from './getPrintableFilingReceiptSequence';
import { navigateToCaseDetailAction } from '../actions/navigateToCaseDetailAction';
import { openFileUploadErrorModal } from '../actions/openFileUploadErrorModal';
import { openFileUploadStatusModalAction } from '../actions/openFileUploadStatusModalAction';
import { setAlertSuccessAction } from '../actions/setAlertSuccessAction';
import { setCaseAction } from '../actions/setCaseAction';
import { setPractitionerOnFormAction } from '../actions/FileDocument/setPractitionerOnFormAction';
import { setSaveAlertsForNavigationAction } from '../actions/setSaveAlertsForNavigationAction';
import { showProgressSequenceDecorator } from '../utilities/sequenceHelpers';
import { submitCaseAssociationRequestAction } from '../actions/FileDocument/submitCaseAssociationRequestAction';
import { uploadExternalDocumentsAction } from '../actions/FileDocument/uploadExternalDocumentsAction';

export const submitCaseAssociationRequestSequence = [
  openFileUploadStatusModalAction,
  setPractitionerOnFormAction,
  uploadExternalDocumentsAction,
  {
    error: [openFileUploadErrorModal],
    success: showProgressSequenceDecorator([
      submitCaseAssociationRequestAction,
      setCaseAction,
      closeFileUploadStatusModalAction,
      getPrintableFilingReceiptSequence,
      getFileExternalDocumentAlertSuccessAction,
      setAlertSuccessAction,
      setSaveAlertsForNavigationAction,
      navigateToCaseDetailAction,
    ]),
  },
];
