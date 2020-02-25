const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../../authorization/authorizationClientService');
const { UnauthorizedError } = require('../../../errors/errors');
const { UserCaseNote } = require('../../entities/notes/UserCaseNote');

/**
 * getUserCaseNoteInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.caseId the id of the case to get notes for
 * @returns {object} the case note object if one is found
 */
exports.getUserCaseNoteInteractor = async ({ applicationContext, caseId }) => {
  const user = applicationContext.getCurrentUser();
  if (!isAuthorized(user, ROLE_PERMISSIONS.TRIAL_SESSION_WORKING_COPY)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const judgeUser = await applicationContext
    .getUseCases()
    .getJudgeForUserChambersInteractor({ applicationContext, user });

  const caseNote = await applicationContext
    .getPersistenceGateway()
    .getUserCaseNote({
      applicationContext,
      caseId,
      userId: (judgeUser && judgeUser.userId) || user.userId,
    });

  if (caseNote) {
    return new UserCaseNote(caseNote).validate().toRawObject();
  }
};
