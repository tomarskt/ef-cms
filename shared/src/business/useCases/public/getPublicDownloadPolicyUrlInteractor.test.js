const {
  getPublicDownloadPolicyUrlInteractor,
} = require('./getPublicDownloadPolicyUrlInteractor');
const { DocketRecord } = require('../../entities/DocketRecord');
const { Document } = require('../../entities/Document');
const { MOCK_CASE } = require('../../../test/mockCase');
const { MOCK_USERS } = require('../../../test/mockUsers');

describe('getPublicDownloadPolicyUrlInteractor', () => {
  beforeEach(() => {});

  it('should throw an error for a document that is not public accessible', async () => {
    const applicationContext = {
      getCurrentUser: () => MOCK_USERS['a7d90c05-f6cd-442c-a168-202db587f16f'],
      getPersistenceGateway: () => ({
        getCaseByCaseId: () => ({ ...MOCK_CASE }),
        getPublicDownloadPolicyUrl: () =>
          'http://example.com/document/c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
      }),
    };
    await expect(
      getPublicDownloadPolicyUrlInteractor({
        applicationContext,
        caseId: '123',
        documentId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
      }),
    ).rejects.toThrow();
  });

  it('should return a url for a document that is public accessible', async () => {
    const applicationContext = {
      getCurrentUser: () => MOCK_USERS['a7d90c05-f6cd-442c-a168-202db587f16f'],
      getPersistenceGateway: () => ({
        getCaseByCaseId: () => ({ ...MOCK_CASE }),
        getPublicDownloadPolicyUrl: () =>
          'http://example.com/document/8008b288-8b6b-48e3-8239-599266b13b8b',
      }),
    };
    MOCK_CASE.documents.push(
      new Document(
        {
          documentId: '8008b288-8b6b-48e3-8239-599266b13b8b',
          documentTitle: 'Order to do something',
          documentType: 'O - Order',
          eventCode: 'O',
          servedAt: '2019-03-01T21:40:46.415Z',
        },
        { applicationContext },
      ),
    );
    MOCK_CASE.docketRecord.push(
      new DocketRecord(
        {
          documentId: '8008b288-8b6b-48e3-8239-599266b13b8b',
        },
        { applicationContext },
      ),
      { applicationContext },
    );
    const result = await getPublicDownloadPolicyUrlInteractor({
      applicationContext,
      caseId: '123',
      documentId: '8008b288-8b6b-48e3-8239-599266b13b8b',
    });
    expect(result).toEqual(
      'http://example.com/document/8008b288-8b6b-48e3-8239-599266b13b8b',
    );
  });
});
