import { state } from 'cerebral';

/**
 * validates a trial session's eligibility to be calendared or not
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {Function} providers.get the cerebral get helper function
 * @param {object} providers.path the next object in the path
 * @returns {Promise<object>} the next path based on if creation was successful or error
 */
export const canSetTrialSessionToCalendarAction = async ({
  applicationContext,
  get,
  path,
}) => {
  const trialSession = get(state.trialSession);
  const canSetAsCalendared = applicationContext
    .getUseCases()
    .canSetTrialSessionAsCalendaredInteractor({
      applicationContext,
      trialSession,
    });

  if (canSetAsCalendared) {
    return path.yes();
  }

  const { TrialSession } = applicationContext.getEntityConstructors();
  const trialSessionEntity = new TrialSession(trialSession, {
    applicationContext,
  });
  const emptyFields = trialSessionEntity.getEmptyFields();
  const addressProperties = ['address1', 'city', 'state', 'postalCode'];
  const missingAddressProperties = addressProperties.filter(property =>
    emptyFields.includes(property),
  );
  const missingFieldsForWarningMessage = [];

  if (emptyFields.includes('judge')) {
    missingFieldsForWarningMessage.push('a judge');
  }

  if (missingAddressProperties.length > 0) {
    missingFieldsForWarningMessage.unshift('an address');
  }

  return path.no({
    alertWarning: {
      message: `Provide ${missingFieldsForWarningMessage.join(
        ' and ',
      )} to set this trial session.`,
    },
  });
};
