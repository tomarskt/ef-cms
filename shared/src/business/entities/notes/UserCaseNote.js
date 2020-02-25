const joi = require('@hapi/joi');
const {
  joiValidationDecorator,
} = require('../../../utilities/JoiValidationDecorator');

UserCaseNote.validationName = 'UserCaseNote';

/**
 * User's Case Note entity
 *
 * @param {object} rawProps the raw case note data
 * @constructor
 */
function UserCaseNote(rawProps) {
  this.caseId = rawProps.caseId;
  this.userId = rawProps.userId;
  this.notes = rawProps.notes;
}

UserCaseNote.VALIDATION_ERROR_MESSAGES = {
  notes: 'Enter note',
};

UserCaseNote.schema = joi.object().keys({
  caseId: joi
    .string()
    .uuid({
      version: ['uuidv4'],
    })
    .required(),
  notes: joi.string().required(),
  userId: joi
    .string()
    .uuid({
      version: ['uuidv4'],
    })
    .required(),
});

joiValidationDecorator(
  UserCaseNote,
  UserCaseNote.schema,
  undefined,
  UserCaseNote.VALIDATION_ERROR_MESSAGES,
);

module.exports = { UserCaseNote };
