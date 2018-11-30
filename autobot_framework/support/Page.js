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
    livy.logAction2([
      { text: '🕸  ', style: livy.style.filler },
      { text: 'Load ', style: livy.style.verb },
      { text: url, style: livy.style.selector }]);

    browser.url(url);
  }

  load() {
    livy.logAction2([
      { text: '🕸  ', style: livy.style.filler },
      { text: 'Load ', style: livy.style.verb },
      { text: `${this.name} Page `, style: livy.style.object },
      { text: this.url, style: livy.style.selector }]);

    browser.url(this.url);
    super.waitForLoad();
  }

  /* eslint class-methods-use-this: "off" */
  get(selector) {
    return new UiElement(selector);
  }
}
