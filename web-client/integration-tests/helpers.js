import { Case } from '../../shared/src/business/entities/cases/Case';
import { CerebralTest } from 'cerebral/test';
import { Document } from '../../shared/src/business/entities/Document';
import { Order } from '../../shared/src/business/entities/orders/Order';
import { TrialSession } from '../../shared/src/business/entities/trialSessions/TrialSession';
import { TrialSessionWorkingCopy } from '../../shared/src/business/entities/trialSessions/TrialSessionWorkingCopy';
import { User } from '../../shared/src/business/entities/User';
import { applicationContext } from '../src/applicationContext';
import { formattedWorkQueue as formattedWorkQueueComputed } from '../src/presenter/computeds/formattedWorkQueue';
import {
  image1,
  image2,
} from '../../shared/src/business/useCases/scannerMockFiles';
import { isFunction, mapValues } from 'lodash';
import { presenter } from '../src/presenter/presenter';
import { runCompute } from 'cerebral/test';
import { socketProvider } from '../src/providers/socket';
import { socketRouter } from '../src/providers/socketRouter';
import { withAppContextDecorator } from '../src/withAppContext';

import { workQueueHelper as workQueueHelperComputed } from '../src/presenter/computeds/workQueueHelper';
import FormData from 'form-data';
const {
  ContactFactory,
} = require('../../shared/src/business/entities/contacts/ContactFactory');

const formattedWorkQueue = withAppContextDecorator(formattedWorkQueueComputed);
const workQueueHelper = withAppContextDecorator(workQueueHelperComputed);

const fakeData =
  'JVBERi0xLjEKJcKlwrHDqwoKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCgoyIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2VzCiAgICAgL0tpZHMgWzMgMCBSXQogICAgIC9Db3VudCAxCiAgICAgL01lZGlhQm94IFswIDAgMzAwIDE0NF0KICA+PgplbmRvYmoKCjMgMCBvYmoKICA8PCAgL1R5cGUgL1BhZ2UKICAgICAgL1BhcmVudCAyIDAgUgogICAgICAvUmVzb3VyY2VzCiAgICAgICA8PCAvRm9udAogICAgICAgICAgIDw8IC9GMQogICAgICAgICAgICAgICA8PCAvVHlwZSAvRm9udAogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTEKICAgICAgICAgICAgICAgICAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgogICAgICAgICAgICAgICA+PgogICAgICAgICAgID4+CiAgICAgICA+PgogICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoKCjQgMCBvYmoKICA8PCAvTGVuZ3RoIDg0ID4+CnN0cmVhbQogIEJUCiAgICAvRjEgMTggVGYKICAgIDUgODAgVGQKICAgIChDb25ncmF0aW9ucywgeW91IGZvdW5kIHRoZSBFYXN0ZXIgRWdnLikgVGoKICBFVAplbmRzdHJlYW0KZW5kb2JqCgp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTggMDAwMDAgbiAKMDAwMDAwMDA3NyAwMDAwMCBuIAowMDAwMDAwMTc4IDAwMDAwIG4gCjAwMDAwMDA0NTcgMDAwMDAgbiAKdHJhaWxlcgogIDw8ICAvUm9vdCAxIDAgUgogICAgICAvU2l6ZSA1CiAgPj4Kc3RhcnR4cmVmCjU2NQolJUVPRgo=';
const fakeFile = new Buffer.from(fakeData, 'base64', {
  type: 'application/pdf',
});
fakeFile.name = 'fakeFile.pdf';

exports.fakeFile = fakeFile;

exports.getFormattedDocumentQCMyInbox = async test => {
  await test.runSequence('chooseWorkQueueSequence', {
    box: 'inbox',
    queue: 'my',
    workQueueIsInternal: false,
  });
  return runCompute(formattedWorkQueue, {
    state: test.getState(),
  });
};

exports.getFormattedDocumentQCSectionInbox = async test => {
  await test.runSequence('chooseWorkQueueSequence', {
    box: 'inbox',
    queue: 'section',
    workQueueIsInternal: false,
  });
  return runCompute(formattedWorkQueue, {
    state: test.getState(),
  });
};

exports.getFormattedDocumentQCMyOutbox = async test => {
  await test.runSequence('chooseWorkQueueSequence', {
    box: 'outbox',
    queue: 'my',
    workQueueIsInternal: false,
  });
  return runCompute(formattedWorkQueue, {
    state: test.getState(),
  });
};

exports.getFormattedDocumentQCSectionOutbox = async test => {
  await test.runSequence('chooseWorkQueueSequence', {
    box: 'outbox',
    queue: 'section',
    workQueueIsInternal: false,
  });
  return runCompute(formattedWorkQueue, {
    state: test.getState(),
  });
};

exports.signProposedStipulatedDecision = async (test, stipDecision) => {
  await exports.viewDocumentDetailMessage({
    docketNumber: stipDecision.docketNumber,
    documentId: stipDecision.document.documentId,
    messageId: stipDecision.currentMessage.messageId,
    test,
    workItemIdToMarkAsRead: stipDecision.workItemId,
  });

  await test.runSequence('gotoSignPDFDocumentSequence', {
    docketNumber: stipDecision.docketNumber,
    documentId: stipDecision.document.documentId,
    pageNumber: 1,
  });

  await test.runSequence('setPDFSignatureDataSequence', {
    signatureData: {
      scale: 1,
      x: 100,
      y: 100,
    },
  });

  test.setState('form', {
    assigneeId: '1805d1ab-18d0-43ec-bafb-654e83405416',
    message: 'serve this please!',
    section: 'docket',
  });

  await test.runSequence('completeDocumentSigningSequence');
};

exports.serveDocument = async ({ docketNumber, documentId, test }) => {
  await test.runSequence('gotoEditCourtIssuedDocketEntrySequence', {
    docketNumber,
    documentId,
  });

  await test.runSequence('openConfirmInitiateServiceModalSequence');
  await test.runSequence('serveCourtIssuedDocumentSequence');
};

exports.createCourtIssuedDocketEntry = async ({
  docketNumber,
  documentId,
  test,
}) => {
  await test.runSequence('gotoDocumentDetailSequence', {
    docketNumber,
    documentId,
  });

  await test.runSequence('gotoAddCourtIssuedDocketEntrySequence', {
    docketNumber,
    documentId,
  });

  await test.runSequence('updateCourtIssuedDocketEntryFormValueSequence', {
    key: 'judge',
    value: 'Judge Buch',
  });

  await test.runSequence('submitCourtIssuedDocketEntrySequence');
};

exports.getFormattedMyInbox = async test => {
  await test.runSequence('chooseWorkQueueSequence', {
    box: 'inbox',
    queue: 'my',
    workQueueIsInternal: true,
  });
  return runCompute(formattedWorkQueue, {
    state: test.getState(),
  });
};

exports.getFormattedSectionInbox = async test => {
  await test.runSequence('chooseWorkQueueSequence', {
    box: 'inbox',
    queue: 'section',
    workQueueIsInternal: true,
  });
  return runCompute(formattedWorkQueue, {
    state: test.getState(),
  });
};

exports.getFormattedMyOutbox = async test => {
  await test.runSequence('chooseWorkQueueSequence', {
    box: 'outbox',
    queue: 'my',
    workQueueIsInternal: true,
  });
  return runCompute(formattedWorkQueue, {
    state: test.getState(),
  });
};

exports.getFormattedSectionOutbox = async test => {
  await test.runSequence('chooseWorkQueueSequence', {
    box: 'outbox',
    queue: 'section',
    workQueueIsInternal: true,
  });
  return runCompute(formattedWorkQueue, {
    state: test.getState(),
  });
};

exports.getInboxCount = test => {
  return runCompute(workQueueHelper, {
    state: test.getState(),
  }).inboxCount;
};

exports.findWorkItemByCaseId = (queue, caseId) => {
  return queue.find(workItem => workItem.caseId === caseId);
};

exports.getNotifications = test => {
  return test.getState('notifications');
};

exports.assignWorkItems = async (test, to, workItems) => {
  const users = {
    adc: {
      name: 'Test ADC',
      userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
    },
    docketclerk: {
      name: 'Test Docketclerk',
      userId: '1805d1ab-18d0-43ec-bafb-654e83405416',
    },
  };
  await test.runSequence('selectAssigneeSequence', {
    assigneeId: users[to].userId,
    assigneeName: users[to].name,
  });
  for (let workItem of workItems) {
    await test.runSequence('selectWorkItemSequence', {
      workItem,
    });
  }
  await test.runSequence('assignSelectedWorkItemsSequence');
};

exports.uploadExternalDecisionDocument = async test => {
  test.setState('form', {
    attachments: false,
    category: 'Decision',
    certificateOfService: false,
    certificateOfServiceDate: null,
    documentTitle: 'Agreed Computation for Entry of Decision',
    documentType: 'Agreed Computation for Entry of Decision',
    eventCode: 'ACED',
    hasSupportingDocuments: false,
    partyPrimary: true,
    primaryDocumentFile: fakeFile,
    primaryDocumentFileSize: 115022,
    scenario: 'Standard',
    searchError: false,
    secondaryDocument: {},
    serviceDate: null,
    supportingDocument: null,
    supportingDocumentFile: null,
    supportingDocumentFreeText: null,
    supportingDocumentMetadata: null,
  });
  await test.runSequence('submitExternalDocumentSequence');
};

exports.uploadProposedStipulatedDecision = async test => {
  test.setState('form', {
    attachments: false,
    category: 'Decision',
    certificateOfService: false,
    certificateOfServiceDate: null,
    documentTitle: 'Proposed Stipulated Decision',
    documentType: 'Proposed Stipulated Decision',
    eventCode: 'PSDE',
    hasSecondarySupportingDocuments: false,
    hasSupportingDocuments: false,
    partyRespondent: true,
    practitioner: [],
    primaryDocumentFile: fakeFile,
    primaryDocumentFileSize: 115022,
    scenario: 'Standard',
    searchError: false,
    secondaryDocument: { certificateOfServiceDate: null },
    serviceDate: null,
  });
  await test.runSequence('submitExternalDocumentSequence');
};

exports.createMessage = async ({ assigneeId, message, test }) => {
  test.setState('form', {
    assigneeId,
    message,
    section: 'docket',
  });

  await test.runSequence('createWorkItemSequence');
};

exports.forwardWorkItem = async (test, to, workItemId, message) => {
  let assigneeId;
  if (to === 'docketclerk1') {
    assigneeId = '2805d1ab-18d0-43ec-bafb-654e83405416';
  }
  test.setState('form', {
    [workItemId]: {
      assigneeId: assigneeId,
      forwardMessage: message,
      section: 'petitions',
    },
  });

  await test.runSequence('submitForwardSequence', {
    workItemId,
  });
};

exports.uploadPetition = async (test, overrides = {}) => {
  await test.runSequence('gotoStartCaseWizardSequence');

  test.setState('form', {
    caseType: overrides.caseType || 'CDP (Lien/Levy)',
    contactPrimary: {
      address1: '734 Cowley Parkway',
      address2: 'Cum aut velit volupt',
      address3: 'Et sunt veritatis ei',
      city: 'Et id aut est velit',
      countryType: 'domestic',
      name: 'Mona Schultz',
      phone: '+1 (884) 358-9729',
      postalCode: '77546',
      state: 'CT',
    },
    contactSecondary: overrides.contactSecondary || {},
    filingType: 'Myself',
    hasIrsNotice: false,
    partyType: overrides.partyType || ContactFactory.PARTY_TYPES.petitioner,
    petitionFile: fakeFile,
    petitionFileSize: 1,
    preferredTrialCity: overrides.preferredTrialCity || 'Seattle, Washington',
    procedureType: overrides.procedureType || 'Regular',
    stinFile: fakeFile,
    stinFileSize: 1,
    wizardStep: '4',
  });

  await test.runSequence('submitFilePetitionSequence');
  return test.getState('caseDetail');
};

exports.loginAs = (test, user) => {
  return it(`login as ${user}`, async () => {
    await test.runSequence('updateFormValueSequence', {
      key: 'name',
      value: user,
    });
    await test.runSequence('submitLoginSequence');
  });
};

exports.setupTest = ({ useCases = {} } = {}) => {
  let test;
  global.FormData = FormData;
  global.Blob = () => {};
  global.File = () => {
    return fakeFile;
  };
  global.WebSocket = require('websocket').w3cwebsocket;
  presenter.providers.applicationContext = applicationContext;
  const { initialize: initializeSocketProvider, start, stop } = socketProvider({
    socketRouter,
  });
  presenter.providers.socket = { start, stop };

  const originalUseCases = applicationContext.getUseCases();
  presenter.providers.applicationContext.getUseCases = () => {
    return {
      ...originalUseCases,
      ...useCases,
    };
  };

  presenter.providers.router = {
    createObjectURL: () => {
      return 'fakeUrl';
    },
    externalRoute: () => {},
    revokeObjectURL: () => {},
    route: async url => {
      test.currentRouteUrl = url;
      switch (url) {
        case '/document-qc/section/inbox':
          await test.runSequence('gotoMessagesSequence', {
            box: 'inbox',
            queue: 'section',
            workQueueIsInternal: false,
          });
          break;
        case '/document-qc/my/inbox':
          await test.runSequence('gotoMessagesSequence', {
            box: 'inbox',
            queue: 'my',
            workQueueIsInternal: false,
          });
          break;
        case '/messages/my/inbox':
          await test.runSequence('gotoMessagesSequence', {
            box: 'inbox',
            queue: 'my',
            workQueueIsInternal: true,
          });
          break;
        case `/case-detail/${test.docketNumber}`:
          await test.runSequence('gotoCaseDetailSequence', {
            docketNumber: test.docketNumber,
          });
          break;
        case '/search/no-matches':
          await test.runSequence('gotoCaseSearchNoMatchesSequence');
          break;
        case `/print-preview/${test.caseId}`:
          await test.runSequence('gotoPrintPreviewSequence', {
            docketNumber: test.caseId,
          });
          break;
        case `/case-detail/${test.docketNumber}/case-information`:
          await test.runSequence('gotoCaseDetailSequence', {
            docketNumber: test.docketNumber,
          });
          break;
        case '/pdf-preview':
          await test.runSequence('gotoPdfPreviewSequence');
          break;
        case '/':
          await test.runSequence('gotoDashboardSequence');
          break;
        default:
          break;
      }
    },
  };

  presenter.state = mapValues(presenter.state, value => {
    if (isFunction(value)) {
      return withAppContextDecorator(value, applicationContext);
    }
    return value;
  });

  test = CerebralTest(presenter);
  test.getSequence = name => obj => test.runSequence(name, obj);
  test.closeSocket = stop;
  test.applicationContext = applicationContext;

  initializeSocketProvider(test);

  global.window = {
    DOMParser: () => {
      return {
        parseFromString: () => {
          return {
            children: [
              {
                innerHTML: 'something',
              },
            ],
            querySelector: () => {},
          };
        },
      };
    },
    URL: {
      createObjectURL: () => {
        return fakeData;
      },
      revokeObjectURL: () => {},
    },
    document: {},
    localStorage: {
      removeItem: () => null,
      setItem: () => null,
    },
  };

  test.setState('constants', {
    CASE_CAPTION_POSTFIX: Case.CASE_CAPTION_POSTFIX,
    CATEGORIES: Document.CATEGORIES,
    CATEGORY_MAP: Document.CATEGORY_MAP,
    COUNTRY_TYPES: ContactFactory.COUNTRY_TYPES,
    COURT_ISSUED_EVENT_CODES: Document.COURT_ISSUED_EVENT_CODES,
    INTERNAL_CATEGORY_MAP: Document.INTERNAL_CATEGORY_MAP,
    ORDER_TYPES_MAP: Order.ORDER_TYPES,
    PARTY_TYPES: ContactFactory.PARTY_TYPES,
    STATUS_TYPES: Case.STATUS_TYPES,
    TRIAL_CITIES: TrialSession.TRIAL_CITIES,
    TRIAL_STATUS_TYPES: TrialSessionWorkingCopy.TRIAL_STATUS_TYPES,
    USER_ROLES: User.ROLES,
  });

  return test;
};

exports.viewCaseDetail = async ({ docketNumber, test }) => {
  await test.runSequence('gotoCaseDetailSequence', {
    docketNumber,
  });
};

exports.viewDocumentDetailMessage = async ({
  docketNumber,
  documentId,
  messageId,
  test,
  workItemIdToMarkAsRead,
}) => {
  await test.runSequence('gotoDocumentDetailSequence', {
    docketNumber,
    documentId,
    messageId,
    workItemIdToMarkAsRead,
  });
};

exports.wait = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

exports.base64ToUInt8Array = b64 => {
  var binaryStr = Buffer.from(b64, 'base64').toString('binary');
  var len = binaryStr.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return bytes;
};

exports.setBatchPages = ({ test }) => {
  const selectedDocumentType = test.getState('documentSelectedForScan');
  let batches = test.getState(`batches.${selectedDocumentType}`);

  test.setState(
    `batches.${selectedDocumentType}`,
    batches.map(batch => ({
      ...batch,
      pages: [
        exports.base64ToUInt8Array(image1),
        exports.base64ToUInt8Array(image2),
      ],
    })),
  );
};
