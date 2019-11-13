const joi = require('joi-browser');
const {
  joiValidationDecorator,
} = require('../../../utilities/JoiValidationDecorator');
const { replaceBracketed } = require('../../utilities/replaceBracketed');

/**
 *
 * @param {object} rawProps the raw document data
 * @constructor
 */
function CourtIssuedDocumentTypeA(rawProps) {
  this.attachments = rawProps.attachments;
  this.documentTitle = rawProps.documentTitle;
  this.documentType = rawProps.documentType;
  this.freeText = rawProps.freeText;
}

CourtIssuedDocumentTypeA.prototype.getDocumentTitle = function() {
  return replaceBracketed(this.documentTitle, this.freeText);
};

CourtIssuedDocumentTypeA.VALIDATION_ERROR_MESSAGES = {
  attachments: 'Enter selection for Attachments',
  date: [
    {
      contains: 'must be less than or equal to',
      message: 'Enter a valid date',
    },
    'Enter a date',
  ],
  docketNumbers: 'Enter docket number(s)',
  documentType: 'Select a document type',
  freeText: 'Enter a description',
  judge: 'Select a judge',
};

CourtIssuedDocumentTypeA.schema = {
  attachments: joi.boolean().required(),
  documentTitle: joi.string().optional(),
  documentType: joi.string().required(),
  freeText: joi.string().required(),
};

joiValidationDecorator(
  CourtIssuedDocumentTypeA,
  CourtIssuedDocumentTypeA.schema,
  undefined,
  CourtIssuedDocumentTypeA.VALIDATION_ERROR_MESSAGES,
);

module.exports = { CourtIssuedDocumentTypeA };