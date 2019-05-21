const {
  createMappingRecord,
} = require('../../dynamo/helpers/createMappingRecord');
const { createSectionInboxRecord } = require('./createSectionInboxRecord');
const { createSectionOutboxRecord } = require('./createSectionOutboxRecord');
const { createUserInboxRecord } = require('./createUserInboxRecord');
const { createUserOutboxRecord } = require('./createUserOutboxRecord');
const { put } = require('../../dynamodbClientService');

/**
 * createWorkItem
 *
 * @param workItemId
 * @param message
 * @param userId
 * @param applicationContext
 * @returns {*}
 */
exports.createWorkItem = async ({ workItem, applicationContext }) => {
  const user = applicationContext.getCurrentUser();

  await put({
    Item: {
      pk: `workitem-${workItem.workItemId}`,
      sk: `workitem-${workItem.workItemId}`,
      ...workItem,
    },
    applicationContext,
  });

  await createUserInboxRecord({
    applicationContext,
    workItem,
  });

  await createUserOutboxRecord({
    applicationContext,
    workItem,
  });

  await createSectionInboxRecord({
    applicationContext,
    workItem,
  });

  await createSectionOutboxRecord({
    applicationContext,
    section: user.section,
    workItem,
  });
};
