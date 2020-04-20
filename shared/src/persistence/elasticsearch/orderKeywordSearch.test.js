const {
  applicationContext,
} = require('../../business/test/createTestApplicationContext');
const { orderKeywordSearch } = require('./orderKeywordSearch');

describe('orderKeywordSearch', () => {
  let searchStub;
  const orderEventCodes = ['O', 'OOD'];

  const baseQueryParams = [
    { match: { 'pk.S': 'case|' } },
    { match: { 'sk.S': 'document|' } },
    {
      exists: {
        field: 'servedAt',
      },
    },
    {
      bool: {
        should: [
          {
            match: {
              'eventCode.S': 'O',
            },
          },
          {
            match: {
              'eventCode.S': 'OOD',
            },
          },
        ],
      },
    },
  ];

  beforeEach(() => {
    searchStub = jest.fn();

    applicationContext.getSearchClient.mockReturnValue({
      search: searchStub,
    });
  });

  it('does a bare search for just eventCodes', async () => {
    await orderKeywordSearch({ applicationContext, orderEventCodes });

    expect(searchStub.mock.calls[0][0].body.query.bool.must).toEqual(
      baseQueryParams,
    );
  });

  it('does a search for case title or petitioner name', async () => {
    await orderKeywordSearch({
      applicationContext,
      caseTitleOrPetitioner: 'Guy Fieri',
      orderEventCodes,
    });

    expect(searchStub.mock.calls[0][0].body.query.bool.must).toEqual([
      ...baseQueryParams,
      {
        simple_query_string: {
          fields: [
            'caseCaption.S',
            'contactPrimary.M.name.S',
            'contactSecondary.M.name.S',
          ],
          query: 'Guy Fieri',
        },
      },
    ]);
  });

  it('does a search for keyword in document contents or document title', async () => {
    await orderKeywordSearch({
      applicationContext,
      orderEventCodes,
      orderKeyword: 'Guy Fieri',
    });

    expect(searchStub.mock.calls[0][0].body.query.bool.must).toEqual([
      ...baseQueryParams,
      {
        simple_query_string: {
          fields: ['documentContents.S', 'documentTitle.S'],
          query: 'Guy Fieri',
        },
      },
    ]);
  });

  it('does a search for a signed judge', async () => {
    await orderKeywordSearch({
      applicationContext,
      judge: 'Judge Guy Fieri',
      orderEventCodes,
    });

    expect(searchStub.mock.calls[0][0].body.query.bool.must).toEqual([
      ...baseQueryParams,
      {
        bool: {
          must: {
            match: {
              'signedJudgeName.S': 'Judge Guy Fieri',
            },
          },
        },
      },
    ]);
  });

  it('does a search for docket number of a case', async () => {
    await orderKeywordSearch({
      applicationContext,
      docketNumber: '101-20',
      orderEventCodes,
    });

    expect(searchStub.mock.calls[0][0].body.query.bool.must).toEqual([
      ...baseQueryParams,
      {
        match: {
          'docketNumber.S': {
            operator: 'and',
            query: '101-20',
          },
        },
      },
    ]);
  });

  it('does a date range search for filing / received date', async () => {
    await orderKeywordSearch({
      applicationContext,
      endDate: '2020-02-20',
      orderEventCodes,
      startDate: '2020-02-20',
    });

    expect(searchStub.mock.calls[0][0].body.query.bool.must).toEqual([
      ...baseQueryParams,
      {
        range: {
          'receivedAt.S': {
            format: 'yyyy-MM-dd',
            gte: '2020-02-20',
            lte: '2020-02-20',
          },
        },
      },
    ]);
  });

  it('does a NOT search for date range if just given startDate', async () => {
    await orderKeywordSearch({
      applicationContext,
      orderEventCodes,
      startDate: '2020-02-20',
    });

    expect(searchStub.mock.calls[0][0].body.query.bool.must).toEqual(
      baseQueryParams,
    );
  });

  it('does a NOT search for date range if just given endDate', async () => {
    await orderKeywordSearch({
      applicationContext,
      endDate: '2020-02-20',
      orderEventCodes,
    });

    expect(searchStub.mock.calls[0][0].body.query.bool.must).toEqual(
      baseQueryParams,
    );
  });
});
