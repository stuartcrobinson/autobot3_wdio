// @ts-check
import { UiContainer } from './UiContainer';
import { UiElement } from './UiElement';
import { livy } from './Livy';

export class Page extends UiContainer {
  constructor(baseUrl, urlPath = undefined) {
    if (urlPath && !urlPath.startsWith('/')) {
      throw new Error('urlPath should start with forward slash (/)');
    }
    super();
    this.url = baseUrl + (urlPath || '');
    super.setName(this.constructor.name);
  }

  setUrl(url) {
    this.url = url;
    return this;
  }
  // get pageName() { return this.constructor.name; }

  static load(url) {
    livy.logScreenshottedAction([
      { text: '🕸  ', style: livy.style.emoji },
      { text: 'Load ', style: livy.style.verb },
      { text: url, style: livy.style.selector }]);

    browser.url(url);
  }

  load() {
    livy.logScreenshottedAction([
      { text: '🕸  ', style: livy.style.emoji },
      { text: 'Load ', style: livy.style.verb },
      { text: `${this.name} Page `, style: livy.style.object },
      { text: this.url, style: livy.style.selector }]);

    browser.url(this.url);
    return super.waitForLoad();
  }

  loadWithRetry(timeoutInMillis = 10000) {
    console.log('asdfasdfasdfasdfasdfsfasdfasdfasdfasdfasdfsfasdfasdfasdfasdfasdfsf');

    let succeeded = false;

    const initTime = new Date().getMilliseconds();

    while (!succeeded && new Date().getMilliseconds() - initTime < timeoutInMillis) {
      try {
        this.load();
        succeeded = true;
      } catch (err) {
        // ignore
      }
    }


    // const that = this;
    // try {
    //   browser.waitUntil(() => {
    //     let succeeded = false;
    //     try {
    //       that.load();
    //       succeeded = true;
    //     } catch (err) {
    //       // ignore
    //     }
    //     return succeeded;
    //   }, timeoutInMillis);
    // } catch (err) {
    //   // do nothing. hide this error
    // }
  }

  /* eslint class-methods-use-this: "off" */
  get(selector) {
    return new UiElement(selector);
    // .setPage(this); // setPage unused.  probably a bad idea.
  }
}
