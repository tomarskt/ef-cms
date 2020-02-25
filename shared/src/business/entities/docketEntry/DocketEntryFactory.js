const joi = require('@hapi/joi');
const {
  ExternalDocumentFactory,
} = require('../externalDocument/ExternalDocumentFactory');
const {
  joiValidationDecorator,
} = require('../../../utilities/JoiValidationDecorator');
const {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} = require('../../../persistence/s3/getUploadPolicy');
const {
  VALIDATION_ERROR_MESSAGES,
} = require('../externalDocument/ExternalDocumentInformationFactory');
const { Document } = require('../Document');

DocketEntryFactory.VALIDATION_ERROR_MESSAGES = {
  ...VALIDATION_ERROR_MESSAGES,
  dateReceived: [
    {
      contains: 'must be less than or equal to',
      message: 'Received date cannot be in the future. Enter a valid date.',
    },
    'Enter a valid date received',
  ],
  eventCode: 'Select a document type',
  lodged: 'Enter selection for filing status.',
  primaryDocumentFileSize: [
    {
      contains: 'must be less than or equal to',
      message: `Your document file size is too big. The maximum file size is ${MAX_FILE_SIZE_MB}MB.`,
    },
    'Your document file size is empty.',
  ],
  secondaryDocumentFile: 'A file was not selected.',
};

/**
 * @param {object} rawProps the raw docket entry data
 * @constructor
 */
function DocketEntryFactory(rawProps) {
  let entityConstructor = function(rawPropsParam) {
    this.addToCoversheet = rawPropsParam.addToCoversheet;
    this.additionalInfo = rawPropsParam.additionalInfo;
    this.additionalInfo2 = rawPropsParam.additionalInfo2;
    this.attachments = rawPropsParam.attachments;
    this.certificateOfService = rawPropsParam.certificateOfService;
    this.certificateOfServiceDate = rawPropsParam.certificateOfServiceDate;
    this.dateReceived = rawPropsParam.dateReceived;
    this.documentType = rawPropsParam.documentType;
    this.eventCode = rawPropsParam.eventCode;
    this.serviceDate = rawPropsParam.serviceDate;
    this.freeText = rawPropsParam.freeText;
    this.hasSupportingDocuments = rawPropsParam.hasSupportingDocuments;
    this.lodged = rawPropsParam.lodged;
    this.objections = rawPropsParam.objections;
    this.ordinalValue = rawPropsParam.ordinalValue;
    this.partyPrimary = rawPropsParam.partyPrimary;
    this.trialLocation = rawPropsParam.trialLocation;
    this.partyRespondent = rawPropsParam.partyRespondent;
    this.partySecondary = rawPropsParam.partySecondary;
    this.previousDocument = rawPropsParam.previousDocument;
    this.primaryDocumentFile = rawPropsParam.primaryDocumentFile;
    this.primaryDocumentFileSize = rawPropsParam.primaryDocumentFileSize;
    this.secondaryDocumentFile = rawPropsParam.secondaryDocumentFile;

    const { secondaryDocument } = rawPropsParam;
    if (secondaryDocument) {
      this.secondaryDocument = ExternalDocumentFactory.get(secondaryDocument);
    }
  };

  let schema = joi.object().keys({
    addToCoversheet: joi.boolean(),
    additionalInfo: joi.string(),
    additionalInfo2: joi.string(),
    attachments: joi.boolean(),
    certificateOfService: joi.boolean(),
    dateReceived: joi
      .date()
      .iso()
      .max('now')
      .required(),
    documentType: joi.string().optional(),
    eventCode: joi.string().required(),
    freeText: joi.string().optional(),
    hasSupportingDocuments: joi.boolean(),
    lodged: joi.boolean(),
    ordinalValue: joi.string().optional(),
    previousDocument: joi.object().optional(),
    primaryDocumentFile: joi.object().optional(),
    primaryDocumentFileSize: joi.when('primaryDocumentFile', {
      is: joi.exist().not(null),
      otherwise: joi.optional().allow(null),
      then: joi
        .number()
        .required()
        .min(1)
        .max(MAX_FILE_SIZE_BYTES)
        .integer(),
    }),
    serviceDate: joi
      .date()
      .iso()
      .max('now')
      .optional(),
    trialLocation: joi.string().optional(),
  });

  let schemaOptionalItems = {
    certificateOfServiceDate: joi
      .date()
      .iso()
      .max('now')
      .required(),
    objections: joi.string().required(),
    partyPrimary: joi
      .boolean()
      .invalid(false)
      .required(),
    partyRespondent: joi.boolean().required(),
    partySecondary: joi.boolean().required(),
    secondaryDocumentFile: joi.object().optional(),
  };

  let customValidate;

  const addToSchema = itemName => {
    schema = schema.keys({
      [itemName]: schemaOptionalItems[itemName],
    });
  };

  const exDoc = ExternalDocumentFactory.get(rawProps);
  const docketEntryExternalDocumentSchema = exDoc.getSchema();

  schema = schema.concat(docketEntryExternalDocumentSchema).concat(
    joi.object({
      category: joi.string().optional(), // omitting category
    }),
  );

  if (rawProps.certificateOfService === true) {
    addToSchema('certificateOfServiceDate');
  }

  const objectionDocumentTypes = [
    ...Document.CATEGORY_MAP['Motion'].map(entry => {
      return entry.documentType;
    }),
    'Motion to Withdraw Counsel (filed by petitioner)',
    'Motion to Withdraw as Counsel',
    'Application to Take Deposition',
  ];

  if (
    objectionDocumentTypes.includes(rawProps.documentType) ||
    (['AMAT', 'ADMT'].includes(rawProps.eventCode) &&
      objectionDocumentTypes.includes(rawProps.previousDocument.documentType))
  ) {
    addToSchema('objections');
  }

  if (
    rawProps.scenario &&
    rawProps.scenario.toLowerCase().trim() === 'nonstandard h'
  ) {
    addToSchema('secondaryDocumentFile');
  }

  if (
    rawProps.partyPrimary !== true &&
    rawProps.partySecondary !== true &&
    rawProps.partyRespondent !== true
  ) {
    addToSchema('partyPrimary');
  }

  joiValidationDecorator(
    entityConstructor,
    schema,
    customValidate,
    DocketEntryFactory.VALIDATION_ERROR_MESSAGES,
  );

  return new entityConstructor(rawProps);
}

module.exports = { DocketEntryFactory };
