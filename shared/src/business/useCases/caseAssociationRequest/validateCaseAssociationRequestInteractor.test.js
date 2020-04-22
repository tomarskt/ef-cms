const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  validateCaseAssociationRequestInteractor,
} = require('./validateCaseAssociationRequestInteractor');

describe('validateCaseAssociationRequest', () => {
  it('returns the expected errors object on an empty case association request', () => {
    const errors = validateCaseAssociationRequestInteractor({
      applicationContext,
      caseAssociationRequest: {},
    });

    expect(Object.keys(errors)).toEqual([
      'certificateOfService',
      'documentTitleTemplate',
      'documentType',
      'eventCode',
      'primaryDocumentFile',
      'scenario',
      'representingPrimary',
    ]);
  });

  it('returns null for a valid case association request', () => {
    const errors = validateCaseAssociationRequestInteractor({
      applicationContext,
      caseAssociationRequest: {
        certificateOfService: true,
        certificateOfServiceDate: '1212-12-12',
        documentTitleTemplate: 'Entry of Appearance for [Petitioner Names]',
        documentType: 'Entry of Appearance',
        eventCode: '123',
        primaryDocumentFile: {},
        representingPrimary: true,
        scenario: 'Standard',
      },
    });

    expect(errors).toEqual(null);
  });
});
