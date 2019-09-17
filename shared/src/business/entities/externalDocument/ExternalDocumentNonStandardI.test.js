const { ExternalDocumentFactory } = require('./ExternalDocumentFactory');

describe('ExternalDocumentNonStandardI', () => {
  describe('validation', () => {
    it('should have error messages for missing fields', () => {
      const extDoc = ExternalDocumentFactory.get({
        scenario: 'Nonstandard I',
      });
      expect(extDoc.getFormattedValidationErrors()).toEqual({
        category: 'Select a Category.',
        documentType: 'Select a document type',
        freeText: 'Provide an answer',
        ordinalValue: 'Select an iteration',
      });
    });

    it('should be valid when all fields are present', () => {
      const extDoc = ExternalDocumentFactory.get({
        category: 'Miscellaneous',
        documentTitle: '[First, Second, etc.] Amendment to [anything]',
        documentType: 'Amendment [anything]',
        freeText: 'Test',
        ordinalValue: 'First',
        scenario: 'Nonstandard I',
      });
      expect(extDoc.getFormattedValidationErrors()).toEqual(null);
    });
  });

  describe('title generation', () => {
    it('should generate valid title', () => {
      const extDoc = ExternalDocumentFactory.get({
        category: 'Miscellaneous',
        documentTitle: '[First, Second, etc.] Amendment to [anything]',
        documentType: 'Amendment [anything]',
        freeText: 'Test',
        ordinalValue: 'First',
        scenario: 'Nonstandard I',
      });
      expect(extDoc.getDocumentTitle()).toEqual('First Amendment to Test');
    });
  });
});
