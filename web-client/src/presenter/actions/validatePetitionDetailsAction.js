import { state } from 'cerebral';

/**
 * validates the edit petition details inputs
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context needed for getting the use case
 * @param {object} providers.path the cerebral path which contains the next path in the sequence (path of success or error)
 * @param {object} providers.get the cerebral get function used for getting state.form
 * @returns {object} the next path based on if validation was successful or error
 */
export const validatePetitionDetailsAction = ({
  applicationContext,
  get,
  path,
}) => {
  const caseDetail = get(state.caseDetail);
  const form = get(state.form);

  let petitionPaymentWaivedDate;
  if (
    applicationContext
      .getUtilities()
      .isValidDateString(
        `${form.paymentDateWaivedMonth}-${form.paymentDateWaivedDay}-${form.paymentDateWaivedYear}`,
      )
  ) {
    petitionPaymentWaivedDate = applicationContext
      .getUtilities()
      .createISODateStringFromObject({
        day: form.paymentDateWaivedDay,
        month: form.paymentDateWaivedMonth,
        year: form.paymentDateWaivedYear,
      });
  }

  let petitionPaymentDate;
  if (
    applicationContext
      .getUtilities()
      .isValidDateString(
        `${form.paymentDateMonth}-${form.paymentDateDay}-${form.paymentDateYear}`,
      )
  ) {
    petitionPaymentDate = applicationContext
      .getUtilities()
      .createISODateStringFromObject({
        day: form.paymentDateDay,
        month: form.paymentDateMonth,
        year: form.paymentDateYear,
      });
  }

  let irsNoticeDate;
  if (
    applicationContext
      .getUtilities()
      .isValidDateString(`${form.irsMonth}-${form.irsDay}-${form.irsYear}`)
  ) {
    irsNoticeDate = applicationContext
      .getUtilities()
      .createISODateStringFromObject({
        day: form.irsDay,
        month: form.irsMonth,
        year: form.irsYear,
      });
  }

  const errors = applicationContext.getUseCases().validateCaseDetailInteractor({
    applicationContext,
    caseDetail: {
      ...caseDetail,
      ...form,
      irsNoticeDate,
      petitionPaymentDate,
      petitionPaymentWaivedDate,
      preferredTrialCity: form.preferredTrialCity
        ? form.preferredTrialCity
        : null,
    },
  });

  if (!errors) {
    return path.success();
  } else {
    return path.error({
      alertError: {
        messages: Object.values(errors),
        title: 'Errors were found. Please correct your form and resubmit.',
      },
      errors,
    });
  }
};
