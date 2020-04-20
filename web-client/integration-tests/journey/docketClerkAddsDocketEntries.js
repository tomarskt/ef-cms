import { DocketEntryFactory } from '../../../shared/src/business/entities/docketEntry/DocketEntryFactory';

const { VALIDATION_ERROR_MESSAGES } = DocketEntryFactory;

export const docketClerkAddsDocketEntries = (test, fakeFile) => {
  return it('Docketclerk adds docket entries', async () => {
    await test.runSequence('gotoCaseDetailSequence', {
      docketNumber: test.docketNumber,
    });

    await test.runSequence('gotoAddDocketEntrySequence', {
      docketNumber: test.docketNumber,
    });

    await test.runSequence('updateScreenMetadataSequence', {
      key: 'supportingDocument',
      value: false,
    });

    await test.runSequence('submitDocketEntrySequence', {
      docketNumber: test.docketNumber,
    });

    expect(test.getState('validationErrors')).toEqual({
      dateReceived: VALIDATION_ERROR_MESSAGES.dateReceived[1],
      documentType: VALIDATION_ERROR_MESSAGES.documentType[1],
      eventCode: VALIDATION_ERROR_MESSAGES.eventCode,
      partyPrimary: VALIDATION_ERROR_MESSAGES.partyPrimary,
    });

    //primary document
    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'dateReceivedMonth',
      value: 1,
    });
    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'dateReceivedDay',
      value: 1,
    });
    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'dateReceivedYear',
      value: 2018,
    });

    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'primaryDocumentFile',
      value: fakeFile,
    });

    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'primaryDocumentFileSize',
      value: 100,
    });

    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'partyPrimary',
      value: true,
    });

    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'eventCode',
      value: 'M115',
    });

    expect(test.getState('form.documentType')).toEqual(
      'Motion for Leave to File',
    );

    await test.runSequence('updateScreenMetadataSequence', {
      key: 'supportingDocument',
      value: false,
    });

    await test.runSequence('submitDocketEntrySequence', {
      docketNumber: test.docketNumber,
    });

    expect(test.getState('validationErrors')).toEqual({
      objections: VALIDATION_ERROR_MESSAGES.objections,
      secondaryDocument: VALIDATION_ERROR_MESSAGES.secondaryDocument,
    });

    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'objections',
      value: 'No',
    });

    //secondary document
    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'secondaryDocument.eventCode',
      value: 'APPW',
    });

    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'secondaryDocumentFile',
      value: fakeFile,
    });

    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'secondaryDocumentFileSize',
      value: 100,
    });

    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'secondaryDocument.additionalInfo',
      value: 'Test Secondary Additional Info',
    });

    await test.runSequence('updateDocketEntryFormValueSequence', {
      key: 'secondaryDocument.addToCoversheet',
      value: true,
    });

    await test.runSequence('updateScreenMetadataSequence', {
      key: 'supportingDocument',
      value: true,
    });

    await test.runSequence('submitDocketEntrySequence', {
      docketNumber: test.docketNumber,
      isAddAnother: true,
    });

    expect(test.getState('alertSuccess').message).toEqual(
      'Entry added. Continue adding docket entries below.',
    );

    expect(test.getState('currentPage')).toEqual('AddDocketEntry');
    expect(test.getState('form')).toEqual({
      lodged: false,
      privatePractitioners: [],
    });
  });
};
