import { applicationContextForClient as applicationContext } from '../../../../shared/src/business/test/createTestApplicationContext';
import { presenter } from '../presenter-mock';
import { runAction } from 'cerebral/test';
import { validateCaseDetailAction } from './validateCaseDetailAction';

describe('validateCaseDetail', () => {
  let successStub;
  let errorStub;

  beforeAll(() => {
    successStub = jest.fn();
    errorStub = jest.fn();

    presenter.providers.applicationContext = applicationContext;
    presenter.providers.path = {
      error: errorStub,
      success: successStub,
    };

    applicationContext
      .getUseCases()
      .validateCaseDetailInteractor.mockReturnValue(null);
  });
  it('should call the success path when no errors are found', async () => {
    await runAction(validateCaseDetailAction, {
      modules: {
        presenter,
      },
      props: {
        formWithComputedDates: {
          caseId: '123',
          irsNoticeDate: '2009-10-13',
        },
      },
      state: {},
    });
    expect(
      applicationContext.getUseCases().validateCaseDetailInteractor.mock
        .calls[0][0].caseDetail,
    ).toMatchObject({
      caseId: '123',
      irsNoticeDate: '2009-10-13',
    });
    expect(successStub.mock.calls.length).toEqual(1);
  });

  it('should call the error path when any errors are found', async () => {
    applicationContext
      .getUseCases()
      .validateCaseDetailInteractor.mockReturnValue('error');

    await runAction(validateCaseDetailAction, {
      modules: {
        presenter,
      },
      state: {
        caseDetail: {
          caseId: '123',
        },
        form: {
          irsDay: '13',
          irsMonth: '10',
          irsYear: '2009',
        },
      },
    });
    expect(errorStub.mock.calls.length).toEqual(1);
  });
});
