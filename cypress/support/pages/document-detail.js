exports.navigateTo = (username, caseId, documentId) => {
  cy.login(username, `/case-detail/${caseId}/documents/${documentId}`);
};

exports.getMessagesTab = () => {
  return cy.get('button#tab-pending-messages');
};

exports.getInProgressTab = () => {
  return cy.get('button#tab-messages-in-progress');
};

exports.getCreateMessageButton = () => {
  return cy.get('button#create-message-button');
};

exports.getSectionSelect = () => {
  return cy.get('select#section');
};

exports.getAssigneeIdSelect = () => {
  return cy.get('select#assigneeId');
};

exports.getMessageTextArea = () => {
  return cy.get('textarea#message');
};

exports.getSendMessageButton = () => {
  return cy.get('.modal-dialog').contains('Send');
};

exports.getCardContaining = text => {
  return cy.get('.card').contains(text);
};

exports.getModal = () => {
  return cy.get('.modal-dialog');
};

exports.getCaseTitleTextArea = () => {
  return cy.get('textarea#case-caption');
};

exports.getCaseTitleContaining = text => {
  return cy.contains('p#case-title', text);
};

exports.getReviewPetitionButton = () => {
  return cy.contains('button', 'Review Petition');
};

exports.getSaveForLaterButton = () => {
  return cy.contains('button', 'Save for Later');
};
