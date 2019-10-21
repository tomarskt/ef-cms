const { Case } = require('../entities/cases/Case');
const { UnauthorizedError } = require('../../errors/errors');
const {
  isAuthorized,
  PRIORITIZE_CASE,
} = require('../../authorization/authorizationClientService');

/**
 * used for removing the high priority from a case
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.caseId the caseId to unprioritize
 * @returns {object} the case data
 */
exports.unprioritizeCaseInteractor = async ({ applicationContext, caseId }) => {
  const authorizedUser = applicationContext.getCurrentUser();

  if (!isAuthorized(authorizedUser, PRIORITIZE_CASE)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const caseToUpdate = await applicationContext
    .getPersistenceGateway()
    .getCaseByCaseId({
      applicationContext,
      caseId,
    });

  const caseEntity = new Case(caseToUpdate, { applicationContext });

  caseEntity.unsetAsHighPriority();

  return await applicationContext.getPersistenceGateway().updateCase({
    applicationContext,
    caseToUpdate: caseEntity.validate().toRawObject(),
  });
};