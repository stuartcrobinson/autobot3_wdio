// @ts-check
import { UiContainer } from './UiContainer';
import { UiElement } from './UiElement';
import { log } from './AquiferLog';

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

  load() {
    log.logRichMessagesWithScreenshot([
      { text: '🕸  ', style: log.style.emoji },
      { text: 'Load ', style: log.style.verb },
      { text: `${this.name} Page `, style: log.style.object },
      { text: this.url, style: log.style.selector }]);

    browser.url(this.url);
    return super.waitForLoad();
  }

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
