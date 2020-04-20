const { applicationContext } = require('../test/createTestApplicationContext');
const { Case } = require('./cases/Case');
const { Message } = require('./Message');
const { WorkItem } = require('./WorkItem');

describe('WorkItem', () => {
  describe('isValid', () => {
    it('should throw an error if app context is not passed in', () => {
      expect(() => new WorkItem({}, {})).toThrow();
    });

    it('Creates a valid workitem', () => {
      const workItem = new WorkItem(
        {
          assigneeId: 'bob',
          assigneeName: 'bob',
          caseCaptionNames: 'testing',
          caseId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
          caseStatus: Case.STATUS_TYPES.new,
          docketNumber: '101-18',
          docketNumberSuffix: 'S',
          document: {},
          isQC: true,
          messages: [],
          section: 'docket',
          sentBy: 'bob',
        },
        { applicationContext },
      );
      expect(workItem.isValid()).toBeTruthy();
    });

    it('Update a valid workitem with a workItemId', () => {
      const workItem = new WorkItem(
        {
          assigneeId: 'bob',
          assigneeName: 'bob',
          caseCaptionNames: 'testing',
          caseId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
          caseStatus: Case.STATUS_TYPES.new,
          docketNumber: '101-18',
          docketNumberSuffix: 'S',
          document: {},
          isQC: true,
          messages: [],
          section: 'docket',
          sentBy: 'bob',
          workItemId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
        },
        { applicationContext },
      );
      expect(workItem.isValid()).toBeTruthy();
    });

    it('Update a valid workitem with a isRead', () => {
      const workItem = new WorkItem(
        {
          assigneeId: 'bob',
          assigneeName: 'bob',
          caseCaptionNames: 'testing',
          caseId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
          caseStatus: Case.STATUS_TYPES.new,
          docketNumber: '101-18',
          docketNumberSuffix: 'S',
          document: {},
          isQC: true,
          isRead: true,
          messages: [],
          section: 'docket',
          sentBy: 'bob',
          workItemId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
        },
        { applicationContext },
      );
      expect(workItem.isValid()).toBeTruthy();
    });

    it('Create a valid workitem without messages', () => {
      const workItem = new WorkItem(
        {
          assigneeId: 'bob',
          assigneeName: 'bob',
          caseCaptionNames: 'testing',
          caseId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
          caseStatus: Case.STATUS_TYPES.new,
          docketNumber: '101-18',
          docketNumberSuffix: 'S',
          document: {},
          isQC: true,
          section: 'docket',
          sentBy: 'bob',
        },
        { applicationContext },
      );
      expect(workItem.isValid()).toBeTruthy();
    });

    it('Create a valid workitem with real message', () => {
      const workItem = new WorkItem(
        {
          assigneeId: 'bob',
          assigneeName: 'bob',
          caseCaptionNames: 'testing',
          caseId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
          caseStatus: Case.STATUS_TYPES.new,
          docketNumber: '101-18',
          docketNumberSuffix: 'S',
          document: {},
          isQC: true,
          messages: [
            {
              from: 'abc',
              fromUserId: '6805d1ab-18d0-43ec-bafb-654e83405416',
              message: 'abc',
            },
          ],
          section: 'docket',
          sentBy: 'bob',
        },
        { applicationContext },
      );
      expect(workItem.isValid()).toBeTruthy();
    });
  });

  describe('acquires messages', () => {
    it('when calling add message', () => {
      const workItem = new WorkItem(
        {
          assigneeId: 'bob',
          assigneeName: 'bob',
          caseCaptionNames: 'testing',
          caseId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
          caseStatus: Case.STATUS_TYPES.new,
          docketNumber: '101-18',
          docketNumberSuffix: 'S',
          document: {},
          isQC: true,
          messages: [],
          sentBy: 'bob',
        },
        { applicationContext },
      );
      workItem.addMessage(
        new Message(
          {
            from: 'abc',
            fromUserId: '6805d1ab-18d0-43ec-bafb-654e83405416',
            message: 'abc',
          },
          { applicationContext },
        ),
      );
      expect(workItem.messages.length).toEqual(1);
    });

    it('no message added when set as completed', () => {
      const workItem = new WorkItem(
        {
          assigneeId: 'bob',
          assigneeName: 'bob',
          caseCaptionNames: 'testing',
          caseId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
          caseStatus: Case.STATUS_TYPES.new,
          docketNumber: '101-18',
          docketNumberSuffix: 'S',
          document: {},
          isQC: true,
          messages: [],
          sentBy: 'bob',
        },
        { applicationContext },
      );
      workItem.setAsCompleted({
        user: { name: 'jane', userId: '6805d1ab-18d0-43ec-bafb-654e83405416' },
      });
      expect(workItem.messages.length === 0).toBe(true);
    });
  });
});
