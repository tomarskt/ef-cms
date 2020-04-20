const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  createCaseDeadlineInteractor,
} = require('./createCaseDeadlineInteractor');
const {
  MOCK_CASE,
  MOCK_CASE_WITHOUT_PENDING,
} = require('../../../test/mockCase');
const { Case } = require('../../entities/cases/Case');
const { UnauthorizedError } = require('../../../errors/errors');
const { User } = require('../../entities/User');

describe('createCaseDeadlineInteractor', () => {
  const mockCaseDeadline = {
    caseId: '6805d1ab-18d0-43ec-bafb-654e83405416',
    deadlineDate: '2019-03-01T21:42:29.073Z',
    description: 'hello world',
  };
  let user;
  let mockCase;

  beforeEach(() => {
    user = new User({
      name: 'Test Petitionsclerk',
      role: User.ROLES.petitionsClerk,
      userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
    });

    applicationContext.environment.stage = 'local';
    applicationContext.getCurrentUser.mockImplementation(() => user);

    applicationContext
      .getPersistenceGateway()
      .createCaseDeadline.mockImplementation(v => v);
    applicationContext
      .getPersistenceGateway()
      .getCaseByCaseId.mockImplementation(() => mockCase);
    applicationContext
      .getPersistenceGateway()
      .getCaseDeadlinesByCaseId.mockReturnValue([{ deadline: 'something' }]);
  });

  it('throws an error if the user is not valid or authorized', async () => {
    user = {};
    await expect(
      createCaseDeadlineInteractor({
        applicationContext,
        caseDeadline: mockCaseDeadline,
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('creates a case deadline, marks the case as automatically blocked, and calls deleteCaseTrialSortMappingRecords when there are no pending items', async () => {
    mockCase = MOCK_CASE_WITHOUT_PENDING;

    const caseDeadline = await createCaseDeadlineInteractor({
      applicationContext,
      caseDeadline: mockCaseDeadline,
    });

    expect(caseDeadline).toBeDefined();
    expect(applicationContext.getPersistenceGateway().updateCase).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().updateCase.mock.calls[0][0]
        .caseToUpdate,
    ).toMatchObject({
      automaticBlocked: true,
      automaticBlockedDate: expect.anything(),
      automaticBlockedReason: Case.AUTOMATIC_BLOCKED_REASONS.dueDate,
    });
    expect(
      applicationContext.getPersistenceGateway()
        .deleteCaseTrialSortMappingRecords,
    ).toBeCalled();
  });

  it('creates a case deadline, marks the case as automatically blocked, and calls deleteCaseTrialSortMappingRecords when there are already pending items on the case', async () => {
    mockCase = MOCK_CASE;

    const caseDeadline = await createCaseDeadlineInteractor({
      applicationContext,
      caseDeadline: mockCaseDeadline,
    });

    expect(caseDeadline).toBeDefined();
    expect(applicationContext.getPersistenceGateway().updateCase).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().updateCase.mock.calls[0][0]
        .caseToUpdate,
    ).toMatchObject({
      automaticBlocked: true,
      automaticBlockedDate: expect.anything(),
      automaticBlockedReason: Case.AUTOMATIC_BLOCKED_REASONS.pendingAndDueDate,
    });
    expect(
      applicationContext.getPersistenceGateway()
        .deleteCaseTrialSortMappingRecords,
    ).toBeCalled();
  });
});
