const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  generatePrintableCaseInventoryReportInteractor,
} = require('./generatePrintableCaseInventoryReportInteractor');
const { User } = require('../../entities/User');

describe('generatePrintableCaseInventoryReportInteractor', () => {
  it('calls generateCaseInventoryReportPdf function and returns result', async () => {
    applicationContext.getCurrentUser.mockReturnValue({
      role: User.ROLES.petitionsClerk,
      userId: 'petitionsclerk',
    });
    applicationContext
      .getUseCaseHelpers()
      .generateCaseInventoryReportPdf.mockReturnValue('https://example.com');
    applicationContext
      .getPersistenceGateway()
      .getCaseInventoryReport.mockReturnValue([]);

    const results = await generatePrintableCaseInventoryReportInteractor({
      applicationContext,
      associatedJudge: 'Judge Armen',
    });

    expect(
      applicationContext.getUseCaseHelpers().generateCaseInventoryReportPdf,
    ).toHaveBeenCalled();
    expect(results).toEqual('https://example.com');
  });

  it('should throw an unauthorized error if the user does not have access', async () => {
    applicationContext.getCurrentUser.mockReturnValue({
      role: User.ROLES.petitioner,
      userId: 'petitioner',
    });

    await expect(
      generatePrintableCaseInventoryReportInteractor({
        applicationContext,
        associatedJudge: 'Judge Armen',
      }),
    ).rejects.toThrow('Unauthorized');
  });

  it('should throw an error if associatedJudge and status are not passed in', async () => {
    applicationContext.getCurrentUser.mockReturnValue({
      role: User.ROLES.petitionsClerk,
      userId: 'petitionsclerk',
    });

    await expect(
      generatePrintableCaseInventoryReportInteractor({
        applicationContext,
      }),
    ).rejects.toThrow('Either judge or status must be provided');
  });
});
