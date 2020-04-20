import { state } from 'cerebral';

/**
 * submit advanced search form
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {Function} providers.get the cerebral get function
 * @returns {Promise} async action
 */
export const submitPublicOrderAdvancedSearchAction = async ({
  applicationContext,
  get,
}) => {
  const searchParams = get(state.advancedSearchForm.orderSearch);

  const searchResults = await applicationContext
    .getUseCases()
    .orderPublicSearchInteractor({
      applicationContext,
      searchParams,
    });

  return { searchResults };
};
