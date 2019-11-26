import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';

export const BatchDownloadProgress = connect(
  {
    batchDownloadHelper: state.batchDownloadHelper,
    zipInProgress: state.zipInProgress,
  },
  ({ batchDownloadHelper, zipInProgress }) => {
    return (
      zipInProgress && (
        <div className="usa-section grid-container">
          <hr />
          <div className="progress-batch-download">
            <h3>Compressing Case Files</h3>
            <p>Progress</p>
            <div
              aria-hidden="true"
              className="progress-bar margin-right-2"
              style={{
                background: `linear-gradient(to right, green 0%, green ${batchDownloadHelper.percentComplete}%, #ffffff ${batchDownloadHelper.percentComplete}%, #ffffff 100%)`,
              }}
            ></div>
            <span className="progress-text">
              {batchDownloadHelper.percentComplete}% Complete
            </span>
          </div>
        </div>
      )
    );
  },
);
