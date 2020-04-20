const { get } = require('./requests');

/**
 * getCaseInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.docketNumber the docket number to get
 * @returns {Promise<*>} the promise of the api call
 */
exports.getCaseInteractor = ({ applicationContext, docketNumber }) => {
  let endpointBase = 'cases';

  const { role } = applicationContext.getCurrentUser();
  const { USER_ROLES } = applicationContext.getConstants();

  if (role === USER_ROLES.irsSuperuser) {
    endpointBase = 'irs-cases';
  }

  return get({
    applicationContext,
    endpoint: `/${endpointBase}/${docketNumber}`,
  });
};
