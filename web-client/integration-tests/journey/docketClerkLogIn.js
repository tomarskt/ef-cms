import { applicationContext } from '../../src/applicationContext';
import { userMap } from '../../../shared/src/test/mockUserTokenMap';
import { wait } from '../helpers';

export default (test, token = 'docketclerk') => {
  it('the docketclerk logs in', async () => {
    await test.runSequence('updateFormValueSequence', {
      key: 'name',
      value: token,
    });
    await test.runSequence('submitLoginSequence');
    await wait(2000);
    expect(test.getState('user.userId')).toEqual(userMap[token].userId);
    expect(applicationContext.getCurrentUser()).toBeDefined();
    expect(applicationContext.getCurrentUser().userId).toEqual(
      userMap[token].userId,
    );
  });
};
