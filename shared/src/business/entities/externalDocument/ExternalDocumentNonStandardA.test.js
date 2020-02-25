const {
  VALIDATION_ERROR_MESSAGES,
} = require('./ExternalDocumentInformationFactory');
const { ExternalDocumentFactory } = require('./ExternalDocumentFactory');

describe('ExternalDocumentNonStandardA', () => {
  describe('validation', () => {
    it('should have error messages for missing fields', () => {
      const extDoc = ExternalDocumentFactory.get({
        scenario: 'Nonstandard A',
      });
      expect(extDoc.getFormattedValidationErrors()).toEqual({
        category: VALIDATION_ERROR_MESSAGES.category,
        documentType: VALIDATION_ERROR_MESSAGES.documentType[1],
        previousDocument: VALIDATION_ERROR_MESSAGES.previousDocument,
      });
    });

    it('should be valid when all fields are present', () => {
      const extDoc = ExternalDocumentFactory.get({
        category: 'Supporting Document',
        documentTitle: 'Brief in Support of [Document Name]',
        documentType: 'Brief in Support',
        previousDocument: { documentType: 'Petition' },
        scenario: 'Nonstandard A',
      });
      expect(extDoc.getFormattedValidationErrors()).toEqual(null);
    });
  });

  describe('title generation', () => {
    it('should generate valid title with previousDocument documentType', () => {
      const extDoc = ExternalDocumentFactory.get({
        category: 'Supporting Document',
        documentTitle: 'Brief in Support of [Document Name]',
        documentType: 'Brief in Support',
        previousDocument: { documentType: 'Petition' },
        scenario: 'Nonstandard A',
      });
      expect(extDoc.getDocumentTitle()).toEqual('Brief in Support of Petition');
    });

    it('should generate valid title with previousDocument documentTitle', () => {
      const extDoc = ExternalDocumentFactory.get({
        category: 'Supporting Document',
        documentTitle: 'Brief in Support of [Document Name]',
        documentType: 'Brief in Support',
        previousDocument: {
          documentTitle: 'Stipulation Something',
          documentType: 'Stipulation',
        },
        scenario: 'Nonstandard A',
      });
      expect(extDoc.getDocumentTitle()).toEqual(
        'Brief in Support of Stipulation Something',
      );
    });
  });
});
