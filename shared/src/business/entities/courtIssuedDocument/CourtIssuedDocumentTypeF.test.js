const { CourtIssuedDocumentFactory } = require('./CourtIssuedDocumentFactory');
const { VALIDATION_ERROR_MESSAGES } = require('./CourtIssuedDocumentConstants');

describe('CourtIssuedDocumentTypeF', () => {
  describe('validation', () => {
    it('should have error messages for missing fields', () => {
      const document = CourtIssuedDocumentFactory.get({
        scenario: 'Type F',
      });
      expect(document.getFormattedValidationErrors()).toEqual({
        attachments: VALIDATION_ERROR_MESSAGES.attachments,
        documentType: VALIDATION_ERROR_MESSAGES.documentType,
        judge: VALIDATION_ERROR_MESSAGES.judge,
        trialLocation: VALIDATION_ERROR_MESSAGES.trialLocation,
      });
    });

    it('should be valid when all fields are present', () => {
      const document = CourtIssuedDocumentFactory.get({
        attachments: false,
        documentTitle: 'Order that case is assigned to [Judge Name] [Anything]',
        documentType: 'Order that case is assigned',
        judge: 'Judge Armen',
        scenario: 'Type F',
        trialLocation: 'Seattle, Washington',
      });
      expect(document.getFormattedValidationErrors()).toEqual(null);
    });
  });

  describe('title generation', () => {
    it('should generate valid title', () => {
      const extDoc = CourtIssuedDocumentFactory.get({
        attachments: false,
        documentTitle: 'Further Trial before [Judge] at [Place]',
        documentType: 'FTRL - Further Trial before ...',
        judge: 'Judge Armen',
        scenario: 'Type F',
        trialLocation: 'Seattle, Washington',
      });
      expect(extDoc.getDocumentTitle()).toEqual(
        'Further Trial before Judge Armen at Seattle, Washington',
      );
    });
  });
});
