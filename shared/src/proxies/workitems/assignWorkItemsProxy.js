const { put } = require('../requests');

/**
 * getWorkItem
 *
 * @param userId
 * @param applicationContext
 * @returns {Promise<*>}
 */
exports.assignWorkItems = ({
  applicationContext,
  assigneeId,
  assigneeName,
  workItemId,
}) => {
  return put({
    applicationContext,
    body: {
      assigneeId,
      assigneeName,
      workItemId,
    },
    endpoint: '/workitems',
  });
};
