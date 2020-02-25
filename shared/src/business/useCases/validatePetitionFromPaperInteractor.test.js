const {
  validatePetitionFromPaperInteractor,
} = require('./validatePetitionFromPaperInteractor');
const { CaseInternal } = require('../entities/cases/CaseInternal');

describe('validate petition from paper', () => {
  it('returns the expected errors object on an empty petition', () => {
    const errors = validatePetitionFromPaperInteractor({
      applicationContext: {
        getEntityConstructors: () => ({
          CaseInternal,
        }),
      },
      petition: {},
    });

    expect(Object.keys(errors)).toEqual([
      'caseCaption',
      'caseType',
      'mailingDate',
      'partyType',
      'petitionFile',
      'procedureType',
      'receivedAt',
      'stinFile',
    ]);
  });

  it('returns null if no errors exist', () => {
    const errors = validatePetitionFromPaperInteractor({
      applicationContext: {
        getEntityConstructors: () => ({
          CaseInternal,
        }),
      },
      petition: {
        caseCaption: 'testing',
        caseType: 'testing',
        mailingDate: 'testing',
        partyType: 'testing',
        petitionFile: {},
        petitionFileSize: 100,
        procedureType: 'testing',
        receivedAt: new Date().toISOString(),
        stinFile: {},
        stinFileSize: 100,
      },
    });

    expect(errors).toBeNull();
  });
});
