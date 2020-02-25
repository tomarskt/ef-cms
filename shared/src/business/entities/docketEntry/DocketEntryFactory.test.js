const moment = require('moment');
const { DocketEntryFactory } = require('./DocketEntryFactory');

const { VALIDATION_ERROR_MESSAGES } = DocketEntryFactory;

describe('DocketEntryFactory', () => {
  let rawEntity;

  const errors = () =>
    DocketEntryFactory(rawEntity).getFormattedValidationErrors();

  describe('Base', () => {
    beforeEach(() => {
      rawEntity = {};
    });

    it('should require a file', () => {
      rawEntity.primaryDocumentFile = {};
      rawEntity.primaryDocumentFileSize = 1;
      expect(errors().primaryDocumentFile).toEqual(undefined);
    });

    it('should return an error when an empty document is attached', () => {
      rawEntity.primaryDocumentFile = {};
      rawEntity.primaryDocumentFileSize = 0;
      expect(errors().primaryDocumentFile).toEqual(undefined);
      expect(errors().primaryDocumentFileSize).toEqual(
        VALIDATION_ERROR_MESSAGES.primaryDocumentFileSize[1],
      );
    });

    it('should not require a filing status selection', () => {
      expect(errors().lodged).toEqual(undefined);
    });

    it('should require received date be entered', () => {
      expect(errors().dateReceived).toEqual(
        VALIDATION_ERROR_MESSAGES.dateReceived[1],
      );
      rawEntity.dateReceived = moment().format();
      expect(errors().dateReceived).toEqual(undefined);
    });

    it('should not allow received date be in the future', () => {
      rawEntity.dateReceived = moment()
        .add(1, 'days')
        .format();
      expect(errors().dateReceived).toEqual(
        VALIDATION_ERROR_MESSAGES.dateReceived[0].message,
      );
    });

    it('should require event code', () => {
      expect(errors().eventCode).toBeDefined();
    });

    describe('Document type', () => {
      beforeEach(() => {
        rawEntity = {
          ...rawEntity,
          category: 'Answer',
          documentTitle: '[First, Second, etc.] Amendment to Answer',
          documentType: 'Amendment to Answer',
          scenario: 'Nonstandard G',
        };
      });

      it('should require non standard fields', () => {
        expect(errors().ordinalValue).toEqual(
          VALIDATION_ERROR_MESSAGES.ordinalValue,
        );
        rawEntity.ordinalValue = 'First';
        expect(errors().ordinalValue).toEqual(undefined);
      });
    });

    it('should require one of [partyPrimary, partySecondary, partyRespondent] to be selected', () => {
      expect(errors().partyPrimary).toEqual(
        VALIDATION_ERROR_MESSAGES.partyPrimary,
      );
      rawEntity.partySecondary = true;
      expect(errors().partyPrimary).toEqual(undefined);
    });

    it('should not require Additional info 1', () => {
      expect(errors().additionalInfo).toEqual(undefined);
    });

    it('should not require Additional info 2', () => {
      expect(errors().additionalInfo2).toEqual(undefined);
    });

    it('should not require add to cover sheet', () => {
      expect(errors().addToCoversheet).toEqual(undefined);
    });

    describe('Inclusions', () => {
      it('should not require Certificate of Service', () => {
        expect(errors().certificateOfService).toEqual(undefined);
      });

      describe('Has Certificate of Service', () => {
        beforeEach(() => {
          rawEntity.certificateOfService = true;
        });

        it('should require certificate of service date be entered', () => {
          expect(errors().certificateOfServiceDate).toEqual(
            VALIDATION_ERROR_MESSAGES.certificateOfServiceDate[1],
          );
          rawEntity.certificateOfServiceDate = moment().format();
          expect(errors().certificateOfServiceDate).toEqual(undefined);
        });

        it('should not allow certificate of service date be in the future', () => {
          rawEntity.certificateOfServiceDate = moment()
            .add(1, 'days')
            .format();
          expect(errors().certificateOfServiceDate).toEqual(
            VALIDATION_ERROR_MESSAGES.certificateOfServiceDate[0].message,
          );
        });
      });

      it('should not require Exhibits', () => {
        expect(errors().exhibits).toEqual(undefined);
      });

      it('should not require Attachments', () => {
        expect(errors().attachments).toEqual(undefined);
      });

      it('should not require Objections', () => {
        expect(errors().objections).toEqual(undefined);
      });

      describe('Motion Document', () => {
        beforeEach(() => {
          rawEntity.category = 'Motion';
          rawEntity.documentType = 'Motion for Continuance';
        });

        it('should require Objections', () => {
          expect(errors().objections).toEqual(
            VALIDATION_ERROR_MESSAGES.objections,
          );
          rawEntity.objections = 'No';
          expect(errors().objections).toEqual(undefined);
        });

        it('should require Objections for an Amended document with a Motion previousDocument', () => {
          rawEntity.category = 'Miscellaneous';
          rawEntity.eventCode = 'AMAT';
          rawEntity.previousDocument = {
            documentType: 'Motion for Continuance',
          };

          expect(errors().objections).toEqual(
            VALIDATION_ERROR_MESSAGES.objections,
          );
          rawEntity.objections = 'No';
          expect(errors().objections).toEqual(undefined);
        });
      });

      describe('Nonstandard H', () => {
        beforeEach(() => {
          rawEntity.scenario = 'Nonstandard H';
        });

        it('should not require secondary file', () => {
          expect(errors().secondaryDocumentFile).toEqual(undefined);
        });

        describe('Secondary Document', () => {
          beforeEach(() => {
            rawEntity.secondaryDocument = {};
          });

          it('should validate secondary document', () => {
            expect(errors().secondaryDocument).toEqual({
              category: VALIDATION_ERROR_MESSAGES.category,
              documentType: VALIDATION_ERROR_MESSAGES.documentType[1],
            });
          });
        });
      });
    });
  });
});
