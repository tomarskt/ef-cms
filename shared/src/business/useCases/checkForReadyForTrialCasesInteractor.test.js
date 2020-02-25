const sinon = require('sinon');
const {
  checkForReadyForTrialCasesInteractor,
} = require('./checkForReadyForTrialCasesInteractor');
const { Case } = require('../entities/cases/Case');
const { MOCK_CASE } = require('../../test/mockCase');
const { MOCK_USERS } = require('../../test/mockUsers');

describe('checkForReadyForTrialCasesInteractor', () => {
  let applicationContext;
  let updateCaseSpy;

  it('should successfully run without error', async () => {
    const getAllCatalogCasesSpy = sinon.stub().returns([]);
    applicationContext = {
      getPersistenceGateway: () => ({
        createCaseTrialSortMappingRecords: () => {},
        getAllCatalogCases: getAllCatalogCasesSpy,
        getCaseByCaseId: () => MOCK_CASE,
        getCurrentUser: () =>
          MOCK_USERS['a7d90c05-f6cd-442c-a168-202db587f16f'],
        updateCase: () => {},
      }),
      logger: {
        info: () => {},
      },
    };

    let error;

    try {
      await checkForReadyForTrialCasesInteractor({
        applicationContext,
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
    expect(getAllCatalogCasesSpy.called).toEqual(true);
  });

  it('should not check case if no case is found', async () => {
    const getAllCatalogCasesSpy = sinon
      .stub()
      .returns([{ caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb' }]);
    applicationContext = {
      getPersistenceGateway: () => ({
        createCaseTrialSortMappingRecords: () => {},
        getAllCatalogCases: getAllCatalogCasesSpy,
        getCaseByCaseId: () => undefined,
        updateCase: () => {},
      }),
      logger: {
        info: () => {},
      },
    };

    let error;

    try {
      await checkForReadyForTrialCasesInteractor({
        applicationContext,
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
    expect(getAllCatalogCasesSpy.called).toEqual(true);
  });

  it("should only check cases that are 'general docket not at issue'", async () => {
    updateCaseSpy = sinon.spy();
    applicationContext = {
      getCurrentUser: () => MOCK_USERS['a7d90c05-f6cd-442c-a168-202db587f16f'],
      getPersistenceGateway: () => ({
        createCaseTrialSortMappingRecords: () => {},
        getAllCatalogCases: () => [
          { caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb' },
        ],
        getCaseByCaseId: () => MOCK_CASE,
        updateCase: updateCaseSpy,
      }),
      logger: {
        info: () => {},
      },
    };

    let error;

    try {
      await checkForReadyForTrialCasesInteractor({
        applicationContext,
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
    expect(updateCaseSpy.called).toEqual(false);
  });

  it("should not update case to 'ready for trial' if it does not have answer document", async () => {
    updateCaseSpy = sinon.spy();
    applicationContext = {
      getCurrentUser: () => MOCK_USERS['a7d90c05-f6cd-442c-a168-202db587f16f'],
      getPersistenceGateway: () => ({
        getAllCatalogCases: () => [
          { caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb' },
        ],
        getCaseByCaseId: () => ({
          ...MOCK_CASE,
          documents: [
            {
              createdAt: '2018-11-21T20:49:28.192Z',
              documentId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
              documentType: 'Petition',
              processingStatus: 'pending',
              userId: 'petitioner',
              workItems: [],
            },
          ],
          status: Case.STATUS_TYPES.generalDocket,
        }),
        updateCase: updateCaseSpy,
      }),
      logger: {
        info: () => {},
      },
    };

    let error;

    try {
      await checkForReadyForTrialCasesInteractor({
        applicationContext,
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
    expect(updateCaseSpy.called).toEqual(false);
  });

  it("should update cases to 'ready for trial' that meet requirements", async () => {
    /**
     * Requirements:
     * 1. Case has status 'General Docket - Not at Issue'
     * 2. Case has had an 'Answer' type document filed
     * 3. The cutoff(45 days) has passed since the first Answer document was submitted.
     */

    updateCaseSpy = sinon.spy();
    applicationContext = {
      getCurrentUser: () => MOCK_USERS['a7d90c05-f6cd-442c-a168-202db587f16f'],
      getPersistenceGateway: () => ({
        createCaseTrialSortMappingRecords: () => {},
        getAllCatalogCases: () => [
          { caseId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb' },
        ],
        getCaseByCaseId: () => ({
          ...MOCK_CASE,
          status: Case.STATUS_TYPES.generalDocket,
        }),
        updateCase: updateCaseSpy,
      }),
      logger: {
        info: () => {},
      },
    };

    let error;

    try {
      await checkForReadyForTrialCasesInteractor({
        applicationContext,
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
    expect(updateCaseSpy.called).toEqual(true);
  });
});
