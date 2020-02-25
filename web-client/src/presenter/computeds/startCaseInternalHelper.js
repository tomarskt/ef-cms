import { showContactsHelper } from '../computeds/showContactsHelper';
import { state } from 'cerebral';

/**
 * gets the start case internal form view options based on partyType
 *
 * @param {Function} get the cerebral get function
 * @param {object} applicationContext the application context
 * @returns {object} object containing the view settings
 */
export const startCaseInternalHelper = (get, applicationContext) => {
  const { PARTY_TYPES, PAYMENT_STATUS } = applicationContext.getConstants();
  const partyType = get(state.form.partyType);
  const petitionPaymentStatus = get(state.form.petitionPaymentStatus);
  const showContacts = showContactsHelper(partyType, PARTY_TYPES);

  let showOwnershipDisclosureStatement = false;

  if (
    [
      PARTY_TYPES.partnershipAsTaxMattersPartner,
      PARTY_TYPES.partnershipOtherThanTaxMatters,
      PARTY_TYPES.partnershipBBA,
      PARTY_TYPES.corporation,
    ].includes(partyType)
  ) {
    showOwnershipDisclosureStatement = true;
  }

  const shouldShowIrsNoticeDate = get(state.form.hasVerifiedIrsNotice) === true;
  const showOrderForRequestedTrialLocation = !get(
    state.form.preferredTrialCity,
  );

  return {
    partyTypes: PARTY_TYPES,
    shouldShowIrsNoticeDate,
    showOrderForFilingFee: petitionPaymentStatus === PAYMENT_STATUS.UNPAID,
    showOrderForRequestedTrialLocation,
    showOwnershipDisclosureStatement,
    showPrimaryContact: showContacts.contactPrimary,
    showSecondaryContact: showContacts.contactSecondary,
  };
};
