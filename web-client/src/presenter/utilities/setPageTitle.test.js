import { setPageTitle } from './setPageTitle';

describe('setPageTitle', () => {
  it('should set the page title to the passed in title, adding suffix and removing multi-spaces', () => {
    setPageTitle('Docket 123-19  |  Document details      ');

    expect(window.document.title).toEqual(
      'Docket 123-19 | Document details | U.S. Tax Court',
    );
  });
});
