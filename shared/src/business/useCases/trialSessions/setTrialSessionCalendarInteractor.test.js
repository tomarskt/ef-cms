const {
  setTrialSessionCalendarInteractor,
} = require('./setTrialSessionCalendarInteractor');
const { User } = require('../../entities/User');

const { MOCK_CASE } = require('../../../test/mockCase');

const MOCK_TRIAL = {
  maxCases: 100,
  sessionType: 'Regular',
  startDate: '2025-12-01T00:00:00.000Z',
  term: 'Fall',
  termYear: '2025',
  trialLocation: 'Birmingham, Alabama',
};

describe('setTrialSessionCalendarInteractor', () => {
  let applicationContext;

  it('throws an exception when there is a permissions issue', async () => {
    applicationContext = {
      getCurrentUser: () => {
        return new User({
          name: 'Petitioner',
          role: User.ROLES.petitioner,
          userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
        });
      },
      getPersistenceGateway: () => ({
        deleteCaseTrialSortMappingRecords: () => {},
        getEligibleCasesForTrialSession: () => [MOCK_CASE],
        getTrialSessionById: () => MOCK_TRIAL,
        updateCase: () => {},
        updateTrialSession: () => {},
      }),
      getUniqueId: () => 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    };

    let error;

    try {
      await setTrialSessionCalendarInteractor({
        applicationContext,
        trialSessionId: '6805d1ab-18d0-43ec-bafb-654e83405416',
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });

  it('should set a trial session to "calendared" and calendar all cases that have been QCed', async () => {
    let updateTrialSession = jest
      .fn()
      .mockImplementation(v => v.trialSessionToUpdate);
    let updateCaseSpy = jest.fn();

    applicationContext = {
      getCurrentUser: () => {
        return new User({
          name: 'petitionsClerk',
          role: User.ROLES.petitionsClerk,
          userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
        });
      },
      getPersistenceGateway: () => ({
        deleteCaseTrialSortMappingRecords: () => {},
        getCalendaredCasesForTrialSession: () => [
          {
            ...MOCK_CASE,
            caseId: '1f1aa3f7-e2e3-43e6-885d-4ce341588c76',
            docketNumber: '102-19',
            qcCompleteForTrial: {
              '6805d1ab-18d0-43ec-bafb-654e83405416': true,
            },
          },
        ],
        getEligibleCasesForTrialSession: () => [
          {
            ...MOCK_CASE,
            qcCompleteForTrial: {
              '6805d1ab-18d0-43ec-bafb-654e83405416': true,
            },
          },
        ],
        getTrialSessionById: () => MOCK_TRIAL,
        setPriorityOnAllWorkItems: () => {},
        updateCase: updateCaseSpy,
        updateTrialSession,
      }),
      getUniqueId: () => 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    };

    await setTrialSessionCalendarInteractor({
      applicationContext,
      trialSessionId: '6805d1ab-18d0-43ec-bafb-654e83405416',
    });
    expect(updateCaseSpy).toBeCalled();
  });

  it('should set a trial session to "calendared" but not calendar cases that have not been QCed', async () => {
    let updateTrialSession = jest
      .fn()
      .mockImplementation(v => v.trialSessionToUpdate);
    let updateCaseSpy = jest.fn();
    applicationContext = {
      getCurrentUser: () => {
        return new User({
          name: 'petitionsClerk',
          role: User.ROLES.petitionsClerk,
          userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
        });
      },
      getPersistenceGateway: () => ({
        deleteCaseTrialSortMappingRecords: () => {},
        getCalendaredCasesForTrialSession: () => [
          {
            ...MOCK_CASE,
            caseId: '1f1aa3f7-e2e3-43e6-885d-4ce341588c76',
            docketNumber: '102-19',
            qcCompleteForTrial: {
              '6805d1ab-18d0-43ec-bafb-654e83405416': false,
            },
          },
        ],
        getEligibleCasesForTrialSession: () => [
          {
            ...MOCK_CASE,
            qcCompleteForTrial: {
              '6805d1ab-18d0-43ec-bafb-654e83405416': false,
            },
          },
        ],
        getTrialSessionById: () => MOCK_TRIAL,
        updateCase: updateCaseSpy,
        updateTrialSession,
      }),
      getUniqueId: () => 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    };

    await setTrialSessionCalendarInteractor({
      applicationContext,
      trialSessionId: '6805d1ab-18d0-43ec-bafb-654e83405416',
    });
    expect(updateCaseSpy).not.toBeCalled();
  });

  it('should set work items as high priority for each case that is calendared', async () => {
    const setPriorityOnAllWorkItemsSpy = jest.fn();

    applicationContext = {
      getCurrentUser: () => {
        return new User({
          name: 'petitionsClerk',
          role: User.ROLES.petitionsClerk,
          userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
        });
      },
      getPersistenceGateway: () => ({
        deleteCaseTrialSortMappingRecords: () => {},
        getCalendaredCasesForTrialSession: () => [
          {
            ...MOCK_CASE,
            caseId: '1f1aa3f7-e2e3-43e6-885d-4ce341588c76',
            docketNumber: '102-19',
            qcCompleteForTrial: {
              '6805d1ab-18d0-43ec-bafb-654e83405416': true,
            },
          },
        ],
        getEligibleCasesForTrialSession: () => [
          {
            ...MOCK_CASE,
            qcCompleteForTrial: {
              '6805d1ab-18d0-43ec-bafb-654e83405416': true,
            },
          },
        ],
        getTrialSessionById: () => MOCK_TRIAL,
        setPriorityOnAllWorkItems: setPriorityOnAllWorkItemsSpy,
        updateCase: () => {},
        updateTrialSession: v => v.trialSessionToUpdate,
      }),
      getUniqueId: () => 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    };

    await setTrialSessionCalendarInteractor({
      applicationContext,
      trialSessionId: '6805d1ab-18d0-43ec-bafb-654e83405416',
    });

    expect(setPriorityOnAllWorkItemsSpy).toBeCalled();
    expect(setPriorityOnAllWorkItemsSpy.mock.calls.length).toEqual(2);
    expect(setPriorityOnAllWorkItemsSpy.mock.calls[0][0]).toMatchObject({
      caseId: '1f1aa3f7-e2e3-43e6-885d-4ce341588c76',
      highPriority: true,
      trialDate: '2025-12-01T00:00:00.000Z',
    });
    expect(setPriorityOnAllWorkItemsSpy.mock.calls[1][0]).toMatchObject({
      caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      highPriority: true,
      trialDate: '2025-12-01T00:00:00.000Z',
    });
  });
});
