import { state } from 'cerebral';

/**
 * Forwards the workItem associated with props.workItemId to a form.assigneeId and also adds the message set on form.forwardMessage.
 * Displays a success alert on success.
 *
 * @param {object} providers the providers object
 * @param {Function} providers.get the cerebral get function used for getting state.user.userId, state.form
 * @param {object} providers.store the cerebral store needed for when setting caseDetail
 * @param {object} providers.applicationContext needed for getting the forwardWorkItem use case
 * @param {object} providers.props the cerebral props object containing workItemId
 * @returns {object} the success alert object used for displaying a green alert at the top of the page
 */
export const forwardWorkItemAction = async ({
  applicationContext,
  get,
  props,
  store,
}) => {
  const { workItemId } = props;

  const form = get(state.form)[props.workItemId];
  const { userId } = applicationContext.getCurrentUser();

  const updatedWorkItem = await applicationContext
    .getUseCases()
    .forwardWorkItemInteractor({
      applicationContext,
      assigneeId: form.assigneeId,
      message: form.forwardMessage,
      userId,
      workItemId: workItemId,
    });

  // update the local state to have the updated work item returned from the backend
  const caseDetail = get(state.caseDetail);
  const workItems = caseDetail.documents.reduce(
    (items, document) => [...items, ...document.workItems],
    [],
  );
  const workItem = workItems.find(item => item.workItemId === workItemId);
  Object.assign(workItem, updatedWorkItem);
  store.set(state.caseDetail, caseDetail);

  return {
    alertSuccess: {
      message: 'Message sent',
    },
  };
};
