const { DocketRecord } = require('./DocketRecord');
const { MOCK_USERS } = require('../../test/mockUsers');

const applicationContext = {
  getCurrentUser: () => MOCK_USERS['a7d90c05-f6cd-442c-a168-202db587f16f'],
};

describe('DocketRecord', () => {
  describe('validation', () => {
    it('fails validation if a filingDate is in the future.', () => {
      expect(
        new DocketRecord(
          {
            description: 'Test Docket Record',
            eventCode: 'O',
            filingDate: new Date('9000-01-01').toISOString(),
            index: 0,
          },
          { applicationContext },
        ).isValid(),
      ).toBeFalsy();
    });

    it('passes validation if a filingDate is not in the future', () => {
      expect(
        new DocketRecord(
          {
            description: 'Test Docket Record',
            eventCode: 'O',
            filingDate: new Date('2000-01-01').toISOString(),
            index: 0,
          },
          { applicationContext },
        ).isValid(),
      ).toBeTruthy();
    });

    it('fails validation if a filingDate is omitted', () => {
      expect(
        new DocketRecord(
          {
            description: 'Test Docket Record',
            eventCode: 'O',
            index: 0,
          },
          { applicationContext },
        ).isValid(),
      ).toBeFalsy();
    });

    it('fails validation if a description is omitted', () => {
      expect(
        new DocketRecord(
          {
            eventCode: 'O',
            filingDate: new Date('2000-01-01').toISOString(),
            index: 0,
          },
          { applicationContext },
        ).isValid(),
      ).toBeFalsy();
    });

    it('fails validation if an eventCode is omitted', () => {
      expect(
        new DocketRecord(
          {
            description: 'Test Docket Record',
            filingDate: new Date('2000-01-01').toISOString(),
            index: 0,
          },
          { applicationContext },
        ).isValid(),
      ).toBeFalsy();
    });

    it('fails validation if an index is omitted', () => {
      expect(
        new DocketRecord(
          {
            description: 'Test Docket Record',
            eventCode: 'O',
            filingDate: new Date('2000-01-01').toISOString(),
          },
          { applicationContext },
        ).isValid(),
      ).toBeFalsy();
    });

    it('fails validation if nothing is passed in', () => {
      expect(
        new DocketRecord({}, { applicationContext }).isValid(),
      ).toBeFalsy();
    });

    it('required messages display for required fields when an empty docket record is validated', () => {
      expect(
        new DocketRecord(
          {},
          { applicationContext },
        ).getFormattedValidationErrors(),
      ).toEqual({
        description: 'Enter a description',
        eventCode: 'Enter an event code',
        filingDate: 'Enter a valid filing date',
        index: 'Enter an index',
      });
    });
  });
});
