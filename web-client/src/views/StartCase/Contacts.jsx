import { ContactPrimary } from './ContactPrimary';
import { ContactSecondary } from './ContactSecondary';
import { ServiceIndicatorRadios } from '../ServiceIndicatorRadios';
import { connect } from '@cerebral/react';
import { props } from 'cerebral';
import React from 'react';

export const Contacts = connect(
  {
    ...props,
  },
  ({
    bind,
    contactsHelper,
    emailBind,
    onBlur,
    onChange,
    parentView,
    showPrimaryContact,
    showPrimaryServiceIndicator,
    showSecondaryContact,
    showSecondaryServiceIndicator,
    useSameAsPrimary,
    validateSequence,
    wrapperClassName,
  }) => {
    return (
      <React.Fragment>
        {showPrimaryContact && (
          <>
            <ContactPrimary
              bind={bind}
              contactsHelper={contactsHelper}
              emailBind={emailBind}
              parentView={parentView}
              wrapperClassName={wrapperClassName}
              onBlur={onBlur}
              onChange={onChange}
            />
            {showPrimaryServiceIndicator && (
              <div className="margin-bottom-6">
                <h4 className="margin-top-6">Service Information</h4>
                <ServiceIndicatorRadios
                  bind="form.contactPrimary"
                  validateSequence={validateSequence}
                  validationErrors="validationErrors.contactPrimary"
                />
              </div>
            )}
          </>
        )}
        {showSecondaryContact && (
          <>
            <ContactSecondary
              bind={bind}
              contactsHelper={contactsHelper}
              parentView={parentView}
              useSameAsPrimary={useSameAsPrimary}
              wrapperClassName={wrapperClassName}
              onBlur={onBlur}
              onChange={onChange}
            />
            {showSecondaryServiceIndicator && (
              <>
                <h4 className="margin-top-6">Service Information</h4>
                <ServiceIndicatorRadios
                  bind="form.contactSecondary"
                  validateSequence={validateSequence}
                  validationErrors="validationErrors.contactSecondary"
                />
              </>
            )}
          </>
        )}
      </React.Fragment>
    );
  },
);
