const {
  fileExternalDocumentForConsolidatedInteractor,
} = require('./fileExternalDocumentForConsolidatedInteractor');
const { ContactFactory } = require('../../entities/contacts/ContactFactory');
const { MOCK_CASE } = require('../../../test/mockCase.js');
const { User } = require('../../entities/User');

describe('fileExternalDocumentForConsolidatedInteractor', () => {
  let applicationContext;
  let caseRecords;
  const caseId0 = '00000000-b37b-479d-9201-067ec6e335bb';
  const caseId1 = '11111111-b37b-479d-9201-067ec6e335bb';
  const caseId2 = '22222222-b37b-479d-9201-067ec6e335bb';
  const documentId0 = 'd0d0d0d0-b37b-479d-9201-067ec6e335bb';
  const documentId1 = 'd1d1d1d1-b37b-479d-9201-067ec6e335bb';
  const documentId2 = 'd2d2d2d2-b37b-479d-9201-067ec6e335bb';
  const documentId3 = 'd3d3d3d3-b37b-479d-9201-067ec6e335bb';

  beforeEach(() => {
    caseRecords = [
      {
        caseCaption: 'Guy Fieri, Petitioner',
        caseId: caseId0,
        caseType: 'Deficiency',
        contactPrimary: {
          email: 'fieri@example.com',
          name: 'Guy Fieri',
        },
        createdAt: '2019-04-19T17:29:13.120Z',
        docketNumber: '123-19',
        docketRecord: MOCK_CASE.docketRecord,
        documents: MOCK_CASE.documents,
        filingType: 'Myself',
        leadCaseId: caseId0,
        partyType: ContactFactory.PARTY_TYPES.petitioner,
        preferredTrialCity: 'Fresno, California',
        procedureType: 'Regular',
        role: User.ROLES.petitioner,
        userId: 'petitioner',
      },
      {
        caseCaption: 'Enzo Ferrari, Petitioner',
        caseId: caseId1,
        caseType: 'Deficiency',
        contactPrimary: {
          email: 'ferrari@example.com',
          name: 'Enzo Ferrari',
        },
        createdAt: '2019-04-19T17:29:13.120Z',
        docketNumber: '234-19',
        docketRecord: MOCK_CASE.docketRecord,
        documents: MOCK_CASE.documents,
        filingType: 'Myself',
        leadCaseId: caseId0,
        partyType: ContactFactory.PARTY_TYPES.petitioner,
        preferredTrialCity: 'Fresno, California',
        procedureType: 'Regular',
        role: User.ROLES.petitioner,
        userId: 'petitioner',
      },
      {
        caseCaption: 'George Foreman, Petitioner',
        caseId: caseId2,
        caseType: 'Deficiency',
        contactPrimary: {
          email: 'foreman@example.com',
          name: 'George Foreman',
        },
        createdAt: '2019-04-19T17:29:13.120Z',
        docketNumber: '345-19',
        docketRecord: MOCK_CASE.docketRecord,
        documents: MOCK_CASE.documents,
        filingType: 'Myself',
        leadCaseId: caseId0,
        partyType: ContactFactory.PARTY_TYPES.petitioner,
        preferredTrialCity: 'Fresno, California',
        procedureType: 'Regular',
        role: User.ROLES.petitioner,
        userId: 'petitioner',
      },
    ];

    applicationContext = {
      environment: { stage: 'local' },
      getCurrentUser: () => {
        return {
          name: 'Guy Fieri',
          role: 'admin', // Avoiding adding admin user to User entity
          userId: 'a7d90c05-f6cd-442c-a168-202db587f16f',
        };
      },
      getPersistenceGateway: () => ({
        getCasesByLeadCaseId: async () => caseRecords,
        getUserById: () => ({
          name: 'Guy Fieri',
          role: 'admin', // Avoiding adding admin user to User entity
          userId: 'a7d90c05-f6cd-442c-a168-202db587f16f',
        }),
        saveWorkItemForNonPaper: async () => {},
        updateCase: async ({ caseToUpdate }) => await caseToUpdate,
      }),
      getUniqueId: () => 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      getUseCaseHelpers: () => ({
        sendServedPartiesEmails: jest.fn(),
      }),
    };
  });

  it('Should throw an error if not authorized', async () => {
    let error;

    applicationContext.getCurrentUser = () => {
      return {};
    };

    try {
      await fileExternalDocumentForConsolidatedInteractor({
        applicationContext,
        documentIds: ['dddddddd-1111-dddd-1111-dddddddddddd'],
        documentMetadata: {
          documentTitle: 'Memorandum in Support',
          documentType: 'Memorandum in Support',
          eventCode: 'MISP',
        },
      });
    } catch (err) {
      error = err;
    }
    expect(error.message).toContain('Unauthorized');
  });

  it('Should associate the document with all selected cases from the consolidated set', async () => {
    expect(caseRecords[0].documents.length).toEqual(4);
    expect(caseRecords[1].documents.length).toEqual(4);
    expect(caseRecords[2].documents.length).toEqual(4);

    const result = await fileExternalDocumentForConsolidatedInteractor({
      applicationContext,
      docketNumbersForFiling: ['123-19', '234-19'],
      documentIds: [documentId0],
      documentMetadata: {
        documentTitle: 'Memorandum in Support',
        documentType: 'Memorandum in Support',
        eventCode: 'MISP',
      },
      leadCaseId: caseId0,
    });

    expect(result[0].documents[4].documentId).toEqual(documentId0);
    expect(result[1].documents[4].documentId).toEqual(documentId0);
    expect(result[2].documents.length).toEqual(4);
  });

  it('Should generate a docket record entry on each case in the consolidated set', async () => {
    expect(caseRecords[0].docketRecord.length).toEqual(3);
    expect(caseRecords[1].docketRecord.length).toEqual(3);

    const result = await fileExternalDocumentForConsolidatedInteractor({
      applicationContext,
      docketNumbersForFiling: ['123-19', '234-19'],
      documentIds: [documentId0],
      documentMetadata: {
        documentTitle: 'Memorandum in Support',
        documentType: 'Memorandum in Support',
        eventCode: 'MISP',
      },
      leadCaseId: caseId0,
    });

    expect(result[0].docketRecord[3].documentId).toEqual(documentId0);
    expect(result[1].docketRecord[3].documentId).toEqual(documentId0);
    expect(result[2].docketRecord[3].documentId).toEqual(documentId0);
  });

  it.skip('Should aggregate the filing parties for the docket record entry', async () => {
    // skipping until we finalize how this will be handled
    await fileExternalDocumentForConsolidatedInteractor({
      applicationContext,
      documentIds: [documentId0],
      documentMetadata: {
        documentTitle: 'Memorandum in Support',
        documentType: 'Memorandum in Support',
        eventCode: 'MISP',
      },
      filingPartyNames: ['Guy Fieri', 'Enzo Ferrari'],
      leadCaseId: caseId0,
    });
  });

  it('Should generate only ONE QC work item for the filing, to be found on the document of the lowest docket number case to be filed in', async () => {
    const result = await fileExternalDocumentForConsolidatedInteractor({
      applicationContext,
      docketNumbersForFiling: ['123-19', '234-19'],
      documentIds: [documentId0],
      documentMetadata: {
        documentTitle: 'Memorandum in Support',
        documentType: 'Memorandum in Support',
        eventCode: 'MISP',
      },
      leadCaseId: caseId0,
    });

    const lowestDocketNumberCase = result.find(
      record => record.caseId === caseId0,
    );

    const nonLowestDocketNumberCase = result.find(
      record => record.caseId === caseId1,
    );

    expect(lowestDocketNumberCase.documents[4].workItems.length).toEqual(1);
    expect(nonLowestDocketNumberCase.documents[4].workItems.length).toEqual(0);
  });

  it('Should file multiple documents for each case if a secondary document is provided', async () => {
    expect(caseRecords[0].documents.length).toEqual(4);
    expect(caseRecords[1].documents.length).toEqual(4);

    const result = await fileExternalDocumentForConsolidatedInteractor({
      applicationContext,
      docketNumbersForFiling: ['123-19', '234-19'],
      documentIds: [documentId0, documentId1],
      documentMetadata: {
        documentTitle: 'Memorandum in Support',
        documentType: 'Memorandum in Support',
        eventCode: 'MISP',
        secondaryDocument: {
          documentTitle: 'Redacted',
          documentType: 'Redacted',
          eventCode: 'REDC',
        },
      },
      leadCaseId: caseId0,
    });

    expect(result[0].documents.length).toEqual(6);
    expect(result[1].documents.length).toEqual(6);
  });

  it('Should file multiple documents for each case if supporting documents are provided', async () => {
    expect(caseRecords[0].documents.length).toEqual(4);
    expect(caseRecords[1].documents.length).toEqual(4);

    const result = await fileExternalDocumentForConsolidatedInteractor({
      applicationContext,
      docketNumbersForFiling: ['123-19', '234-19'],
      documentIds: [documentId0, documentId1, documentId2, documentId3],
      documentMetadata: {
        documentTitle: 'Memorandum in Support',
        documentType: 'Memorandum in Support',
        eventCode: 'MISP',
        secondaryDocument: {
          documentTitle: 'Redacted',
          documentType: 'Redacted',
          eventCode: 'REDC',
        },
        secondarySupportingDocuments: [
          {
            documentTitle: 'Redacted',
            documentType: 'Redacted',
            eventCode: 'REDC',
          },
        ],
        supportingDocuments: [
          {
            documentTitle: 'Redacted',
            documentType: 'Redacted',
            eventCode: 'REDC',
          },
        ],
      },
      leadCaseId: caseId0,
    });

    expect(result[0].documents.length).toEqual(8);
    expect(result[1].documents.length).toEqual(8);
  });
});
