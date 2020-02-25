const {
  documentMeetsAgeRequirements,
} = require('../utilities/getFormattedCaseDetail');
const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../authorization/authorizationClientService');
const { Case } = require('../entities/cases/Case');
const { UnauthorizedError } = require('../../errors/errors');
const { User } = require('../entities/User');

/**
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @returns {Array<string>} the filing type options based on user role
 */
exports.getDownloadPolicyUrlInteractor = async ({
  applicationContext,
  caseId,
  documentId,
}) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, ROLE_PERMISSIONS.VIEW_DOCUMENTS)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const isInternalUser = User.isInternalUser(user && user.role);

  if (!isInternalUser) {
    //verify that the user has access to this document
    const userAssociatedWithCase = await applicationContext
      .getPersistenceGateway()
      .verifyCaseForUser({ applicationContext, caseId, userId: user.userId });

    if (!userAssociatedWithCase) {
      throw new UnauthorizedError('Unauthorized');
    }

    //verify that the document is available
    const caseData = await applicationContext
      .getPersistenceGateway()
      .getCaseByCaseId({
        applicationContext,
        caseId,
      });

    const caseEntity = new Case(caseData, { applicationContext });

    if (documentId.includes('.pdf')) {
      if (caseEntity.getCaseConfirmationGeneratedPdfFileName() !== documentId) {
        throw new UnauthorizedError('Unauthorized');
      }
    } else {
      const selectedDocument = caseData.documents.find(
        document => document.documentId === documentId,
      );
      const documentIsAvailable = documentMeetsAgeRequirements(
        selectedDocument,
      );

      if (!documentIsAvailable) {
        throw new UnauthorizedError(
          'Unauthorized to view document at this time',
        );
      }
    }
  }

  return applicationContext.getPersistenceGateway().getDownloadPolicyUrl({
    applicationContext,
    documentId,
  });
};
