import { User } from '../../../../shared/src/business/entities/User';
import { runCompute } from 'cerebral/test';
import { trialSessionsHelper as trialSessionsHelperComputed } from './trialSessionsHelper';
import { withAppContextDecorator } from '../../withAppContext';

let currentUser = {
  role: User.ROLES.judge,
  userId: '777',
};

const trialSessionsHelper = withAppContextDecorator(
  trialSessionsHelperComputed,
  {
    getCurrentUser: () => currentUser,
  },
);

describe('trialSessionsHelper', () => {
  it('should show the Notice Issued column for `open` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'open',
        },
      },
    });

    expect(result.showNoticeIssued).toEqual(true);
  });

  it('should NOT show the Notice Issued column for `new` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'new',
        },
      },
    });

    expect(result.showNoticeIssued).toEqual(false);
  });

  it('should NOT show the Notice Issued column for `closed` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'closed',
        },
      },
    });

    expect(result.showNoticeIssued).toEqual(false);
  });

  it('should NOT show the Notice Issued column for `all` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'all',
        },
      },
    });

    expect(result.showNoticeIssued).toEqual(false);
  });

  it('should show the Number of Cases column for `open` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'open',
        },
      },
    });

    expect(result.showNumberOfCases).toEqual(true);
  });

  it('should NOT show the Number of Cases column for `new` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'new',
        },
      },
    });

    expect(result.showNumberOfCases).toEqual(false);
  });

  it('should NOT show the Number of Cases column for `closed` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'closed',
        },
      },
    });

    expect(result.showNumberOfCases).toEqual(false);
  });

  it('should NOT show the Number of Cases column for `all` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'all',
        },
      },
    });

    expect(result.showNumberOfCases).toEqual(false);
  });

  it('should show the Session Status column for `all` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'all',
        },
      },
    });

    expect(result.showSessionStatus).toEqual(true);
  });

  it('should NOT show the Session Status column for `new` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'new',
        },
      },
    });

    expect(result.showSessionStatus).toEqual(false);
  });

  it('should NOT show the Session Status column for `open` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'open',
        },
      },
    });

    expect(result.showSessionStatus).toEqual(false);
  });

  it('should NOT show the Session Status column for `closed` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'closed',
        },
      },
    });

    expect(result.showSessionStatus).toEqual(false);
  });

  it('should show 0 additional table columns for `new` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'new',
        },
      },
    });

    expect(result.additionalColumnsShown).toEqual(0);
  });

  it('should show 0 additional table columns for `closed` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'closed',
        },
      },
    });

    expect(result.additionalColumnsShown).toEqual(0);
  });

  it('should show 2 additional table columns for `open` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'open',
        },
      },
    });

    expect(result.additionalColumnsShown).toEqual(2);
  });

  it('should show 1 additional table column for `all` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'all',
        },
      },
    });

    expect(result.additionalColumnsShown).toEqual(1);
  });

  it('should show the `unassigned` judge filter for `new` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'new',
        },
      },
    });

    expect(result.showUnassignedJudgeFilter).toBeTruthy();
  });

  it('should NOT show the `unassigned` judge filter for `open` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'open',
        },
      },
    });

    expect(result.showUnassignedJudgeFilter).toBeFalsy();
  });

  it('should NOT show the `unassigned` judge filter for `closed` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'close',
        },
      },
    });

    expect(result.showUnassignedJudgeFilter).toBeFalsy();
  });

  it('should NOT show the `unassigned` judge filter for `all` sessions', () => {
    const result = runCompute(trialSessionsHelper, {
      state: {
        trialSessionsTab: {
          group: 'all',
        },
      },
    });

    expect(result.showUnassignedJudgeFilter).toBeFalsy();
  });
});
