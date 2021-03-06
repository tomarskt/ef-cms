/**
 * generateTrialCalendarPdfInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.trialSessionId the id for the trial session
 * @returns {Uint8Array} docket record pdf
 */
exports.generateTrialCalendarPdfInteractor = async ({
  applicationContext,
  trialSessionId,
}) => {
  const trialSession = await applicationContext
    .getPersistenceGateway()
    .getTrialSessionById({
      applicationContext,
      trialSessionId,
    });

  const formattedTrialSession = applicationContext
    .getUtilities()
    .formattedTrialSessionDetails({
      applicationContext,
      trialSession,
    });

  const openCases = await applicationContext
    .getPersistenceGateway()
    .getCalendaredCasesForTrialSession({
      applicationContext,
      trialSessionId,
    });

  const formattedOpenCases = openCases.map(openCase => {
    return applicationContext.getUtilities().getFormattedCaseDetail({
      applicationContext,
      caseDetail: openCase,
    });
  });

  const contentHtml = await applicationContext
    .getTemplateGenerators()
    .generateTrialCalendarTemplate({
      applicationContext,
      content: {
        formattedTrialSessionDetails: formattedTrialSession,
        openCases: formattedOpenCases,
      },
    });

  return await applicationContext.getUseCases().generatePdfFromHtmlInteractor({
    applicationContext,
    contentHtml,
  });
};
