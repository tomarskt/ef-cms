import { state } from 'cerebral';

/**
 * validates the forward message
 *
 * @param {object} providers the providers object
 * @param {object} providers.path the cerebral path which contains the next path in the sequence (path of success or failure)
 * @param {object} providers.props the cerebral store used for getting the props.workItemId
 * @param {object} providers.get the cerebral get function used for getting the state.form when validation errors occur
 * @param {object} providers.applicationContext the application context needed for getting the validateForwardMessage use case
 * @returns {object} path.success or path.error
 */
export const validateForwardMessageAction = ({
  applicationContext,
  get,
  path,
  props,
}) => {
  const form = get(state.form)[props.workItemId] || {};

  const errors = applicationContext
    .getUseCases()
    .validateForwardMessageInteractor({
      applicationContext,
      message: form,
    });

  if (!errors) {
    return path.success();
  } else {
    return path.error({ errors });
  }
};
