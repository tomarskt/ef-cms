const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../../authorization/authorizationClientService');
const { Case } = require('../../entities/cases/Case');
const { NotFoundError, UnauthorizedError } = require('../../../errors/errors');

/**
 * addConsolidatedCaseInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.caseId the id of the case to consolidate
 * @param {object} providers.caseIdToConsolidateWith the id of the case with which to consolidate
 * @returns {object} the updated case data
 */
exports.addConsolidatedCaseInteractor = async ({
  applicationContext,
  caseId,
  caseIdToConsolidateWith,
}) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, ROLE_PERMISSIONS.CONSOLIDATE_CASES)) {
    throw new UnauthorizedError('Unauthorized for case consolidation');
  }

  const caseToUpdate = await applicationContext
    .getPersistenceGateway()
    .getCaseByCaseId({ applicationContext, caseId });

  if (!caseToUpdate) {
    throw new NotFoundError(`Case ${caseId} was not found.`);
  }

  const caseToConsolidateWith = await applicationContext
    .getPersistenceGateway()
    .getCaseByCaseId({ applicationContext, caseId: caseIdToConsolidateWith });

  if (!caseToConsolidateWith) {
    throw new NotFoundError(
      `Case to consolidate with (${caseIdToConsolidateWith}) was not found.`,
    );
  }

  let allCasesToConsolidate = [];

  if (
    caseToUpdate.leadCaseId &&
    caseToUpdate.leadCaseId !== caseToConsolidateWith.leadCaseId
  ) {
    allCasesToConsolidate = await applicationContext
      .getPersistenceGateway()
      .getCasesByLeadCaseId({
        applicationContext,
        leadCaseId: caseToUpdate.leadCaseId,
      });
  } else {
    allCasesToConsolidate = [caseToUpdate];
  }

  if (caseToConsolidateWith.leadCaseId) {
    const casesConsolidatedWithLeadCase = await applicationContext
      .getPersistenceGateway()
      .getCasesByLeadCaseId({
        applicationContext,
        leadCaseId: caseToConsolidateWith.leadCaseId,
      });
    allCasesToConsolidate.push(...casesConsolidatedWithLeadCase);
  } else {
    allCasesToConsolidate.push(caseToConsolidateWith);
  }

  const newLeadCase = Case.findLeadCaseForCases(allCasesToConsolidate);

  const casesToUpdate = allCasesToConsolidate.filter(filterCaseToUpdate => {
    return filterCaseToUpdate.leadCaseId !== newLeadCase.caseId;
  });

  const updateCasePromises = [];
  casesToUpdate.forEach(caseToUpdate => {
    const caseEntity = new Case(caseToUpdate, { applicationContext });
    caseEntity.setLeadCase(newLeadCase.caseId);

    updateCasePromises.push(
      applicationContext.getPersistenceGateway().updateCase({
        applicationContext,
        caseToUpdate: caseEntity.validate().toRawObject(),
      }),
    );
  });

  await Promise.all(updateCasePromises);
};
