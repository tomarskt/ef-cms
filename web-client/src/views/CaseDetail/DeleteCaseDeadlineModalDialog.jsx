import { ModalDialog } from '../ModalDialog';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const DeleteCaseDeadlineModalDialog = connect(
  {
    cancelSequence: sequences.dismissModalSequence,
    confirmSequence: sequences.deleteCaseDeadlineSequence,
    form: state.form,
  },
  ({ cancelSequence, confirmSequence, form }) => {
    return (
      <ModalDialog
        cancelLabel="No, Cancel"
        cancelSequence={cancelSequence}
        className=""
        confirmLabel="Yes, Remove"
        confirmSequence={confirmSequence}
        title="Are You Sure You Want to Delete This Deadline?"
      >
        <div className="ustc-delete-case-deadline-modal margin-bottom-2">
          <label className="margin-right-2" htmlFor="deadline-to-delete">
            {form.month}/{form.day}/{form.year}
          </label>
          <span id="deadline-to-delete">{form.description}</span>
        </div>
      </ModalDialog>
    );
  },
);
