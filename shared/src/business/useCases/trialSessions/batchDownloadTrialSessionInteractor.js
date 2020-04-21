const sanitize = require('sanitize-filename');
const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../../authorization/authorizationClientService');
const { Case } = require('../../entities/cases/Case');
const { formatDateString } = require('../../../business/utilities/DateHandler');
const { padStart } = require('lodash');
const { UnauthorizedError } = require('../../../errors/errors');

/**
 * batchDownloadTrialSessionInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.trialSessionId the id of the trial session
 * @returns {Promise} the promise of the batchDownloadTrialSessionInteractor call
 */
const batchDownloadTrialSessionInteractor = async ({
  applicationContext,
  trialSessionId,
}) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, ROLE_PERMISSIONS.BATCH_DOWNLOAD_TRIAL_SESSION)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const trialSessionDetails = await applicationContext
    .getPersistenceGateway()
    .getTrialSessionById({
      applicationContext,
      trialSessionId,
    });

  let sessionCases = await applicationContext
    .getPersistenceGateway()
    .getCalendaredCasesForTrialSession({
      applicationContext,
      trialSessionId,
    });

  let s3Ids = [];
  let fileNames = [];
  let extraFiles = [];
  let extraFileNames = [];

  const trialDate = formatDateString(
    trialSessionDetails.startDate,
    'MMMM_D_YYYY',
  );
  const { trialLocation } = trialSessionDetails;
  let zipName = sanitize(`${trialDate}-${trialLocation}.zip`)
    .replace(/\s/g, '_')
    .replace(/,/g, ''); // TODO - create a sanitize utility for s3 ids // TODO - should we make these unique somehow?

  sessionCases = sessionCases
    .filter(caseToFilter => caseToFilter.status !== Case.STATUS_TYPES.closed)
    .map(caseToBatch => {
      const caseTitle = Case.getCaseTitle(caseToBatch.caseCaption);
      const caseFolder = `${caseToBatch.docketNumber}, ${caseTitle}`;

      return {
        ...caseToBatch,
        caseFolder,
        caseTitle,
      };
    });

  sessionCases.forEach(caseToBatch => {
    const documentMap = caseToBatch.documents.reduce((acc, document) => {
      acc[document.documentId] = document;
      return acc;
    }, {});

    caseToBatch.docketRecord.forEach(aDocketRecord => {
      let myDoc;
      if (
        aDocketRecord.documentId &&
        (myDoc = documentMap[aDocketRecord.documentId])
      ) {
        const docDate = formatDateString(
          aDocketRecord.filingDate,
          'YYYY-MM-DD',
        );
        const docNum = padStart(`${aDocketRecord.index}`, 4, '0');
        const fileName = sanitize(
          `${docDate}_${docNum}_${aDocketRecord.description}.pdf`,
        );
        const pdfTitle = `${caseToBatch.caseFolder}/${fileName}`;
        s3Ids.push(myDoc.documentId);
        fileNames.push(pdfTitle);
      }
    });
  });

  let numberOfDocketRecordsGenerated = 0;
  const numberOfDocketRecordsToGenerate = sessionCases.length;
  const numberOfFilesToBatch = numberOfDocketRecordsToGenerate + s3Ids.length;

  const onDocketRecordCreation = async caseId => {
    if (caseId) {
      numberOfDocketRecordsGenerated += 1;
    }
    await applicationContext.getNotificationGateway().sendNotificationToUser({
      applicationContext,
      message: {
        action: 'batch_download_docket_generated',
        caseId,
        numberOfDocketRecordsGenerated,
        numberOfDocketRecordsToGenerate,
        numberOfFilesToBatch,
      },
      userId: user.userId,
    });
  };

  await onDocketRecordCreation();

  for (let index = 0; index < sessionCases.length; index++) {
    let { caseId } = sessionCases[index];
    extraFiles.push(
      await applicationContext
        .getUseCases()
        .generateDocketRecordPdfInteractor({
          applicationContext,
          caseId,
          includePartyDetail: true,
        })
        .then(async result => {
          await onDocketRecordCreation(caseId);
          return result;
        }),
    );
    extraFileNames.push(
      `${sessionCases[index].caseFolder}/0_Docket Record.pdf`,
    );
  }

  const onEntry = entryData => {
    applicationContext.getNotificationGateway().sendNotificationToUser({
      applicationContext,
      message: {
        action: 'batch_download_entry',
        ...entryData,
        numberOfDocketRecordsToGenerate,
        numberOfFilesToBatch,
      },
      userId: user.userId,
    });
  };

  const onProgress = progressData => {
    applicationContext.getNotificationGateway().sendNotificationToUser({
      applicationContext,
      message: {
        action: 'batch_download_progress',
        ...progressData,
        numberOfDocketRecordsToGenerate,
        numberOfFilesToBatch,
      },
      userId: user.userId,
    });
  };

  const onUploadStart = () => {
    applicationContext.getNotificationGateway().sendNotificationToUser({
      applicationContext,
      message: {
        action: 'batch_download_upload_start',
        numberOfDocketRecordsToGenerate,
        numberOfFilesToBatch,
      },
      userId: user.userId,
    });
  };

  await applicationContext.getPersistenceGateway().zipDocuments({
    applicationContext,
    extraFileNames,
    extraFiles,
    fileNames,
    onEntry,
    onProgress,
    onUploadStart,
    s3Ids,
    uploadToTempBucket: true,
    zipName,
  });

  const {
    url,
  } = await applicationContext.getPersistenceGateway().getDownloadPolicyUrl({
    applicationContext,
    documentId: zipName,
    useTempBucket: true,
  });

  await applicationContext.getNotificationGateway().sendNotificationToUser({
    applicationContext,
    message: {
      action: 'batch_download_ready',
      url,
    },
    userId: user.userId,
  });
};

/**
 * batchDownloadTrialSessionInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.trialSessionId the id of the trial session
 * @returns {Promise} the promise of the batchDownloadTrialSessionInteractor call
 */
exports.batchDownloadTrialSessionInteractor = async ({
  applicationContext,
  trialSessionId,
}) => {
  try {
    await batchDownloadTrialSessionInteractor({
      applicationContext,
      trialSessionId,
    });
  } catch (error) {
    const { userId } = applicationContext.getCurrentUser();

    applicationContext.logger.info('Error', error);
    await applicationContext.getNotificationGateway().sendNotificationToUser({
      applicationContext,
      message: {
        action: 'batch_download_error',
        error,
      },
      userId,
    });
  }
};
