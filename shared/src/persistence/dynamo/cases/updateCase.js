const client = require('../../dynamodbClientService');
const diff = require('diff-arrays-of-objects');
const {
  updateWorkItemAssociatedJudge,
} = require('../workitems/updateWorkItemAssociatedJudge');
const {
  updateWorkItemCaseCaptionNames,
} = require('../workitems/updateWorkItemCaseCaptionNames');
const {
  updateWorkItemCaseIsInProgress,
} = require('../workitems/updateWorkItemCaseIsInProgress');
const {
  updateWorkItemCaseStatus,
} = require('../workitems/updateWorkItemCaseStatus');
const {
  updateWorkItemDocketNumberSuffix,
} = require('../workitems/updateWorkItemDocketNumberSuffix');
const {
  updateWorkItemTrialDate,
} = require('../workitems/updateWorkItemTrialDate');
const { Case } = require('../../../business/entities/cases/Case');
const { differenceWith, isEqual } = require('lodash');
const { getCaseByCaseId } = require('../cases/getCaseByCaseId');
const { omit } = require('lodash');

/**
 * updateCase
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.caseToUpdate the case data to update
 * @returns {Promise} the promise of the persistence calls
 */
exports.updateCase = async ({ applicationContext, caseToUpdate }) => {
  const oldCase = await getCaseByCaseId({
    applicationContext,
    caseId: caseToUpdate.caseId,
  });

  const requests = [];

  const updatedDocketRecord = differenceWith(
    caseToUpdate.docketRecord,
    oldCase.docketRecord,
    isEqual,
  );

  updatedDocketRecord.forEach(docketEntry => {
    requests.push(
      client.put({
        Item: {
          pk: `case|${caseToUpdate.caseId}`,
          sk: `docket-record|${docketEntry.docketRecordId}`,
          ...docketEntry,
        },
        applicationContext,
      }),
    );
  });

  const updatedDocuments = differenceWith(
    caseToUpdate.documents,
    oldCase.documents,
    isEqual,
  );

  updatedDocuments.forEach(document => {
    requests.push(
      client.put({
        Item: {
          pk: `case|${caseToUpdate.caseId}`,
          sk: `document|${document.documentId}`,
          ...document,
        },
        applicationContext,
      }),
    );
  });

  const oldIrsPractitioners = oldCase.irsPractitioners.map(irsPractitioner =>
    omit(irsPractitioner, ['pk', 'sk']),
  );
  const {
    added: addedIrsPractitioners,
    removed: deletedIrsPractitioners,
    updated: updatedIrsPractitioners,
  } = diff(oldIrsPractitioners, caseToUpdate.irsPractitioners, 'userId');

  deletedIrsPractitioners.forEach(practitioner => {
    requests.push(
      client.delete({
        applicationContext,
        key: {
          pk: `case|${caseToUpdate.caseId}`,
          sk: `irsPractitioner|${practitioner.userId}`,
        },
      }),
    );
  });

  [...addedIrsPractitioners, ...updatedIrsPractitioners].forEach(
    practitioner => {
      requests.push(
        client.put({
          Item: {
            pk: `case|${caseToUpdate.caseId}`,
            sk: `irsPractitioner|${practitioner.userId}`,
            ...practitioner,
          },
          applicationContext,
        }),
      );
    },
  );

  const oldPrivatePractitioners = oldCase.privatePractitioners.map(
    privatePractitioner => omit(privatePractitioner, ['pk', 'sk']),
  );

  const {
    added: addedPrivatePractitioners,
    removed: deletedPrivatePractitioners,
    updated: updatedPrivatePractitioners,
  } = diff(
    oldPrivatePractitioners,
    caseToUpdate.privatePractitioners,
    'userId',
  );

  deletedPrivatePractitioners.forEach(practitioner => {
    requests.push(
      client.delete({
        applicationContext,
        key: {
          pk: `case|${caseToUpdate.caseId}`,
          sk: `privatePractitioner|${practitioner.userId}`,
        },
      }),
    );
  });

  [...addedPrivatePractitioners, ...updatedPrivatePractitioners].forEach(
    practitioner => {
      requests.push(
        client.put({
          Item: {
            pk: `case|${caseToUpdate.caseId}`,
            sk: `privatePractitioner|${practitioner.userId}`,
            ...practitioner,
          },
          applicationContext,
        }),
      );
    },
  );

  if (
    oldCase.status !== caseToUpdate.status ||
    oldCase.docketNumberSuffix !== caseToUpdate.docketNumberSuffix ||
    oldCase.caseCaption !== caseToUpdate.caseCaption ||
    oldCase.trialDate !== caseToUpdate.trialDate ||
    oldCase.associatedJudge !== caseToUpdate.associatedJudge ||
    oldCase.caseIsInProgress !== caseToUpdate.caseIsInProgress
  ) {
    const workItemMappings = await client.query({
      ExpressionAttributeNames: {
        '#pk': 'pk',
        '#sk': 'sk',
      },
      ExpressionAttributeValues: {
        ':pk': `case|${caseToUpdate.caseId}`,
        ':prefix': 'work-item',
      },
      KeyConditionExpression: '#pk = :pk and begins_with(#sk, :prefix)',
      applicationContext,
    });

    for (let mapping of workItemMappings) {
      const [, workItemId] = mapping.sk.split('|');
      if (oldCase.status !== caseToUpdate.status) {
        requests.push(
          updateWorkItemCaseStatus({
            applicationContext,
            caseStatus: caseToUpdate.status,
            workItemId,
          }),
        );
      }
      if (oldCase.caseCaption !== caseToUpdate.caseCaption) {
        requests.push(
          updateWorkItemCaseCaptionNames({
            applicationContext,
            caseCaptionNames: Case.getCaseCaptionNames(
              caseToUpdate.caseCaption,
            ),
            workItemId,
          }),
        );
      }
      if (oldCase.docketNumberSuffix !== caseToUpdate.docketNumberSuffix) {
        requests.push(
          updateWorkItemDocketNumberSuffix({
            applicationContext,
            docketNumberSuffix: caseToUpdate.docketNumberSuffix || null,
            workItemId,
          }),
        );
      }
      if (oldCase.trialDate !== caseToUpdate.trialDate) {
        requests.push(
          updateWorkItemTrialDate({
            applicationContext,
            trialDate: caseToUpdate.trialDate || null,
            workItemId,
          }),
        );
      }
      if (oldCase.associatedJudge !== caseToUpdate.associatedJudge) {
        requests.push(
          updateWorkItemAssociatedJudge({
            applicationContext,
            associatedJudge: caseToUpdate.associatedJudge,
            workItemId,
          }),
        );
      }
      if (oldCase.inProgress !== caseToUpdate.inProgress) {
        requests.push(
          updateWorkItemCaseIsInProgress({
            applicationContext,
            caseIsInProgress: caseToUpdate.inProgress,
            workItemId,
          }),
        );
      }
    }
  }

  let setLeadCase = caseToUpdate.leadCaseId
    ? { gsi1pk: caseToUpdate.leadCaseId }
    : {};

  await Promise.all([
    client.put({
      Item: {
        pk: `case|${caseToUpdate.caseId}`,
        sk: `case|${caseToUpdate.caseId}`,
        ...setLeadCase,
        ...omit(caseToUpdate, [
          'documents',
          'irsPractitioners',
          'privatePractitioners',
          'docketRecord',
        ]),
      },
      applicationContext,
    }),
    ...requests,
  ]);

  return caseToUpdate;
};
