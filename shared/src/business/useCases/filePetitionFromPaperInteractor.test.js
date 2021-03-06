const {
  filePetitionFromPaperInteractor,
} = require('./filePetitionFromPaperInteractor');
const { applicationContext } = require('../test/createTestApplicationContext');
const { User } = require('../entities/User');

beforeAll(() => {
  applicationContext
    .getPersistenceGateway()
    .uploadDocumentFromClient.mockResolvedValue(
      'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    );
});

describe('filePetitionFromPaperInteractor', () => {
  it('throws an error when a null user tries to access the case', async () => {
    applicationContext.getCurrentUser.mockReturnValue(null);
    let error;
    try {
      await filePetitionFromPaperInteractor({
        applicationContext,
        petitionFile: null,
        petitionMetadata: null,
      });
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('throws an error when an unauthorized user tries to access the case', async () => {
    applicationContext.getCurrentUser.mockReturnValue({
      role: User.ROLES.irsPractitioner,
      userId: 'irsPractitioner',
    });
    let error;
    try {
      await filePetitionFromPaperInteractor({
        applicationContext,
        petitionFile: null,
        petitionMetadata: null,
      });
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('calls upload on a Petition file', async () => {
    applicationContext.getCurrentUser.mockReturnValue({
      role: User.ROLES.petitionsClerk,
      userId: 'petitionsClerk',
    });
    await filePetitionFromPaperInteractor({
      applicationContext,
      petitionFile: 'this petition file',
      petitionMetadata: null,
    });
    expect(
      applicationContext.getPersistenceGateway().uploadDocumentFromClient.mock
        .calls[0][0].document,
    ).toEqual('this petition file');
  });

  it('calls upload on an Application for Waiver of Filing Fee file', async () => {
    await filePetitionFromPaperInteractor({
      applicationContext,
      applicationForWaiverOfFilingFeeFile: 'this APW file',
    });
    expect(
      applicationContext.getPersistenceGateway().uploadDocumentFromClient.mock
        .calls[0][0].document,
    ).toEqual('this APW file');
  });

  it('calls upload on an ODS file', async () => {
    await filePetitionFromPaperInteractor({
      applicationContext,
      ownershipDisclosureFile: 'this ods file',
    });
    expect(
      applicationContext.getPersistenceGateway().uploadDocumentFromClient.mock
        .calls[1][0].document,
    ).toEqual('this ods file');
  });

  it('calls upload on a STIN file', async () => {
    await filePetitionFromPaperInteractor({
      applicationContext,
      stinFile: 'this stin file',
    });
    expect(
      applicationContext.getPersistenceGateway().uploadDocumentFromClient.mock
        .calls[1][0].document,
    ).toEqual('this stin file');
  });

  it('calls upload on a Request for Place of Trial file', async () => {
    await filePetitionFromPaperInteractor({
      applicationContext,
      requestForPlaceOfTrialFile: 'this rqt file',
    });
    expect(
      applicationContext.getPersistenceGateway().uploadDocumentFromClient.mock
        .calls[1][0].document,
    ).toEqual('this rqt file');
  });

  it('uploads a Petition file and a STIN file', async () => {
    await filePetitionFromPaperInteractor({
      applicationContext,
      petitionFile: 'something1',
      petitionMetadata: 'something2',
      stinFile: 'something3',
    });
    expect(
      applicationContext.getUseCases().createCaseFromPaperInteractor.mock
        .calls[0][0],
    ).toMatchObject({
      ownershipDisclosureFileId: undefined,
      petitionFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      stinFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    });
  });

  it('uploads an Ownership Disclosure Statement file', async () => {
    await filePetitionFromPaperInteractor({
      applicationContext,
      ownershipDisclosureFile: 'something',
      petitionFile: 'something1',
      petitionMetadata: 'something2',
      stinFile: 'something3',
    });
    expect(
      applicationContext.getUseCases().createCaseFromPaperInteractor.mock
        .calls[0][0],
    ).toMatchObject({
      ownershipDisclosureFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      petitionFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      stinFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    });
  });

  it('uploads an Application for Waiver of Filing Fee file', async () => {
    await filePetitionFromPaperInteractor({
      applicationContext,
      applicationForWaiverOfFilingFeeFile: 'something',
      petitionFile: 'something1',
      petitionMetadata: 'something2',
      stinFile: 'something3',
    });
    expect(
      applicationContext.getUseCases().createCaseFromPaperInteractor.mock
        .calls[0][0],
    ).toMatchObject({
      applicationForWaiverOfFilingFeeFileId:
        'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      petitionFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      stinFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    });
  });

  it('uploads a Request for Place of Trial file', async () => {
    await filePetitionFromPaperInteractor({
      applicationContext,
      petitionFile: 'something1',
      petitionMetadata: 'something2',
      requestForPlaceOfTrialFile: 'something',
      stinFile: 'something3',
    });
    expect(
      applicationContext.getUseCases().createCaseFromPaperInteractor.mock
        .calls[0][0],
    ).toMatchObject({
      petitionFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      requestForPlaceOfTrialFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      stinFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    });
  });
});
