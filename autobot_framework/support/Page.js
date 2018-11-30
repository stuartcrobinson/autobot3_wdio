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

  loadWithRetry(timeoutInMillis = 100000){
    

    
  }

  /* eslint class-methods-use-this: "off" */
  get(selector) {
    return new UiElement(selector);
    // .setPage(this); // setPage unused.  probably a bad idea.
  }
}
