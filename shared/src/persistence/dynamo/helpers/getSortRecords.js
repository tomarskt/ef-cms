const client = require('../../dynamodbClientService');

exports.getSortRecords = async ({
  afterDate,
  applicationContext,
  key,
  type,
}) => {
  const records = await client.query({
    ExpressionAttributeNames: {
      '#pk': 'pk',
      '#sk': 'sk',
    },
    ExpressionAttributeValues: {
      ':afterDate': afterDate,
      ':pk': `${key}|${type}`,
    },
    KeyConditionExpression: '#pk = :pk AND #sk >= :afterDate',
    applicationContext,
  });

  return records;
};
