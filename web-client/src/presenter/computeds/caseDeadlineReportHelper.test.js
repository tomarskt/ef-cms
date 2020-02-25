import { applicationContext } from '../../applicationContext';
import {
  caseDeadlineReportHelper as caseDeadlineReportHelperComputed,
  sortByDateAndDocketNumber,
} from './caseDeadlineReportHelper';
import { runCompute } from 'cerebral/test';
import { withAppContextDecorator } from '../../withAppContext';

const caseDeadlineReportHelper = withAppContextDecorator(
  caseDeadlineReportHelperComputed,
);

const caseDeadlines = [
  {
    associatedJudge: 'Hale',
    deadlineDate: '2019-08-22T04:00:00.000Z',
    docketNumber: '101-19',
  },
  {
    associatedJudge: 'Brandeis',
    deadlineDate: '2019-08-24T04:00:00.000Z',
    docketNumber: '103-19',
  },
  {
    associatedJudge: 'Rummy',
    deadlineDate: '2019-08-21T04:00:00.000Z',
    docketNumber: '101-19',
  },
  {
    associatedJudge: 'Renjie',
    deadlineDate: '2019-08-21T04:00:00.000Z',
    docketNumber: '102-19',
  },
];

describe('caseDeadlineReportHelper', () => {
  it('should run without state', () => {
    let result = runCompute(caseDeadlineReportHelper, {
      state: {},
    });
    expect(result.caseDeadlineCount).toEqual(0);
    expect(result.caseDeadlines).toEqual([]);
    expect(result.formattedFilterDateHeader).toBeTruthy();
  });

  it('should use only the formatted startDate in header if start and end date are on the same day', () => {
    let result = runCompute(caseDeadlineReportHelper, {
      state: {
        allCaseDeadlines: caseDeadlines,
        screenMetadata: {
          filterEndDate: '2019-08-21T12:59:59.000Z',
          filterStartDate: '2019-08-21T04:00:00.000Z',
        },
      },
    });
    expect(result.formattedFilterDateHeader).toEqual('August 21, 2019');
  });

  it('should filter deadlines by filterStartDate without a filterEndDate and sort by docket number', () => {
    let result = runCompute(caseDeadlineReportHelper, {
      state: {
        allCaseDeadlines: caseDeadlines,
        screenMetadata: {
          filterStartDate: '2019-08-21T04:00:00.000Z',
        },
      },
    });
    expect(result.caseDeadlineCount).toEqual(2);
    expect(result.caseDeadlines).toMatchObject([
      {
        deadlineDate: '2019-08-21T04:00:00.000Z',
        docketNumber: '101-19',
      },
      {
        deadlineDate: '2019-08-21T04:00:00.000Z',
        docketNumber: '102-19',
      },
    ]);
    expect(result.formattedFilterDateHeader).toEqual('August 21, 2019');
  });

  it('should filter deadlines by filterStartDate and filterEndDate and sort by date and docket number', () => {
    let result = runCompute(caseDeadlineReportHelper, {
      state: {
        allCaseDeadlines: caseDeadlines,
        screenMetadata: {
          filterEndDate: '2019-08-23T04:00:00.000Z',
          filterStartDate: '2019-08-21T04:00:00.000Z',
        },
      },
    });
    expect(result.caseDeadlineCount).toEqual(3);
    expect(result.caseDeadlines).toMatchObject([
      {
        deadlineDate: '2019-08-21T04:00:00.000Z',
        docketNumber: '101-19',
      },
      {
        deadlineDate: '2019-08-21T04:00:00.000Z',
        docketNumber: '102-19',
      },
      {
        deadlineDate: '2019-08-22T04:00:00.000Z',
        docketNumber: '101-19',
      },
    ]);
    expect(result.formattedFilterDateHeader).toEqual(
      'August 21, 2019 – August 23, 2019',
    );
  });

  it('should filter deadlines by judge when a judge is selected', () => {
    const filteredCaseDeadlines = runCompute(caseDeadlineReportHelper, {
      state: {
        allCaseDeadlines: caseDeadlines,
        screenMetadata: {
          caseDeadlinesFilter: {
            judge: 'Rummy',
          },
          filterEndDate: '2019-08-23T04:00:00.000Z',
          filterStartDate: '2019-08-21T04:00:00.000Z',
        },
      },
    });

    expect(filteredCaseDeadlines.caseDeadlineCount).toEqual(1);
    expect(filteredCaseDeadlines.caseDeadlines).toMatchObject([
      {
        associatedJudge: 'Rummy',
        deadlineDate: '2019-08-21T04:00:00.000Z',
        docketNumber: '101-19',
      },
    ]);
  });

  describe('sortByDateAndDocketNumber', () => {
    it('compares cases by docket number if dates are equal', () => {
      let result = sortByDateAndDocketNumber(applicationContext)(
        {
          deadlineDate: '2019-11-25T04:00:00.000Z',
          docketNumber: '101-19',
        },
        {
          deadlineDate: '2019-11-25T04:00:00.000Z',
          docketNumber: '101-18',
        },
      );
      expect(result).toEqual(1);
    });

    it('returns -1 if the second date is after the first', () => {
      let result = sortByDateAndDocketNumber(applicationContext)(
        {
          deadlineDate: '2019-11-25T04:00:00.000Z',
          docketNumber: '101-19',
        },
        {
          deadlineDate: '2019-11-27T04:00:00.000Z',
          docketNumber: '101-18',
        },
      );
      expect(result).toEqual(-1);
    });

    it('returns 1 if the second date is before the first', () => {
      let result = sortByDateAndDocketNumber(applicationContext)(
        {
          deadlineDate: '2019-11-25T04:00:00.000Z',
          docketNumber: '101-19',
        },
        {
          deadlineDate: '2019-11-23T04:00:00.000Z',
          docketNumber: '101-18',
        },
      );
      expect(result).toEqual(1);
    });
  });
});
