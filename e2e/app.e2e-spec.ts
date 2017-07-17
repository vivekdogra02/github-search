import { GithubSearchPage } from './app.po';

describe('github-search App', () => {
  let page: GithubSearchPage;

  beforeEach(() => {
    page = new GithubSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
