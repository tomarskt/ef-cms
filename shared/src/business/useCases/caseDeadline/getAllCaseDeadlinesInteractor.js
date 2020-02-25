const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../../authorization/authorizationClientService');
const { Case } = require('../../entities/cases/Case');
const { CaseDeadline } = require('../../entities/CaseDeadline');
const { UnauthorizedError } = require('../../../errors/errors');

/**
 * getAllCaseDeadlinesInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @returns {Promise} the promise of the getCaseDeadlines call
 */
exports.getAllCaseDeadlinesInteractor = async ({ applicationContext }) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, ROLE_PERMISSIONS.CASE_DEADLINE)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const allCaseDeadlines = await applicationContext
    .getPersistenceGateway()
    .getAllCaseDeadlines({
      applicationContext,
    });

  const rawCaseDeadlines = allCaseDeadlines.map(caseDeadline => ({
    ...caseDeadline,
    caseTitle: Case.getCaseCaptionNames(caseDeadline.caseTitle),
  }));

  return CaseDeadline.validateRawCollection(rawCaseDeadlines, {
    applicationContext,
  });
};
