import { Case } from '../../../../shared/src/business/entities/cases/Case';
import { applicationContext } from '../../applicationContext';
import { presenter } from '../presenter';
import { runAction } from 'cerebral/test';
import { setupEditPetitionDetailFormAction } from './setupEditPetitionDetailFormAction';

presenter.providers.applicationContext = applicationContext;

describe('setupEditPetitionDetailFormAction', () => {
  it('sets the payment waived date on the form as month, day, year if payment status is waived', async () => {
    const result = await runAction(setupEditPetitionDetailFormAction, {
      modules: {
        presenter,
      },
      state: {
        caseDetail: {
          caseType: 'some case type',
          petitionPaymentStatus: Case.PAYMENT_STATUS.WAIVED,
          petitionPaymentWaivedDate: '2019-03-01T21:40:46.415Z',
          preferredTrialCity: 'Fresno, California',
          procedureType: 'Small',
        },
        form: {},
      },
    });

    expect(result.state.form).toEqual({
      caseType: 'some case type',
      paymentDateWaivedDay: '01',
      paymentDateWaivedMonth: '03',
      paymentDateWaivedYear: '2019',
      petitionPaymentStatus: Case.PAYMENT_STATUS.WAIVED,
      preferredTrialCity: 'Fresno, California',
      procedureType: 'Small',
    });
  });

  it('sets the payment paid date on the form as month, day, year if payment status is paid', async () => {
    const result = await runAction(setupEditPetitionDetailFormAction, {
      modules: {
        presenter,
      },
      state: {
        caseDetail: {
          petitionPaymentDate: '2019-03-01T21:40:46.415Z',
          petitionPaymentStatus: Case.PAYMENT_STATUS.PAID,
        },
        form: {},
      },
    });

    expect(result.state.form).toEqual({
      paymentDateDay: '01',
      paymentDateMonth: '03',
      paymentDateYear: '2019',
      petitionPaymentStatus: Case.PAYMENT_STATUS.PAID,
    });
  });

  it('does not set any dates on the form if payment status is unpaid', async () => {
    const result = await runAction(setupEditPetitionDetailFormAction, {
      modules: {
        presenter,
      },
      state: {
        caseDetail: {
          petitionPaymentStatus: Case.PAYMENT_STATUS.UNPAID,
        },
        form: {},
      },
    });

    expect(result.state.form).toEqual({
      petitionPaymentStatus: Case.PAYMENT_STATUS.UNPAID,
    });
  });

  it('sets the IRS notice date on the form as month, day, year if it is present', async () => {
    const result = await runAction(setupEditPetitionDetailFormAction, {
      modules: {
        presenter,
      },
      state: {
        caseDetail: {
          irsNoticeDate: '2019-03-01T21:40:46.415Z',
        },
        form: {},
      },
    });

    expect(result.state.form).toEqual({
      irsDay: '01',
      irsMonth: '03',
      irsYear: '2019',
    });
  });
});
