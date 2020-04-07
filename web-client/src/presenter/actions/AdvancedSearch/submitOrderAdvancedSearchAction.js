import { state } from 'cerebral';

/**
 * submit advanced search form
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {Function} providers.get the cerebral get function
 * @returns {Promise} async action
 */
export const submitOrderAdvancedSearchAction = async ({
  applicationContext,
  get,
}) => {
  const searchParams = get(state.advancedSearchForm.orderSearch);
  //fixme fix tests that will break because of change on line 15

  const searchResults = await applicationContext
    .getUseCases()
    .orderAdvancedSearchInteractor({
      applicationContext,
      searchParams,
    });

  return { searchResults };
};
