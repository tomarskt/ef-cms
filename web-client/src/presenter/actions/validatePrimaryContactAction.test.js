import { applicationContextForClient as applicationContext } from '../../../../shared/src/business/test/createTestApplicationContext';
import { presenter } from '../presenter-mock';
import { runAction } from 'cerebral/test';
import { validatePrimaryContactAction } from './validatePrimaryContactAction';

describe('validatePrimaryContactAction', () => {
  let successStub;
  let errorStub;

  beforeAll(() => {
    successStub = jest.fn();
    errorStub = jest.fn();

    presenter.providers.path = {
      error: errorStub,
      success: successStub,
    };
    presenter.providers.applicationContext = applicationContext;
  });

  it('runs validation on the primary contact with a successful result', async () => {
    applicationContext
      .getUseCases()
      .validatePrimaryContactInteractor.mockReturnValue(null);

    const result = await runAction(validatePrimaryContactAction, {
      modules: {
        presenter,
      },
      state: {
        form: {
          contactPrimary: {},
          partyType: 'Petitioner',
        },
      },
    });

    expect(result.state.validationErrors.contactPrimary).toEqual({});
    expect(successStub.mock.calls.length).toEqual(1);
  });

  it('runs validation on the primary contact with an invalid result', async () => {
    applicationContext
      .getUseCases()
      .validatePrimaryContactInteractor.mockReturnValue('validation errors');

    await runAction(validatePrimaryContactAction, {
      modules: {
        presenter,
      },
      state: {
        form: {
          contactPrimary: {
            address1: '',
            address2: 'asdf',
            city: 'Flavortown',
            countryType: 'domestic',
            name: 'Guy Fieri',
            phone: '1234567890',
            postalCode: '12345',
            state: 'TN',
          },
          partyType: 'Petitioner',
        },
      },
    });

    expect(errorStub.mock.calls.length).toEqual(1);
  });
});
