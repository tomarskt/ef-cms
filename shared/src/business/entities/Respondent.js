const joi = require('@hapi/joi');
const {
  joiValidationDecorator,
} = require('../../utilities/JoiValidationDecorator');
const {
  userDecorator,
  userValidation,
  VALIDATION_ERROR_MESSAGES,
} = require('./User');
const { SERVICE_INDICATOR_TYPES } = require('./cases/CaseConstants');

/**
 * constructor
 *
 * @param {object} rawUser the raw user data
 * @constructor
 */
function Respondent(rawUser) {
  userDecorator(this, rawUser);
  this.serviceIndicator =
    rawUser.serviceIndicator || SERVICE_INDICATOR_TYPES.SI_ELECTRONIC;
}

joiValidationDecorator(
  Respondent,
  joi.object().keys({
    ...userValidation,
    serviceIndicator: joi
      .string()
      .valid(...Object.values(SERVICE_INDICATOR_TYPES))
      .required(),
  }),
  undefined,
  VALIDATION_ERROR_MESSAGES,
);

Respondent.validationName = 'Respondent';

module.exports = {
  Respondent,
};
