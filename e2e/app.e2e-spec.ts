import { CollectionsPage } from './app.po';

describe('collections App', function() {
  let page: CollectionsPage;

  beforeEach(() => {
    page = new CollectionsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
