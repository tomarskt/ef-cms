const joi = require('@hapi/joi');
const {
  joiValidationDecorator,
} = require('../../../utilities/JoiValidationDecorator');
const { includes } = require('lodash');
const { makeRequiredHelper } = require('./externalDocumentHelpers');

/**
 *
 * @constructor
 */
function SecondaryDocumentInformationFactory() {}

/**
 *
 * @param {object} documentMetadata the document metadata
 * @param {object} VALIDATION_ERROR_MESSAGES the error to message map constant
 * @returns {object} the created document
 */
SecondaryDocumentInformationFactory.get = (
  documentMetadata,
  VALIDATION_ERROR_MESSAGES,
) => {
  let entityConstructor = function(rawProps) {
    this.attachments = rawProps.attachments;
    this.category = rawProps.category;
    this.certificateOfService = rawProps.certificateOfService;
    this.certificateOfServiceDate = rawProps.certificateOfServiceDate;
    this.documentType = rawProps.documentType;
    this.objections = rawProps.objections;
    this.secondaryDocumentFile = rawProps.secondaryDocumentFile;
  };

  let schema = {};

  let schemaOptionalItems = {
    attachments: joi.boolean(),
    certificateOfService: joi.boolean(),
    certificateOfServiceDate: joi
      .date()
      .iso()
      .max('now'),
    objections: joi.string(),
  };

  const makeRequired = itemName => {
    makeRequiredHelper({
      itemName,
      schema,
      schemaOptionalItems,
    });
  };

  if (documentMetadata.secondaryDocumentFile) {
    makeRequired('attachments');
    makeRequired('certificateOfService');

    if (documentMetadata.certificateOfService === true) {
      makeRequired('certificateOfServiceDate');
    }

    if (
      documentMetadata.category === 'Motion' ||
      includes(
        [
          'Motion to Withdraw Counsel',
          'Motion to Withdraw As Counsel',
          'Application to Take Deposition',
        ],
        documentMetadata.documentType,
      )
    ) {
      makeRequired('objections');
    }
  }

  joiValidationDecorator(
    entityConstructor,
    schema,
    undefined,
    VALIDATION_ERROR_MESSAGES,
  );

  return new entityConstructor(documentMetadata);
};

module.exports = { SecondaryDocumentInformationFactory };
