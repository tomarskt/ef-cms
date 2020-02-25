const { aggregatePartiesForService } = require('./aggregatePartiesForService');

describe('aggregatePartiesForService', () => {
  let mockCase;
  let respondents;

  beforeEach(() => {
    const contactPrimary = {
      email: 'contactprimary@example.com',
      name: 'Contact Primary',
    };

    const contactSecondary = {
      address1: 'Test Address',
      city: 'Testville',
      name: 'Contact Secondary',
      state: 'CA',
    };

    respondents = [
      {
        email: 'respondentone@example.com',
        name: 'Respondent One',
        serviceIndicator: 'Electronic',
      },
      {
        email: 'respondenttwo@example.com',
        name: 'Respondent Two',
        serviceIndicator: 'Electronic',
      },
    ];

    const practitioners = [
      {
        email: 'practitionerone@example.com',
        name: 'Practitioner One',
        serviceIndicator: 'Electronic',
        userId: 'p1',
      },
      {
        email: 'practitionertwo@example.com',
        name: 'Practitioner Two',
        serviceIndicator: 'Electronic',
        userId: 'p2',
      },
    ];

    mockCase = {
      contactPrimary,
      contactSecondary,
      practitioners,
      respondents,
    };
  });

  it('should serve an unrepresented primary and secondary contact by paper if filed by paper', async () => {
    mockCase.isPaper = true;
    const result = aggregatePartiesForService(mockCase);

    expect(result).toMatchObject({
      all: [
        { email: 'practitionerone@example.com', name: 'Practitioner One' },
        { email: 'practitionertwo@example.com', name: 'Practitioner Two' },
        { email: 'respondentone@example.com', name: 'Respondent One' },
        { email: 'respondenttwo@example.com', name: 'Respondent Two' },
        { name: 'Contact Primary' },
        {
          address1: 'Test Address',
          city: 'Testville',
          name: 'Contact Secondary',
          state: 'CA',
        },
      ],
      electronic: [
        { email: 'practitionerone@example.com', name: 'Practitioner One' },
        { email: 'practitionertwo@example.com', name: 'Practitioner Two' },
        { email: 'respondentone@example.com', name: 'Respondent One' },
        { email: 'respondenttwo@example.com', name: 'Respondent Two' },
      ],
      paper: [
        { name: 'Contact Primary' },
        {
          address1: 'Test Address',
          city: 'Testville',
          name: 'Contact Secondary',
          state: 'CA',
        },
      ],
    });
  });

  it('should serve an unrepresented primary contact electronically and an unrepresented secondary contact by paper if filed electronically', async () => {
    const result = aggregatePartiesForService(mockCase);

    expect(result).toMatchObject({
      all: [
        { email: 'contactprimary@example.com', name: 'Contact Primary' },
        { email: 'practitionerone@example.com', name: 'Practitioner One' },
        { email: 'practitionertwo@example.com', name: 'Practitioner Two' },
        { email: 'respondentone@example.com', name: 'Respondent One' },
        { email: 'respondenttwo@example.com', name: 'Respondent Two' },
        {
          address1: 'Test Address',
          city: 'Testville',
          name: 'Contact Secondary',
          state: 'CA',
        },
      ],
      electronic: [
        { email: 'contactprimary@example.com', name: 'Contact Primary' },
        { email: 'practitionerone@example.com', name: 'Practitioner One' },
        { email: 'practitionertwo@example.com', name: 'Practitioner Two' },
        { email: 'respondentone@example.com', name: 'Respondent One' },
        { email: 'respondenttwo@example.com', name: 'Respondent Two' },
      ],
      paper: [
        {
          address1: 'Test Address',
          city: 'Testville',
          name: 'Contact Secondary',
          state: 'CA',
        },
      ],
    });
  });

  it('should not serve the primary contact electronically or by paper if represented by counsel, but should serve the secondary contact by paper', async () => {
    mockCase.practitioners[0].representingPrimary = true;
    const result = aggregatePartiesForService(mockCase);

    expect(result).toMatchObject({
      all: [
        { email: 'practitionerone@example.com', name: 'Practitioner One' },
        { email: 'practitionertwo@example.com', name: 'Practitioner Two' },
        { email: 'respondentone@example.com', name: 'Respondent One' },
        { email: 'respondenttwo@example.com', name: 'Respondent Two' },
        {
          address1: 'Test Address',
          city: 'Testville',
          name: 'Contact Secondary',
          state: 'CA',
        },
      ],
      electronic: [
        { email: 'practitionerone@example.com', name: 'Practitioner One' },
        { email: 'practitionertwo@example.com', name: 'Practitioner Two' },
        { email: 'respondentone@example.com', name: 'Respondent One' },
        { email: 'respondenttwo@example.com', name: 'Respondent Two' },
      ],
      paper: [
        {
          address1: 'Test Address',
          city: 'Testville',
          name: 'Contact Secondary',
          state: 'CA',
        },
      ],
    });
  });

  it('should serve all respondents electronically', async () => {
    mockCase.practitioners = [];
    const result = aggregatePartiesForService(mockCase);

    expect(result.electronic.length).toEqual(respondents.length + 1);
  });
});
