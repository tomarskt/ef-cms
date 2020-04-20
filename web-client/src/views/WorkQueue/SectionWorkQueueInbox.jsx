import { CaseLink } from '../../ustc-ui/CaseLink/CaseLink';
import { Icon } from '../../ustc-ui/Icon/Icon';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const SectionWorkQueueInbox = connect(
  {
    assignSelectedWorkItemsSequence: sequences.assignSelectedWorkItemsSequence,
    formattedWorkQueue: state.formattedWorkQueue,
    selectAssigneeSequence: sequences.selectAssigneeSequence,
    selectWorkItemSequence: sequences.selectWorkItemSequence,
    selectedWorkItems: state.selectedWorkItems,
    setFocusedWorkItemSequence: sequences.setFocusedWorkItemSequence,
    users: state.users,
    workQueueHelper: state.workQueueHelper,
  },
  function SectionWorkQueueInbox({
    assignSelectedWorkItemsSequence,
    formattedWorkQueue,
    selectAssigneeSequence,
    selectedWorkItems,
    selectWorkItemSequence,
    setFocusedWorkItemSequence,
    users,
    workQueueHelper,
  }) {
    return (
      <React.Fragment>
        {workQueueHelper.showSendToBar && (
          <div className="action-section">
            <span className="assign-work-item-count">
              <Icon aria-label="selected work items count" icon="check" />
              {selectedWorkItems.length}
            </span>
            <select
              aria-label="select an assignee"
              className="usa-select"
              id="options"
              name="options"
              onChange={event => {
                selectAssigneeSequence({
                  assigneeId: event.target.value,
                  assigneeName:
                    event.target.options[event.target.selectedIndex].text,
                });
                assignSelectedWorkItemsSequence();
              }}
            >
              <option value>Assign to...</option>
              {users.map(user => (
                <option key={user.userId} value={user.userId}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <table
          aria-describedby="tab-work-queue"
          className="usa-table work-queue subsection"
          id="section-work-queue"
        >
          <thead>
            <tr>
              {workQueueHelper.showSelectColumn && <th colSpan="2">&nbsp;</th>}
              <th aria-label="Docket Number">Docket number</th>
              <th>{workQueueHelper.inboxFiledColumnLabel}</th>
              <th>Case title</th>
              {!workQueueHelper.hideIconColumn && (
                <th aria-label="Status Icon" className="padding-right-0" />
              )}
              <th>Document</th>
              {!workQueueHelper.hideFiledByColumn && <th>Filed by</th>}
              <th>Case status</th>
              {workQueueHelper.showAssignedToColumn && (
                <th>{workQueueHelper.assigneeColumnTitle}</th>
              )}
              {!workQueueHelper.hideFromColumn && <th>From</th>}
              {!workQueueHelper.hideSectionColumn && <th>Section</th>}
            </tr>
          </thead>
          {formattedWorkQueue.map((item, idx) => (
            <tbody
              key={idx}
              onClick={() =>
                setFocusedWorkItemSequence({
                  queueType: 'workQueue',
                  uiKey: item.uiKey,
                })
              }
            >
              <tr>
                {workQueueHelper.showSelectColumn && (
                  <>
                    <td aria-hidden="true" className="focus-toggle" />
                    <td
                      className="message-select-control"
                      onClick={e => {
                        selectWorkItemSequence({
                          workItem: item,
                        });
                        e.stopPropagation();
                      }}
                    >
                      <input
                        aria-label="Select work item"
                        checked={item.selected}
                        className="usa-checkbox__input"
                        id={item.workItemId}
                        type="checkbox"
                        onChange={e => {
                          selectWorkItemSequence({
                            workItem: item,
                          });
                          e.stopPropagation();
                        }}
                      />
                      <label
                        className="usa-checkbox__label padding-top-05"
                        htmlFor={item.workItemId}
                        id={`label-${item.workItemId}`}
                      />
                    </td>
                  </>
                )}
                <td className="message-queue-row">
                  <CaseLink formattedCase={item} />
                </td>
                <td className="message-queue-row">
                  <span className="no-wrap">{item.received}</span>
                </td>
                <td className="message-queue-row message-queue-case-title">
                  {item.caseCaptionNames}
                </td>
                {!workQueueHelper.hideIconColumn && (
                  <td className="message-queue-row has-icon padding-right-0">
                    {item.showUnassignedIcon && (
                      <Icon
                        aria-label="unassigned"
                        className="iconStatusUnassigned"
                        icon={['fas', 'question-circle']}
                        size="lg"
                      />
                    )}
                    {item.showHighPriorityIcon && (
                      <Icon
                        aria-label="high priority"
                        className="iconHighPriority"
                        icon={['fas', 'exclamation-circle']}
                        size="lg"
                      />
                    )}
                  </td>
                )}
                <td className="message-queue-row message-queue-document">
                  <div className="message-document-title">
                    <a
                      className="case-link"
                      href={`/case-detail/${item.docketNumber}/documents/${item.document.documentId}${item.editLink}`}
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      {item.document.descriptionDisplay}
                    </a>
                  </div>
                  {workQueueHelper.showMessageContent && (
                    <div
                      className="message-document-detail"
                      id={`detail-${item.workItemId}`}
                    >
                      {item.currentMessage.message}
                    </div>
                  )}
                </td>
                {!workQueueHelper.hideFiledByColumn && (
                  <td className="message-queue-row">{item.document.filedBy}</td>
                )}
                <td className="message-queue-row">{item.caseStatus}</td>
                {workQueueHelper.showAssignedToColumn && (
                  <td className="to message-queue-row">{item.assigneeName}</td>
                )}
                {!workQueueHelper.hideFromColumn && (
                  <td className="message-queue-row">
                    {item.currentMessage.from}
                  </td>
                )}
                {!workQueueHelper.hideSectionColumn && (
                  <td className="message-queue-row">{item.sentBySection}</td>
                )}
              </tr>
            </tbody>
          ))}
        </table>
        {formattedWorkQueue.length === 0 && (
          <p>{workQueueHelper.queueEmptyMessage}</p>
        )}
      </React.Fragment>
    );
  },
);
