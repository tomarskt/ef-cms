import { Button } from '../../ustc-ui/Button/Button';
import { CreateMessageModalDialog } from './CreateMessageModalDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select } from '../../ustc-ui/Select/Select';
import { TextArea } from '../../ustc-ui/TextArea/TextArea';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';
import classNames from 'classnames';

export const PendingMessages = connect(
  {
    constants: state.constants,
    documentDetailHelper: state.documentDetailHelper,
    form: state.form,
    messageId: state.messageId,
    openCreateMessageModalSequence: sequences.openCreateMessageModalSequence,
    setWorkItemActionSequence: sequences.setWorkItemActionSequence,
    showModal: state.showModal,
    submitCompleteSequence: sequences.submitCompleteSequence,
    submitForwardSequence: sequences.submitForwardSequence,
    updateCompleteFormValueSequence: sequences.updateCompleteFormValueSequence,
    updateForwardFormValueSequence: sequences.updateForwardFormValueSequence,
    users: state.users,
    validateForwardMessageSequence: sequences.validateForwardMessageSequence,
    validationErrors: state.validationErrors,
    workItemMetadata: state.workItemMetadata,
    workQueueSectionHelper: state.workQueueSectionHelper,
  },
  ({
    constants,
    documentDetailHelper,
    form,
    messageId,
    openCreateMessageModalSequence,
    setWorkItemActionSequence,
    showModal,
    submitCompleteSequence,
    submitForwardSequence,
    updateCompleteFormValueSequence,
    updateForwardFormValueSequence,
    users,
    validateForwardMessageSequence,
    validationErrors,
    workItemMetadata,
    workQueueSectionHelper,
  }) => {
    return (
      <>
        <div className="blue-container">
          <Button
            className="margin-bottom-2"
            id="create-message-button"
            onClick={() => openCreateMessageModalSequence()}
          >
            <FontAwesomeIcon
              className="margin-right-1"
              icon="plus-circle"
              size="lg"
            />
            Create Message
          </Button>

          {(!documentDetailHelper.formattedDocument ||
            !documentDetailHelper.formattedDocument.workItems ||
            !documentDetailHelper.formattedDocument.workItems.length) && (
            <div>
              There are no pending messages associated with this document.
            </div>
          )}
          {documentDetailHelper.formattedDocument &&
            documentDetailHelper.formattedDocument.workItems &&
            documentDetailHelper.formattedDocument.workItems.map(
              (workItem, idx) => (
                <div
                  aria-labelledby="tab-pending-messages"
                  className={classNames(
                    `card margin-bottom-0 workitem-${workItem.workItemId}`,
                    workItem.currentMessage.messageId === messageId &&
                      'highlight',
                  )}
                  key={idx}
                >
                  <div className="content-wrapper">
                    <div className="margin-bottom-1">
                      <span className="label-inline">To</span>
                      {workItem.currentMessage.to}
                    </div>
                    <div className="margin-bottom-1">
                      <span className="label-inline">From</span>
                      {workItem.currentMessage.from}
                    </div>
                    <div className="margin-bottom-1">
                      <span className="label-inline">Sent On</span>
                      {workItem.currentMessage.createdAtTimeFormattedTZ}
                    </div>
                    <p>{workItem.currentMessage.message}</p>
                  </div>

                  <div
                    className="content-wrapper toggle-button-wrapper actions-wrapper"
                    role="tablist"
                  >
                    <div className="grid-container padding-x-0">
                      <div className="grid-row">
                        <div className="grid-col-4 padding-x-0">
                          <Button
                            aria-controls={`history-card-${idx}`}
                            aria-selected={documentDetailHelper.showAction(
                              'history',
                              workItem.workItemId,
                            )}
                            className={classNames(
                              documentDetailHelper.showAction(
                                'history',
                                workItem.workItemId,
                              )
                                ? 'selected'
                                : 'unselected',
                            )}
                            id={`history-tab-${idx}`}
                            role="tab"
                            onClick={() =>
                              setWorkItemActionSequence({
                                action: 'history',
                                workItemId: workItem.workItemId,
                              })
                            }
                          >
                            <FontAwesomeIcon icon="list-ul" size="sm" />
                            View History
                          </Button>
                        </div>

                        <div className="grid-col-4 padding-x-0">
                          {workItem.showComplete && (
                            <Button
                              aria-controls={`history-card-${idx}`}
                              aria-selected={documentDetailHelper.showAction(
                                'complete',
                                workItem.workItemId,
                              )}
                              className={classNames(
                                documentDetailHelper.showAction(
                                  'complete',
                                  workItem.workItemId,
                                )
                                  ? 'selected'
                                  : 'unselected',
                              )}
                              id={`complete-tab-${idx}`}
                              role="tab"
                              onClick={() =>
                                setWorkItemActionSequence({
                                  action: 'complete',
                                  workItemId: workItem.workItemId,
                                })
                              }
                            >
                              <FontAwesomeIcon
                                icon={['fas', 'check-circle']}
                                size="sm"
                              />
                              Complete
                            </Button>
                          )}
                        </div>

                        <div className="grid-col-4 padding-x-0">
                          {workItem.showSendTo && (
                            <Button
                              aria-controls={`forward-card-${idx}`}
                              aria-selected={documentDetailHelper.showAction(
                                'forward',
                                workItem.workItemId,
                              )}
                              className={classNames(
                                'send-to',
                                documentDetailHelper.showAction(
                                  'forward',
                                  workItem.workItemId,
                                )
                                  ? 'selected'
                                  : 'unselected',
                              )}
                              data-workitemid={workItem.workItemId}
                              id={`forward-tab-${idx}`}
                              role="tab"
                              onClick={() =>
                                setWorkItemActionSequence({
                                  action: 'forward',
                                  workItemId: workItem.workItemId,
                                })
                              }
                            >
                              <FontAwesomeIcon icon="share-square" size="sm" />{' '}
                              Send To
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {documentDetailHelper.showAction(
                    'complete',
                    workItem.workItemId,
                  ) && (
                    <div
                      aria-labelledby={`complete-tab-${idx}`}
                      className="content-wrapper actions-wrapper"
                      id={`complete-card-${idx}`}
                      role="tabpanel"
                    >
                      <div noValidate id={`complete-form-${idx}`} role="form">
                        <label
                          className="usa-label"
                          htmlFor={`complete-message-${idx}`}
                        >
                          Add note <span className="usa-hint">(optional)</span>
                        </label>
                        <textarea
                          className="usa-textarea margin-bottom-5"
                          id={`complete-message-${idx}`}
                          name="completeMessage"
                          onChange={e => {
                            updateCompleteFormValueSequence({
                              key: e.target.name,
                              value: e.target.value,
                              workItemId: workItem.workItemId,
                            });
                          }}
                        />

                        <Button
                          type="button"
                          onClick={() => {
                            submitCompleteSequence({
                              workItemId: workItem.workItemId,
                            });
                            setWorkItemActionSequence({
                              action: null,
                              workItemId: workItem.workItemId,
                            });
                          }}
                        >
                          Complete
                        </Button>
                      </div>
                    </div>
                  )}
                  {documentDetailHelper.showAction(
                    'history',
                    workItem.workItemId,
                  ) &&
                    !workItem.historyMessages.length && (
                      <div
                        aria-labelledby={`history-tab-${idx}`}
                        className="content-wrapper actions-wrapper"
                        id={`history-card-${idx}`}
                        role="tabpanel"
                      >
                        No additional messages are available.
                      </div>
                    )}
                  {documentDetailHelper.showAction(
                    'history',
                    workItem.workItemId,
                  ) &&
                    workItem.historyMessages.length > 0 && (
                      <div
                        aria-labelledby={`history-tab-${idx}`}
                        className="content-wrapper actions-wrapper"
                        id={`history-card-${idx}`}
                        role="tabpanel"
                      >
                        {workItem.historyMessages.map((message, mIdx) => (
                          <div key={mIdx}>
                            <div className="margin-bottom-1">
                              <span className="label-inline">To</span>
                              {message.to}
                            </div>
                            <div className="margin-bottom-1">
                              <span className="label-inline">From</span>
                              {message.from}
                            </div>
                            <div className="margin-bottom-1">
                              <span className="label-inline">Sent on</span>
                              {message.createdAtTimeFormattedTZ}
                            </div>
                            <p>{message.message}</p>
                            {workItem.historyMessages.length - 1 !== mIdx && (
                              <hr aria-hidden="true" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  {documentDetailHelper.showAction(
                    'forward',
                    workItem.workItemId,
                  ) && (
                    <div
                      className="content-wrapper actions-wrapper"
                      id={`forward-card-${idx}`}
                      role="tabpanel"
                    >
                      <div
                        noValidate
                        aria-labelledby={`forward-tab-${idx}`}
                        className="forward-form"
                        data-workitemid={workItem.workItemId}
                        role="form"
                      >
                        <Select
                          error={
                            validationErrors[workItem.workItemId] &&
                            validationErrors[workItem.workItemId].section
                          }
                          formatter={workQueueSectionHelper.sectionDisplay}
                          id={`section-${idx}`}
                          keys={v => v}
                          label="Select section"
                          name="section"
                          values={constants.SECTIONS}
                          onChange={e => {
                            updateForwardFormValueSequence({
                              form: `form.${workItem.workItemId}`,
                              key: e.target.name,
                              section: e.target.value,
                              value: e.target.value,
                              workItemId: workItem.workItemId,
                            });
                            validateForwardMessageSequence({
                              workItemId: workItem.workItemId,
                            });
                          }}
                        />

                        {workItemMetadata.showChambersSelect && (
                          <Select
                            error={
                              validationErrors[workItem.workItemId] &&
                              validationErrors[workItem.workItemId].section
                            }
                            formatter={workQueueSectionHelper.chambersDisplay}
                            id={`chambers-${idx}`}
                            keys={v => v}
                            label="Select chambers"
                            name="chambers"
                            values={constants.CHAMBERS_SECTIONS}
                            onChange={e => {
                              updateForwardFormValueSequence({
                                form: `form.${workItem.workItemId}`,
                                key: e.target.name,
                                section: e.target.value,
                                value: e.target.value,
                                workItemId: workItem.workItemId,
                              });
                              validateForwardMessageSequence({
                                workItemId: workItem.workItemId,
                              });
                            }}
                          />
                        )}

                        <Select
                          aria-disabled={
                            !form[workItem.workItemId] ||
                            !form[workItem.workItemId].section
                              ? 'true'
                              : 'false'
                          }
                          disabled={
                            !form[workItem.workItemId] ||
                            !form[workItem.workItemId].section
                          }
                          error={
                            validationErrors[workItem.workItemId] &&
                            validationErrors[workItem.workItemId].assigneeId
                          }
                          formatter={user => user.name}
                          id={`assignee-id-${idx}`}
                          keys={user => user.userId}
                          label="Select recipient"
                          name="assigneeId"
                          values={users}
                          onChange={e => {
                            updateForwardFormValueSequence({
                              key: e.target.name,
                              value: e.target.value,
                              workItemId: workItem.workItemId,
                            });
                            validateForwardMessageSequence({
                              workItemId: workItem.workItemId,
                            });
                          }}
                        />

                        <TextArea
                          aria-labelledby={`message-label-${idx}`}
                          className="margin-bottom-5"
                          error={
                            validationErrors[workItem.workItemId] &&
                            validationErrors[workItem.workItemId].forwardMessage
                          }
                          id={`forward-message-${idx}`}
                          label="Add message"
                          name="forwardMessage"
                          onChange={e => {
                            updateForwardFormValueSequence({
                              key: e.target.name,
                              value: e.target.value,
                              workItemId: workItem.workItemId,
                            });
                            validateForwardMessageSequence({
                              workItemId: workItem.workItemId,
                            });
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            submitForwardSequence({
                              workItemId: workItem.workItemId,
                            });
                          }}
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ),
            )}
        </div>
        {showModal === 'CreateMessageModalDialog' && (
          <CreateMessageModalDialog />
        )}
      </>
    );
  },
);
