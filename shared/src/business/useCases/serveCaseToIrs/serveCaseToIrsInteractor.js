const sanitize = require('sanitize-filename');
const {
  aggregatePartiesForService,
} = require('../../utilities/aggregatePartiesForService');
const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../../authorization/authorizationClientService');
const { createISODateString } = require('../../utilities/DateHandler');
const { Document } = require('../../entities/Document');
const { PDFDocument } = require('pdf-lib');
const { PETITIONS_SECTION } = require('../../entities/WorkQueue');
const { UnauthorizedError } = require('../../../errors/errors');

exports.addDocketEntryForPaymentStatus = ({
  applicationContext,
  caseEntity,
}) => {
  const { Case, DocketRecord } = applicationContext.getEntityConstructors();

  if (caseEntity.petitionPaymentStatus === Case.PAYMENT_STATUS.PAID) {
    caseEntity.addDocketRecord(
      new DocketRecord(
        {
          description: 'Filing Fee Paid',
          eventCode: 'FEE',
          filingDate: caseEntity.petitionPaymentDate,
        },
        { applicationContext },
      ),
    );
  } else if (caseEntity.petitionPaymentStatus === Case.PAYMENT_STATUS.WAIVED) {
    caseEntity.addDocketRecord(
      new DocketRecord(
        {
          description: 'Filing Fee Waived',
          eventCode: 'FEEW',
          filingDate: caseEntity.petitionPaymentWaivedDate,
        },
        { applicationContext },
      ),
    );
  }
};

exports.uploadZipOfDocuments = async ({ applicationContext, caseEntity }) => {
  const s3Ids = caseEntity.documents
    .filter(document => !caseEntity.isDocumentDraft(document.documentId))
    .map(document => document.documentId);
  const fileNames = caseEntity.documents.map(
    document => `${document.documentType}.pdf`,
  );
  let zipName = sanitize(`${caseEntity.docketNumber}`);

  if (caseEntity.contactPrimary && caseEntity.contactPrimary.name) {
    zipName += sanitize(
      `_${caseEntity.contactPrimary.name.replace(/\s/g, '_')}`,
    );
  }
  zipName += '.zip';

  await applicationContext.getPersistenceGateway().zipDocuments({
    applicationContext,
    fileNames,
    s3Ids,
    zipName,
  });

  return { fileNames, s3Ids, zipName };
};

exports.deleteStinIfAvailable = async ({ applicationContext, caseEntity }) => {
  const stinDocument = caseEntity.documents.find(
    document =>
      document.documentType ===
      Document.INITIAL_DOCUMENT_TYPES.stin.documentType,
  );

  if (stinDocument) {
    await applicationContext.getPersistenceGateway().deleteDocument({
      applicationContext,
      key: stinDocument.documentId,
    });

    return stinDocument.documentId;
  }
};

/**
 * serveCaseToIrsInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.caseId the id of the case
 */
exports.serveCaseToIrsInteractor = async ({ applicationContext, caseId }) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, ROLE_PERMISSIONS.UPDATE_CASE)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const caseToBatch = await applicationContext
    .getPersistenceGateway()
    .getCaseByCaseId({
      applicationContext,
      caseId: caseId,
    });

  const { Case } = applicationContext.getEntityConstructors();
  const caseEntity = new Case(caseToBatch, { applicationContext });

  const servedParties = aggregatePartiesForService(caseEntity);

  Object.keys(Document.INITIAL_DOCUMENT_TYPES).forEach(
    initialDocumentTypeKey => {
      const initialDocumentType =
        Document.INITIAL_DOCUMENT_TYPES[initialDocumentTypeKey];

      const initialDocument = caseEntity.documents.find(
        document => document.documentType === initialDocumentType.documentType,
      );

      if (initialDocument) {
        initialDocument.setAsServed(servedParties.all);
        caseEntity.updateDocument(initialDocument);
      }
    },
  );

  exports.addDocketEntryForPaymentStatus({ applicationContext, caseEntity });

  caseEntity
    .updateCaseCaptionDocketRecord({ applicationContext })
    .updateDocketNumberRecord({ applicationContext })
    .validate();

  await exports.uploadZipOfDocuments({
    applicationContext,
    caseEntity,
  });

  //This functionality will probably change soon
  //  deletedStinDocumentId = await exports.deleteStinIfAvailable({
  //   applicationContext,
  //   caseEntity,
  // });
  // caseEntity.documents = caseEntity.documents.filter(
  //   item => item.documentId !== deletedStinDocumentId,
  // );

  caseEntity.markAsSentToIRS(createISODateString());

  const petitionDocument = caseEntity.documents.find(
    document =>
      document.documentType ===
      Document.INITIAL_DOCUMENT_TYPES.petition.documentType,
  );

  const initializeCaseWorkItem = petitionDocument.workItems.find(
    workItem => workItem.isInitializeCase,
  );

  await applicationContext.getPersistenceGateway().deleteWorkItemFromInbox({
    applicationContext,
    workItem: initializeCaseWorkItem.validate().toRawObject(),
  });

  initializeCaseWorkItem.setAsCompleted({
    message: 'Served to IRS',
    user: user,
  });

  await applicationContext.getPersistenceGateway().putWorkItemInUsersOutbox({
    applicationContext,
    section: PETITIONS_SECTION,
    userId: user.userId,
    workItem: initializeCaseWorkItem,
  });

  await applicationContext.getPersistenceGateway().updateWorkItem({
    applicationContext,
    workItemToUpdate: initializeCaseWorkItem,
  });

  await applicationContext.getPersistenceGateway().updateCase({
    applicationContext,
    caseToUpdate: caseEntity.validate().toRawObject(),
  });

  for (const doc of caseEntity.documents) {
    await applicationContext.getUseCases().addCoversheetInteractor({
      applicationContext,
      caseId: caseEntity.caseId,
      documentId: doc.documentId,
    });
  }

  const results = await applicationContext
    .getUseCaseHelpers()
    .generateCaseConfirmationPdf({
      applicationContext,
      caseEntity,
    });

  if (caseEntity.isPaper) {
    const pdfData = results;
    const noticeDoc = await PDFDocument.load(pdfData);
    const newPdfDoc = await PDFDocument.create();

    const servedParties = aggregatePartiesForService(caseEntity);

    await applicationContext
      .getUseCaseHelpers()
      .appendPaperServiceAddressPageToPdf({
        applicationContext,
        caseEntity,
        newPdfDoc,
        noticeDoc,
        servedParties,
      });

    const paperServicePdfData = await newPdfDoc.save();
    const paperServicePdfBuffer = Buffer.from(paperServicePdfData);

    return paperServicePdfBuffer;
  }
};
