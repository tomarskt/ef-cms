export default (test, message) => {
  return it('Petitions clerk sends message to judgeArmen', async () => {
    const workItem = test.petitionerNewCases[0].documents[0].workItems[0];
    await test.runSequence('gotoDocumentDetailSequence', {
      docketNumber: test.petitionerNewCases[0].docketNumber,
      documentId: test.petitionerNewCases[0].documents[0].documentId,
    });

    // armensChambers
    const assigneeId = '9c9292a4-2d5d-45b1-b67f-ac0e1c9b5df5';

    test.setState('form', {
      [workItem.workItemId]: {
        assigneeId: assigneeId,
        forwardMessage: message,
        section: 'armensChambers',
      },
    });

    await test.runSequence('submitForwardSequence', {
      workItemId: workItem.workItemId,
    });

    const caseDetail = test.getState('caseDetail');
    let updatedWorkItem;
    caseDetail.documents.forEach(document =>
      document.workItems.forEach(item => {
        if (item.workItemId === workItem.workItemId) {
          updatedWorkItem = item;
        }
      }),
    );

    expect(updatedWorkItem.assigneeId).toEqual(assigneeId);
  });
};
