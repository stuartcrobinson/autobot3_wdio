// @ts-check
import { UiContainer } from './UiContainer';
import { UiElement } from './UiElement';
import { log } from './AquiferLog';

const timeoutWdio = require('../wdio.conf').config.waitforTimeout;

/** Abstract class */
export class Page extends UiContainer {
  constructor(baseUrl, urlPath = undefined) {
    if (urlPath && !urlPath.startsWith('/')) {
      throw new Error('urlPath should start with forward slash (/)');
    }
    super();
    if (this.constructor === Page) {
      throw new TypeError('Abstract class cannot be instantiated directly.');
    }
    this.url = baseUrl + (urlPath || '');
    super.setName(this.constructor.name);
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  static load(url) {
    log.logRichMessagesWithScreenshot([
      { text: '🕸  ', style: log.style.emoji },
      { text: 'Load ', style: log.style.verb },
      { text: url, style: log.style.selector }]);

    browser.url(url);
  }

  load(timeout = timeoutWdio) {
    log.logRichMessagesWithScreenshot([
      { text: '🕸  ', style: log.style.emoji },
      { text: 'Load ', style: log.style.verb },
      { text: `${this.name} Page `, style: log.style.object },
      { text: this.url, style: log.style.selector }]);

    browser.url(this.url);
    return super.waitForLoad(timeout);
  }

  load_waitForChange(indicatorSelector = '//body', timeout = timeoutWdio) {
    const indicatorElement = new UiElement(indicatorSelector);

    if (indicatorElement.isExisting()) {
      const initialIndicatorElementHtml = indicatorElement.getHtml();


      log.logRichMessagesWithScreenshot([
        { text: '🕸  ', style: log.style.emoji },
        { text: 'Load ', style: log.style.verb },
        { text: `${this.name} Page `, style: log.style.object },
        { text: this.url, style: log.style.selector },
        { text: ' then wait for change in ', style: log.style.filler },
        { text: indicatorSelector, style: log.style.selector },
        { text: ' target: ', style: log.style.filler },
        { text: `${indicatorSelector} `, style: log.style.selector }]);

      browser.url(this.url);
      const init = new Date().getTime();
      while (indicatorElement.getHtml() === initialIndicatorElementHtml) {
        super.sleep(200);
        if (new Date().getTime() - init > timeout) {
          throw new Error(`timeout waiting for ${indicatorSelector} to change after loading ${this.name}`);
        }
      }
      return super.waitForLoad(timeout);
    }

    return this.load(timeout);
  }


  // click_waitForChange(indicatorSelector = '//body', doLog = true, timeout = timeoutWdio) {
  //   const initialIndicatorElementHtml = browser.element(indicatorSelector).getHTML();
  //   doLog
  //     && this.logAndWait([
  //       { text: '👇 ', style: log.style.emoji },
  //       { text: 'Click ', style: log.style.verb },
  //       { text: `${this.stuartname} `, style: log.style.object },
  //       { text: 'then wait for change in ', style: log.style.filler },
  //       { text: indicatorSelector, style: log.style.selector },
  //       { text: ' target: ', style: log.style.filler },
  //       { text: `${this.selector} `, style: log.style.selector }], timeout);

  //   browser.click(this.selector);
  //   const init = new Date().getTime();
  //   while (browser.element(indicatorSelector).getHTML() === initialIndicatorElementHtml) {
  //     super.sleep(200);
  //     if (new Date().getTime() - init > timeout) {
  //       throw new Error(`timeout waiting for ${indicatorSelector} to change after clicking ${this.selector}`);
  //     }
  //   }
  // }


  loadWithRetry(timeoutInMillis = 10000) {
    let succeeded = false;

    const initTime = new Date().getMilliseconds();

    while (!succeeded && new Date().getMilliseconds() - initTime < timeoutInMillis) {
      try {
        this.load();
        succeeded = true;
      } catch (err) {
        console.log('caught an error that might be related to ** folder saves:');
        console.log(err);
      }
    }
  }

  /* eslint class-methods-use-this: "off" */
  get(selector) {
    return new UiElement(selector);
  }
}
