import { applicationContext } from '../../../applicationContext';
import { presenter } from '../../presenter';
import { primePropsFromEditDocketEntryMetaModalAction } from './primePropsFromEditDocketEntryMetaModalAction';
import { runAction } from 'cerebral/test';

describe('primePropsFromEditDocketEntryMetaModalAction', () => {
  beforeEach(() => {
    presenter.providers.applicationContext = applicationContext;
  });

  it('should update the props from state', async () => {
    const result = await runAction(
      primePropsFromEditDocketEntryMetaModalAction,
      {
        modules: { presenter },
        state: {
          caseDetail: {
            caseId: '456',
          },
          form: { index: 1, something: '123' },
        },
      },
    );

    expect(result.output).toEqual({
      caseId: '456',
      docketRecordEntry: { index: 1, something: '123' },
      docketRecordIndex: 1,
    });
  });

  it('should filter empty strings from the given params in state.modal.form', async () => {
    const result = await runAction(
      primePropsFromEditDocketEntryMetaModalAction,
      {
        modules: { presenter },
        state: {
          caseDetail: {
            caseId: '456',
          },
          form: {
            index: 1,
            someEmptyString: '', // should be removed
            someObj: {
              someNestedEmptyString: '', // should be removed
            },
            something: '123',
          },
        },
      },
    );

    expect(result.output).toEqual({
      caseId: '456',
      docketRecordEntry: { index: 1, someObj: {}, something: '123' },
      docketRecordIndex: 1,
    });
  });
});
