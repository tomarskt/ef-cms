const { Document } = require('../../entities/Document');
const { map } = require('lodash');
const { OrderSearch } = require('../../entities/orders/OrderSearch');

/**
 * orderPublicSearchInteractor
 *
 * @param {object} providers the providers object containing applicationContext, orderKeyword, caseTitleOrPetitioner, docketNumber, judge, startDate, endDate
 * @param {object} providers.applicationContext application context object
 * @returns {object} the order search results
 */
exports.orderPublicSearchInteractor = async ({
  applicationContext,
  caseTitleOrPetitioner,
  docketNumber,
  endDateDay,
  endDateMonth,
  endDateYear,
  judge,
  orderKeyword,
  startDateDay,
  startDateMonth,
  startDateYear,
}) => {
  const orderEventCodes = map(Document.ORDER_DOCUMENT_TYPES, 'eventCode');

  const orderSearch = new OrderSearch({
    caseTitleOrPetitioner,
    docketNumber,
    endDateDay,
    endDateMonth,
    endDateYear,
    judge,
    orderKeyword,
    startDateDay,
    startDateMonth,
    startDateYear,
  });

  const rawSearch = orderSearch.validate().toRawObject();

  return await applicationContext.getPersistenceGateway().orderKeywordSearch({
    applicationContext,
    orderEventCodes,
    ...rawSearch,
  });
};
