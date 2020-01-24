const { asUserFromEmail } = require('./createUsers');

module.exports.createStandingPretrialOrder = async () => {
  await asUserFromEmail('docketclerk', async applicationContext => {
    await applicationContext
      .getUseCases()
      .generateStandingPretrialOrderInteractor({
        applicationContext,
        docketNumber: '101-20',
        trialSessionId: '959c4338-0fac-42eb-b0eb-d53b8d0195cc',
      });
  });
};
