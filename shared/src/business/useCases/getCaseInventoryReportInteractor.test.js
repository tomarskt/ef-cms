const {
  getCaseInventoryReportInteractor,
} = require('./getCaseInventoryReportInteractor');
const { User } = require('../entities/User');

describe('getCaseInventoryReportInteractor', () => {
  let applicationContext;
  let user;
  let getCaseInventoryReportMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    user = {
      role: User.ROLES.docketClerk,
      userId: '9754a349-1013-44fa-9e61-d39aba2637e0',
    };

    applicationContext = {
      getCurrentUser: () => user,
      getUseCaseHelpers: () => ({
        getCaseInventoryReport: getCaseInventoryReportMock,
      }),
    };
  });

  it('throws an error if user is not authorized for case inventory report', async () => {
    user = {
      role: User.ROLES.petitioner, //petitioner does not have CASE_INVENTORY_REPORT permission
      userId: '8e20dd1b-d142-40f4-8362-6297f1be68bf',
    };

    await expect(
      getCaseInventoryReportInteractor({
        applicationContext,
        associatedJudge: 'Chief Judge',
      }),
    ).rejects.toThrow('Unauthorized for case inventory report');
  });

  it('throws an error if associatedJudge and status are not passed in', async () => {
    await expect(
      getCaseInventoryReportInteractor({
        applicationContext,
      }),
    ).rejects.toThrow('Either judge or status must be provided');
  });

  it('calls getCaseInventoryReport useCaseHelper with appropriate params and returns its result', async () => {
    const mockCaseResult = {
      associatedJudge: 'Chief Judge',
      caseCaption: 'A Test Caption',
      docketNumber: '123-20',
      docketNumberSuffix: 'L',
      status: 'New',
    };
    getCaseInventoryReportMock = jest.fn().mockReturnValue([mockCaseResult]);

    const result = await getCaseInventoryReportInteractor({
      applicationContext,
      associatedJudge: 'Chief Judge',
      status: 'New',
    });

    expect(getCaseInventoryReportMock).toBeCalledWith({
      applicationContext: expect.anything(),
      associatedJudge: 'Chief Judge',
      status: 'New',
    });
    expect(result).toEqual([mockCaseResult]);
  });
});
