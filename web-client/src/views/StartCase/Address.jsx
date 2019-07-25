import { Text } from '../../ustc-ui/Text/Text';
import { connect } from '@cerebral/react';
import { props, sequences, state } from 'cerebral';
import React from 'react';

import { StateSelect } from './StateSelect';

export const Address = connect(
  {
    data: state[props.bind],
    type: props.type,
    updateFormValueSequence: sequences[props.onChange],
    validateStartCaseSequence: sequences[props.onBlur],
    validationErrors: state.validationErrors,
  },
  ({
    data,
    type,
    updateFormValueSequence,
    validateStartCaseSequence,
    validationErrors,
  }) => {
    return (
      <React.Fragment>
        <div
          className={
            'usa-form-group ' +
            (validationErrors &&
            validationErrors[type] &&
            validationErrors[type].address1
              ? 'usa-form-group--error'
              : '')
          }
        >
          <label className="usa-label" htmlFor={`${type}.address1`}>
            Mailing Address Line 1
          </label>
          <input
            autoCapitalize="none"
            className="usa-input"
            id={`${type}.address1`}
            name={`${type}.address1`}
            type="text"
            value={data[type].address1 || ''}
            onBlur={() => {
              validateStartCaseSequence();
            }}
            onChange={e => {
              updateFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
            }}
          />
          <Text
            bind={`validationErrors.${type}.address1`}
            className="usa-error-message"
          />
        </div>
        <div className="usa-form-group">
          <label className="usa-label" htmlFor={`${type}.address2`}>
            Address Line 2 <span className="usa-hint">(optional)</span>
          </label>
          <input
            autoCapitalize="none"
            className="usa-input"
            id={`${type}.address2`}
            name={`${type}.address2`}
            type="text"
            value={data[type].address2 || ''}
            onBlur={() => {
              validateStartCaseSequence();
            }}
            onChange={e => {
              updateFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
            }}
          />
        </div>
        <div className="usa-form-group">
          <label className="usa-label" htmlFor={`${type}.address3`}>
            Address Line 3 <span className="usa-hint">(optional)</span>
          </label>
          <input
            autoCapitalize="none"
            className="usa-input"
            id={`${type}.address3`}
            name={`${type}.address3`}
            type="text"
            value={data[type].address3 || ''}
            onBlur={() => {
              validateStartCaseSequence();
            }}
            onChange={e => {
              updateFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
            }}
          />
        </div>
        <div
          className={
            'usa-form-group margin-bottom-0 ' +
            (validationErrors &&
            validationErrors[type] &&
            (validationErrors[type].city || validationErrors[type].state)
              ? 'usa-form-group--error'
              : '')
          }
        >
          <div className="grid-row grid-gap state-and-city">
            <div className="mobile-lg:grid-col-8 margin-bottom-30px">
              <label className="usa-label" htmlFor={`${type}.city`}>
                City
              </label>
              <input
                autoCapitalize="none"
                className="usa-input usa-input--inline"
                id={`${type}.city`}
                name={`${type}.city`}
                type="text"
                value={data[type].city || ''}
                onBlur={() => {
                  validateStartCaseSequence();
                }}
                onChange={e => {
                  updateFormValueSequence({
                    key: e.target.name,
                    value: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mobile-lg:grid-col-4 margin-bottom-30px">
              <label className="usa-label" htmlFor={`${type}.state`}>
                State
              </label>
              <StateSelect
                data={data}
                type={type}
                updateFormValueSequence={updateFormValueSequence}
                validateStartCaseSequence={validateStartCaseSequence}
              />
            </div>
            <Text
              bind={`validationErrors.${type}.city`}
              className="usa-error-message"
            />
            <Text
              bind={`validationErrors.${type}.state`}
              className="usa-error-message"
            />
          </div>
        </div>
        <div
          className={
            'usa-form-group ' +
            (validationErrors &&
            validationErrors[type] &&
            validationErrors[type].postalCode
              ? 'usa-form-group--error'
              : '')
          }
        >
          <label
            aria-label="zip code"
            className="usa-label"
            htmlFor={`${type}.postalCode`}
          >
            ZIP Code
          </label>
          <input
            autoCapitalize="none"
            className="usa-input tablet:usa-input--medium"
            id={`${type}.postalCode`}
            name={`${type}.postalCode`}
            type="text"
            value={data[type].postalCode || ''}
            onBlur={() => {
              validateStartCaseSequence();
            }}
            onChange={e => {
              updateFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
            }}
          />
          <Text
            bind={`validationErrors.${type}.postalCode`}
            className="usa-error-message"
          />
        </div>
      </React.Fragment>
    );
  },
);
