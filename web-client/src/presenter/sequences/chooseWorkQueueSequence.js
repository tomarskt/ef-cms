import { chooseWorkQueueAction } from '../actions/chooseWorkQueueAction';
import { clearWorkQueueAction } from '../actions/clearWorkQueueAction';
import { getDocumentQCInboxForSectionAction } from '../actions/getDocumentQCInboxForSectionAction';
import { getDocumentQCInboxForUserAction } from '../actions/getDocumentQCInboxForUserAction';
import { getDocumentQCServedForSectionAction } from '../actions/getDocumentQCServedForSectionAction';
import { getDocumentQCServedForUserAction } from '../actions/getDocumentQCServedForUserAction';
import { getInboxMessagesForSectionAction } from '../actions/getInboxMessagesForSectionAction';
import { getInboxMessagesForUserAction } from '../actions/getInboxMessagesForUserAction';
import { getJudgeForCurrentUserAction } from '../actions/getJudgeForCurrentUserAction';
import { getNotificationsAction } from '../actions/getNotificationsAction';
import { getSentMessagesForSectionAction } from '../actions/getSentMessagesForSectionAction';
import { getSentMessagesForUserAction } from '../actions/getSentMessagesForUserAction';
import { parallel } from 'cerebral/factories';
import { setJudgeUserAction } from '../actions/setJudgeUserAction';
import { setNotificationsAction } from '../actions/setNotificationsAction';
import { setSectionInboxCountAction } from '../actions/setSectionInboxCountAction';
import { setWorkItemsAction } from '../actions/setWorkItemsAction';
import { showProgressSequenceDecorator } from '../utilities/sequenceHelpers';

export const chooseWorkQueueSequence = showProgressSequenceDecorator([
  clearWorkQueueAction,
  getJudgeForCurrentUserAction,
  setJudgeUserAction,
  parallel([
    [getNotificationsAction, setNotificationsAction],
    [
      chooseWorkQueueAction,
      {
        documentqcmyinProgress: [
          getDocumentQCInboxForUserAction,
          setWorkItemsAction,
        ],
        documentqcmyinbox: [
          getDocumentQCInboxForUserAction,
          setWorkItemsAction,
        ],
        documentqcmyoutbox: [
          getDocumentQCServedForUserAction,
          setWorkItemsAction,
        ],
        documentqcsectioninProgress: [
          getDocumentQCInboxForSectionAction,
          setWorkItemsAction,
          setSectionInboxCountAction,
        ],
        documentqcsectioninbox: [
          getDocumentQCInboxForSectionAction,
          setWorkItemsAction,
          setSectionInboxCountAction,
        ],
        documentqcsectionoutbox: [
          getDocumentQCServedForSectionAction,
          setWorkItemsAction,
        ],
        messagesmyinbox: [getInboxMessagesForUserAction, setWorkItemsAction],
        messagesmyoutbox: [getSentMessagesForUserAction, setWorkItemsAction],
        messagessectioninbox: [
          getInboxMessagesForSectionAction,
          setWorkItemsAction,
          setSectionInboxCountAction,
        ],
        messagessectionoutbox: [
          getSentMessagesForSectionAction,
          setWorkItemsAction,
        ],
      },
    ],
  ]),
]);
