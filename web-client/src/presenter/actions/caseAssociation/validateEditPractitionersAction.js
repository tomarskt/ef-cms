import { isEmpty } from 'lodash';
import { state } from 'cerebral';

/**
 * validates the practitioners on the modal form for the edit counsel modal
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context needed for getting the use case
 * @param {object} providers.get the cerebral get function used for getting state.modal
 * @param {object} providers.path the cerebral path which contains the next path in the sequence (path of success or error)
 * @returns {object} the next path based on if validation was successful or error
 */
export const validateEditPractitionersAction = ({
  applicationContext,
  get,
  path,
}) => {
  const { practitioners } = get(state.modal);
  const { practitioners: oldPractitioners } = get(state.caseDetail);

  const serviceIndicatorError = {
    serviceIndicator:
      'You cannot change from paper to electronic service. Select a valid service preference.',
  };

  const errors = [];
  practitioners.forEach(practitioner => {
    let error = applicationContext
      .getUseCases()
      .validateEditPractitionerInteractor({
        applicationContext,
        practitioner,
      });

    const oldPractitioner = oldPractitioners.find(
      foundPractitioner => foundPractitioner.userId === practitioner.userId,
    );
    if (
      ['Paper', 'None'].includes(oldPractitioner.serviceIndicator) &&
      practitioner.serviceIndicator === 'Electronic'
    ) {
      error = {
        ...error,
        ...serviceIndicatorError,
      };
    }

    errors.push(error);
  });

  if (errors.filter(item => !isEmpty(item)).length === 0) {
    return path.success();
  } else {
    return path.error({
      alertError: {
        title: 'Errors were found. Please correct your form and resubmit.',
      },
      errors: { practitioners: errors },
    });
  }
};
