import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';

export const PublicCaseDetailHeader = connect(
  {
    publicCaseDetailHeaderHelper: state.publicCaseDetailHeaderHelper,
  },
  ({ publicCaseDetailHeaderHelper }) => {
    return (
      <>
        {publicCaseDetailHeaderHelper.isCaseSealed && (
          <div className="red-warning-header sealed-banner">
            <div className="grid-container text-bold">
              <FontAwesomeIcon
                className="margin-right-1 icon-sealed"
                icon="lock"
                size="1x"
              />
              This case is sealed
            </div>
          </div>
        )}
        <div className="big-blue-header margin-bottom-0">
          <div className="grid-container">
            <div className="grid-row">
              <div className="tablet:grid-col-8">
                <div>
                  <h1 className="heading-2 captioned" tabIndex="-1">
                    Docket Number:{' '}
                    {publicCaseDetailHeaderHelper.docketNumberWithSuffix}
                  </h1>
                  {!publicCaseDetailHeaderHelper.isCaseSealed && (
                    <p className="margin-top-1 margin-bottom-0" id="case-title">
                      <span>{publicCaseDetailHeaderHelper.caseTitle}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);
