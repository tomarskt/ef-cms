module.exports = {
  addCoversheetLambda: require('./documents/addCoversheetLambda').handler,
  archiveDraftDocumentLambda: require('./documents/archiveDraftDocumentLambda')
    .handler,
  completeDocketEntryQCLambda: require('./documents/completeDocketEntryQCLambda')
    .handler,
  createWorkItemLambda: require('./workitems/createWorkItemLambda').handler,
  downloadPolicyUrlLambda: require('./documents/downloadPolicyUrlLambda')
    .handler,
  fileCourtIssuedDocketEntryLambda: require('./documents/fileCourtIssuedDocketEntryLambda')
    .handler,
  fileCourtIssuedOrderToCaseLambda: require('./documents/fileCourtIssuedOrderToCaseLambda')
    .handler,
  fileDocketEntryToCaseLambda: require('./documents/fileDocketEntryToCaseLambda')
    .handler,
  fileExternalDocumentToCaseLambda: require('./documents/fileExternalDocumentToCaseLambda')
    .handler,
  fileExternalDocumentToConsolidatedCasesLambda: require('./documents/fileExternalDocumentToConsolidatedCasesLambda')
    .handler,
  getDocumentDownloadUrlLambda: require('./documents/getDocumentDownloadUrlLambda')
    .handler,
  saveIntermediateDocketEntryLambda: require('./documents/saveIntermediateDocketEntryLambda')
    .handler,
  serveCourtIssuedDocumentLambda: require('./cases/serveCourtIssuedDocumentLambda')
    .handler,
  signDocumentLambda: require('./documents/signDocumentLambda').handler,
  updateCourtIssuedDocketEntryLambda: require('./documents/updateCourtIssuedDocketEntryLambda')
    .handler,
  updateCourtIssuedOrderToCaseLambda: require('./documents/updateCourtIssuedOrderToCaseLambda')
    .handler,
  updateDocketEntryMetaLambda: require('./documents/updateDocketEntryMetaLambda')
    .handler,
  updateDocketEntryOnCaseLambda: require('./documents/updateDocketEntryOnCaseLambda')
    .handler,
};
