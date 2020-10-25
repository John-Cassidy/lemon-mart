import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path?: string | null): Promise<unknown> {
    return browser.get(path ? browser.baseUrl + path : browser.baseUrl) as Promise<
      unknown
    >;
  }

  getLoginHeadlineText(text: string): Promise<string> {
    return element(by.css('app-login div.mat-headline')).getText() as Promise<string>;
  }
  getTitleText(): Promise<string> {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getButtonText(buttonText: string): Promise<string> {
    return element(by.buttonText(buttonText)).getText() as Promise<string>;
  }

  getLinkText(linkText: string): Promise<string> {
    return element(by.linkText(linkText)).getText() as Promise<string>;
  }

  // getManagerNavBarLinksText(): Promise<string> {
  //   let links: ElementArrayFinder = element.all(
  //     by.css('app-root app-manager mat-toolbar')
  //   );
  //   let results: string = links.reduce((acc, elem) => {
  //     return elem.getText().then(function (text) {
  //       console.log(acc + text + ' ');
  //     });
  //   }, ' ');

  //   return results as Promise<string>;
  // }

  // getManagerButtonText(): Promise<string> {
  //   return element(by.buttonText('Login as Manager')).getText() as Promise<string>;
  // }
}
