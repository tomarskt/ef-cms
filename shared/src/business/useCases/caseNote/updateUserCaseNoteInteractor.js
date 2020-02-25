const {
  isAuthorized,
  ROLE_PERMISSIONS,
} = require('../../../authorization/authorizationClientService');
const { UnauthorizedError } = require('../../../errors/errors');
const { UserCaseNote } = require('../../entities/notes/UserCaseNote');

/**
 * updateUserCaseNoteInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.caseId the id of the case to update notes
 * @param {string} providers.notes the notes to update
 * @returns {object} the updated case note returned from persistence
 */
exports.updateUserCaseNoteInteractor = async ({
  applicationContext,
  caseId,
  notes,
}) => {
  const user = applicationContext.getCurrentUser();
  if (!isAuthorized(user, ROLE_PERMISSIONS.TRIAL_SESSION_WORKING_COPY)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const judgeUser = await applicationContext
    .getUseCases()
    .getJudgeForUserChambersInteractor({ applicationContext, user });

  const caseNoteEntity = new UserCaseNote({
    caseId,
    notes,
    userId: (judgeUser && judgeUser.userId) || user.userId,
  });

  const caseNoteToUpdate = caseNoteEntity.validate().toRawObject();

  await applicationContext.getPersistenceGateway().updateUserCaseNote({
    applicationContext,
    caseNoteToUpdate,
  });

  return caseNoteToUpdate;
};
