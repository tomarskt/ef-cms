import { ArchiveDraftDocumentModal } from './ArchiveDraftDocumentModal';
import { Button } from '../../ustc-ui/Button/Button';
import { ConfirmEditModal } from './ConfirmEditModal';
import { CreateOrderChooseTypeModal } from '../CreateOrder/CreateOrderChooseTypeModal';
import { FilingsAndProceedings } from '../DocketRecord/FilingsAndProceedings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const DraftDocuments = connect(
  {
    archiveDraftDocumentModalSequence:
      sequences.archiveDraftDocumentModalSequence,
    caseDetailHelper: state.caseDetailHelper,
    formattedCaseDetail: state.formattedCaseDetail,
    openConfirmEditModalSequence: sequences.openConfirmEditModalSequence,
    openCreateOrderChooseTypeModalSequence:
      sequences.openCreateOrderChooseTypeModalSequence,
    showModal: state.showModal,
  },
  ({
    archiveDraftDocumentModalSequence,
    caseDetailHelper,
    formattedCaseDetail,
    openConfirmEditModalSequence,
    openCreateOrderChooseTypeModalSequence,
    showModal,
  }) => {
    return (
      <>
        {caseDetailHelper.showCreateOrderButton && (
          <Button
            className="margin-bottom-3"
            id="button-create-order"
            onClick={() => openCreateOrderChooseTypeModalSequence()}
          >
            <FontAwesomeIcon icon="clipboard-list" size="1x" /> Create Order
          </Button>
        )}
        {formattedCaseDetail.draftDocuments.length === 0 && (
          <p>There are no draft documents.</p>
        )}
        {formattedCaseDetail.draftDocuments.length > 0 && (
          <table
            aria-label="draft documents"
            className="usa-table case-detail draft-documents responsive-table row-border-only"
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Filings and proceedings</th>
                <th>Created by</th>
                <th>Signature Added</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {formattedCaseDetail.draftDocuments.map(
                (draftDocument, index) => {
                  return (
                    <tr key={index}>
                      <td>{draftDocument.createdAtFormatted}</td>

                      <td>
                        <FilingsAndProceedings
                          arrayIndex={index}
                          document={draftDocument}
                          record={{}} // TODO: we are not yet sure where this comes from since we don't have a docket record for proposed / signed stipulated decisions
                        />
                      </td>

                      <td>{draftDocument.filedBy}</td>

                      <td className="no-wrap">
                        {draftDocument.signedAt &&
                          draftDocument.signedAtFormattedTZ}
                        {!draftDocument.signedAt && (
                          <a href={draftDocument.signUrl}>Add Signature</a>
                        )}
                      </td>

                      <td className="no-wrap text-align-right">
                        {draftDocument.signedAt ? (
                          <Button
                            link
                            data-document-id={draftDocument.documentId}
                            icon="edit"
                            onClick={() => {
                              openConfirmEditModalSequence({
                                caseId: formattedCaseDetail.caseId,
                                docketNumber: formattedCaseDetail.docketNumber,
                                documentIdToEdit: draftDocument.documentId,
                                path: draftDocument.editUrl,
                              });
                            }}
                          >
                            Edit
                          </Button>
                        ) : (
                          <Button link href={draftDocument.editUrl} icon="edit">
                            Edit
                          </Button>
                        )}
                      </td>

                      <td className="smaller-column">
                        <Button
                          link
                          className="red-warning"
                          icon="trash"
                          onClick={() => {
                            archiveDraftDocumentModalSequence({
                              caseId: formattedCaseDetail.caseId,
                              documentId: draftDocument.documentId,
                              documentTitle: draftDocument.documentTitle,
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        )}
        {showModal === 'ArchiveDraftDocumentModal' && (
          <ArchiveDraftDocumentModal />
        )}
        {showModal === 'ConfirmEditModal' && <ConfirmEditModal />}
        {showModal === 'CreateOrderChooseTypeModal' && (
          <CreateOrderChooseTypeModal />
        )}
      </>
    );
  },
);
