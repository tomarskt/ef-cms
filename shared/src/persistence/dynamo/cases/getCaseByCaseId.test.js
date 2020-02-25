const client = require('../../../../../shared/src/persistence/dynamodbClientService');
const sinon = require('sinon');
const { getCaseByCaseId } = require('./getCaseByCaseId');

const applicationContext = {
  environment: {
    stage: 'local',
  },
  filterCaseMetadata: ({ cases }) => cases,
  isAuthorizedForWorkItems: () => true,
};

describe('getCaseByCaseId', () => {
  beforeEach(() => {
    sinon.stub(client, 'get').resolves({
      caseId: '123',
      pk: '123',
      sk: '123',
      status: 'New',
    });
    sinon.stub(client, 'put').resolves({
      caseId: '123',
      pk: '123',
      sk: '123',
      status: 'New',
    });
    sinon.stub(client, 'delete').resolves({
      caseId: '123',
      pk: '123',
      sk: '123',
      status: 'New',
    });
    sinon.stub(client, 'batchGet').resolves([
      {
        caseId: '123',
        pk: '123',
        sk: '123',
        status: 'New',
      },
    ]);
    sinon.stub(client, 'query').resolves([
      {
        pk: '123',
        sk: '123',
      },
    ]);
    sinon.stub(client, 'batchWrite').resolves(null);
    sinon.stub(client, 'updateConsistent').resolves(null);
  });

  afterEach(() => {
    client.get.restore();
    client.delete.restore();
    client.put.restore();
    client.query.restore();
    client.batchGet.restore();
    client.batchWrite.restore();
    client.updateConsistent.restore();
  });

  it('should return data as received from persistence', async () => {
    const result = await getCaseByCaseId({
      applicationContext,
      caseId: '123',
    });
    expect(result).toEqual({
      caseId: '123',
      pk: '123',
      sk: '123',
      status: 'New',
    });
  });

  it('should return null if nothing is returned from the client get request', async () => {
    client.get.resolves(null);
    const result = await getCaseByCaseId({
      applicationContext,
      caseId: '123',
    });
    expect(result).toBeNull();
  });
});
