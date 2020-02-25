import { Case } from '../../shared/src/business/entities/cases/Case';
import { fakeFile, setupTest } from './helpers';

// docketClerk
import docketClerkAddsDocketEntryFromOrder from './journey/docketClerkAddsDocketEntryFromOrder';
import docketClerkCreatesAnOrder from './journey/docketClerkCreatesAnOrder';
import docketClerkLogIn from './journey/docketClerkLogIn';
import docketClerkServesOrderWithPaperService from './journey/docketClerkServesOrderWithPaperService';
import docketClerkSignsOut from './journey/docketClerkSignsOut';
import docketClerkViewsCaseDetailAfterServingCourtIssuedDocument from './journey/docketClerkViewsCaseDetailAfterServingCourtIssuedDocument';
import docketClerkViewsCaseDetailForCourtIssuedDocketEntry from './journey/docketClerkViewsCaseDetailForCourtIssuedDocketEntry';
import docketClerkViewsDraftOrder from './journey/docketClerkViewsDraftOrder';
// petitionsClerk
import petitionsClerkCreatesNewCase from './journey/petitionsClerkCreatesNewCase';
import petitionsClerkLogIn from './journey/petitionsClerkLogIn';
import petitionsClerkSignsOut from './journey/petitionsClerkSignsOut';

const test = setupTest({
  useCases: {
    loadPDFForSigningInteractor: () => Promise.resolve(null),
  },
});
test.draftOrders = [];

describe('Docket Clerk Adds Court-Issued Order to Docket Record', () => {
  beforeAll(() => {
    jest.setTimeout(30000);
  });

  petitionsClerkLogIn(test);
  petitionsClerkCreatesNewCase(test, fakeFile);
  petitionsClerkSignsOut(test);

  docketClerkLogIn(test);
  docketClerkCreatesAnOrder(test, {
    documentTitle: 'Order to do something',
    eventCode: 'O',
    expectedDocumentType: 'Order',
  });
  docketClerkSignsOut(test);

  docketClerkLogIn(test);
  docketClerkViewsCaseDetailForCourtIssuedDocketEntry(test, 0);
  docketClerkViewsDraftOrder(test, 0);
  docketClerkAddsDocketEntryFromOrder(test, 0);
  docketClerkViewsCaseDetailForCourtIssuedDocketEntry(test, 0);
  docketClerkServesOrderWithPaperService(test, 0);
  docketClerkViewsCaseDetailAfterServingCourtIssuedDocument(
    test,
    0,
    Case.STATUS_TYPES.generalDocket,
  );
  docketClerkSignsOut(test);
});
