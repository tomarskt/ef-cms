import { publicAlertHelper } from './publicAlertHelper';
import { runCompute } from 'cerebral/test';

describe('publicAlertHelper', () => {
  it('single message error alert', () => {
    const result = runCompute(publicAlertHelper, {
      state: {
        alertError: {
          message: 'abc',
        },
      },
    });
    expect(result).toMatchObject({
      showErrorAlert: true,
      showTitleOnly: false,
    });
  });

  it('no messages', () => {
    const result = runCompute(publicAlertHelper, {
      state: {
        alertError: { title: 'hello' },
      },
    });
    expect(result).toMatchObject({
      showErrorAlert: true,
      showTitleOnly: true,
    });
  });

  it('alertError is undefined', () => {
    const result = runCompute(publicAlertHelper, {
      state: {},
    });
    expect(result).toMatchObject({
      showErrorAlert: false,
      showTitleOnly: false,
    });
  });
});
