import { User } from '../../../../shared/src/business/entities/User';
import { applicationContext } from '../../applicationContext';
import { extractedPendingMessagesFromCaseDetail as extractPendingMessagesFromCaseDetailComputed } from './extractPendingMessagesFromCaseDetail';
import { getUserPermissions } from '../../../../shared/src/authorization/getUserPermissions';
import { runCompute } from 'cerebral/test';
import { withAppContextDecorator } from '../../withAppContext';

let globalUser;

const extractedPendingMessagesFromCaseDetail = withAppContextDecorator(
  extractPendingMessagesFromCaseDetailComputed,
  {
    ...applicationContext,
    getCurrentUser: () => globalUser,
  },
);

const getBaseState = user => {
  globalUser = user;
  return {
    permissions: getUserPermissions(user),
  };
};

const petitionsClerkUser = {
  role: User.ROLES.petitionsClerk,
  userId: '123',
};

describe('extractPendingMessagesFromCaseDetail', () => {
  it('should not fail if work items is not defined', () => {
    const result = runCompute(extractedPendingMessagesFromCaseDetail, {
      state: {
        ...getBaseState(petitionsClerkUser),
        caseDetail: {
          documents: [{}],
        },
      },
    });
    expect(result).toMatchObject([]);
  });

  it('should not fail if documents is not defined', () => {
    const result = runCompute(extractedPendingMessagesFromCaseDetail, {
      state: {
        ...getBaseState(petitionsClerkUser),
        caseDetail: {},
      },
    });
    expect(result).toMatchObject([]);
  });

  it('sorts the workQueue by the latest currentMessage for each work item', () => {
    const result = runCompute(extractedPendingMessagesFromCaseDetail, {
      state: {
        ...getBaseState(petitionsClerkUser),
        caseDetail: {
          documents: [
            {
              workItems: [
                {
                  caseStatus: 'new',
                  document: {
                    createdAt: '2018-03-02T05:00:00.000Z',
                  },
                  messages: [
                    {
                      createdAt: '2018-03-01T05:00:00.000Z',
                      message: 'there',
                      messageId: 'gl',
                    },
                    {
                      createdAt: '2018-03-02T05:00:00.000Z',
                      message: 'is',
                      messageId: 'a',
                    },
                    {
                      createdAt: '2018-03-03T05:00:00.000Z',
                      message: 'no',
                      messageId: 'b',
                    },
                    {
                      createdAt: '2018-03-04T05:00:00.000Z',
                      message: 'level',
                      messageId: 'c',
                    },
                  ],
                  workItemId: '1',
                },
                {
                  caseStatus: 'new',
                  document: {
                    createdAt: '2018-03-02T05:00:00.000Z',
                  },
                  messages: [
                    {
                      createdAt: '2018-02-01T05:00:00.000Z',
                      message: 'yup',
                      messageId: '1',
                    },
                    {
                      createdAt: '2018-03-01T05:00:00.000Z',
                      message: 'nope',
                      messageId: '2',
                    },
                    {
                      createdAt: '2018-04-01T05:00:00.000Z',
                      message: 'gg',
                      messageId: '3',
                    },
                  ],
                  workItemId: '2',
                },
              ],
            },
          ],
        },
      },
    });
    expect(result).toMatchObject([
      {
        currentMessage: {
          message: 'gg',
        },
        workItemId: '2',
      },
      {
        currentMessage: {
          message: 'level',
        },
        workItemId: '1',
      },
    ]);
  });
});
