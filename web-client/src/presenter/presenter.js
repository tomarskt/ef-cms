import { ActionError } from './errors/ActionError';
import { InvalidRequestError } from './errors/InvalidRequestError';
import { NotFoundError } from './errors/NotFoundError';
import { ServerInvalidResponseError } from './errors/ServerInvalidResponseError';
import { UnauthorizedRequestError } from './errors/UnauthorizedRequestError';
import { UnidentifiedUserError } from './errors/UnidentifiedUserError';
import { addCaseToTrialSessionSequence } from './sequences/addCaseToTrialSessionSequence';
import { addSupportingDocumentToFormSequence } from './sequences/addSupportingDocumentToFormSequence';
import { archiveDraftDocumentModalSequence } from './sequences/archiveDraftDocumentModalSequence';
import { archiveDraftDocumentSequence } from './sequences/archiveDraftDocumentSequence';
import { assignSelectedWorkItemsSequence } from './sequences/assignSelectedWorkItemsSequence';
import { associatePractitionerWithCaseSequence } from './sequences/caseAssociation/associatePractitionerWithCaseSequence';
import { associateRespondentWithCaseSequence } from './sequences/caseAssociation/associateRespondentWithCaseSequence';
import { autoSaveTrialSessionWorkingCopySequence } from './sequences/autoSaveTrialSessionWorkingCopySequence';
import { batchDownloadErrorSequence } from './sequences/batchDownloadErrorSequence';
import { batchDownloadReadySequence } from './sequences/batchDownloadReadySequence';
import { batchDownloadTrialSessionSequence } from './sequences/batchDownloadTrialSessionSequence';
import { blockCaseFromTrialSequence } from './sequences/blockCaseFromTrialSequence';
import { cancelAddDraftDocumentSequence } from './sequences/cancelAddDraftDocumentSequence';
import { cancelEditPrimaryContactSequence } from './sequences/cancelEditPrimaryContactSequence';
import { cancelFileUploadSequence } from './sequences/cancelFileUploadSequence';
import { cerebralBindSimpleSetStateSequence } from './sequences/cerebralBindSimpleSetStateSequence';
import { chooseModalWizardStepSequence } from './sequences/chooseModalWizardStepSequence';
import { chooseStartCaseWizardStepSequence } from './sequences/chooseStartCaseWizardStepSequence';
import { chooseWizardStepSequence } from './sequences/chooseWizardStepSequence';
import { chooseWorkQueueSequence } from './sequences/chooseWorkQueueSequence';
import { clearAdvancedSearchFormSequence } from './sequences/clearAdvancedSearchFormSequence';
import { clearAlertSequence } from './sequences/clearAlertSequence';
import { clearDocketNumberSearchFormSequence } from './sequences/clearDocketNumberSearchFormSequence';
import { clearDocumentSequence } from './sequences/clearDocumentSequence';
import { clearExistingDocumentSequence } from './sequences/clearExistingDocumentSequence';
import { clearModalFormSequence } from './sequences/clearModalFormSequence';
import { clearModalSequence } from './sequences/clearModalSequence';
import { clearPdfPreviewUrlSequence } from './sequences/clearPdfPreviewUrlSequence';
import { clearPreferredTrialCitySequence } from './sequences/clearPreferredTrialCitySequence';
import { clearWizardDataSequence } from './sequences/clearWizardDataSequence';
import { closeModalAndReturnToCaseDetailDraftDocumentsSequence } from './sequences/closeModalAndReturnToCaseDetailDraftDocumentsSequence';
import { closeModalAndReturnToCaseDetailSequence } from './sequences/closeModalAndReturnToCaseDetailSequence';
import { closeModalAndReturnToDashboardSequence } from './sequences/closeModalAndReturnToDashboardSequence';
import { closeModalAndReturnToTrialSessionsSequence } from './sequences/closeModalAndReturnToTrialSessionsSequence';
import { completeDocketEntryQCAndSendMessageSequence } from './sequences/completeDocketEntryQCAndSendMessageSequence';
import { completeDocketEntryQCSequence } from './sequences/completeDocketEntryQCSequence';
import { completeDocumentSelectSequence } from './sequences/completeDocumentSelectSequence';
import { completeDocumentSigningSequence } from './sequences/completeDocumentSigningSequence';
import { completeStartCaseWizardStepSequence } from './sequences/completeStartCaseWizardStepSequence';
import { confirmStayLoggedInSequence } from './sequences/confirmStayLoggedInSequence';
import { convertHtml2PdfAndOpenInNewTabSequence } from './sequences/convertHtml2PdfAndOpenInNewTabSequence';
import { convertHtml2PdfSequence } from './sequences/convertHtml2PdfSequence';
import { copyPrimaryContactSequence } from './sequences/copyPrimaryContactSequence';
import { countryTypeChangeSequence } from './sequences/countryTypeChangeSequence';
import { countryTypeUserContactChangeSequence } from './sequences/countryTypeUserContactChangeSequence';
import { createCaseDeadlineSequence } from './sequences/createCaseDeadlineSequence';
import { createCaseFromPaperAndServeToIrsSequence } from './sequences/createCaseFromPaperAndServeToIrsSequence';
import { createWorkItemSequence } from './sequences/createWorkItemSequence';
import { deleteCaseDeadlineSequence } from './sequences/deleteCaseDeadlineSequence';
import { deleteCaseNoteSequence } from './sequences/deleteCaseNoteSequence';
import { deleteJudgesCaseNoteFromCaseDetailSequence } from './sequences/deleteJudgesCaseNoteFromCaseDetailSequence';
import { deleteTrialSessionSequence } from './sequences/deleteTrialSessionSequence';
import { deleteUserCaseNoteFromWorkingCopySequence } from './sequences/deleteUserCaseNoteFromWorkingCopySequence';
import { deleteWorkingCopySessionNoteSequence } from './sequences/deleteWorkingCopySessionNoteSequence';
import { dismissAlertSequence } from './sequences/dismissAlertSequence';
import { dismissCreateMessageModalSequence } from './sequences/dismissCreateMessageModalSequence';
import { dismissModalSequence } from './sequences/dismissModalSequence';
import { editSelectedDocumentSequence } from './sequences/editSelectedDocumentSequence';
import { editSelectedSecondaryDocumentSequence } from './sequences/editSelectedSecondaryDocumentSequence';
import { editUploadCourtIssuedDocumentSequence } from './sequences/editUploadCourtIssuedDocumentSequence';
import { fetchPendingItemsSequence } from './sequences/pending/fetchPendingItemsSequence';
import { fetchUserNotificationsSequence } from './sequences/fetchUserNotificationsSequence';
import { formCancelToggleCancelSequence } from './sequences/formCancelToggleCancelSequence';
import { generateInternalCaseCaptionSequence } from './sequences/generateInternalCaseCaptionSequence';
import { generatePdfFromScanSessionSequence } from './sequences/generatePdfFromScanSessionSequence';
import { getBlockedCasesByTrialLocationSequence } from './sequences/getBlockedCasesByTrialLocationSequence';
import { getUsersInSectionSequence } from './sequences/getUsersInSectionSequence';
import { goBackToStartCaseInternalSequence } from './sequences/goBackToStartCaseInternalSequence';
import { gotoAddCourtIssuedDocketEntrySequence } from './sequences/gotoAddCourtIssuedDocketEntrySequence';
import { gotoAddDocketEntrySequence } from './sequences/gotoAddDocketEntrySequence';
import { gotoAddTrialSessionSequence } from './sequences/gotoAddTrialSessionSequence';
import { gotoAdvancedSearchSequence } from './sequences/gotoAdvancedSearchSequence';
import { gotoAllCaseDeadlinesSequence } from './sequences/gotoAllCaseDeadlinesSequence';
import { gotoBeforeStartCaseSequence } from './sequences/gotoBeforeStartCaseSequence';
import { gotoBeforeYouFileDocumentSequence } from './sequences/gotoBeforeYouFileDocumentSequence';
import { gotoBlockedCasesReportSequence } from './sequences/gotoBlockedCasesReportSequence';
import { gotoCaseDetailSequence } from './sequences/gotoCaseDetailSequence';
import { gotoCaseSearchNoMatchesSequence } from './sequences/gotoCaseSearchNoMatchesSequence';
import { gotoCompleteDocketEntrySequence } from './sequences/gotoCompleteDocketEntrySequence';
import { gotoCreateOrderSequence } from './sequences/gotoCreateOrderSequence';
import { gotoDashboardSequence } from './sequences/gotoDashboardSequence';
import { gotoDocumentDetailSequence } from './sequences/gotoDocumentDetailSequence';
import { gotoEditCourtIssuedDocketEntrySequence } from './sequences/gotoEditCourtIssuedDocketEntrySequence';
import { gotoEditDocketEntryMetaSequence } from './sequences/gotoEditDocketEntryMetaSequence';
import { gotoEditDocketEntrySequence } from './sequences/gotoEditDocketEntrySequence';
import { gotoEditOrderSequence } from './sequences/gotoEditOrderSequence';
import { gotoEditPetitionDetailsSequence } from './sequences/gotoEditPetitionDetailsSequence';
import { gotoEditPetitionerInformationSequence } from './sequences/gotoEditPetitionerInformationSequence';
import { gotoEditTrialSessionSequence } from './sequences/gotoEditTrialSessionSequence';
import { gotoEditUploadCourtIssuedDocumentSequence } from './sequences/gotoEditUploadCourtIssuedDocumentSequence';
import { gotoFileDocumentSequence } from './sequences/gotoFileDocumentSequence';
import { gotoIdleLogoutSequence } from './sequences/gotoIdleLogoutSequence';
import { gotoLoginSequence } from './sequences/gotoLoginSequence';
import { gotoMessagesSequence } from './sequences/gotoMessagesSequence';
import { gotoOrdersNeededSequence } from './sequences/gotoOrdersNeededSequence';
import { gotoPdfPreviewSequence } from './sequences/gotoPdfPreviewSequence';
import { gotoPendingReportSequence } from './sequences/gotoPendingReportSequence';
import { gotoPrimaryContactEditSequence } from './sequences/gotoPrimaryContactEditSequence';
import { gotoPrintPreviewSequence } from './sequences/gotoPrintPreviewSequence';
import { gotoPrintableCaseConfirmationSequence } from './sequences/gotoPrintableCaseConfirmationSequence';
import { gotoPrintableDocketRecordSequence } from './sequences/gotoPrintableDocketRecordSequence';
import { gotoPrintablePendingReportForCaseSequence } from './sequences/gotoPrintablePendingReportForCaseSequence';
import { gotoPrintablePendingReportSequence } from './sequences/gotoPrintablePendingReportSequence';
import { gotoRequestAccessSequence } from './sequences/gotoRequestAccessSequence';
import { gotoReviewPetitionFromPaperSequence } from './sequences/gotoReviewPetitionFromPaperSequence';
import { gotoReviewSavedPetitionSequence } from './sequences/gotoReviewSavedPetitionSequence';
import { gotoSecondaryContactEditSequence } from './sequences/gotoSecondaryContactEditSequence';
import { gotoSelectDocumentTypeSequence } from './sequences/gotoSelectDocumentTypeSequence';
import { gotoSignOrderSequence } from './sequences/gotoSignOrderSequence';
import { gotoSignPDFDocumentSequence } from './sequences/gotoSignPDFDocumentSequence';
import { gotoStartCaseWizardSequence } from './sequences/gotoStartCaseWizardSequence';
import { gotoStyleGuideSequence } from './sequences/gotoStyleGuideSequence';
import { gotoTrialSessionDetailSequence } from './sequences/gotoTrialSessionDetailSequence';
import { gotoTrialSessionWorkingCopySequence } from './sequences/gotoTrialSessionWorkingCopySequence';
import { gotoTrialSessionsSequence } from './sequences/gotoTrialSessionsSequence';
import { gotoUploadCourtIssuedDocumentSequence } from './sequences/gotoUploadCourtIssuedDocumentSequence';
import { gotoUserContactEditSequence } from './sequences/gotoUserContactEditSequence';
import { gotoViewAllDocumentsSequence } from './sequences/gotoViewAllDocumentsSequence';
import { loadOriginalProposedStipulatedDecisionSequence } from './sequences/loadOriginalProposedStipulatedDecisionSequence';
import { loadPdfSequence } from './sequences/PDFPreviewModal/loadPdfSequence';
import { loginWithCodeSequence } from './sequences/loginWithCodeSequence';
import { loginWithTokenSequence } from './sequences/loginWithTokenSequence';
import { navigateBackSequence } from './sequences/navigateBackSequence';
import { navigateToCaseDetailSequence } from './sequences/navigateToCaseDetailSequence';
import { navigateToEditOrderSequence } from './sequences/navigateToEditOrderSequence';
import { navigateToPathSequence } from './sequences/navigateToPathSequence';
import { navigateToPrintPreviewSequence } from './sequences/navigateToPrintPreviewSequence';
import { navigateToPrintableCaseConfirmationSequence } from './sequences/navigateToPrintableCaseConfirmationSequence';
import { navigateToPrintableDocketRecordSequence } from './sequences/navigateToPrintableDocketRecordSequence';
import { navigateToReviewPetitionFromPaperSequence } from './sequences/navigateToReviewPetitionFromPaperSequence';
import { navigateToReviewSavedPetitionSequence } from './sequences/navigateToReviewSavedPetitionSequence';
import { notFoundErrorSequence } from './sequences/notFoundErrorSequence';
import { noticeGenerationCompleteSequence } from './sequences/noticeGenerationCompleteSequence';
import { openAddEditCaseNoteModalSequence } from './sequences/openAddEditCaseNoteModalSequence';
import { openAddEditSessionNoteModalSequence } from './sequences/openAddEditSessionNoteModalSequence';
import { openAddEditUserCaseNoteModalFromDetailSequence } from './sequences/openAddEditUserCaseNoteModalFromDetailSequence';
import { openAddEditUserCaseNoteModalFromListSequence } from './sequences/openAddEditUserCaseNoteModalFromListSequence';
import { openAddPractitionerModalSequence } from './sequences/openAddPractitionerModalSequence';
import { openAddRespondentModalSequence } from './sequences/openAddRespondentModalSequence';
import { openAddToTrialModalSequence } from './sequences/openAddToTrialModalSequence';
import { openBlockFromTrialModalSequence } from './sequences/openBlockFromTrialModalSequence';
import { openCancelDraftDocumentModalSequence } from './sequences/openCancelDraftDocumentModalSequence';
import { openCaseDifferenceModalSequence } from './sequences/openCaseDifferenceModalSequence';
import { openChangeScannerSourceModalSequence } from './sequences/openChangeScannerSourceModalSequence';
import { openCleanModalSequence } from './sequences/openCleanModalSequence';
import { openCompleteSelectDocumentTypeModalSequence } from './sequences/openCompleteSelectDocumentTypeModalSequence';
import { openConfirmDeleteBatchModalSequence } from './sequences/openConfirmDeleteBatchModalSequence';
import { openConfirmDeletePDFModalSequence } from './sequences/openConfirmDeletePDFModalSequence';
import { openConfirmDeleteTrialSessionModalSequence } from './sequences/openConfirmDeleteTrialSessionModalSequence';
import { openConfirmEditModalSequence } from './sequences/openConfirmEditModalSequence';
import { openConfirmInitiateServiceModalSequence } from './sequences/openConfirmInitiateServiceModalSequence';
import { openConfirmRemoveCaseDetailPendingItemModalSequence } from './sequences/openConfirmRemoveCaseDetailPendingItemModalSequence';
import { openConfirmRescanBatchModalSequence } from './sequences/openConfirmRescanBatchModalSequence';
import { openConfirmServeToIrsModalSequence } from './sequences/openConfirmServeToIrsModalSequence';
import { openCreateCaseDeadlineModalSequence } from './sequences/openCreateCaseDeadlineModalSequence';
import { openCreateMessageAlongsideDocketRecordQCModalSequence } from './sequences/openCreateMessageAlongsideDocketRecordQCModalSequence';
import { openCreateMessageModalSequence } from './sequences/openCreateMessageModalSequence';
import { openCreateOrderChooseTypeModalSequence } from './sequences/openCreateOrderChooseTypeModalSequence';
import { openDeleteCaseDeadlineModalSequence } from './sequences/openDeleteCaseDeadlineModalSequence';
import { openDeleteCaseNoteConfirmModalSequence } from './sequences/openDeleteCaseNoteConfirmModalSequence';
import { openDeleteSessionNoteConfirmModalSequence } from './sequences/openDeleteSessionNoteConfirmModalSequence';
import { openDeleteUserCaseNoteConfirmModalSequence } from './sequences/openDeleteUserCaseNoteConfirmModalSequence';
import { openEditCaseDeadlineModalSequence } from './sequences/openEditCaseDeadlineModalSequence';
import { openEditPractitionersModalSequence } from './sequences/openEditPractitionersModalSequence';
import { openEditRespondentsModalSequence } from './sequences/openEditRespondentsModalSequence';
import { openPdfPreviewModalSequence } from './sequences/openPdfPreviewModalSequence';
import { openPrioritizeCaseModalSequence } from './sequences/openPrioritizeCaseModalSequence';
import { openRemoveFromTrialSessionModalSequence } from './sequences/openRemoveFromTrialSessionModalSequence';
import { openSelectDocumentWizardOverlaySequence } from './sequences/openSelectDocumentWizardOverlaySequence';
import { openSetCalendarModalSequence } from './sequences/openSetCalendarModalSequence';
import { openTrialSessionPlanningModalSequence } from './sequences/openTrialSessionPlanningModalSequence';
import { openUnblockFromTrialModalSequence } from './sequences/openUnblockFromTrialModalSequence';
import { openUnprioritizeCaseModalSequence } from './sequences/openUnprioritizeCaseModalSequence';
import { openUpdateCaseModalSequence } from './sequences/openUpdateCaseModalSequence';
import { printDocketRecordSequence } from './sequences/printDocketRecordSequence';
import { printTrialCalendarSequence } from './sequences/printTrialCalendarSequence';
import { prioritizeCaseSequence } from './sequences/prioritizeCaseSequence';
import { redirectToLoginSequence } from './sequences/redirectToLoginSequence';
import { refreshCaseSequence } from './sequences/refreshCaseSequence';
import { removeBatchSequence } from './sequences/removeBatchSequence';
import { removeCaseDetailPendingItemSequence } from './sequences/removeCaseDetailPendingItemSequence';
import { removeCaseFromTrialSequence } from './sequences/removeCaseFromTrialSequence';
import { removeScannedPdfSequence } from './sequences/removeScannedPdfSequence';
import { removeSecondarySupportingDocumentSequence } from './sequences/removeSecondarySupportingDocumentSequence';
import { removeSignatureFromOrderSequence } from './sequences/removeSignatureFromOrderSequence';
import { removeSupportingDocumentSequence } from './sequences/removeSupportingDocumentSequence';
import { rescanBatchSequence } from './sequences/rescanBatchSequence';
import { resetCaseMenuSequence } from './sequences/resetCaseMenuSequence';
import { resetHeaderAccordionsSequence } from './sequences/resetHeaderAccordionsSequence';
import { reviewExternalDocumentInformationSequence } from './sequences/reviewExternalDocumentInformationSequence';
import { reviewRequestAccessInformationSequence } from './sequences/reviewRequestAccessInformationSequence';
import { runTrialSessionPlanningReportSequence } from './sequences/runTrialSessionPlanningReportSequence';
import { saveCaseAndServeToIrsSequence } from './sequences/saveCaseAndServeToIrsSequence';
import { saveDocumentSigningSequence } from './sequences/saveDocumentSigningSequence';
import { saveIntermediateDocketEntrySequence } from './sequences/saveIntermediateDocketEntrySequence';
import { saveInternalCaseForLaterSequence } from './sequences/saveInternalCaseForLaterSequence';
import { saveSavedCaseForLaterSequence } from './sequences/saveSavedCaseForLaterSequence';
import { scannerShutdownSequence } from './sequences/scannerShutdownSequence';
import { scannerStartupSequence } from './sequences/scannerStartupSequence';
import { sealCaseSequence } from './sequences/sealCaseSequence';
import { selectAssigneeSequence } from './sequences/selectAssigneeSequence';
import { selectDateRangeFromCalendarSequence } from './sequences/selectDateRangeFromCalendarSequence';
import { selectDocumentForPreviewSequence } from './sequences/selectDocumentForPreviewSequence';
import { selectDocumentForScanSequence } from './sequences/selectDocumentForScanSequence';
import { selectDocumentSequence } from './sequences/selectDocumentSequence';
import { selectScannerSequence } from './sequences/selectScannerSequence';
import { selectSecondaryDocumentSequence } from './sequences/selectSecondaryDocumentSequence';
import { selectWorkItemSequence } from './sequences/selectWorkItemSequence';
import { serveCaseToIrsSequence } from './sequences/serveCaseToIrsSequence';
import { serveCourtIssuedDocumentSequence } from './sequences/serveCourtIssuedDocumentSequence';
import { setCanvasForPDFSigningSequence } from './sequences/setCanvasForPDFSigningSequence';
import { setCaseDetailPageTabSequence } from './sequences/setCaseDetailPageTabSequence';
import { setCurrentPageErrorSequence } from './sequences/setCurrentPageErrorSequence';
import { setCurrentPageIndexSequence } from './sequences/setCurrentPageIndexSequence';
import { setDocumentDetailTabSequence } from './sequences/setDocumentDetailTabSequence';
import { setDocumentForUploadSequence } from './sequences/setDocumentForUploadSequence';
import { setDocumentUploadModeSequence } from './sequences/setDocumentUploadModeSequence';
import { setFieldOrderSequence } from './sequences/setFieldOrderSequence';
import { setFocusedWorkItemSequence } from './sequences/setFocusedWorkItemSequence';
import { setIdleStatusIdleSequence } from './sequences/setIdleStatusIdleSequence';
import { setIrsNoticeFalseSequence } from './sequences/setIrsNoticeFalseSequence';
import { setModalDialogNameSequence } from './sequences/setModalDialogNameSequence';
import { setPDFPageForSigningSequence } from './sequences/setPDFPageForSigningSequence';
import { setPDFSignatureDataSequence } from './sequences/setPDFSignatureDataSequence';
import { setPageSequence } from './sequences/PDFPreviewModal/setPageSequence';
import { setPdfPreviewUrlSequence } from './sequences/setPdfPreviewUrlSequence';
import { setScannerSourceSequence } from './sequences/setScannerSourceSequence';
import { setSelectedBatchIndexSequence } from './sequences/setSelectedBatchIndexSequence';
import { setSelectedCasesForConsolidatedCaseDocumentSubmissionSequence } from './sequences/setSelectedCasesForConsolidatedCaseDocumentSubmissionSequence';
import { setTrialSessionCalendarSequence } from './sequences/setTrialSessionCalendarSequence';
import { setWorkItemActionSequence } from './sequences/setWorkItemActionSequence';
import { setWorkQueueIsInternalSequence } from './sequences/setWorkQueueIsInternalSequence';
import { showDocketRecordDetailModalSequence } from './sequences/showDocketRecordDetailModalSequence';
import { showMoreResultsSequence } from './sequences/showMoreResultsSequence';
import { signOutSequence } from './sequences/signOutSequence';
import { startScanSequence } from './sequences/startScanSequence';
import { state } from './state';
import { submitAddConsolidatedCaseSequence } from './sequences/submitAddConsolidatedCaseSequence';
import { submitCaseAdvancedSearchSequence } from './sequences/submitCaseAdvancedSearchSequence';
import { submitCaseAssociationRequestSequence } from './sequences/submitCaseAssociationRequestSequence';
import { submitCaseDocketNumberSearchSequence } from './sequences/submitCaseDocketNumberSearchSequence';
import { submitCaseSearchForConsolidationSequence } from './sequences/submitCaseSearchForConsolidationSequence';
import { submitCaseSearchSequence } from './sequences/submitCaseSearchSequence';
import { submitCompleteSequence } from './sequences/submitCompleteSequence';
import { submitCourtIssuedDocketEntrySequence } from './sequences/submitCourtIssuedDocketEntrySequence';
import { submitCourtIssuedOrderSequence } from './sequences/submitCourtIssuedOrderSequence';
import { submitCreateOrderModalSequence } from './sequences/submitCreateOrderModalSequence';
import { submitDocketEntrySequence } from './sequences/submitDocketEntrySequence';
import { submitEditDocketEntryMetaSequence } from './sequences/submitEditDocketEntryMetaSequence';
import { submitEditPractitionersModalSequence } from './sequences/submitEditPractitionersModalSequence';
import { submitEditPrimaryContactSequence } from './sequences/submitEditPrimaryContactSequence';
import { submitEditRespondentsModalSequence } from './sequences/submitEditRespondentsModalSequence';
import { submitEditSecondaryContactSequence } from './sequences/submitEditSecondaryContactSequence';
import { submitExternalDocumentSequence } from './sequences/submitExternalDocumentSequence';
import { submitFilePetitionSequence } from './sequences/submitFilePetitionSequence';
import { submitForwardSequence } from './sequences/submitForwardSequence';
import { submitLoginSequence } from './sequences/submitLoginSequence';
import { submitRemoveConsolidatedCasesSequence } from './sequences/submitRemoveConsolidatedCasesSequence';
import { submitTrialSessionSequence } from './sequences/submitTrialSessionSequence';
import { submitUpdateCaseModalSequence } from './sequences/submitUpdateCaseModalSequence';
import { submitUpdateUserContactInformationSequence } from './sequences/submitUpdateUserContactInformationSequence';
import { toggleBetaBarSequence } from './sequences/toggleBetaBarSequence';
import { toggleCaseDifferenceSequence } from './sequences/toggleCaseDifferenceSequence';
import { toggleMenuSequence } from './sequences/toggleMenuSequence';
import { toggleMobileDocketSortSequence } from './sequences/toggleMobileDocketSortSequence';
import { toggleMobileMenuSequence } from './sequences/toggleMobileMenuSequence';
import { togglePaymentDetailsSequence } from './sequences/togglePaymentDetailsSequence';
import { toggleReportsMenuSequence } from './sequences/toggleReportsMenuSequence';
import { toggleUsaBannerDetailsSequence } from './sequences/toggleUsaBannerDetailsSequence';
import { toggleWorkingCopySortSequence } from './sequences/toggleWorkingCopySortSequence';
import { unauthorizedErrorSequence } from './sequences/unauthorizedErrorSequence';
import { unblockCaseFromTrialSequence } from './sequences/unblockCaseFromTrialSequence';
import { unidentifiedUserErrorSequence } from './sequences/unidentifiedUserErrorSequence';
import { unprioritizeCaseSequence } from './sequences/unprioritizeCaseSequence';
import { unsetWorkQueueIsInternalSequence } from './sequences/unsetWorkQueueIsInternalSequence';
import { updateAdvancedSearchFormValueSequence } from './sequences/updateAdvancedSearchFormValueSequence';
import { updateBatchDownloadProgressSequence } from './sequences/updateBatchDownloadProgressSequence';
import { updateCaseAssociationFormValueSequence } from './sequences/updateCaseAssociationFormValueSequence';
import { updateCaseDeadlineSequence } from './sequences/updateCaseDeadlineSequence';
import { updateCaseNoteSequence } from './sequences/updateCaseNoteSequence';
import { updateCasePartyTypeSequence } from './sequences/updateCasePartyTypeSequence';
import { updateCaseValueByIndexSequence } from './sequences/updateCaseValueByIndexSequence';
import { updateCaseValueSequence } from './sequences/updateCaseValueSequence';
import { updateCaseWorkingCopyUserNoteSequence } from './sequences/updateCaseWorkingCopyUserNoteSequence';
import { updateCompleteFormValueSequence } from './sequences/updateCompleteFormValueSequence';
import { updateCourtIssuedDocketEntryFormValueSequence } from './sequences/updateCourtIssuedDocketEntryFormValueSequence';
import { updateCreateOrderModalFormValueSequence } from './sequences/updateCreateOrderModalFormValueSequence';
import { updateCurrentTabSequence } from './sequences/updateCurrentTabSequence';
import { updateDocketEntryFormValueSequence } from './sequences/updateDocketEntryFormValueSequence';
import { updateDocketEntryMetaDocumentFormValueSequence } from './sequences/updateDocketEntryMetaDocumentFormValueSequence';
import { updateDocketNumberSearchFormSequence } from './sequences/updateDocketNumberSearchFormSequence';
import { updateDocumentValueSequence } from './sequences/updateDocumentValueSequence';
import { updateFileDocumentWizardFormValueSequence } from './sequences/updateFileDocumentWizardFormValueSequence';
import { updateFormPartyTypeSequence } from './sequences/updateFormPartyTypeSequence';
import { updateFormValueSequence } from './sequences/updateFormValueSequence';
import { updateForwardFormValueSequence } from './sequences/updateForwardFormValueSequence';
import { updateJudgesCaseNoteOnCaseDetailSequence } from './sequences/updateJudgesCaseNoteOnCaseDetailSequence';
import { updateMessageValueInModalSequence } from './sequences/updateMessageValueInModalSequence';
import { updateMessageValueSequence } from './sequences/updateMessageValueSequence';
import { updateModalValueSequence } from './sequences/updateModalValueSequence';
import { updatePetitionDetailsSequence } from './sequences/updatePetitionDetailsSequence';
import { updatePetitionValueSequence } from './sequences/updatePetitionValueSequence';
import { updatePetitionerInformationFormSequence } from './sequences/updatePetitionerInformationFormSequence';
import { updateQcCompleteForTrialSequence } from './sequences/updateQcCompleteForTrialSequence';
import { updateScreenMetadataSequence } from './sequences/updateScreenMetadataSequence';
import { updateSearchTermSequence } from './sequences/updateSearchTermSequence';
import { updateSessionMetadataSequence } from './sequences/updateSessionMetadataSequence';
import { updateStartCaseFormValueSequence } from './sequences/updateStartCaseFormValueSequence';
import { updateStartCaseInternalPartyTypeSequence } from './sequences/updateStartCaseInternalPartyTypeSequence';
import { updateStateSequence } from './sequences/updateStateSequence';
import { updateTrialSessionFormDataSequence } from './sequences/updateTrialSessionFormDataSequence';
import { updateTrialSessionSequence } from './sequences/updateTrialSessionSequence';
import { updateUserCaseNoteOnWorkingCopySequence } from './sequences/updateUserCaseNoteOnWorkingCopySequence';
import { updateWorkingCopySessionNoteSequence } from './sequences/updateWorkingCopySessionNoteSequence';
import { uploadCourtIssuedDocumentSequence } from './sequences/uploadCourtIssuedDocumentSequence';
import { validateAddPractitionerSequence } from './sequences/caseAssociation/validateAddPractitionerSequence';
import { validateAddRespondentSequence } from './sequences/caseAssociation/validateAddRespondentSequence';
import { validateAddToTrialSessionSequence } from './sequences/validateAddToTrialSessionSequence';
import { validateBlockFromTrialSequence } from './sequences/validateBlockFromTrialSequence';
import { validateCaseAssociationRequestSequence } from './sequences/validateCaseAssociationRequestSequence';
import { validateCaseDeadlineSequence } from './sequences/validateCaseDeadlineSequence';
import { validateCaseDetailSequence } from './sequences/validateCaseDetailSequence';
import { validateCourtIssuedDocketEntrySequence } from './sequences/validateCourtIssuedDocketEntrySequence';
import { validateDocketEntrySequence } from './sequences/validateDocketEntrySequence';
import { validateDocketRecordSequence } from './sequences/validateDocketRecordSequence';
import { validateEditPractitionersSequence } from './sequences/caseAssociation/validateEditPractitionersSequence';
import { validateEditRespondentsSequence } from './sequences/caseAssociation/validateEditRespondentsSequence';
import { validateExternalDocumentInformationSequence } from './sequences/validateExternalDocumentInformationSequence';
import { validateForwardMessageSequence } from './sequences/validateForwardMessageSequence';
import { validateInitialWorkItemMessageInModalSequence } from './sequences/validateInitialWorkItemMessageInModalSequence';
import { validateInitialWorkItemMessageSequence } from './sequences/validateInitialWorkItemMessageSequence';
import { validateNoteSequence } from './sequences/validateNoteSequence';
import { validateOrderWithoutBodySequence } from './sequences/validateOrderWithoutBodySequence';
import { validatePetitionDetailsSequence } from './sequences/validatePetitionDetailsSequence';
import { validatePetitionFromPaperSequence } from './sequences/validatePetitionFromPaperSequence';
import { validatePetitionerInformationFormSequence } from './sequences/validatePetitionerInformationFormSequence';
import { validatePrimaryContactSequence } from './sequences/validatePrimaryContactSequence';
import { validatePrioritizeCaseSequence } from './sequences/validatePrioritizeCaseSequence';
import { validateRemoveFromTrialSessionSequence } from './sequences/validateRemoveFromTrialSessionSequence';
import { validateSecondaryContactSequence } from './sequences/validateSecondaryContactSequence';
import { validateSelectDocumentTypeSequence } from './sequences/validateSelectDocumentTypeSequence';
import { validateStartCaseWizardSequence } from './sequences/validateStartCaseWizardSequence';
import { validateTrialSessionPlanningSequence } from './sequences/validateTrialSessionPlanningSequence';
import { validateTrialSessionSequence } from './sequences/validateTrialSessionSequence';
import { validateUpdateCaseModalSequence } from './sequences/validateUpdateCaseModalSequence';
import { validateUploadCourtIssuedDocumentSequence } from './sequences/validateUploadCourtIssuedDocumentSequence';
import { validateUserContactSequence } from './sequences/validateUserContactSequence';

/**
 * Main Cerebral module
 */
export const presenter = {
  catch: [
    // ORDER MATTERS! Based on inheritance, the first match will be used
    [InvalidRequestError, setCurrentPageErrorSequence], // 418, other unknown 4xx series
    [ServerInvalidResponseError, setCurrentPageErrorSequence], // 501, 503, etc
    [UnauthorizedRequestError, unauthorizedErrorSequence], // 403
    [NotFoundError, notFoundErrorSequence], //404
    [UnidentifiedUserError, unidentifiedUserErrorSequence], //401
    [ActionError, setCurrentPageErrorSequence], // generic error handler
  ],
  providers: {},
  sequences: {
    addCaseToTrialSessionSequence,
    addSupportingDocumentToFormSequence,
    archiveDraftDocumentModalSequence,
    archiveDraftDocumentSequence,
    assignSelectedWorkItemsSequence,
    associatePractitionerWithCaseSequence,
    associateRespondentWithCaseSequence,
    autoSaveTrialSessionWorkingCopySequence,
    batchDownloadErrorSequence,
    batchDownloadReadySequence,
    batchDownloadTrialSessionSequence,
    blockCaseFromTrialSequence,
    cancelAddDraftDocumentSequence,
    cancelEditPrimaryContactSequence,
    cancelFileUploadSequence,
    cerebralBindSimpleSetStateSequence,
    chooseModalWizardStepSequence,
    chooseStartCaseWizardStepSequence,
    chooseWizardStepSequence,
    chooseWorkQueueSequence,
    clearAdvancedSearchFormSequence,
    clearAlertSequence,
    clearDocketNumberSearchFormSequence,
    clearDocumentSequence,
    clearExistingDocumentSequence,
    clearModalFormSequence,
    clearModalSequence,
    clearPdfPreviewUrlSequence,
    clearPreferredTrialCitySequence,
    clearWizardDataSequence,
    closeModalAndReturnToCaseDetailDraftDocumentsSequence,
    closeModalAndReturnToCaseDetailSequence,
    closeModalAndReturnToDashboardSequence,
    closeModalAndReturnToTrialSessionsSequence,
    completeDocketEntryQCAndSendMessageSequence,
    completeDocketEntryQCSequence,
    completeDocumentSelectSequence,
    completeDocumentSigningSequence,
    completeStartCaseWizardStepSequence,
    confirmStayLoggedInSequence,
    convertHtml2PdfAndOpenInNewTabSequence,
    convertHtml2PdfSequence,
    copyPrimaryContactSequence,
    countryTypeChangeSequence,
    countryTypeUserContactChangeSequence,
    createCaseDeadlineSequence,
    createCaseFromPaperAndServeToIrsSequence,
    createWorkItemSequence,
    deleteCaseDeadlineSequence,
    deleteCaseNoteSequence,
    deleteJudgesCaseNoteFromCaseDetailSequence,
    deleteTrialSessionSequence,
    deleteUserCaseNoteFromWorkingCopySequence,
    deleteWorkingCopySessionNoteSequence,
    dismissAlertSequence,
    dismissCreateMessageModalSequence,
    dismissModalSequence,
    editSelectedDocumentSequence,
    editSelectedSecondaryDocumentSequence,
    editUploadCourtIssuedDocumentSequence,
    fetchPendingItemsSequence,
    fetchUserNotificationsSequence,
    formCancelToggleCancelSequence,
    generateInternalCaseCaptionSequence,
    generatePdfFromScanSessionSequence,
    getBlockedCasesByTrialLocationSequence,
    getUsersInSectionSequence,
    goBackToStartCaseInternalSequence,
    gotoAddCourtIssuedDocketEntrySequence,
    gotoAddDocketEntrySequence,
    gotoAddTrialSessionSequence,
    gotoAdvancedSearchSequence,
    gotoAllCaseDeadlinesSequence,
    gotoBeforeStartCaseSequence,
    gotoBeforeYouFileDocumentSequence,
    gotoBlockedCasesReportSequence,
    gotoCaseDetailSequence,
    gotoCaseSearchNoMatchesSequence,
    gotoCompleteDocketEntrySequence,
    gotoCreateOrderSequence,
    gotoDashboardSequence,
    gotoDocumentDetailSequence,
    gotoEditCourtIssuedDocketEntrySequence,
    gotoEditDocketEntryMetaSequence,
    gotoEditDocketEntrySequence,
    gotoEditOrderSequence,
    gotoEditPetitionDetailsSequence,
    gotoEditPetitionerInformationSequence,
    gotoEditTrialSessionSequence,
    gotoEditUploadCourtIssuedDocumentSequence,
    gotoFileDocumentSequence,
    gotoIdleLogoutSequence,
    gotoLoginSequence,
    gotoMessagesSequence,
    gotoOrdersNeededSequence,
    gotoPdfPreviewSequence,
    gotoPendingReportSequence,
    gotoPrimaryContactEditSequence,
    gotoPrintPreviewSequence,
    gotoPrintableCaseConfirmationSequence,
    gotoPrintableDocketRecordSequence,
    gotoPrintablePendingReportForCaseSequence,
    gotoPrintablePendingReportSequence,
    gotoRequestAccessSequence,
    gotoReviewPetitionFromPaperSequence,
    gotoReviewSavedPetitionSequence,
    gotoSecondaryContactEditSequence,
    gotoSelectDocumentTypeSequence,
    gotoSignOrderSequence,
    gotoSignPDFDocumentSequence,
    gotoStartCaseWizardSequence,
    gotoStyleGuideSequence,
    gotoTrialSessionDetailSequence,
    gotoTrialSessionWorkingCopySequence,
    gotoTrialSessionsSequence,
    gotoUploadCourtIssuedDocumentSequence,
    gotoUserContactEditSequence,
    gotoViewAllDocumentsSequence,
    loadOriginalProposedStipulatedDecisionSequence,
    loadPdfSequence,
    loginWithCodeSequence,
    loginWithTokenSequence,
    navigateBackSequence,
    navigateToCaseDetailSequence,
    navigateToEditOrderSequence,
    navigateToPathSequence,
    navigateToPrintPreviewSequence,
    navigateToPrintableCaseConfirmationSequence,
    navigateToPrintableDocketRecordSequence,
    navigateToReviewPetitionFromPaperSequence,
    navigateToReviewSavedPetitionSequence,
    notFoundErrorSequence,
    noticeGenerationCompleteSequence,
    openAddEditCaseNoteModalSequence,
    openAddEditSessionNoteModalSequence,
    openAddEditUserCaseNoteModalFromDetailSequence,
    openAddEditUserCaseNoteModalFromListSequence,
    openAddPractitionerModalSequence,
    openAddRespondentModalSequence,
    openAddToTrialModalSequence,
    openBlockFromTrialModalSequence,
    openCancelDraftDocumentModalSequence,
    openCaseDifferenceModalSequence,
    openChangeScannerSourceModalSequence,
    openCleanModalSequence,
    openCompleteSelectDocumentTypeModalSequence,
    openConfirmDeleteBatchModalSequence,
    openConfirmDeletePDFModalSequence,
    openConfirmDeleteTrialSessionModalSequence,
    openConfirmEditModalSequence,
    openConfirmInitiateServiceModalSequence,
    openConfirmRemoveCaseDetailPendingItemModalSequence,
    openConfirmRescanBatchModalSequence,
    openConfirmServeToIrsModalSequence,
    openCreateCaseDeadlineModalSequence,
    openCreateMessageAlongsideDocketRecordQCModalSequence,
    openCreateMessageModalSequence,
    openCreateOrderChooseTypeModalSequence,
    openDeleteCaseDeadlineModalSequence,
    openDeleteCaseNoteConfirmModalSequence,
    openDeleteSessionNoteConfirmModalSequence,
    openDeleteUserCaseNoteConfirmModalSequence,
    openEditCaseDeadlineModalSequence,
    openEditPractitionersModalSequence,
    openEditRespondentsModalSequence,
    openPdfPreviewModalSequence,
    openPrioritizeCaseModalSequence,
    openRemoveFromTrialSessionModalSequence,
    openSelectDocumentWizardOverlaySequence,
    openSetCalendarModalSequence,
    openTrialSessionPlanningModalSequence,
    openUnblockFromTrialModalSequence,
    openUnprioritizeCaseModalSequence,
    openUpdateCaseModalSequence,
    printDocketRecordSequence,
    printTrialCalendarSequence,
    prioritizeCaseSequence,
    redirectToLoginSequence,
    refreshCaseSequence,
    removeBatchSequence,
    removeCaseDetailPendingItemSequence,
    removeCaseFromTrialSequence,
    removeScannedPdfSequence,
    removeSecondarySupportingDocumentSequence,
    removeSignatureFromOrderSequence,
    removeSupportingDocumentSequence,
    rescanBatchSequence,
    resetCaseMenuSequence,
    resetHeaderAccordionsSequence,
    reviewExternalDocumentInformationSequence,
    reviewRequestAccessInformationSequence,
    runTrialSessionPlanningReportSequence,
    saveCaseAndServeToIrsSequence,
    saveDocumentSigningSequence,
    saveIntermediateDocketEntrySequence,
    saveInternalCaseForLaterSequence,
    saveSavedCaseForLaterSequence,
    scannerShutdownSequence,
    scannerStartupSequence,
    sealCaseSequence,
    selectAssigneeSequence,
    selectDateRangeFromCalendarSequence,
    selectDocumentForPreviewSequence,
    selectDocumentForScanSequence,
    selectDocumentSequence,
    selectScannerSequence,
    selectSecondaryDocumentSequence,
    selectWorkItemSequence,
    serveCaseToIrsSequence,
    serveCourtIssuedDocumentSequence,
    setCanvasForPDFSigningSequence,
    setCaseDetailPageTabSequence,
    setCurrentPageIndexSequence,
    setDocumentDetailTabSequence,
    setDocumentForUploadSequence,
    setDocumentUploadModeSequence,
    setFieldOrderSequence,
    setFocusedWorkItemSequence,
    setIdleStatusIdleSequence,
    setIrsNoticeFalseSequence,
    setModalDialogNameSequence,
    setPDFPageForSigningSequence,
    setPDFSignatureDataSequence,
    setPageSequence,
    setPdfPreviewUrlSequence,
    setScannerSourceSequence,
    setSelectedBatchIndexSequence,
    setSelectedCasesForConsolidatedCaseDocumentSubmissionSequence,
    setTrialSessionCalendarSequence,
    setWorkItemActionSequence,
    setWorkQueueIsInternalSequence,
    showDocketRecordDetailModalSequence,
    showMoreResultsSequence,
    signOutSequence,
    startScanSequence,
    submitAddConsolidatedCaseSequence,
    submitCaseAdvancedSearchSequence,
    submitCaseAssociationRequestSequence,
    submitCaseDocketNumberSearchSequence,
    submitCaseSearchForConsolidationSequence,
    submitCaseSearchSequence,
    submitCompleteSequence,
    submitCourtIssuedDocketEntrySequence,
    submitCourtIssuedOrderSequence,
    submitCreateOrderModalSequence,
    submitDocketEntrySequence,
    submitEditDocketEntryMetaSequence,
    submitEditPractitionersModalSequence,
    submitEditPrimaryContactSequence,
    submitEditRespondentsModalSequence,
    submitEditSecondaryContactSequence,
    submitExternalDocumentSequence,
    submitFilePetitionSequence,
    submitForwardSequence,
    submitLoginSequence,
    submitRemoveConsolidatedCasesSequence,
    submitTrialSessionSequence,
    submitUpdateCaseModalSequence,
    submitUpdateUserContactInformationSequence,
    toggleBetaBarSequence,
    toggleCaseDifferenceSequence,
    toggleMenuSequence,
    toggleMobileDocketSortSequence,
    toggleMobileMenuSequence,
    togglePaymentDetailsSequence,
    toggleReportsMenuSequence,
    toggleUsaBannerDetailsSequence,
    toggleWorkingCopySortSequence,
    unauthorizedErrorSequence,
    unblockCaseFromTrialSequence,
    unidentifiedUserErrorSequence,
    unprioritizeCaseSequence,
    unsetWorkQueueIsInternalSequence,
    updateAdvancedSearchFormValueSequence,
    updateBatchDownloadProgressSequence,
    updateCaseAssociationFormValueSequence,
    updateCaseDeadlineSequence,
    updateCaseNoteSequence,
    updateCasePartyTypeSequence,
    updateCaseValueByIndexSequence,
    updateCaseValueSequence,
    updateCaseWorkingCopyUserNoteSequence,
    updateCompleteFormValueSequence,
    updateCourtIssuedDocketEntryFormValueSequence,
    updateCreateOrderModalFormValueSequence,
    updateCurrentTabSequence,
    updateDocketEntryFormValueSequence,
    updateDocketEntryMetaDocumentFormValueSequence,
    updateDocketNumberSearchFormSequence,
    updateDocumentValueSequence,
    updateFileDocumentWizardFormValueSequence,
    updateFormPartyTypeSequence,
    updateFormValueSequence,
    updateForwardFormValueSequence,
    updateJudgesCaseNoteOnCaseDetailSequence,
    updateMessageValueInModalSequence,
    updateMessageValueSequence,
    updateModalValueSequence,
    updatePetitionDetailsSequence,
    updatePetitionValueSequence,
    updatePetitionerInformationFormSequence,
    updateQcCompleteForTrialSequence,
    updateScreenMetadataSequence,
    updateSearchTermSequence,
    updateSessionMetadataSequence,
    updateStartCaseFormValueSequence,
    updateStartCaseInternalPartyTypeSequence,
    updateStateSequence,
    updateTrialSessionFormDataSequence,
    updateTrialSessionSequence,
    updateUserCaseNoteOnWorkingCopySequence,
    updateWorkingCopySessionNoteSequence,
    uploadCourtIssuedDocumentSequence,
    validateAddPractitionerSequence,
    validateAddRespondentSequence,
    validateAddToTrialSessionSequence,
    validateBlockFromTrialSequence,
    validateCaseAssociationRequestSequence,
    validateCaseDeadlineSequence,
    validateCaseDetailSequence,
    validateCourtIssuedDocketEntrySequence,
    validateDocketEntrySequence,
    validateDocketRecordSequence,
    validateEditPractitionersSequence,
    validateEditRespondentsSequence,
    validateExternalDocumentInformationSequence,
    validateForwardMessageSequence,
    validateInitialWorkItemMessageInModalSequence,
    validateInitialWorkItemMessageSequence,
    validateNoteSequence,
    validateOrderWithoutBodySequence,
    validatePetitionDetailsSequence,
    validatePetitionFromPaperSequence,
    validatePetitionerInformationFormSequence,
    validatePrimaryContactSequence,
    validatePrioritizeCaseSequence,
    validateRemoveFromTrialSessionSequence,
    validateSecondaryContactSequence,
    validateSelectDocumentTypeSequence,
    validateStartCaseWizardSequence,
    validateTrialSessionPlanningSequence,
    validateTrialSessionSequence,
    validateUpdateCaseModalSequence,
    validateUploadCourtIssuedDocumentSequence,
    validateUserContactSequence,
  },
  state,
};
