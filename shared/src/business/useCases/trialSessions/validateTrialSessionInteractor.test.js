const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  NewTrialSession,
} = require('../../entities/trialSessions/NewTrialSession');
const {
  validateTrialSessionInteractor,
} = require('./validateTrialSessionInteractor');
const { omit } = require('lodash');

const { formatNow } = require('../../utilities/DateHandler');

describe('validateTrialSessionInteractor', () => {
  it('returns the expected errors object on an empty trial session', () => {
    const errors = validateTrialSessionInteractor({
      applicationContext,
      trialSession: {},
    });

    expect(Object.keys(errors)).toEqual(
      Object.keys(
        omit(NewTrialSession.VALIDATION_ERROR_MESSAGES, [
          'postalCode',
          'swingSessionId',
          'startTime',
        ]),
      ),
    );
  });

  it('returns null for a valid trial session', () => {
    const nextYear = (parseInt(formatNow('YYYY')) + 1).toString();
    const MOCK_TRIAL = {
      maxCases: 100,
      sessionType: 'Regular',
      startDate: `${nextYear}-12-01T00:00:00.000Z`,
      term: 'Fall',
      termYear: nextYear,
      trialLocation: 'Birmingham, Alabama',
    };

    const errors = validateTrialSessionInteractor({
      applicationContext,
      trialSession: { ...MOCK_TRIAL },
    });

    expect(errors).toEqual(null);
  });
});
