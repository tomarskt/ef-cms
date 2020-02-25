const joi = require('@hapi/joi');
const {
  joiValidationDecorator,
} = require('../../../utilities/JoiValidationDecorator');
const {
  MAX_FILE_SIZE_BYTES,
} = require('../../../persistence/s3/getUploadPolicy');
const { Case } = require('./Case');
const { ContactFactory } = require('../contacts/ContactFactory');

/**
 * CaseInternal Entity
 * Represents a Case with required documents that a Petitions Clerk is attempting to add to the system.
 *
 * @param {object} rawCase the raw case data
 * @constructor
 */
function CaseInternal(rawCase) {
  this.applicationForWaiverOfFilingFeeFile =
    rawCase.applicationForWaiverOfFilingFeeFile;
  this.applicationForWaiverOfFilingFeeFileSize =
    rawCase.applicationForWaiverOfFilingFeeFileSize;
  this.caseCaption = rawCase.caseCaption;
  this.caseType = rawCase.caseType;
  this.filingType = rawCase.filingType;
  this.mailingDate = rawCase.mailingDate;
  this.ownershipDisclosureFile = rawCase.ownershipDisclosureFile;
  this.ownershipDisclosureFileSize = rawCase.ownershipDisclosureFileSize;
  this.partyType = rawCase.partyType;
  this.petitionFile = rawCase.petitionFile;
  this.petitionFileSize = rawCase.petitionFileSize;
  this.preferredTrialCity = rawCase.preferredTrialCity;
  this.procedureType = rawCase.procedureType;
  this.receivedAt = rawCase.receivedAt;
  this.requestForPlaceOfTrialFile = rawCase.requestForPlaceOfTrialFile;
  this.requestForPlaceOfTrialFileSize = rawCase.requestForPlaceOfTrialFileSize;
  this.stinFile = rawCase.stinFile;
  this.stinFileSize = rawCase.stinFileSize;

  const contacts = ContactFactory.createContacts({
    contactInfo: {
      primary: rawCase.contactPrimary,
      secondary: rawCase.contactSecondary,
    },
    isPaper: true,
    partyType: rawCase.partyType,
  });
  this.contactPrimary = contacts.primary;
  this.contactSecondary = contacts.secondary;
}

CaseInternal.VALIDATION_ERROR_MESSAGES = Object.assign(
  Case.VALIDATION_ERROR_MESSAGES,
  {
    petitionFile: 'Upload or scan a petition',
    preferredTrialCity: 'Select a preferred trial location',
    requestForPlaceOfTrialFile: 'Upload or scan a requested place of trial',
  },
);

const paperRequirements = joi.object().keys({
  applicationForWaiverOfFilingFeeFile: joi.object().optional(),
  applicationForWaiverOfFilingFeeFileSize: joi.when(
    'applicationForWaiverOfFilingFeeFile',
    {
      is: joi.exist().not(null),
      otherwise: joi.optional().allow(null),
      then: joi
        .number()
        .required()
        .min(1)
        .max(MAX_FILE_SIZE_BYTES)
        .integer(),
    },
  ),
  caseCaption: joi.string().required(),
  caseType: joi.string().required(),
  mailingDate: joi
    .string()
    .max(25)
    .required(),
  ownershipDisclosureFile: joi.object().optional(),
  ownershipDisclosureFileSize: joi.when('ownershipDisclosureFile', {
    is: joi.exist().not(null),
    otherwise: joi.optional().allow(null),
    then: joi
      .number()
      .required()
      .min(1)
      .max(MAX_FILE_SIZE_BYTES)
      .integer(),
  }),
  partyType: joi.string().required(),
  petitionFile: joi.object().required(),
  petitionFileSize: joi.when('petitionFile', {
    is: joi.exist().not(null),
    otherwise: joi.optional().allow(null),
    then: joi
      .number()
      .required()
      .min(1)
      .max(MAX_FILE_SIZE_BYTES)
      .integer(),
  }),
  preferredTrialCity: joi
    .alternatives()
    .conditional('requestForPlaceOfTrialFile', {
      is: joi.exist().not(null),
      otherwise: joi.optional().allow(null),
      then: joi.string().required(),
    }),
  procedureType: joi.string().required(),
  receivedAt: joi
    .date()
    .iso()
    .max('now')
    .required(),
  requestForPlaceOfTrialFile: joi
    .alternatives()
    .conditional('preferredTrialCity', {
      is: joi.exist().not(null),
      otherwise: joi.object().optional(),
      then: joi.object().required(),
    }),
  requestForPlaceOfTrialFileSize: joi.when('requestForPlaceOfTrialFile', {
    is: joi.exist().not(null),
    otherwise: joi.optional().allow(null),
    then: joi
      .number()
      .required()
      .min(1)
      .max(MAX_FILE_SIZE_BYTES)
      .integer(),
  }),
  stinFile: joi.object().required(),
  stinFileSize: joi.when('stinFile', {
    is: joi.exist().not(null),
    otherwise: joi.optional().allow(null),
    then: joi
      .number()
      .required()
      .min(1)
      .max(MAX_FILE_SIZE_BYTES)
      .integer(),
  }),
});

joiValidationDecorator(
  CaseInternal,
  paperRequirements,
  function() {
    return !this.getFormattedValidationErrors();
  },
  CaseInternal.VALIDATION_ERROR_MESSAGES,
);

module.exports = { CaseInternal };
