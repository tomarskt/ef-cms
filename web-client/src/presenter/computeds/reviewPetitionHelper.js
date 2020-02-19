import { state } from 'cerebral';

export const reviewPetitionHelper = (get, applicationContext) => {
  let irsNoticeDateFormatted;
  let data;

  const {
    dateReceived,
    documents,
    hasVerifiedIrsNotice,
    irsNoticeDate,
    mailingDate,
    petitionPaymentStatus,
  } = get(state.form);

  data = get(state.form);

  const { PAYMENT_STATUS } = applicationContext.getConstants();

  const mailingDateFormatted = applicationContext
    .getUtilities()
    .formatDateString(mailingDate, 'MMDDYYYY');

  const receivedAtFormatted = applicationContext
    .getUtilities()
    .formatDateString(dateReceived, 'MMDDYYYY');

  const hasIrsNoticeFormatted = hasVerifiedIrsNotice ? 'Yes' : 'No';

  const shouldShowIrsNoticeDate = hasVerifiedIrsNotice === true;

  const petitionPaymentStatusFormatted =
    petitionPaymentStatus === PAYMENT_STATUS.PAID ? 'Paid' : 'Not paid';

  const documentsByType = documents.reduce((acc, document) => {
    acc[document.documentType] = document;
    return acc;
  }, {});

  if (shouldShowIrsNoticeDate) {
    irsNoticeDateFormatted = applicationContext
      .getUtilities()
      .formatDateString(irsNoticeDate, 'MMDDYYYY');
  }

  return {
    data,
    hasIrsNoticeFormatted,
    irsNoticeDateFormatted,
    mailingDateFormatted,
    petitionPaymentStatusFormatted,
    receivedAtFormatted,
    shouldShowIrsNoticeDate,
  };
};
