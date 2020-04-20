import { BigHeader } from '../BigHeader';
import { CaseSearchForm } from '../AdvancedSearch/CaseSearchForm';
import { ErrorNotification } from '../ErrorNotification';
import { OrderSearchForm } from '../AdvancedSearch/OrderSearchForm';
import { OrderSearchResults } from '../AdvancedSearch/OrderSearchResults';
import { SearchResults } from '../AdvancedSearch/SearchResults';
import { SuccessNotification } from '../SuccessNotification';
import { Tab, Tabs } from '../../ustc-ui/Tabs/Tabs';
import { connect } from '@cerebral/react';
import { sequences } from 'cerebral';
import React from 'react';

export const PublicSearch = connect(
  {
    advancedSearchTabChangeSequence: sequences.advancedSearchTabChangeSequence,
    submitCaseDocketNumberSearchSequence:
      sequences.submitCaseDocketNumberSearchSequence,
    submitPublicCaseAdvancedSearchSequence:
      sequences.submitPublicCaseAdvancedSearchSequence,
    submitPublicOrderAdvancedSearchSequence:
      sequences.submitPublicOrderAdvancedSearchSequence,
  },
  function PublicSearch({
    advancedSearchTabChangeSequence,
    submitCaseDocketNumberSearchSequence,
    submitPublicCaseAdvancedSearchSequence,
    submitPublicOrderAdvancedSearchSequence,
  }) {
    return (
      <>
        <BigHeader text="Welcome to the U.S Tax Court’s Case Management System" />

        <section className="usa-section grid-container advanced-search">
          <SuccessNotification />
          <ErrorNotification />

          <Tabs
            bind="advancedSearchTab"
            className="classic-horizontal-header3 tab-border"
            onSelect={() => {
              advancedSearchTabChangeSequence();
            }}
          >
            <Tab id="tab-case" tabName="case" title="Case">
              <p>
                Anyone can search for a case in our system for cases filed{' '}
                <span className="text-semibold">on or after May 1, 1986</span>.
                If you aren’t affiliated with that case, you will only see
                limited information about that case.
              </p>

              <CaseSearchForm
                submitAdvancedSearchSequence={
                  submitPublicCaseAdvancedSearchSequence
                }
                submitDocketNumberSearchSequence={
                  submitCaseDocketNumberSearchSequence
                }
              />
              <SearchResults />
            </Tab>
            <Tab id="tab-order" tabName="order" title="Order">
              <OrderSearchForm
                submitAdvancedSearchSequence={
                  submitPublicOrderAdvancedSearchSequence
                }
              />
              <OrderSearchResults />
            </Tab>
          </Tabs>
        </section>
      </>
    );
  },
);
