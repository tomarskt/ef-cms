const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  getAllCaseDeadlinesInteractor,
} = require('./getAllCaseDeadlinesInteractor');
const { User } = require('../../entities/User');

describe('getAllCaseDeadlinesInteractor', () => {
  const mockDeadlines = [
    {
      caseDeadlineId: '22c0736f-c4c5-4ab5-97c3-e41fb06bbc2f',
      caseId: '01eebcc4-08aa-4550-b41b-982ffbd75192',
      createdAt: '2019-01-01T21:40:46.415Z',
      deadlineDate: '2019-03-01T21:40:46.415Z',
      description: 'A deadline!',
    },
  ];
  const mockCases = [
    {
      associatedJudge: 'Judge Buch',
      caseCaption: 'A caption, Petitioner',
      caseId: '01eebcc4-08aa-4550-b41b-982ffbd75192',
      caseType: 'CDP (Lien/Levy)',
      docketNumber: '101-19',
      partyType: 'Petitioner',
      procedureType: 'Regular',
    },
  ];

  beforeAll(() => {
    applicationContext.environment.stage = 'local';
    applicationContext
      .getPersistenceGateway()
      .getAllCaseDeadlines.mockReturnValue(mockDeadlines);
    applicationContext
      .getPersistenceGateway()
      .getCasesByCaseIds.mockReturnValue(mockCases);
  });

  it('throws an error if the user is not valid or authorized', async () => {
    applicationContext.getCurrentUser.mockReturnValue(new User({}));

    await expect(
      getAllCaseDeadlinesInteractor({
        applicationContext,
      }),
    ).rejects.toThrow('Unauthorized');
  });

  it('gets all the case deadlines and combines them with case data', async () => {
    const mockPetitionsClerk = new User({
      name: 'Test Petitionsclerk',
      role: User.ROLES.petitionsClerk,
      userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
    });
    applicationContext.getCurrentUser.mockReturnValue(mockPetitionsClerk);

    const caseDeadlines = await getAllCaseDeadlinesInteractor({
      applicationContext,
    });

    expect(caseDeadlines).toEqual([
      {
        associatedJudge: 'Judge Buch',
        caseCaption: 'A caption, Petitioner',
        caseDeadlineId: '22c0736f-c4c5-4ab5-97c3-e41fb06bbc2f',
        caseId: '01eebcc4-08aa-4550-b41b-982ffbd75192',
        createdAt: '2019-01-01T21:40:46.415Z',
        deadlineDate: '2019-03-01T21:40:46.415Z',
        description: 'A deadline!',
        docketNumber: '101-19',
        docketNumberSuffix: 'L',
      },
    ]);
  });
});
