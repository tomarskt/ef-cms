const {
  saveSignedDocumentInteractor,
} = require('./saveSignedDocumentInteractor');
const { MOCK_CASE } = require('../../test/mockCase');
const { MOCK_DOCUMENTS } = require('../../test/mockDocuments');

describe('saveSignedDocumentInteractor', () => {
  let mockCase;
  let applicationContext;

  beforeEach(() => {
    mockCase = {
      ...MOCK_CASE,
      caseCaption: ',',
    };

    applicationContext = {
      getCurrentUser: () => ({ userId: '1' }),
      getPersistenceGateway: () => ({
        getCaseByCaseId: () => mockCase,
        updateCase: () => null,
      }),
      getUtilities: () => {
        return {
          createISODateString: () => '2018-06-01T00:00:00.000Z',
        };
      },
      logger: {
        time: () => null,
        timeEnd: () => null,
      },
    };
  });

  it('should add the signed Stipulated Decision to the case given a Proposed Stipulated Decision', async () => {
    const caseEntity = await saveSignedDocumentInteractor({
      applicationContext,
      caseId: mockCase.caseId,
      docketNumber: MOCK_CASE.docketNumber,
      originalDocumentId: 'def81f4d-1e47-423a-8caf-6d2fdc3d3859',
      signedDocumentId: 'abc81f4d-1e47-423a-8caf-6d2fdc3d3859',
    });

    expect(caseEntity.documents.length).toEqual(MOCK_DOCUMENTS.length + 1);

    const signedDocumentEntity = caseEntity.documents.find(
      document =>
        document.documentType === 'Stipulated Decision' &&
        document.documentId === 'abc81f4d-1e47-423a-8caf-6d2fdc3d3859',
    );

    expect(signedDocumentEntity.isPaper).toEqual(false);
    expect(signedDocumentEntity.documentType).toEqual('Stipulated Decision');
  });

  it('should update the current document as signed', async () => {
    const caseEntity = await saveSignedDocumentInteractor({
      applicationContext,
      caseId: mockCase.caseId,
      originalDocumentId: 'abc81f4d-1e47-423a-8caf-6d2fdc3d3859',
      signedDocumentId: 'abc81f4d-1e47-423a-8caf-6d2fdc3d3859',
    });

    expect(caseEntity.documents.length).toEqual(MOCK_DOCUMENTS.length);
  });
});
