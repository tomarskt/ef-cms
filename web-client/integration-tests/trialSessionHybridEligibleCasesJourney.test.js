import { setupTest } from './helpers';
import { uploadPetition } from './helpers';
import captureCreatedCase from './journey/captureCreatedCase';
import docketClerkCreatesATrialSession from './journey/docketClerkCreatesATrialSession';
import docketClerkLogIn from './journey/docketClerkLogIn';
import docketClerkSetsCaseReadyForTrial from './journey/docketClerkSetsCaseReadyForTrial';
import docketClerkViewsNewTrialSession from './journey/docketClerkViewsNewTrialSession';
import docketClerkViewsTrialSessionList from './journey/docketClerkViewsTrialSessionList';
import markAllCasesAsQCed from './journey/markAllCasesAsQCed';
import petitionerLogin from './journey/petitionerLogIn';
import petitionerViewsDashboard from './journey/petitionerViewsDashboard';
import petitionsClerkLogIn from './journey/petitionsClerkLogIn';
import petitionsClerkSetsATrialSessionsSchedule from './journey/petitionsClerkSetsATrialSessionsSchedule';
import petitionsClerkSubmitsCaseToIrs from './journey/petitionsClerkSubmitsCaseToIrs';
import petitionsClerkUpdatesFiledBy from './journey/petitionsClerkUpdatesFiledBy';
import userSignsOut from './journey/petitionerSignsOut';

const test = setupTest();

describe('Trial Session Eligible Cases - Both small and regular cases get scheduled to the trial session that’s a hybrid session', () => {
  beforeAll(() => {
    jest.setTimeout(30000);
  });

  afterAll(() => {
    test.closeSocket();
  });
  const trialLocation = `Despacito, Texas, ${Date.now()}`;
  const overrides = {
    maxCases: 2,
    preferredTrialCity: trialLocation,
    sessionType: 'Hybrid',
    trialLocation,
  };
  const createdCases = [];

  describe(`Create trial session with Hybrid session type for '${trialLocation}' with max case count = 2`, () => {
    docketClerkLogIn(test);
    docketClerkCreatesATrialSession(test, overrides);
    docketClerkViewsTrialSessionList(test, overrides);
    docketClerkViewsNewTrialSession(test);
    userSignsOut(test);
  });

  describe('Create cases', () => {
    describe(`Case with status “General Docket - At Issue (Ready For Trial)” for '${trialLocation}' with Small case type with filed date 1/1/2019`, () => {
      const caseOverrides = {
        ...overrides,
        caseType: 'Deficiency',
        procedureType: 'Small',
        receivedAtDay: '01',
        receivedAtMonth: '01',
        receivedAtYear: '2019',
      };
      petitionerLogin(test);
      it('Create case #1', async () => {
        await uploadPetition(test, caseOverrides);
      });
      petitionerViewsDashboard(test);
      captureCreatedCase(test, createdCases);
      userSignsOut(test);
      petitionsClerkLogIn(test);
      petitionsClerkUpdatesFiledBy(test, caseOverrides);
      petitionsClerkSubmitsCaseToIrs(test);
      userSignsOut(test);
      docketClerkLogIn(test);
      docketClerkSetsCaseReadyForTrial(test);
      userSignsOut(test);
    });

    describe(`Case with status “General Docket - At Issue (Ready For Trial)” for '${trialLocation}' with Regular case type with filed date 1/2/2019`, () => {
      const caseOverrides = {
        ...overrides,
        caseType: 'Deficiency',
        procedureType: 'Regular',
        receivedAtDay: '02',
        receivedAtMonth: '01',
        receivedAtYear: '2019',
      };
      petitionerLogin(test);
      it('Create case #2', async () => {
        await uploadPetition(test, caseOverrides);
      });
      petitionerViewsDashboard(test);
      captureCreatedCase(test, createdCases);
      userSignsOut(test);
      petitionsClerkLogIn(test);
      petitionsClerkUpdatesFiledBy(test, caseOverrides);
      petitionsClerkSubmitsCaseToIrs(test);
      userSignsOut(test);
      docketClerkLogIn(test);
      docketClerkSetsCaseReadyForTrial(test);
      userSignsOut(test);
    });

    describe(`Case with status “General Docket - At Issue (Ready For Trial)” for '${trialLocation}' with Small case type with filed date 2/1/2019`, () => {
      const caseOverrides = {
        ...overrides,
        caseType: 'Deficiency',
        procedureType: 'Small',
        receivedAtDay: '01',
        receivedAtMonth: '02',
        receivedAtYear: '2019',
      };
      petitionerLogin(test);
      it('Create case #3', async () => {
        await uploadPetition(test, caseOverrides);
      });
      petitionerViewsDashboard(test);
      captureCreatedCase(test, createdCases);
      userSignsOut(test);
      petitionsClerkLogIn(test);
      petitionsClerkUpdatesFiledBy(test, caseOverrides);
      petitionsClerkSubmitsCaseToIrs(test);
      userSignsOut(test);
      docketClerkLogIn(test);
      docketClerkSetsCaseReadyForTrial(test);
      userSignsOut(test);
    });
  });

  describe(`Result: Case #1, #2, and #3 should show as eligible for '${trialLocation}' session`, () => {
    petitionsClerkLogIn(test);

    it(`Case #1, #2, and #3 should show as eligible for '${trialLocation}' session`, async () => {
      await test.runSequence('gotoTrialSessionDetailSequence', {
        trialSessionId: test.trialSessionId,
      });

      expect(test.getState('trialSession.eligibleCases').length).toEqual(3);
      expect(test.getState('trialSession.eligibleCases.0.caseId')).toEqual(
        createdCases[0],
      );
      expect(test.getState('trialSession.eligibleCases.1.caseId')).toEqual(
        createdCases[1],
      );
      expect(test.getState('trialSession.eligibleCases.2.caseId')).toEqual(
        createdCases[2],
      );
      expect(test.getState('trialSession.isCalendared')).toEqual(false);
    });

    userSignsOut(test);
  });

  describe('Calendar clerk marks all eligible cases as QCed', () => {
    petitionsClerkLogIn(test);
    markAllCasesAsQCed(test, () => [
      createdCases[0],
      createdCases[1],
      createdCases[2],
    ]);
    userSignsOut(test);
  });

  describe(`Set calendar for '${trialLocation}' session`, () => {
    petitionsClerkLogIn(test);
    petitionsClerkSetsATrialSessionsSchedule(test);
    userSignsOut(test);
  });

  describe(`Result: Case #1 and #2 are assigned to '${trialLocation}' session`, () => {
    petitionsClerkLogIn(test);

    it(`Case #1 and #2 are assigned to '${trialLocation}' session`, async () => {
      await test.runSequence('gotoTrialSessionDetailSequence', {
        trialSessionId: test.trialSessionId,
      });

      expect(test.getState('trialSession.calendaredCases').length).toEqual(2);
      expect(test.getState('trialSession.isCalendared')).toEqual(true);
      expect(test.getState('trialSession.calendaredCases.0.caseId')).toEqual(
        createdCases[0],
      );
      expect(test.getState('trialSession.calendaredCases.1.caseId')).toEqual(
        createdCases[1],
      );
    });

    userSignsOut(test);
  });
});
