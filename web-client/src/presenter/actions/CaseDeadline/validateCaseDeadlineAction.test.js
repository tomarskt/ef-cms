import { applicationContextForClient as applicationContext } from '../../../../../shared/src/business/test/createTestApplicationContext';
import { presenter } from '../../presenter-mock';
import { runAction } from 'cerebral/test';
import { validateCaseDeadlineAction } from './validateCaseDeadlineAction';

presenter.providers.applicationContext = applicationContext;

describe('validateCaseDeadlineAction', () => {
  let successStub;
  let errorStub;

  let mockCaseDeadline;

  beforeAll(() => {
    successStub = jest.fn();
    errorStub = jest.fn();

    mockCaseDeadline = {
      caseId: '6805d1ab-18d0-43ec-bafb-654e83405416',
      deadlineDate: '2019-03-01T21:42:29.073Z',
      description: 'hello world',
    };

    presenter.providers.path = {
      error: errorStub,
      success: successStub,
    };
  });

  it('should call the success path when no errors are found', async () => {
    applicationContext
      .getUseCases()
      .validateCaseDeadlineInteractor.mockReturnValue(null);

    await runAction(validateCaseDeadlineAction, {
      modules: {
        presenter,
      },
      state: {
        form: mockCaseDeadline,
      },
    });

    expect(successStub.mock.calls.length).toEqual(1);
  });

  it('should call the error path when any errors are found', async () => {
    applicationContext
      .getUseCases()
      .validateCaseDeadlineInteractor.mockReturnValue('error');

    await runAction(validateCaseDeadlineAction, {
      modules: {
        presenter,
      },
      state: {
        form: mockCaseDeadline,
      },
    });

    expect(errorStub.mock.calls.length).toEqual(1);
  });
});
