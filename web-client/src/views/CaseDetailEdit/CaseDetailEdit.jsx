import { Button } from '../../ustc-ui/Button/Button';
import { CaseInfo } from './CaseInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRSNotice } from './IRSNotice';
import { PartyInformation } from './PartyInformation';
import { Tab, Tabs } from '../../ustc-ui/Tabs/Tabs';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const CaseDetailEdit = connect(
  {
    navigateBackSequence: sequences.navigateBackSequence,
    navigateToReviewSavedPetitionSequence:
      sequences.navigateToReviewSavedPetitionSequence,
    screenMetadata: state.screenMetadata,
  },
  ({
    navigateBackSequence,
    navigateToReviewSavedPetitionSequence,
    screenMetadata,
  }) => {
    return (
      <div noValidate id="case-edit-form" role="form">
        <Tabs
          boxed
          bind="documentDetail.tab"
          className="container-tabs tab-button-h3"
          id="case-detail-tabs"
        >
          <Tab id="tab-parties" tabName="partyInfo" title="Parties">
            <PartyInformation />
          </Tab>
          <Tab id="tab-case-info" tabName="caseInfo" title="Case Info">
            <CaseInfo />
          </Tab>
          <Tab id="tab-irs-notice" tabName="irsNotice" title="IRS Notice">
            <IRSNotice />
          </Tab>
        </Tabs>

        <Button
          id="submit-case"
          type="button"
          onClick={() => {
            navigateToReviewSavedPetitionSequence();
          }}
        >
          Review Petition
        </Button>
        <Button link onClick={() => navigateBackSequence()}>
          Cancel
        </Button>
        {screenMetadata.showSaveSuccess && (
          <span aria-live="polite" className="mini-success" role="alert">
            <FontAwesomeIcon icon="check-circle" size="sm" />
            Your changes have been saved.
          </span>
        )}
      </div>
    );
  },
);
