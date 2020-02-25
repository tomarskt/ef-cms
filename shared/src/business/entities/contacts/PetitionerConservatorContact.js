const joi = require('@hapi/joi');
const { ContactFactory } = require('./ContactFactory');

/**
 * returns the constructor used for creating the PetitionerConservatorContact entity
 */
exports.getPetitionerConservatorContact = ContactFactory.createContactFactory({
  additionalErrorMappings: {
    secondaryName: 'Enter name of conservator',
  },
  additionalValidation: {
    secondaryName: joi.string().required(),
  },
});
