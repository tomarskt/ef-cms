import { Case } from '../../../shared/src/business/entities/cases/Case';
import { getPetitionDocumentForCase } from '../helpers';

const { VALIDATION_ERROR_MESSAGES } = Case;

export default test => {
  return it('Petitions clerk submits case to IRS', async () => {
    await test.runSequence('gotoCaseDetailSequence', {
      docketNumber: test.docketNumber,
    });

    const petitionDocument = getPetitionDocumentForCase(
      test.getState('caseDetail'),
    );

    await test.runSequence('gotoDocumentDetailSequence', {
      docketNumber: test.docketNumber,
      documentId: petitionDocument.documentId,
    });

    await test.runSequence('updateFormValueSequence', {
      key: 'irsDay',
      value: '24',
    });
    await test.runSequence('updateFormValueSequence', {
      key: 'irsMonth',
      value: '12',
    });
    await test.runSequence('updateFormValueSequence', {
      key: 'irsYear',
      value: '2050',
    });
    await test.runSequence('updateFormValueSequence', {
      key: 'paymentDateYear',
      value: '2018',
    });
    await test.runSequence('updateFormValueSequence', {
      key: 'paymentDateMonth',
      value: '12',
    });
    await test.runSequence('updateFormValueSequence', {
      key: 'paymentDateDay',
      value: '24',
    });

    await test.runSequence('navigateToReviewSavedPetitionSequence');
    expect(test.getState('validationErrors')).toEqual({
      irsNoticeDate: VALIDATION_ERROR_MESSAGES.irsNoticeDate[0].message,
    });

    await test.runSequence('updateFormValueSequence', {
      key: 'irsYear',
      value: '2017',
    });

    await test.runSequence('navigateToReviewSavedPetitionSequence');
    expect(test.getState('validationErrors')).toEqual({});
    await test.runSequence('saveCaseAndServeToIrsSequence');

    test.setState('caseDetail', {});
    await test.runSequence('gotoCaseDetailSequence', {
      docketNumber: test.docketNumber,
    });

    // check that save occurred
    expect(test.getState('caseDetail.irsNoticeDate')).toEqual(
      '2017-12-24T05:00:00.000Z',
    );
    expect(test.getState('caseDetail.status')).toEqual(
      Case.STATUS_TYPES.generalDocket,
    );
  });
};
