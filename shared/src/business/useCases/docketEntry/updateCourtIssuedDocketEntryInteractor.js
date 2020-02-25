const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../../authorization/authorizationClientService');
const { Case } = require('../../entities/cases/Case');
const { DocketRecord } = require('../../entities/DocketRecord');
const { Document } = require('../../entities/Document');
const { NotFoundError, UnauthorizedError } = require('../../../errors/errors');
const { omit } = require('lodash');

/**
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.documentMeta document details to go on the record
 * @returns {object} the updated case after the documents are added
 */
exports.updateCourtIssuedDocketEntryInteractor = async ({
  applicationContext,
  documentMeta,
}) => {
  const authorizedUser = applicationContext.getCurrentUser();

  const hasPermission =
    isAuthorized(authorizedUser, ROLE_PERMISSIONS.DOCKET_ENTRY) ||
    isAuthorized(authorizedUser, ROLE_PERMISSIONS.CREATE_ORDER_DOCKET_ENTRY);

  if (!hasPermission) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { caseId, documentId } = documentMeta;

  const caseToUpdate = await applicationContext
    .getPersistenceGateway()
    .getCaseByCaseId({
      applicationContext,
      caseId,
    });

  const caseEntity = new Case(caseToUpdate, { applicationContext });

  const currentDocument = caseEntity.getDocumentById({
    documentId,
  });

  if (!currentDocument) {
    throw new NotFoundError('Document not found');
  }

  const user = await applicationContext
    .getPersistenceGateway()
    .getUserById({ applicationContext, userId: authorizedUser.userId });

  let secondaryDate;
  if (documentMeta.eventCode === Document.TRANSCRIPT_EVENT_CODE) {
    secondaryDate = documentMeta.date;
  }

  const documentEntity = new Document(
    {
      ...currentDocument,
      attachments: documentMeta.attachments,
      documentTitle: documentMeta.generatedDocumentTitle,
      documentType: documentMeta.documentType,
      eventCode: documentMeta.eventCode,
      freeText: documentMeta.freeText,
      scenario: documentMeta.scenario,
      secondaryDate,
      serviceStamp: documentMeta.serviceStamp,
      userId: user.userId,
    },
    { applicationContext },
  );

  const docketRecordEntry = new DocketRecord(
    {
      description: documentMeta.generatedDocumentTitle,
      documentId: documentEntity.documentId,
      editState: JSON.stringify(documentMeta),
      eventCode: documentEntity.eventCode,
      filingDate: documentEntity.receivedAt,
    },
    { applicationContext },
  );

  caseEntity.updateDocketRecordEntry(omit(docketRecordEntry, 'index'));
  caseEntity.updateDocument(documentEntity);

  const workItem = documentEntity.getQCWorkItem();

  Object.assign(workItem, {
    document: {
      ...documentEntity.toRawObject(),
      createdAt: documentEntity.createdAt,
    },
  });

  documentEntity.addWorkItem(workItem);

  const saveItems = [
    applicationContext.getPersistenceGateway().createUserInboxRecord({
      applicationContext,
      workItem: workItem.validate().toRawObject(),
    }),
    applicationContext.getPersistenceGateway().createSectionInboxRecord({
      applicationContext,
      workItem: workItem.validate().toRawObject(),
    }),
    applicationContext.getPersistenceGateway().updateCase({
      applicationContext,
      caseToUpdate: caseEntity.validate().toRawObject(),
    }),
  ];

  await Promise.all(saveItems);

  return caseEntity.toRawObject();
};
