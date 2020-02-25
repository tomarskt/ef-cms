export default test => {
  return it('petitioner updates secondary contact address and phone', async () => {
    await test.runSequence('updateCaseValueSequence', {
      key: 'contactSecondary.address1',
      value: '101 Main St.',
    });

    await test.runSequence('updateCaseValueSequence', {
      key: 'contactSecondary.address3',
      value: 'Apt. 101',
    });

    await test.runSequence('updateCaseValueSequence', {
      key: 'contactSecondary.phone',
      value: '1111111111',
    });

    await test.runSequence('submitEditSecondaryContactSequence');

    expect(test.getState('caseDetail.contactSecondary.address1')).toEqual(
      '101 Main St.',
    );
    expect(test.getState('caseDetail.contactSecondary.address3')).toEqual(
      'Apt. 101',
    );
    expect(test.getState('caseDetail.contactSecondary.phone')).toEqual(
      '1111111111',
    );
    expect(test.getState('caseDetail.docketRecord')[4].description).toEqual(
      'Notice of Change of Address and Telephone Number',
    );
  });
};
