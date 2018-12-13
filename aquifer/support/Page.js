// @ts-check
import { UiContainer } from './UiContainer';
import { UiElement } from './UiElement';
import { livy } from './Livy';

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
    livy.logRichMessagesWithScreenshot([
      { text: '🕸  ', style: livy.style.emoji },
      { text: 'Load ', style: livy.style.verb },
      { text: url, style: livy.style.selector }]);

    browser.url(url);
  }

  load() {
    livy.logRichMessagesWithScreenshot([
      { text: '🕸  ', style: livy.style.emoji },
      { text: 'Load ', style: livy.style.verb },
      { text: `${this.name} Page `, style: livy.style.object },
      { text: this.url, style: livy.style.selector }]);

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
