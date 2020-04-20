const {
  aggregateCommonQueryParams,
} = require('../../business/utilities/aggregateCommonQueryParams');
const { search } = require('./searchClient');

/**
 * casePublicSearch
 *
 * @param {object} providers the providers object containing applicationContext, countryType, petitionerName, petitionerState, yearFiledMax, yearFiledMin
 * @returns {object} the case data
 */
exports.casePublicSearch = async ({
  applicationContext,
  countryType,
  petitionerName,
  petitionerState,
  yearFiledMax,
  yearFiledMin,
}) => {
  const {
    commonQuery,
    exactMatchesQuery,
    nonExactMatchesQuery,
  } = aggregateCommonQueryParams({
    applicationContext,
    countryType,
    petitionerName,
    petitionerState,
    yearFiledMax,
    yearFiledMin,
  });

  let foundCases = (
    await search({
      applicationContext,
      searchParameters: {
        body: {
          _source: [
            'caseCaption',
            'contactPrimary',
            'contactSecondary',
            'docketNumber',
            'docketNumberSuffix',
            'receivedAt',
            'sealedDate',
          ],
          query: {
            bool: {
              must: [...exactMatchesQuery, ...commonQuery],
            },
          },
          size: 5000,
        },
        index: 'efcms',
      },
    })
  ).results;

  if (!foundCases.length) {
    foundCases = (
      await search({
        applicationContext,
        searchParameters: {
          body: {
            _source: [
              'caseCaption',
              'contactPrimary',
              'contactSecondary',
              'docketNumber',
              'docketNumberSuffix',
              'receivedAt',
            ],
            query: {
              bool: {
                must: [...nonExactMatchesQuery, ...commonQuery],
              },
            },
          },
          index: 'efcms',
        },
      })
    ).results;
  }

  return foundCases;
};
