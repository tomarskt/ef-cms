import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';
import classNames from 'classnames';

export const ReportsMenu = connect(
  {
    pageIsReports: state.headerHelper.pageIsReports,
    toggleReportsMenuSequence: sequences.toggleReportsMenuSequence,
  },
  ({ isExpanded, pageIsReports, toggleReportsMenuSequence }) => {
    return (
      <>
        <button
          aria-expanded={isExpanded}
          className={classNames(
            'usa-accordion__button usa-nav__link',
            pageIsReports && 'usa-current',
          )}
          onClick={() => toggleReportsMenuSequence()}
        >
          <span>Reports</span>
        </button>
        {isExpanded && (
          <ul className="usa-nav__submenu">
            <li className="usa-nav__submenu-item">
              <a href="/reports/case-deadlines" id="all-deadlines">
                Deadlines
              </a>
            </li>
          </ul>
        )}
      </>
    );
  },
);