import { applicationContext } from '../../../applicationContext';
import { presenter } from '../../presenter';
import { runAction } from 'cerebral/test';
import { updateCreateOrderModalFormValueAction } from './updateCreateOrderModalFormValueAction';

presenter.providers.applicationContext = applicationContext;

describe('updateCreateOrderModalFormValueAction', () => {
  it('sets state.form values correctly if valid event code is passed in', async () => {
    const result = await runAction(updateCreateOrderModalFormValueAction, {
      modules: {
        presenter,
      },
      props: { key: 'eventCode', value: 'ODD' },
      state: {
        form: {},
      },
    });
    expect(result.state.form.eventCode).toEqual('ODD');
    expect(result.state.form.documentTitle).toEqual(
      'Order of Dismissal and Decision',
    );
    expect(result.state.form.documentType).toEqual(
      'Order of Dismissal and Decision',
    );
  });

  it('sets state.form values correctly if a generic order event code is passed in', async () => {
    const result = await runAction(updateCreateOrderModalFormValueAction, {
      modules: {
        presenter,
      },
      props: { key: 'eventCode', value: 'O' },
      state: {
        form: {},
      },
    });
    expect(result.state.form.eventCode).toEqual('O');
    expect(result.state.form.documentTitle).toEqual('Order');
    expect(result.state.form.documentType).toEqual('Order');
  });

  it('sets state.form values correctly if a generic notice event code is passed in', async () => {
    const result = await runAction(updateCreateOrderModalFormValueAction, {
      modules: {
        presenter,
      },
      props: { key: 'eventCode', value: 'NOT' },
      state: {
        form: {},
      },
    });
    expect(result.state.form.eventCode).toEqual('NOT');
    expect(result.state.form.documentTitle).toEqual('Notice');
    expect(result.state.form.documentType).toEqual('Notice');
  });

  it('unsets state.form values if event code is empty', async () => {
    const params = {
      modules: {
        presenter,
      },
      props: { key: 'eventCode', value: '' },
      state: {
        form: {
          documentTitle: 'Order of Dismissal and Decision',
          documentType: 'Order of Dismissal and Decision',
          eventCode: 'ODD',
        },
      },
    };
    let result = await runAction(updateCreateOrderModalFormValueAction, params);
    expect(result.state.form.eventCode).toBeUndefined();
    expect(result.state.form.documentTitle).toBeUndefined();
    expect(result.state.form.documentType).toBeUndefined();

    params.props.value = undefined;
    result = await runAction(updateCreateOrderModalFormValueAction, params);
    expect(result.state.form.eventCode).toBeUndefined();
    expect(result.state.form.documentTitle).toBeUndefined();
    expect(result.state.form.documentType).toBeUndefined();

    params.props = {};
    result = await runAction(updateCreateOrderModalFormValueAction, params);
    expect(result.state.form.eventCode).toBeUndefined();
    expect(result.state.form.documentTitle).toBeUndefined();
    expect(result.state.form.documentType).toBeUndefined();
  });

  it('sets documentTitle if documentTitle is passed in via props', async () => {
    const params = {
      modules: {
        presenter,
      },
      props: { key: 'documentTitle', value: 'Order to Do Something' },
      state: {
        form: {
          documentType: 'Order',
          eventCode: 'O',
        },
      },
    };
    let result = await runAction(updateCreateOrderModalFormValueAction, params);
    expect(result.state.form.documentTitle).toEqual('Order to Do Something');
  });

  it('unsets documentTitle if documentTitle passed in via props is empty', async () => {
    const params = {
      modules: {
        presenter,
      },
      props: { key: 'documentTitle', value: '' },
      state: {
        form: {
          documentTitle: 'Order to Do Something',
          documentType: 'Order',
          eventCode: 'O',
        },
      },
    };
    let result = await runAction(updateCreateOrderModalFormValueAction, params);
    expect(result.state.form.documentTitle).toBeUndefined();
  });

  it('sets documentTitle to Order if new eventCode passed in is a generic order', async () => {
    const params = {
      modules: {
        presenter,
      },
      props: { key: 'eventCode', value: 'O' },
      state: {
        form: {
          documentTitle: 'Order of Dismissal and Decision',
          documentType: 'Order of Dismissal and Decision',
          eventCode: 'ODD',
        },
      },
    };
    let result = await runAction(updateCreateOrderModalFormValueAction, params);
    expect(result.state.form.documentTitle).toEqual('Order');
    expect(result.state.form.documentType).toEqual('Order');
  });
});
