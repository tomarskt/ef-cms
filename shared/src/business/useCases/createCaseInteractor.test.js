const { ContactFactory } = require('../entities/contacts/ContactFactory');
const { createCaseInteractor } = require('./createCaseInteractor');
const { User } = require('../entities/User');

describe('createCaseInteractor', () => {
  let applicationContext;
  let user;
  const createCaseSpy = jest.fn();
  const saveWorkItemForNonPaperSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    user = new User({
      name: 'Test Petitioner',
      role: User.ROLES.petitioner,
      userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
    });

    applicationContext = {
      docketNumberGenerator: {
        createDocketNumber: () => Promise.resolve('00101-00'),
      },
      environment: { stage: 'local' },
      getCurrentUser: () => user,
      getPersistenceGateway: () => {
        return {
          createCase: createCaseSpy,
          getUserById: () => user,
          saveWorkItemForNonPaper: saveWorkItemForNonPaperSpy,
        };
      },
      getUniqueId: () => 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      getUseCases: () => ({
        getUserInteractor: () => user,
      }),
    };
  });

  it('throws an error if the user is not valid or authorized', async () => {
    user = {};
    await expect(
      createCaseInteractor({
        applicationContext,
        petitionFileId: '413f62ce-d7c8-446e-aeda-14a2a625a626',
        petitionMetadata: {
          caseType: 'Other',
          filingType: 'Myself',
          hasIrsNotice: true,
          partyType: ContactFactory.PARTY_TYPES.petitioner,
          preferredTrialCity: 'Fresno, California',
          procedureType: 'Small',
        },
        stinFileId: '413f62ce-7c8d-446e-aeda-14a2a625a611',
      }),
    ).rejects.toThrow('Unauthorized');
    expect(createCaseSpy).not.toBeCalled();
    expect(saveWorkItemForNonPaperSpy).not.toBeCalled();
  });

  it('should create a case successfully as a petitioner', async () => {
    const result = await createCaseInteractor({
      applicationContext,
      petitionFileId: '413f62ce-d7c8-446e-aeda-14a2a625a626',
      petitionMetadata: {
        caseType: 'Other',
        contactPrimary: {
          address1: '99 South Oak Lane',
          address2: 'Culpa numquam saepe ',
          address3: 'Eaque voluptates com',
          city: 'Dignissimos voluptat',
          countryType: 'domestic',
          email: 'petitioner1@example.com',
          name: 'Diana Prince',
          phone: '+1 (215) 128-6587',
          postalCode: '69580',
          state: 'AR',
        },
        contactSecondary: {},
        filingType: 'Myself',
        hasIrsNotice: true,
        partyType: ContactFactory.PARTY_TYPES.petitioner,
        petitionFile: new File([], 'test.pdf'),
        petitionFileSize: 1,
        preferredTrialCity: 'Fresno, California',
        procedureType: 'Small',
        signature: true,
        stinFile: new File([], 'test.pdf'),
        stinFileSize: 1,
      },
      stinFileId: '413f62ce-7c8d-446e-aeda-14a2a625a611',
    });

    expect(result).toBeDefined();
    expect(createCaseSpy).toBeCalled();
    expect(saveWorkItemForNonPaperSpy).toBeCalled();
  });

  it('should create a case successfully as a practitioner', async () => {
    user = new User({
      name: 'Olivia Jade',
      role: User.ROLES.practitioner,
      userId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    });

    const result = await createCaseInteractor({
      applicationContext,
      ownershipDisclosureFileId: '413f62ce-7c8d-446e-aeda-14a2a625a611',
      petitionFileId: '413f62ce-d7c8-446e-aeda-14a2a625a626',
      petitionMetadata: {
        caseType: 'Other',
        contactPrimary: {
          address1: '99 South Oak Lane',
          address2: 'Culpa numquam saepe ',
          address3: 'Eaque voluptates com',
          city: 'Dignissimos voluptat',
          countryType: 'domestic',
          email: 'petitioner1@example.com',
          name: 'Diana Prince',
          phone: '+1 (215) 128-6587',
          postalCode: '69580',
          state: 'AR',
        },
        contactSecondary: {},
        filingType: 'Myself',
        hasIrsNotice: true,
        partyType: ContactFactory.PARTY_TYPES.petitioner,
        petitionFile: new File([], 'test.pdf'),
        petitionFileSize: 1,
        preferredTrialCity: 'Fresno, California',
        procedureType: 'Small',
        signature: true,
        stinFile: new File([], 'test.pdf'),
        stinFileSize: 1,
      },
      stinFileId: '413f62ce-7c8d-446e-aeda-14a2a625a611',
    });

    expect(result).toBeDefined();
    expect(result.practitioners[0].representingPrimary).toEqual(true);
    expect(result.practitioners[0].representingSecondary).toBeUndefined();
    expect(createCaseSpy).toBeCalled();
    expect(saveWorkItemForNonPaperSpy).toBeCalled();
  });

  it('should create a case with contact primary and secondary successfully as a practitioner', async () => {
    user = new User({
      name: 'Olivia Jade',
      role: User.ROLES.practitioner,
      userId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    });

    const result = await createCaseInteractor({
      applicationContext,
      ownershipDisclosureFileId: '413f62ce-7c8d-446e-aeda-14a2a625a611',
      petitionFileId: '413f62ce-d7c8-446e-aeda-14a2a625a626',
      petitionMetadata: {
        caseType: 'Other',
        contactPrimary: {
          address1: '99 South Oak Lane',
          address2: 'Culpa numquam saepe ',
          address3: 'Eaque voluptates com',
          city: 'Dignissimos voluptat',
          countryType: 'domestic',
          email: 'petitioner1@example.com',
          name: 'Diana Prince',
          phone: '+1 (215) 128-6587',
          postalCode: '69580',
          state: 'AR',
        },
        contactSecondary: {
          address1: '99 South Oak Lane',
          address2: 'Culpa numquam saepe ',
          address3: 'Eaque voluptates com',
          city: 'Dignissimos voluptat',
          countryType: 'domestic',
          name: 'Bob Prince',
          phone: '+1 (215) 128-6587',
          postalCode: '69580',
          state: 'AR',
        },
        filingType: 'Myself and my spouse',
        hasIrsNotice: true,
        isSpouseDeceased: 'No',
        partyType: ContactFactory.PARTY_TYPES.petitionerSpouse,
        petitionFile: new File([], 'test.pdf'),
        petitionFileSize: 1,
        preferredTrialCity: 'Fresno, California',
        procedureType: 'Small',
        signature: true,
        stinFile: new File([], 'test.pdf'),
        stinFileSize: 1,
      },
      stinFileId: '413f62ce-7c8d-446e-aeda-14a2a625a611',
    });

    expect(result).toBeDefined();
    expect(result.practitioners[0].representingPrimary).toEqual(true);
    expect(result.practitioners[0].representingSecondary).toEqual(true);
    expect(createCaseSpy).toBeCalled();
    expect(saveWorkItemForNonPaperSpy).toBeCalled();
  });
});
