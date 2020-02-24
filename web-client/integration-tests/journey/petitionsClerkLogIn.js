import { wait } from '../helpers';

export default (test, role = 'petitionsclerk') => {
  return it('Petitions clerk logs in', async () => {
    await test.runSequence('updateFormValueSequence', {
      key: 'name',
      value: role,
    });
    await test.runSequence('submitLoginSequence');
    await wait(2000);
  });
};
