import { browser, logging } from 'protractor';

import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('home page should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('');
  });

  // /home
  it('home page should display Login as Manager button', () => {
    page.navigateTo('/home');
    const text = 'Hello, Lemonite!';
    expect(page.getLoginHeadlineText(text)).toEqual(text);
  });

  // /manager/home
  it('manager home page should display 3 a tags and 2 buttons', () => {
    page.navigateTo('/manager/home');
    const linksCount = 3;
    const buttonCount = 2;
    let linksCounter = 0;
    let buttonCounter = 0;
    let text: string;
    // 3 a tags
    text = `Manager's Dashboard`;
    expect(page.getLinkText(text))
      .toEqual(text)
      .then(() => {
        linksCounter++;
        text = `User Management`;
        expect(page.getLinkText(text))
          .toEqual(text)
          .then(() => {
            linksCounter++;
            text = `Receipt Lookup`;
            expect(page.getLinkText(text))
              .toEqual(text)
              .then(() => {
                linksCounter++;
              })
              .then(() => {
                expect(linksCounter).toEqual(linksCount);
              })
              .then(() => {
                // 2 buttons
                text = 'list';
                expect(page.getButtonText(text))
                  .toEqual(text)
                  .then(() => {
                    buttonCounter++;
                    text = 'shopping_cart';
                    expect(page.getButtonText(text))
                      .toEqual(text)
                      .then(() => {
                        buttonCounter++;
                      })
                      .then(() => {
                        expect(buttonCounter).toEqual(buttonCount);
                      })
                      .then(() => {
                        const totalCounter = buttonCounter + linksCounter;
                        const totalCount = buttonCount + linksCount;
                        expect(totalCounter).toEqual(totalCount);
                      });
                  });
              });
          });
      });
  });

  // /manager/users

  // /manager/receipts

  // /inventory/home
  it('inventory home page should display 4 a tags', () => {
    page.navigateTo('/inventory/home');
    const linksCount = 4;
    let counter = 0;
    let text: string;
    // 4 a tags
    text = `Inventory Dashboard`;
    expect(page.getLinkText(text))
      .toEqual(text)
      .then(() => {
        counter++;
        text = `Stock Entry`;
        expect(page.getLinkText(text))
          .toEqual(text)
          .then(() => {
            counter++;
            text = `Products`;
            expect(page.getLinkText(text))
              .toEqual(text)
              .then(() => {
                counter++;
                text = `Categories`;
                expect(page.getLinkText(text))
                  .toEqual(text)
                  .then(() => {
                    counter++;
                  })
                  .then(() => {
                    expect(counter).toEqual(linksCount);
                  });
              });
          });
      });
  });
  // /inventory/stock-entry

  // /inventory/products

  // /inventory/categories

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
