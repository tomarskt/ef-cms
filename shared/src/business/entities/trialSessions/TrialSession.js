const joi = require('@hapi/joi');
const {
  JoiValidationConstants,
} = require('../../../utilities/JoiValidationConstants');
const {
  joiValidationDecorator,
} = require('../../../utilities/JoiValidationDecorator');
const { createISODateString } = require('../../utilities/DateHandler');
const { isEmpty } = require('lodash');

const COMMON_CITIES = [
  { city: 'Birmingham', state: 'Alabama' },
  { city: 'Mobile', state: 'Alabama' },
  { city: 'Anchorage', state: 'Alaska' },
  { city: 'Phoenix', state: 'Arizona' },
  { city: 'Little Rock', state: 'Arkansas' },
  { city: 'Los Angeles', state: 'California' },
  { city: 'San Diego', state: 'California' },
  { city: 'San Francisco', state: 'California' },
  { city: 'Denver', state: 'Colorado' },
  { city: 'Hartford', state: 'Connecticut' },
  { city: 'Washington', state: 'District of Columbia' },
  { city: 'Jacksonville', state: 'Florida' },
  { city: 'Miami', state: 'Florida' },
  { city: 'Tampa', state: 'Florida' },
  { city: 'Atlanta', state: 'Georgia' },
  { city: 'Honolulu', state: 'Hawaii' },
  { city: 'Boise', state: 'Idaho' },
  { city: 'Chicago', state: 'Illinois' },
  { city: 'Indianapolis', state: 'Indiana' },
  { city: 'Des Moines', state: 'Iowa' },
  { city: 'Louisville', state: 'Kentucky' },
  { city: 'New Orleans', state: 'Louisiana' },
  { city: 'Baltimore', state: 'Maryland' },
  { city: 'Boston', state: 'Massachusetts' },
  { city: 'Detroit', state: 'Michigan' },
  { city: 'St. Paul', state: 'Minnesota' },
  { city: 'Jackson', state: 'Mississippi' },
  { city: 'Kansas City', state: 'Missouri' },
  { city: 'St. Louis', state: 'Missouri' },
  { city: 'Helena', state: 'Montana' },
  { city: 'Omaha', state: 'Nebraska' },
  { city: 'Las Vegas', state: 'Nevada' },
  { city: 'Reno', state: 'Nevada' },
  { city: 'Albuquerque', state: 'New Mexico' },
  { city: 'Buffalo', state: 'New York' },
  { city: 'New York City', state: 'New York' },
  { city: 'Winston-Salem', state: 'North Carolina' },
  { city: 'Cincinnati', state: 'Ohio' },
  { city: 'Cleveland', state: 'Ohio' },
  { city: 'Columbus', state: 'Ohio' },
  { city: 'Oklahoma City', state: 'Oklahoma' },
  { city: 'Portland', state: 'Oregon' },
  { city: 'Philadelphia', state: 'Pennsylvania' },
  { city: 'Pittsburgh', state: 'Pennsylvania' },
  { city: 'Columbia', state: 'South Carolina' },
  { city: 'Knoxville', state: 'Tennessee' },
  { city: 'Memphis', state: 'Tennessee' },
  { city: 'Nashville', state: 'Tennessee' },
  { city: 'Dallas', state: 'Texas' },
  { city: 'El Paso', state: 'Texas' },
  { city: 'Houston', state: 'Texas' },
  { city: 'Lubbock', state: 'Texas' },
  { city: 'San Antonio', state: 'Texas' },
  { city: 'Salt Lake City', state: 'Utah' },
  { city: 'Richmond', state: 'Virginia' },
  { city: 'Seattle', state: 'Washington' },
  { city: 'Spokane', state: 'Washington' },
  { city: 'Charleston', state: 'West Virginia' },
  { city: 'Milwaukee', state: 'Wisconsin' },
];

const SMALL_CITIES = [
  { city: 'Fresno', state: 'California' },
  { city: 'Tallahassee', state: 'Florida' },
  { city: 'Pocatello', state: 'Idaho' },
  { city: 'Peoria', state: 'Illinois' },
  { city: 'Wichita', state: 'Kansas' },
  { city: 'Shreveport', state: 'Louisiana' },
  { city: 'Portland', state: 'Maine' },
  { city: 'Billings', state: 'Montana' },
  { city: 'Albany', state: 'New York' },
  { city: 'Syracuse', state: 'New York' },
  { city: 'Bismarck', state: 'North Dakota' },
  { city: 'Aberdeen', state: 'South Dakota' },
  { city: 'Burlington', state: 'Vermont' },
  { city: 'Roanoke', state: 'Virginia' },
  { city: 'Cheyenne', state: 'Wyoming' },
  ...COMMON_CITIES,
];

TrialSession.TRIAL_CITIES = {
  ALL: SMALL_CITIES,
  REGULAR: COMMON_CITIES,
  SMALL: SMALL_CITIES,
};

TrialSession.TRIAL_CITY_STRINGS = SMALL_CITIES.map(
  location => `${location.city}, ${location.state}`,
);

TrialSession.SESSION_TERMS = ['Winter', 'Fall', 'Spring', 'Summer'];

TrialSession.SESSION_TYPES = [
  'Regular',
  'Small',
  'Hybrid',
  'Special',
  'Motion/Hearing',
];

TrialSession.SESSION_STATUS_GROUPS = {
  all: 'All',
  closed: 'Closed',
  new: 'New',
  open: 'Open',
};

TrialSession.PROPERTIES_REQUIRED_FOR_CALENDARING = [
  'address1',
  'city',
  'state',
  'postalCode',
  'judge',
];

TrialSession.validationName = 'TrialSession';

/**
 * constructor
 *
 * @param {object} rawSession the raw session data
 * @constructor
 */
function TrialSession(rawSession, { applicationContext }) {
  this.init(rawSession, { applicationContext });
}

TrialSession.prototype.init = function(rawSession, { applicationContext }) {
  if (!applicationContext) {
    throw new TypeError('applicationContext must be defined');
  }
  this.address1 = rawSession.address1;
  this.address2 = rawSession.address2;
  this.caseOrder = (rawSession.caseOrder || []).map(caseOrder => ({
    caseId: caseOrder.caseId,
    disposition: caseOrder.disposition,
    isManuallyAdded: caseOrder.isManuallyAdded,
    removedFromTrial: caseOrder.removedFromTrial,
    removedFromTrialDate: caseOrder.removedFromTrialDate,
  }));
  this.city = rawSession.city;
  this.courtReporter = rawSession.courtReporter;
  this.courthouseName = rawSession.courthouseName;
  this.createdAt = rawSession.createdAt || createISODateString();
  this.irsCalendarAdministrator = rawSession.irsCalendarAdministrator;
  this.isCalendared = rawSession.isCalendared || false;
  this.judge = rawSession.judge;
  this.maxCases = rawSession.maxCases;
  this.notes = rawSession.notes;
  this.noticeIssuedDate = rawSession.noticeIssuedDate;
  this.postalCode = rawSession.postalCode;
  this.sessionType = rawSession.sessionType;
  this.startDate = rawSession.startDate;
  this.startTime = rawSession.startTime || '10:00';
  this.state = rawSession.state;
  this.swingSession = rawSession.swingSession;
  this.swingSessionId = rawSession.swingSessionId;
  this.term = rawSession.term;
  this.termYear = rawSession.termYear;
  this.trialClerk = rawSession.trialClerk;
  this.trialLocation = rawSession.trialLocation;
  this.trialSessionId =
    rawSession.trialSessionId || applicationContext.getUniqueId();
};

TrialSession.VALIDATION_ERROR_MESSAGES = {
  maxCases: 'Enter a valid number of maximum cases',
  postalCode: [
    {
      contains: 'match',
      message: 'Enter ZIP code',
    },
  ],
  sessionType: 'Select a session type',
  startDate: [
    {
      contains: 'must be larger than or equal to',
      message: 'Enter a valid start date',
    },
    'Enter a valid start date',
  ],
  startTime: 'Enter a valid start time',
  swingSessionId: 'You must select a swing session',
  term: 'Term session is not valid',
  termYear: 'Term year is required',
  trialLocation: 'Select a trial session location',
};

TrialSession.validationRules = {
  COMMON: {
    address1: joi
      .string()
      .allow('')
      .optional(),
    address2: joi
      .string()
      .allow('')
      .optional(),
    city: joi
      .string()
      .allow('')
      .optional(),
    courtReporter: joi.string().optional(),
    courthouseName: joi
      .string()
      .allow('')
      .optional(),
    createdAt: joi
      .date()
      .iso()
      .optional(),
    irsCalendarAdministrator: joi.string().optional(),
    isCalendared: joi.boolean().required(),
    judge: joi.object().optional(),
    maxCases: joi
      .number()
      .greater(0)
      .integer()
      .required(),
    notes: joi
      .string()
      .max(400)
      .optional(),
    noticeIssuedDate: joi
      .date()
      .iso()
      .optional(),
    postalCode: JoiValidationConstants.US_POSTAL_CODE.optional(),
    sessionType: joi
      .string()
      .valid(...TrialSession.SESSION_TYPES)
      .required(),
    startDate: joi
      .date()
      .iso()
      .required(),
    startTime: JoiValidationConstants.TWENTYFOUR_HOUR_MINUTES,
    state: joi
      .string()
      .allow('')
      .optional(),
    swingSession: joi.boolean().optional(),
    swingSessionId: joi.when('swingSession', {
      is: true,
      otherwise: joi.string().optional(),
      then: joi
        .string()
        .uuid({
          version: ['uuidv4'],
        })
        .required(),
    }),
    term: joi
      .string()
      .valid(...TrialSession.SESSION_TERMS)
      .required(),
    termYear: joi.string().required(),
    trialClerk: joi.object().optional(),
    trialLocation: joi.string().required(),
    trialSessionId: joi
      .string()
      .uuid({
        version: ['uuidv4'],
      })
      .optional(),
  },
};

joiValidationDecorator(
  TrialSession,
  joi.object().keys({
    ...TrialSession.validationRules.COMMON,
    caseOrder: joi.array().items(
      joi.object().keys({
        caseId: joi.string().uuid({
          version: ['uuidv4'],
        }),
        disposition: joi.when('removedFromTrial', {
          is: true,
          otherwise: joi.optional().allow(null),
          then: joi.string().required(),
        }),
        isManuallyAdded: joi.boolean().optional(),
        removedFromTrial: joi.boolean().optional(),
        removedFromTrialDate: joi.when('removedFromTrial', {
          is: true,
          otherwise: joi.optional().allow(null),
          then: joi
            .date()
            .iso()
            .required(),
        }),
      }),
    ),
    isCalendared: joi.boolean().required(),
  }),
  function() {
    return !this.getFormattedValidationErrors();
  },
  TrialSession.VALIDATION_ERROR_MESSAGES,
);

/**
 *
 * @param {string} swingSessionId the id of the swing session to associate with the session
 * @returns {TrialSession} the trial session entity
 */
TrialSession.prototype.setAsSwingSession = function(swingSessionId) {
  this.swingSessionId = swingSessionId;
  this.swingSession = true;
  return this;
};

/**
 * generate sort key prefix
 *
 * @returns {string} the sort key prefix
 */
TrialSession.prototype.generateSortKeyPrefix = function() {
  const { sessionType, trialLocation } = this;

  const caseProcedureSymbol =
    {
      Regular: 'R',
      Small: 'S',
    }[sessionType] || 'H';

  const formattedTrialCity = trialLocation.replace(/[\s.,]/g, '');
  const skPrefix = [formattedTrialCity, caseProcedureSymbol].join('-');

  return skPrefix;
};

/**
 * set as calendared
 *
 * @returns {TrialSession} the trial session entity
 */
TrialSession.prototype.setAsCalendared = function() {
  this.isCalendared = true;
  return this;
};

/**
 * add case to calendar
 *
 * @param {object} caseEntity the case entity to add to the calendar
 * @returns {TrialSession} the trial session entity
 */
TrialSession.prototype.addCaseToCalendar = function(caseEntity) {
  const { caseId } = caseEntity;
  this.caseOrder.push({ caseId });
  return this;
};

/**
 * manually add case to calendar
 *
 * @param {object} caseEntity the case entity to add to the calendar
 * @returns {TrialSession} the trial session entity
 */
TrialSession.prototype.manuallyAddCaseToCalendar = function(caseEntity) {
  const { caseId } = caseEntity;
  this.caseOrder.push({ caseId, isManuallyAdded: true });
  return this;
};

/**
 * checks if a case is already on the session
 *
 * @param {object} caseEntity the case entity to check if already on the case
 * @returns {boolean} if the case is already on the trial session
 */
TrialSession.prototype.isCaseAlreadyCalendared = function(caseEntity) {
  return !!this.caseOrder
    .filter(order => order.caseId === caseEntity.caseId)
    .filter(order => order.removedFromTrial !== true).length;
};

/**
 * set case as removedFromTrial
 *
 * @param {object} arguments the arguments object
 * @param {string} arguments.caseId the id of the case to remove from the calendar
 * @param {string} arguments.disposition the reason the case is being removed from the calendar
 * @returns {TrialSession} the trial session entity
 */
TrialSession.prototype.removeCaseFromCalendar = function({
  caseId,
  disposition,
}) {
  const caseToUpdate = this.caseOrder.find(
    trialCase => trialCase.caseId === caseId,
  );
  if (caseToUpdate) {
    caseToUpdate.disposition = disposition;
    caseToUpdate.removedFromTrial = true;
    caseToUpdate.removedFromTrialDate = createISODateString();
  }
  return this;
};

/**
 * removes the case totally from the trial session
 *
 * @param {object} arguments the arguments object
 * @param {string} arguments.caseId the id of the case to remove from the calendar
 * @returns {TrialSession} the trial session entity
 */
TrialSession.prototype.deleteCaseFromCalendar = function({ caseId }) {
  const index = this.caseOrder.findIndex(
    trialCase => trialCase.caseId === caseId,
  );
  if (index >= 0) {
    this.caseOrder.splice(index, 1);
  }
  return this;
};

/**
 * checks certain properties of the trial session for emptiness.
 * if one field is empty (via lodash.isEmpty), the method returns false
 *
 * @returns {boolean} TRUE if can set as calendared (properties were all not empty), FALSE otherwise
 */
TrialSession.prototype.canSetAsCalendared = function() {
  return isEmpty(this.getEmptyFields());
};

/**
 * Returns certain properties of the trial session that are empty as a list.
 *
 * @returns {Array} A list of property names of the trial session that are empty
 */
TrialSession.prototype.getEmptyFields = function() {
  const missingProperties = TrialSession.PROPERTIES_REQUIRED_FOR_CALENDARING.filter(
    property => isEmpty(this[property]),
  );

  return missingProperties;
};

/**
 * Sets the notice issued date on the trial session
 *
 * @returns {TrialSession} the trial session entity
 */
TrialSession.prototype.setNoticesIssued = function() {
  this.noticeIssuedDate = createISODateString();
  return this;
};

module.exports = { TrialSession };
