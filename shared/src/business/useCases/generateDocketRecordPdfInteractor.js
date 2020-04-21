const { Case } = require('../entities/cases/Case');
const { ContactFactory } = require('../entities/contacts/ContactFactory');

/**
 * generateDocketRecordPdfInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.caseId the case id for the docket record to be generated
 * @returns {Uint8Array} docket record pdf
 */
exports.generateDocketRecordPdfInteractor = async ({
  applicationContext,
  caseId,
  docketRecordSort,
  includePartyDetail = false,
}) => {
  const caseSource = await applicationContext
    .getPersistenceGateway()
    .getCaseByCaseId({
      applicationContext,
      caseId,
    });

  const caseEntity = new Case(caseSource, { applicationContext });
  const formattedCaseDetail = applicationContext
    .getUtilities()
    .getFormattedCaseDetail({
      applicationContext,
      caseDetail: caseEntity,
      docketRecordSort,
    });
  formattedCaseDetail.showCaseTitleForPrimary = caseEntity.getShowCaseTitleForPrimary();

  const getPartyInfoContent = detail => {
    const {
      contactPrimary,
      contactSecondary,
      irsPractitioners,
      privatePractitioners,
    } = detail;

    const getAddress = contact => {
      const isInternational =
        contact.countryType === ContactFactory.COUNTRY_TYPES.INTERNATIONAL;

      let content = `
        ${contact.inCareOf ? `<div>${contact.inCareOf}</div>` : ''}
        ${contact.title ? `<div>${contact.title}</div>` : ''}
        ${contact.address1 ? `<div>${contact.address1}</div>` : ''}
        ${contact.address2 ? `<div>${contact.address2}</div>` : ''}
        ${contact.address3 ? `<div>${contact.address3}</div>` : ''}
        <div>
          ${contact.city ? `${contact.city}, ` : ''}
          ${contact.state ? `${contact.state}, ` : ''}
          ${contact.postalCode ? `${contact.postalCode}, ` : ''}
        </div>
        ${isInternational ? contact.country : ''}
        ${contact.phone ? `<p>${contact.phone}</p>` : ''}
      `;

      return content;
    };

    const getContactPrimary = () => {
      const name = detail.showCaseTitleForPrimary
        ? detail.caseTitle
        : contactPrimary.name;

      return `
        <div class="party-details">
          <p>${name}</p>
          ${getAddress(contactPrimary)}
        </div>
      `;
    };

    const getContactSecondary = () => `
      <div class="party-details">
        <p>${contactSecondary.name ? contactSecondary.name : ''}</p>
        ${getAddress(contactSecondary)}
      </div>
    `;

    let partyInfoContent = `
      <div class="party-info">
        <div class="party-info-header">${detail.partyType}</div>
        <div class="party-info-content">
          ${contactPrimary ? getContactPrimary() : ''}
          ${contactSecondary ? getContactSecondary() : ''}
        </div>
      </div>
    `;

    // privatePractitioners
    if (privatePractitioners.length > 0) {
      const getPractitioners = () => {
        let result = '';

        privatePractitioners.map(practitioner => {
          if (practitioner.formattedName) {
            const { representingPrimary, representingSecondary } = practitioner;
            result += `
              <div class="party-details">
                <p>${practitioner.formattedName}</p>
                ${getAddress({
                  ...practitioner,
                  ...practitioner.contact,
                })}
                <p>
                  <strong>Representing</strong>
                  <br />
                  ${representingPrimary ? contactPrimary.name : ''}
                  ${representingSecondary ? '<br />' : ''}
                  ${
                    representingSecondary &&
                    contactSecondary &&
                    contactSecondary.name
                      ? contactSecondary.name
                      : ''
                  }
                </p>
              </div>
            `;
          }
        });

        return result;
      };

      partyInfoContent += `
        <div class="party-info">
          <div class="party-info-header">Petitioner Counsel</div>
          <div class="party-info-content">
            ${getPractitioners()}
          </div>
        </div>
      `;
    }

    // irsPractitioners
    if (irsPractitioners.length > 0) {
      const getIrsPractitioners = () => {
        let result = '';

        irsPractitioners.map(practitioner => {
          if (practitioner.name) {
            result += `
              <div class="party-details">
                <p>${practitioner.name}</p>
                ${getAddress({
                  ...practitioner,
                  ...practitioner.contact,
                })}
              </div>
            `;
          }
        });

        return result;
      };

      partyInfoContent += `
        <div class="party-info">
          <div class="party-info-header">Respondent Counsel</div>
          <div class="party-info-content">
            ${getIrsPractitioners()}
          </div>
        </div>
      `;
    }

    return partyInfoContent;
  };

  const getDocketRecordContent = detail => {
    let docketRecordContent = `
      <table class="docket-record-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Event</th>
            <th>Filings and proceedings</th>
            <th>Filed by</th>
            <th>Action</th>
            <th>Served</th>
            <th>Parties</th>
          </tr>
        </thead>
        <tbody>
    `;

    detail.docketRecordWithDocument.map(({ document, index, record }) => {
      let documentEventCode = '';
      let documentFiledBy = '';
      let documentDateServed = '';
      let documentServedPartiesCode = '';
      let recordDescription = `<strong>${record.description}</strong>`;

      if (record.filingsAndProceedings) {
        recordDescription += ' ' + record.filingsAndProceedings;
      }

      const recordCreatedAtFormatted = record.createdAtFormatted;
      const recordAction = record.action || '';

      if (document) {
        documentEventCode = document.eventCode || '';
        documentFiledBy = document.filedBy || '';
        documentServedPartiesCode = document.servedPartiesCode || '';

        if (document.isStatusServed) {
          documentDateServed = document.servedAtFormatted || '';
        }

        if (document.additionalInfo2) {
          recordDescription += ' ' + document.additionalInfo2;
        }
      }

      if (documentDateServed) {
        const arrDateServed = documentDateServed.split(' ');
        documentDateServed = `${
          arrDateServed[0]
        } <span class="no-wrap">${arrDateServed.slice(1).join(' ')}</span>`;
      } else if (document && document.isNotServedCourtIssuedDocument) {
        documentDateServed = 'Not served';
      }

      docketRecordContent += `
        <tr>
          <td>${index}</td>
          <td>${recordCreatedAtFormatted ? recordCreatedAtFormatted : ''}</td>
          <td>${documentEventCode}</td>
          <td>${recordDescription}</td>
          <td>${documentFiledBy}</td>
          <td>${recordAction}</td>
          <td>${documentDateServed}</td>
          <td>${documentServedPartiesCode}</td>
        </tr>
      `;
    });

    docketRecordContent += `
      </tbody>
    </table>
    `;

    return docketRecordContent;
  };

  const { caseCaption, docketNumber, docketNumberSuffix } = formattedCaseDetail;

  const contentHtml = await applicationContext
    .getTemplateGenerators()
    .generatePrintableDocketRecordTemplate({
      applicationContext,
      content: {
        caption: caseCaption,
        docketNumberWithSuffix: docketNumber + (docketNumberSuffix || ''),
        docketRecord: getDocketRecordContent(formattedCaseDetail),
        partyInfo: includePartyDetail
          ? getPartyInfoContent(formattedCaseDetail)
          : '',
      },
    });

  return await applicationContext.getUseCases().generatePdfFromHtmlInteractor({
    applicationContext,
    contentHtml,
    docketNumber,
  });
};
