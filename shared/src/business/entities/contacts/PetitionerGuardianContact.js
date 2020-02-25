const joi = require('@hapi/joi');
const { ContactFactory } = require('./ContactFactory');
/**
 * returns the constructor used for creating the PetitionerGuardianContact entity
 */
exports.getPetitionerGuardianContact = ContactFactory.createContactFactory({
  additionalErrorMappings: {
    secondaryName: 'Enter name of guardian',
  },
  additionalValidation: {
    secondaryName: joi.string().required(),
  },
});
