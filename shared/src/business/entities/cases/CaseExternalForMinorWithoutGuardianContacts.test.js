const { CaseExternal } = require('./CaseExternal');
const { ContactFactory } = require('../contacts/ContactFactory');

describe('CaseExternal', () => {
  describe('for Minor without Guardian Contacts', () => {
    it('should not validate without contacts', () => {
      const caseExternal = new CaseExternal({
        caseType: 'Other',
        filingType: 'Myself',
        hasIrsNotice: true,
        irsNoticeDate: '2009-10-13',
        partyType: ContactFactory.PARTY_TYPES.nextFriendForMinor,
        petitionFile: {},
        petitionFileSize: 1,
        preferredTrialCity: 'Chattanooga, Tennessee',
        procedureType: 'Small',
        signature: true,
        stinFile: {},
        stinFileSize: 1,
      });
      expect(caseExternal.isValid()).toEqual(false);
    });

    it('can validate contacts', () => {
      const caseExternal = new CaseExternal({
        caseType: 'Other',
        contactPrimary: {
          address1: '876 12th Ave',
          city: 'Nashville',
          country: 'USA',
          countryType: 'domestic',
          email: 'someone@example.com',
          name: 'Jimmy Dean',
          phone: '1234567890',
          postalCode: '05198',
          secondaryName: 'Jimmy Dean',
          state: 'AK',
        },
        filingType: 'Myself',
        hasIrsNotice: true,
        irsNoticeDate: '2009-10-13',
        partyType: ContactFactory.PARTY_TYPES.nextFriendForMinor,
        petitionFile: {},
        petitionFileSize: 1,
        preferredTrialCity: 'Chattanooga, Tennessee',
        procedureType: 'Small',
        signature: true,
        stinFile: {},
        stinFileSize: 1,
      });
      expect(caseExternal.getFormattedValidationErrors()).toEqual(null);
    });
  });
});
