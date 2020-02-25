const DateHandler = require('../utilities/DateHandler');
const docketNumberGenerator = require('../../persistence/dynamo/cases/docketNumberGenerator');
const uuidv4 = require('uuid/v4');
const {
  addWorkItemToSectionInbox,
} = require('../../persistence/dynamo/workitems/addWorkItemToSectionInbox');
const {
  CaseExternalIncomplete,
} = require('../entities/cases/CaseExternalIncomplete');
const {
  createWorkItem: createWorkItemPersistence,
} = require('../../persistence/dynamo/workitems/createWorkItem');
const {
  deleteWorkItemFromInbox,
} = require('../../persistence/dynamo/workitems/deleteWorkItemFromInbox');
const {
  getCaseByCaseId,
} = require('../../persistence/dynamo/cases/getCaseByCaseId');
const {
  getCaseDeadlinesByCaseId,
} = require('../../persistence/dynamo/caseDeadlines/getCaseDeadlinesByCaseId');
const {
  getDocumentQCInboxForSection: getDocumentQCInboxForSectionPersistence,
} = require('../../persistence/dynamo/workitems/getDocumentQCInboxForSection');
const {
  getDocumentQCInboxForUser: getDocumentQCInboxForUserPersistence,
} = require('../../persistence/dynamo/workitems/getDocumentQCInboxForUser');
const {
  getInboxMessagesForSection,
} = require('../../persistence/dynamo/workitems/getInboxMessagesForSection');
const {
  getInboxMessagesForUser: getInboxMessagesForUserPersistence,
} = require('../../persistence/dynamo/workitems/getInboxMessagesForUser');
const {
  getSentMessagesForUser: getSentMessagesForUserPersistence,
} = require('../../persistence/dynamo/workitems/getSentMessagesForUser');
const {
  getUserById: getUserByIdPersistence,
} = require('../../persistence/dynamo/users/getUserById');
const {
  getWorkItemById: getWorkItemByIdPersistence,
} = require('../../persistence/dynamo/workitems/getWorkItemById');
const {
  incrementCounter,
} = require('../../persistence/dynamo/helpers/incrementCounter');
const {
  putWorkItemInOutbox,
} = require('../../persistence/dynamo/workitems/putWorkItemInOutbox');
const {
  saveWorkItemForNonPaper,
} = require('../../persistence/dynamo/workitems/saveWorkItemForNonPaper');

const {
  createSectionInboxRecord,
} = require('../../persistence/dynamo/workitems/createSectionInboxRecord');
const {
  createUserInboxRecord,
} = require('../../persistence/dynamo/workitems/createUserInboxRecord');
const {
  deleteSectionOutboxRecord,
} = require('../../persistence/dynamo/workitems/deleteSectionOutboxRecord');
const {
  deleteUserOutboxRecord,
} = require('../../persistence/dynamo/workitems/deleteUserOutboxRecord');

const {
  saveWorkItemForPaper,
} = require('../../persistence/dynamo/workitems/saveWorkItemForPaper');
const {
  setWorkItemAsRead,
} = require('../../persistence/dynamo/workitems/setWorkItemAsRead');
const {
  updateWorkItem,
} = require('../../persistence/dynamo/workitems/updateWorkItem');
const {
  updateWorkItemInCase,
} = require('../../persistence/dynamo/cases/updateWorkItemInCase');
const {
  verifyCaseForUser,
} = require('../../persistence/dynamo/cases/verifyCaseForUser');
const { CaseInternal } = require('../entities/cases/CaseInternal');
const { createCase } = require('../../persistence/dynamo/cases/createCase');
const { createMockDocumentClient } = require('./createMockDocumentClient');
const { updateCase } = require('../../persistence/dynamo/cases/updateCase');
const { User } = require('../entities/User');

const createTestApplicationContext = ({ user } = {}) => {
  const mockDocClient = createMockDocumentClient();
  const applicationContext = {
    docketNumberGenerator,
    environment: { stage: 'local' },
    getCurrentUser: () => {
      return new User(
        user || {
          name: 'richard',
          role: User.ROLES.petitioner,
          userId: 'a805d1ab-18d0-43ec-bafb-654e83405416',
        },
      );
    },
    getDocumentClient: () => mockDocClient,
    getEntityConstructors: () => ({
      CaseExternal: CaseExternalIncomplete,
      CaseInternal: CaseInternal,
    }),
    getPersistenceGateway: () => {
      return {
        addWorkItemToSectionInbox,
        createCase,
        createSectionInboxRecord,
        createUserInboxRecord,
        createWorkItem: createWorkItemPersistence,
        deleteSectionOutboxRecord,
        deleteUserOutboxRecord,
        deleteWorkItemFromInbox,
        getCaseByCaseId,
        getCaseDeadlinesByCaseId,
        getDocumentQCInboxForSection: getDocumentQCInboxForSectionPersistence,
        getDocumentQCInboxForUser: getDocumentQCInboxForUserPersistence,
        getInboxMessagesForSection,
        getInboxMessagesForUser: getInboxMessagesForUserPersistence,
        getSentMessagesForUser: getSentMessagesForUserPersistence,
        getUserById: getUserByIdPersistence,
        getWorkItemById: getWorkItemByIdPersistence,
        incrementCounter,
        putWorkItemInOutbox,
        saveWorkItemForNonPaper,
        saveWorkItemForPaper,
        setWorkItemAsRead,
        updateCase,
        updateWorkItem,
        updateWorkItemInCase,
        verifyCaseForUser,
      };
    },
    getUniqueId: () => {
      return uuidv4();
    },
    getUtilities: () => {
      return { ...DateHandler };
    },
    isAuthorizedForWorkItems: () => true,
  };
  return applicationContext;
};

exports.createTestApplicationContext = createTestApplicationContext;
