import { Address } from './StartCase/Address';
import { Button } from '../ustc-ui/Button/Button';
import { Country } from './StartCase/Country';
import { ErrorNotification } from './ErrorNotification';
import { FormCancelModalDialog } from './FormCancelModalDialog';
import { FormGroup } from '../ustc-ui/FormGroup/FormGroup';
import { Hint } from '../ustc-ui/Hint/Hint';
import { InternationalAddress } from './StartCase/InternationalAddress';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const SecondaryContactEdit = connect(
  {
    caseDetail: state.caseDetail,
    contactEditHelper: state.contactEditHelper,
    formCancelToggleCancelSequence: sequences.formCancelToggleCancelSequence,
    showModal: state.showModal,
    submitEditSecondaryContactSequence:
      sequences.submitEditSecondaryContactSequence,
    updateCaseValueSequence: sequences.updateCaseValueSequence,
    validateSecondaryContactSequence:
      sequences.validateSecondaryContactSequence,
    validationErrors: state.validationErrors,
  },
  ({
    caseDetail,
    contactEditHelper,
    formCancelToggleCancelSequence,
    showModal,
    submitEditSecondaryContactSequence,
    updateCaseValueSequence,
    validateSecondaryContactSequence,
    validationErrors,
  }) => {
    const type = 'contactSecondary';
    const bind = 'caseDetail';
    const onBlur = 'validateSecondaryContactSequence';

    return (
      <>
        <div className="big-blue-header">
          <div className="grid-container">
            <h1>Edit Contact Information</h1>
          </div>
        </div>

        <section className="usa-section grid-container">
          <ErrorNotification />

          <p>
            This form will automatically create and submit a change of contact
            information notification for this case. Please ensure your
            information is accurate before submitting.
          </p>

          <Hint wider>
            To change the case caption, please file a Motion to Change Caption
          </Hint>

          <div className="blue-container margin-bottom-5">
            <div className="usa-form-group">
              <p className="usa-label">Contact name</p>
              <p className="margin-top-0">{caseDetail.contactSecondary.name}</p>
            </div>

            {contactEditHelper.contactSecondary?.showInCareOf && (
              <FormGroup
                errorText={validationErrors.contactSecondary?.inCareOf}
              >
                <label className="usa-label" htmlFor="inCareOf">
                  <span>In care of</span>
                </label>
                <input
                  autoCapitalize="none"
                  className="usa-input"
                  id="inCareOf"
                  name="contactSecondary.inCareOf"
                  type="text"
                  value={caseDetail.contactSecondary.inCareOf || ''}
                  onBlur={() => {
                    validateSecondaryContactSequence();
                  }}
                  onChange={e => {
                    updateCaseValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            )}

            <Country
              bind={bind}
              clearTypeOnCountryChange={true}
              type={type}
              onChange="countryTypeChangeSequence"
            />
            {caseDetail.contactSecondary.countryType === 'domestic' ? (
              <Address
                bind={bind}
                type={type}
                onBlur={onBlur}
                onChange="updateCaseValueSequence"
              />
            ) : (
              <InternationalAddress
                bind={bind}
                type={type}
                onBlur={onBlur}
                onChange="updateCaseValueSequence"
              />
            )}
            <FormGroup
              errorText={
                validationErrors &&
                validationErrors.contactSecondary &&
                validationErrors.contactSecondary.phone
              }
            >
              <label className="usa-label" htmlFor="phone">
                Phone number
              </label>
              <input
                autoCapitalize="none"
                className="usa-input max-width-200"
                id="phone"
                name="contactSecondary.phone"
                type="tel"
                value={caseDetail.contactSecondary.phone || ''}
                onBlur={() => {
                  validateSecondaryContactSequence();
                }}
                onChange={e => {
                  updateCaseValueSequence({
                    key: e.target.name,
                    value: e.target.value,
                  });
                }}
              />
            </FormGroup>
          </div>
          <Button
            onClick={() => {
              submitEditSecondaryContactSequence();
            }}
          >
            Save
          </Button>
          <Button
            link
            onClick={() => {
              formCancelToggleCancelSequence();
              return false;
            }}
          >
            Cancel
          </Button>
        </section>

        {showModal === 'FormCancelModalDialog' && (
          <FormCancelModalDialog onCancelSequence="closeModalAndReturnToCaseDetailSequence" />
        )}
      </>
    );
  },
);
