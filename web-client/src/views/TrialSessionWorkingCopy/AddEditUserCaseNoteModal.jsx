import { BindedTextarea } from '../../ustc-ui/BindedTextarea/BindedTextarea';
import { ConfirmModal } from '../../ustc-ui/Modal/ConfirmModal';
import { FormGroup } from '../../ustc-ui/FormGroup/FormGroup';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const AddEditUserCaseNoteModal = connect(
  {
    addEditUserCaseNoteModalHelper: state.addEditUserCaseNoteModalHelper,
    modal: state.modal,
    validateNoteSequence: sequences.validateNoteSequence,
    validationErrors: state.validationErrors,
  },
  ({
    addEditUserCaseNoteModalHelper,
    modal,
    onConfirmSequence,
    validateNoteSequence,
    validationErrors,
  }) => {
    return (
      <ConfirmModal
        cancelLabel="Cancel"
        className="add-edit-note-modal"
        confirmLabel="Save"
        preventCancelOnBlur={true}
        title="Add/Edit Notes"
        onCancelSequence="clearModalFormSequence"
        onConfirmSequence={onConfirmSequence}
      >
        <h5 className="margin-bottom-4">
          Docket {modal.docketNumber}: {modal.caseCaptionNames}
        </h5>
        <FormGroup
          className="margin-bottom-2"
          errorText={validationErrors.notes}
        >
          <label className="usa-label" htmlFor="case-notes">
            {addEditUserCaseNoteModalHelper.notesLabel}
          </label>
          <BindedTextarea
            ariaLabel="notes"
            bind="modal.notes"
            id="case-notes"
            onChange={() => {
              validateNoteSequence();
            }}
          />
        </FormGroup>
      </ConfirmModal>
    );
  },
);
