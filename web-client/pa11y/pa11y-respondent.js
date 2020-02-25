module.exports = [
  'http://localhost:1234/mock-login?token=respondent&path=/',
  'http://localhost:1234/mock-login?token=respondent&path=/case-detail/101-19',
  {
    actions: [
      'wait for #button-first-irs-document to be visible',
      'click element #button-first-irs-document',
      'wait for #file-a-document-header to be visible',
    ],
    notes: 'checks a11y of revealed form for filing document',
    url:
      'http://localhost:1234/mock-login?token=respondent&path=/case-detail/102-19&info=can-file-document',
  },
  {
    actions: [
      'wait for .sealed-banner to be visible',
      'wait for #case-title to be visible',
    ],
    notes: 'an associated respondent can see details of sealed case',
    url:
      'http://localhost:1234/mock-login?token=respondent&path=/case-detail/102-20&info=associated-respondent',
  },
  'http://localhost:1234/mock-login?token=respondent&path=/search/no-matches',
];
