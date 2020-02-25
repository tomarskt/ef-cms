const joi = require('@hapi/joi');
const {
  joiValidationDecorator,
} = require('../../utilities/JoiValidationDecorator');
const { createISODateString } = require('../utilities/DateHandler');
const { remove } = require('lodash');

/**
 * constructor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.rawScan the raw scan data
 * @constructor
 */
function Scan({ applicationContext, rawScan }) {
  this.batches = rawScan.batches || [];
  this.createdAt = rawScan.createdAt || createISODateString();
  this.scanId = rawScan.scanId || applicationContext.getUniqueId();
}

Scan.validationName = 'Scan';
Scan.SCAN_MODES = {
  DUPLEX: 'duplex',
  FEEDER: 'feeder',
  FLATBED: 'flatbed',
};

/**
 * adds a batch to the current scan
 *
 * @param {Batch} batch Batch entity
 * @returns {Scan} Scan entity
 */
Scan.prototype.addBatch = function(batch) {
  this.batches.push(batch);
  return this;
};

/**
 * removes a batch from the current scan
 *
 * @param {Batch} batchEntity Batch entity to remove
 * @returns {Scan} Scan entity
 */
Scan.prototype.removeBatch = function(batchEntity) {
  const { batchId } = batchEntity;

  remove(this.batches, batch => {
    return batchId === batch.batchId;
  });

  return this;
};

/**
 * aggregates all pages for all associated Batch entities
 * note: after each Batch's pages are aggregated, its pages are
 * cleared for memory purposes
 *
 * @returns {Array} array of PNGs
 */
Scan.prototype.getPages = function() {
  // flattens the array of pages for each batch
  const aggregatedPngs = this.batches.reduce((acc, val, idx) => {
    const aggregatedBatch = [...acc, ...val.pages];

    // free up memory after we've gotten the pages
    this.batches[idx].clear();

    return aggregatedBatch;
  }, []);

  return aggregatedPngs;
};

Scan.VALIDATION_ERROR_MESSAGES = {
  batches: '#At least one batch is required',
};

Scan.schema = joi.object().keys({
  batches: joi
    .array()
    .min(1)
    .required(),
  createdAt: joi
    .date()
    .iso()
    .required(),
  scanId: joi
    .string()
    .uuid({
      version: ['uuidv4'],
    })
    .required(),
});

joiValidationDecorator(
  Scan,
  Scan.schema,
  undefined,
  Scan.VALIDATION_ERROR_MESSAGES,
);

module.exports = { Scan };
