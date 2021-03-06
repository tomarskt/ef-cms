const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  removeCaseFromTrialInteractor,
} = require('./removeCaseFromTrialInteractor');
const { Case } = require('../../entities/cases/Case');
const { MOCK_CASE } = require('../../../test/mockCase');
const { User } = require('../../entities/User');

describe('remove case from trial session', () => {
  const MOCK_TRIAL_SESSION = {
    caseOrder: [
      { caseId: MOCK_CASE.caseId },
      { caseId: 'fa1179bd-04f5-4934-a716-964d8d7babc6' },
    ],
    maxCases: 100,
    sessionType: 'Regular',
    startDate: '3000-03-01T00:00:00.000Z',
    term: 'Fall',
    termYear: '3000',
    trialLocation: 'Birmingham, Alabama',
    trialSessionId: '959c4338-0fac-42eb-b0eb-d53b8d0195cc',
  };

  let user;
  let mockTrialSession;

  beforeEach(() => {
    user = {
      role: User.ROLES.petitionsClerk,
      userId: 'petitionsclerk',
    };

    applicationContext.getCurrentUser.mockImplementation(() => user);

    applicationContext.getPersistenceGateway().getCaseByCaseId.mockReturnValue({
      ...MOCK_CASE,
      associatedJudge: 'someone',
      trialLocation: 'Boise, Idaho',
      trialSessionId: 'abcd',
    });
    applicationContext
      .getPersistenceGateway()
      .getTrialSessionById.mockImplementation(() => mockTrialSession);

    applicationContext
      .getPersistenceGateway()
      .updateCase.mockImplementation(v => v.caseToUpdate);
  });

  it('throws error if user is unauthorized', async () => {
    user = {
      role: User.ROLES.petitioner,
      userId: 'petitioner',
    };
    mockTrialSession = MOCK_TRIAL_SESSION;

    await expect(
      removeCaseFromTrialInteractor({
        applicationContext,
        caseId: MOCK_CASE.caseId,
        disposition: 'because',
        trialSessionId: MOCK_TRIAL_SESSION.trialSessionId,
      }),
    ).rejects.toThrow();
  });

  it('calls getTrialSessionById, updateTrialSession, getCaseByCaseId, and updateCase persistence methods with correct parameters for a calendared session', async () => {
    mockTrialSession = { ...MOCK_TRIAL_SESSION, isCalendared: true };

    await removeCaseFromTrialInteractor({
      applicationContext,
      caseId: MOCK_CASE.caseId,
      disposition: 'because',
      trialSessionId: MOCK_TRIAL_SESSION.trialSessionId,
    });

    expect(
      applicationContext.getPersistenceGateway().getTrialSessionById,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().getTrialSessionById.mock
        .calls[0][0].trialSessionId,
    ).toEqual(MOCK_TRIAL_SESSION.trialSessionId);
    expect(
      applicationContext.getPersistenceGateway().updateTrialSession,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().updateTrialSession.mock
        .calls[0][0].trialSessionToUpdate,
    ).toMatchObject({
      ...MOCK_TRIAL_SESSION,
      caseOrder: [
        {
          caseId: MOCK_CASE.caseId,
          disposition: 'because',
          removedFromTrial: true,
        },
        { caseId: 'fa1179bd-04f5-4934-a716-964d8d7babc6' },
      ],
    });
    expect(
      applicationContext.getPersistenceGateway().getCaseByCaseId,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().getCaseByCaseId.mock
        .calls[0][0].caseId,
    ).toEqual(MOCK_CASE.caseId);
    expect(
      applicationContext.getPersistenceGateway()
        .createCaseTrialSortMappingRecords,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway()
        .createCaseTrialSortMappingRecords.mock.calls[0][0].caseId,
    ).toEqual(MOCK_CASE.caseId);
    expect(applicationContext.getPersistenceGateway().updateCase).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().updateCase.mock.calls[0][0]
        .caseToUpdate,
    ).toMatchObject({
      associatedJudge: Case.CHIEF_JUDGE,
      caseId: MOCK_CASE.caseId,
      status: Case.STATUS_TYPES.generalDocketReadyForTrial,
      trialLocation: undefined,
      trialSessionId: undefined,
    });
  });

  it('calls getTrialSessionById, updateTrialSession, getCaseByCaseId, and updateCase persistence methods with correct parameters for a not calendared session', async () => {
    mockTrialSession = { ...MOCK_TRIAL_SESSION, isCalendared: false };

    await removeCaseFromTrialInteractor({
      applicationContext,
      caseId: MOCK_CASE.caseId,
      disposition: 'because',
      trialSessionId: MOCK_TRIAL_SESSION.trialSessionId,
    });

    expect(
      applicationContext.getPersistenceGateway().getTrialSessionById,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().getTrialSessionById.mock
        .calls[0][0].trialSessionId,
    ).toEqual(MOCK_TRIAL_SESSION.trialSessionId);
    expect(
      applicationContext.getPersistenceGateway().updateTrialSession,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().updateTrialSession.mock
        .calls[0][0].trialSessionToUpdate,
    ).toMatchObject({
      ...MOCK_TRIAL_SESSION,
      caseOrder: [{ caseId: 'fa1179bd-04f5-4934-a716-964d8d7babc6' }],
    });
    expect(
      applicationContext.getPersistenceGateway().getCaseByCaseId,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().getCaseByCaseId.mock
        .calls[0][0].caseId,
    ).toEqual(MOCK_CASE.caseId);
    expect(
      applicationContext.getPersistenceGateway()
        .createCaseTrialSortMappingRecords,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway()
        .createCaseTrialSortMappingRecords.mock.calls[0][0].caseId,
    ).toEqual(MOCK_CASE.caseId);
    expect(applicationContext.getPersistenceGateway().updateCase).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().updateCase.mock.calls[0][0]
        .caseToUpdate,
    ).toMatchObject({
      associatedJudge: Case.CHIEF_JUDGE,
      caseId: MOCK_CASE.caseId,
      status: Case.STATUS_TYPES.generalDocketReadyForTrial,
      trialLocation: undefined,
      trialSessionId: undefined,
    });
  });

  it('updates work items to be not high priority', async () => {
    mockTrialSession = { ...MOCK_TRIAL_SESSION, isCalendared: true };

    await removeCaseFromTrialInteractor({
      applicationContext,
      caseId: MOCK_CASE.caseId,
      disposition: 'because',
      trialSessionId: MOCK_TRIAL_SESSION.trialSessionId,
    });

    expect(
      applicationContext.getPersistenceGateway().setPriorityOnAllWorkItems,
    ).toBeCalled();
    expect(
      applicationContext.getPersistenceGateway().setPriorityOnAllWorkItems.mock
        .calls[0][0],
    ).toMatchObject({
      highPriority: false,
    });
  });
});
