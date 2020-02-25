/**
 * validateCourtIssuedDocketEntryInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.entryMetadata the docket entry metadata
 * @returns {object} errors (null if no errors)
 */
exports.validateCourtIssuedDocketEntryInteractor = ({
  applicationContext,
  entryMetadata,
}) => {
  const courtIssuedDocument = applicationContext
    .getEntityConstructors()
    .CourtIssuedDocumentFactory.get(entryMetadata);

  return courtIssuedDocument.getFormattedValidationErrors();
};
