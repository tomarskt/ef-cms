const { Case } = require('../entities/cases/Case');
const { Document } = require('../entities/Document');

/**
 * saveSignedDocumentInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.caseId the id of the case on which to save the document
 * @param {string} providers.originalDocumentId the id of the original (unsigned) document
 * @param {string} providers.signedDocumentId the id of the signed document
 * @param {string} providers.nameForSigning the name on the signature of the signed document
 * @returns {object} the updated case
 */
exports.saveSignedDocumentInteractor = async ({
  applicationContext,
  caseId,
  nameForSigning,
  originalDocumentId,
  signedDocumentId,
}) => {
  const user = applicationContext.getCurrentUser();

  const caseRecord = await applicationContext
    .getPersistenceGateway()
    .getCaseByCaseId({
      applicationContext,
      caseId,
    });

  const caseEntity = new Case(caseRecord, { applicationContext });

  const originalDocumentEntity = caseEntity.documents.find(
    document => document.documentId === originalDocumentId,
  );

  let signedDocumentEntity;
  if (originalDocumentEntity.documentType === 'Proposed Stipulated Decision') {
    signedDocumentEntity = new Document(
      {
        createdAt: applicationContext.getUtilities().createISODateString(),
        documentId: signedDocumentId,
        documentTitle:
          Document.SIGNED_DOCUMENT_TYPES.signedStipulatedDecision.documentType,
        documentType:
          Document.SIGNED_DOCUMENT_TYPES.signedStipulatedDecision.documentType,
        eventCode:
          Document.SIGNED_DOCUMENT_TYPES.signedStipulatedDecision.eventCode,
        filedBy: originalDocumentEntity.filedBy,
        isPaper: false,
        processingStatus: 'complete',
        userId: user.userId,
      },
      { applicationContext },
    );

    signedDocumentEntity.setSigned(user.userId, nameForSigning);

    caseEntity.addDocumentWithoutDocketRecord(signedDocumentEntity);
  } else {
    signedDocumentEntity = new Document(
      {
        ...originalDocumentEntity,
        createdAt: applicationContext.getUtilities().createISODateString(),
        documentId: signedDocumentId,
        processingStatus: 'complete',
        userId: user.userId,
      },
      { applicationContext },
    );

    signedDocumentEntity.setSigned(user.userId, nameForSigning);
    caseEntity.updateDocument(signedDocumentEntity);
  }

  await applicationContext.getPersistenceGateway().updateCase({
    applicationContext,
    caseToUpdate: caseEntity.validate().toRawObject(),
  });

  return caseEntity;
};
