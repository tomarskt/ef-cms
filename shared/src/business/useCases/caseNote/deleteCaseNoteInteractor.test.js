const { deleteCaseNoteInteractor } = require('./deleteCaseNoteInteractor');
const { MOCK_CASE } = require('../../../test/mockCase');
const { UnauthorizedError } = require('../../../errors/errors');
const { User } = require('../../entities/User');

const updateCaseMock = jest.fn().mockImplementation(async c => c.caseToUpdate);
const getCaseByCaseIdMock = jest
  .fn()
  .mockResolvedValue({ ...MOCK_CASE, caseNote: 'My Procedural Note' });

describe('deleteCaseNoteInteractor', () => {
  let applicationContext;
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws an error if the user is not valid or authorized', async () => {
    applicationContext = {
      getCurrentUser: () => {
        return {};
      },
    };
    let error;
    try {
      await deleteCaseNoteInteractor({
        applicationContext,
        caseId: '6805d1ab-18d0-43ec-bafb-654e83405416',
      });
    } catch (err) {
      error = err;
    }
    expect(error.message).toContain('Unauthorized');
    expect(error).toBeInstanceOf(UnauthorizedError);
  });

  it('deletes a procedural note', async () => {
    applicationContext = {
      environment: { stage: 'local' },
      getCurrentUser: () =>
        new User({
          name: 'Judge Armen',
          role: User.ROLES.judge,
          userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
        }),
      getPersistenceGateway: () => ({
        getCaseByCaseId: getCaseByCaseIdMock,
        updateCase: updateCaseMock,
      }),
      getUniqueId: () => '09c66c94-7480-4915-8f10-2f2e6e0bf4ad',
    };

    let error;
    let result;

    try {
      result = await deleteCaseNoteInteractor({
        applicationContext,
        caseId: '6805d1ab-18d0-43ec-bafb-654e83405416',
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
    expect(result).toBeDefined();
    expect(getCaseByCaseIdMock).toHaveBeenCalled();
    expect(updateCaseMock).toHaveBeenCalled();
    expect(result.caseNote).not.toBeDefined();
  });
});
