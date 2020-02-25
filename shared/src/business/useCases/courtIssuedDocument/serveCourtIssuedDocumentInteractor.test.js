const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const {
  ENTERED_AND_SERVED_EVENT_CODES,
} = require('../../entities/courtIssuedDocument/CourtIssuedDocumentConstants');
const {
  serveCourtIssuedDocumentInteractor,
} = require('./serveCourtIssuedDocumentInteractor');
const { Case } = require('../../entities/cases/Case');
const { ContactFactory } = require('../../entities/contacts/ContactFactory');
const { createISODateString } = require('../../utilities/DateHandler');
const { DOCKET_SECTION } = require('../../entities/WorkQueue');
const { Document } = require('../../entities/Document');
const { User } = require('../../entities/User');

const testAssetsPath = path.join(__dirname, '../../../../test-assets/');
const testOutputPath = path.join(__dirname, '../../../../test-output/');

const testPdfDocBytes = () => {
  // sample.pdf is a 1 page document
  return fs.readFileSync(testAssetsPath + 'sample.pdf');
};

describe('serveCourtIssuedDocumentInteractor', () => {
  let applicationContext;
  let updateCaseMock;
  let getObjectMock;
  let saveDocumentFromLambdaMock;
  let deleteWorkItemFromInboxMock;
  let putWorkItemInOutboxMock;
  let testPdfDoc;
  let deleteCaseTrialSortMappingRecordsMock;
  let extendCase;
  let generatePaperServiceAddressPagePdfMock;
  let sendServedPartiesEmailsMock;
  let appendPaperServiceAddressPageToPdfMock;

  let getTrialSessionByIdMock;
  let updateTrialSessionMock;

  const mockUser = {
    role: User.ROLES.docketClerk,
    userId: '2474e5c0-f741-4120-befa-b77378ac8bf0',
  };

  const mockWorkItem = {
    caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    docketNumber: '123-45',
    isQC: true,
    section: DOCKET_SECTION,
    sentBy: mockUser.userId,
    workItemId: 'b4c7337f-9ca0-45d9-9396-75e003f81e32',
  };

  const dynamicallyGeneratedDocketEntries = [];
  const documentsWithCaseClosingEventCodes = ENTERED_AND_SERVED_EVENT_CODES.map(
    eventCode => {
      const documentId = uuidv4();

      const index = dynamicallyGeneratedDocketEntries.length + 2; // 2 statically set docket records per case;

      dynamicallyGeneratedDocketEntries.push({
        description: `Docket Record ${index}`,
        documentId,
        eventCode: 'O',
        filingDate: createISODateString(),
        index,
      });

      const eventCodeMap = Document.COURT_ISSUED_EVENT_CODES.find(
        entry => entry.eventCode === eventCode,
      );

      return {
        documentId,
        documentType: eventCodeMap.documentType,
        eventCode,
        userId: '2474e5c0-f741-4120-befa-b77378ac8bf0',
        workItems: [mockWorkItem],
      };
    },
  );

  const mockCases = [
    {
      caseCaption: 'Caption',
      caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      caseType: 'Deficiency',
      contactPrimary: {
        address1: '123 Main St',
        city: 'Somewhere',
        countryType: ContactFactory.COUNTRY_TYPES.DOMESTIC,
        email: 'contact@example.com',
        name: 'Contact Primary',
        phone: '123123134',
        postalCode: '12345',
        state: 'TN',
      },
      docketNumber: '123-45',
      docketRecord: [
        {
          description: 'Docket Record 0',
          documentId: 'c54ba5a9-b37b-479d-9201-067ec6e335bc',
          eventCode: 'O',
          filingDate: createISODateString(),
          index: 0,
        },
        {
          description: 'Docket Record 1',
          documentId: 'cf105788-5d34-4451-aa8d-dfd9a851b675',
          eventCode: 'OAJ',
          filingDate: createISODateString(),
          index: 1,
        },
        ...dynamicallyGeneratedDocketEntries,
      ],
      documents: [
        {
          documentId: 'c54ba5a9-b37b-479d-9201-067ec6e335bc',
          documentType: 'O - Order',
          eventCode: 'O',
          serviceStamp: 'Served',
          userId: '2474e5c0-f741-4120-befa-b77378ac8bf0',
          workItems: [mockWorkItem],
        },
        {
          documentId: 'cf105788-5d34-4451-aa8d-dfd9a851b675',
          documentType: 'OAJ - Order that case is assigned',
          eventCode: 'OAJ',
          userId: '2474e5c0-f741-4120-befa-b77378ac8bf0',
          workItems: [mockWorkItem],
        },
        ...documentsWithCaseClosingEventCodes,
      ],
      filingType: 'Myself',
      partyType: ContactFactory.PARTY_TYPES.petitioner,
      preferredTrialCity: 'Fresno, California',
      procedureType: 'Regular',
    },
    {
      caseCaption: 'Caption',
      caseId: 'd857e73a-636e-4aa7-9de2-b5cee8770ff0',
      caseType: 'Deficiency',
      contactPrimary: {
        address1: '123 Main St',
        city: 'Somewhere',
        countryType: ContactFactory.COUNTRY_TYPES.DOMESTIC,
        name: 'Contact Primary',
        phone: '123123134',
        postalCode: '12345',
        state: 'TN',
      },
      contactSecondary: {
        address1: '123 Main St',
        city: 'Somewhere',
        countryType: ContactFactory.COUNTRY_TYPES.DOMESTIC,
        name: 'Contact Secondary',
        phone: '123123134',
        postalCode: '12345',
        state: 'TN',
      },
      docketNumber: '123-45',
      docketRecord: [
        {
          description: 'Docket Record 0',
          documentId: 'c54ba5a9-b37b-479d-9201-067ec6e335bc',
          eventCode: 'O',
          filingDate: createISODateString(),
          index: 0,
        },
        {
          description: 'Docket Record 0',
          documentId: 'cf105788-5d34-4451-aa8d-dfd9a851b675',
          eventCode: 'OAJ',
          filingDate: createISODateString(),
          index: 1,
        },
        ...dynamicallyGeneratedDocketEntries,
      ],
      documents: [
        {
          documentId: 'c54ba5a9-b37b-479d-9201-067ec6e335bc',
          documentType: 'O - Order',
          eventCode: 'O',
          serviceStamp: 'Served',
          userId: '2474e5c0-f741-4120-befa-b77378ac8bf0',
          workItems: [mockWorkItem],
        },
        {
          documentId: 'cf105788-5d34-4451-aa8d-dfd9a851b675',
          documentType: 'OAJ - Order that case is assigned',
          eventCode: 'OAJ',
          userId: '2474e5c0-f741-4120-befa-b77378ac8bf0',
          workItems: [mockWorkItem],
        },
        ...documentsWithCaseClosingEventCodes,
      ],
      filingType: 'Myself',
      isPaper: true,
      mailingDate: 'testing',
      partyType: ContactFactory.PARTY_TYPES.petitionerSpouse,
      preferredTrialCity: 'Fresno, California',
      procedureType: 'Regular',
    },
  ];

  beforeEach(() => {
    testPdfDoc = testPdfDocBytes();
    extendCase = {};

    updateCaseMock = jest.fn(({ caseToUpdate }) => caseToUpdate);
    deleteCaseTrialSortMappingRecordsMock = jest.fn();
    getObjectMock = jest.fn().mockReturnValue({
      promise: async () => ({
        Body: testPdfDoc,
      }),
    });
    deleteWorkItemFromInboxMock = jest.fn();
    putWorkItemInOutboxMock = jest.fn();
    generatePaperServiceAddressPagePdfMock = jest
      .fn()
      .mockResolvedValue(testPdfDoc);
    sendServedPartiesEmailsMock = jest.fn();
    appendPaperServiceAddressPageToPdfMock = jest.fn();

    getTrialSessionByIdMock = jest.fn().mockReturnValue({
      caseOrder: [
        {
          caseId: '46c4064f-b44a-4ac3-9dfb-9ce9f00e43f5',
        },
      ],
      createdAt: '2019-10-27T05:00:00.000Z',
      gsi1pk: 'trial-session-catalog',
      isCalendared: true,
      judge: {
        name: 'Judge Armen',
        userId: 'dabbad00-18d0-43ec-bafb-654e83405416',
      },
      maxCases: 100,
      pk: 'trial-session-959c4338-0fac-42eb-b0eb-d53b8d0195cc',
      sessionType: 'Regular',
      sk: 'trial-session-959c4338-0fac-42eb-b0eb-d53b8d0195cc',
      startDate: '2019-11-27T05:00:00.000Z',
      startTime: '10:00',
      swingSession: true,
      swingSessionId: '208a959f-9526-4db5-b262-e58c476a4604',
      term: 'Fall',
      termYear: '2019',
      trialLocation: 'Houston, Texas',
      trialSessionId: '959c4338-0fac-42eb-b0eb-d53b8d0195cc',
    });
    updateTrialSessionMock = jest.fn();

    applicationContext = {
      environment: { documentsBucketName: 'documents' },
      getCurrentUser: () => mockUser,
      getPersistenceGateway: () => ({
        deleteCaseTrialSortMappingRecords: deleteCaseTrialSortMappingRecordsMock,
        deleteWorkItemFromInbox: deleteWorkItemFromInboxMock,
        getCaseByCaseId: ({ caseId }) => {
          const theCase = mockCases.find(
            mockCase => mockCase.caseId === caseId,
          );
          if (theCase) {
            return {
              ...theCase,
              ...extendCase,
            };
          }
        },
        getTrialSessionById: getTrialSessionByIdMock,
        putWorkItemInOutbox: putWorkItemInOutboxMock,
        saveDocumentFromLambda: saveDocumentFromLambdaMock,
        updateCase: updateCaseMock,
        updateTrialSession: updateTrialSessionMock,
      }),
      getStorageClient: () => ({
        getObject: getObjectMock,
      }),
      getUseCaseHelpers: () => ({
        appendPaperServiceAddressPageToPdf: appendPaperServiceAddressPageToPdfMock,
        generatePaperServiceAddressPagePdf: generatePaperServiceAddressPagePdfMock,
        sendServedPartiesEmails: sendServedPartiesEmailsMock,
      }),
      logger: {
        time: () => null,
        timeEnd: () => null,
      },
    };
  });

  it('should throw an Unauthorized error if the user role does not have the SERVE_DOCUMENT permission', async () => {
    let error;

    // petitioner role does NOT have the SERVE_DOCUMENT permission
    const user = { ...mockUser, role: User.ROLES.petitioner };
    applicationContext.getCurrentUser = () => user;

    try {
      await serveCourtIssuedDocumentInteractor({
        applicationContext,
        caseId: '000-00',
        documentId: '000',
      });
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.message).toContain('Unauthorized');
  });

  it('should throw a Not Found error if the case can not be found', async () => {
    let error;

    try {
      await serveCourtIssuedDocumentInteractor({
        applicationContext,
        caseId: '000-00',
        documentId: '000',
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('Case 000-00 was not found');
  });

  it('should throw a Not Found error if the document can not be found', async () => {
    let error;

    try {
      await serveCourtIssuedDocumentInteractor({
        applicationContext,
        caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
        documentId: '000',
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('Document 000 was not found');
  });

  it('should set the document as served and update the case and work items for a generic order document', async () => {
    saveDocumentFromLambdaMock = jest.fn(({ document: newPdfData }) => {
      fs.writeFileSync(
        testOutputPath + 'serveCourtIssuedDocumentInteractor_1.pdf',
        newPdfData,
      );
    });

    await serveCourtIssuedDocumentInteractor({
      applicationContext,
      caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      documentId: 'c54ba5a9-b37b-479d-9201-067ec6e335bc',
    });

    const updatedCase = updateCaseMock.mock.calls[0][0].caseToUpdate;
    const updatedDocument = updatedCase.documents.find(
      document =>
        document.documentId === 'c54ba5a9-b37b-479d-9201-067ec6e335bc',
    );

    expect(updatedDocument.status).toEqual('served');
    expect(updatedDocument.servedAt).toBeTruthy();
    expect(updateCaseMock).toHaveBeenCalled();
    expect(deleteWorkItemFromInboxMock).toHaveBeenCalled();
    expect(putWorkItemInOutboxMock).toHaveBeenCalled();
  });

  it('should set the document as served and update the case and work items for a non-generic order document', async () => {
    saveDocumentFromLambdaMock = jest.fn(({ document: newPdfData }) => {
      fs.writeFileSync(
        testOutputPath + 'serveCourtIssuedDocumentInteractor_1.pdf',
        newPdfData,
      );
    });

    await serveCourtIssuedDocumentInteractor({
      applicationContext,
      caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      documentId: 'cf105788-5d34-4451-aa8d-dfd9a851b675',
    });

    const updatedCase = updateCaseMock.mock.calls[0][0].caseToUpdate;
    const updatedDocument = updatedCase.documents.find(
      document =>
        document.documentId === 'cf105788-5d34-4451-aa8d-dfd9a851b675',
    );

    expect(updatedDocument.status).toEqual('served');
    expect(updatedDocument.servedAt).toBeTruthy();
    expect(updateCaseMock).toHaveBeenCalled();
    expect(deleteWorkItemFromInboxMock).toHaveBeenCalled();
    expect(putWorkItemInOutboxMock).toHaveBeenCalled();
  });

  it('should call sendBulkTemplatedEmail, sending an email to all electronically-served parties, and should not return paperServicePdfData', async () => {
    saveDocumentFromLambdaMock = jest.fn(({ document: newPdfData }) => {
      fs.writeFileSync(
        testOutputPath + 'serveCourtIssuedDocumentInteractor_2.pdf',
        newPdfData,
      );
    });

    const result = await serveCourtIssuedDocumentInteractor({
      applicationContext,
      caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      documentId: 'c54ba5a9-b37b-479d-9201-067ec6e335bc',
    });

    expect(sendServedPartiesEmailsMock).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should return paperServicePdfData when there are paper service parties on the case', async () => {
    saveDocumentFromLambdaMock = jest.fn(({ document: newPdfData }) => {
      fs.writeFileSync(
        testOutputPath + 'serveCourtIssuedDocumentInteractor_2.pdf',
        newPdfData,
      );
    });
    const result = await serveCourtIssuedDocumentInteractor({
      applicationContext,
      caseId: 'd857e73a-636e-4aa7-9de2-b5cee8770ff0',
      documentId: 'c54ba5a9-b37b-479d-9201-067ec6e335bc',
    });

    expect(result).toBeDefined();
  });

  it('should remove the case from the trial session if the case has a trialSessionId', async () => {
    extendCase.trialSessionId = 'c54ba5a9-b37b-479d-9201-067ec6e335bb';
    saveDocumentFromLambdaMock = jest.fn();

    await serveCourtIssuedDocumentInteractor({
      applicationContext,
      caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      documentId: documentsWithCaseClosingEventCodes[0].documentId,
    });

    expect(sendServedPartiesEmailsMock).toHaveBeenCalled();
    expect(updateTrialSessionMock).toHaveBeenCalled();
  });

  it('should remove the case from the trial session if the case has a trialSessionId', async () => {
    getTrialSessionByIdMock = jest.fn().mockReturnValue({
      caseOrder: [
        {
          caseId: '46c4064f-b44a-4ac3-9dfb-9ce9f00e43f5',
        },
      ],
      createdAt: '2019-10-27T05:00:00.000Z',
      gsi1pk: 'trial-session-catalog',
      isCalendared: false,
      judge: {
        name: 'Judge Armen',
        userId: 'dabbad00-18d0-43ec-bafb-654e83405416',
      },
      maxCases: 100,
      pk: 'trial-session-959c4338-0fac-42eb-b0eb-d53b8d0195cc',
      sessionType: 'Regular',
      sk: 'trial-session-959c4338-0fac-42eb-b0eb-d53b8d0195cc',
      startDate: '2019-11-27T05:00:00.000Z',
      startTime: '10:00',
      swingSession: true,
      swingSessionId: '208a959f-9526-4db5-b262-e58c476a4604',
      term: 'Fall',
      termYear: '2019',
      trialLocation: 'Houston, Texas',
      trialSessionId: '959c4338-0fac-42eb-b0eb-d53b8d0195cc',
    });

    extendCase.trialSessionId = 'c54ba5a9-b37b-479d-9201-067ec6e335bb';
    saveDocumentFromLambdaMock = jest.fn();

    await serveCourtIssuedDocumentInteractor({
      applicationContext,
      caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      documentId: documentsWithCaseClosingEventCodes[0].documentId,
    });

    expect(sendServedPartiesEmailsMock).toHaveBeenCalled();
    expect(updateTrialSessionMock).toHaveBeenCalled();
  });

  documentsWithCaseClosingEventCodes.forEach(document => {
    it(`should set the case status to closed for event code: ${document.eventCode}`, async () => {
      saveDocumentFromLambdaMock = jest.fn(({ document: newPdfData }) => {
        fs.writeFileSync(
          testOutputPath + 'serveCourtIssuedDocumentInteractor_3.pdf',
          newPdfData,
        );
      });

      await serveCourtIssuedDocumentInteractor({
        applicationContext,
        caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
        documentId: document.documentId,
      });

      const updatedCase = updateCaseMock.mock.calls[0][0].caseToUpdate;

      expect(updatedCase.status).toEqual(Case.STATUS_TYPES.closed);
      expect(deleteCaseTrialSortMappingRecordsMock).toHaveBeenCalled();
    });
  });
});
