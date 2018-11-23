// @ts-check
import { abStyle, livy } from '../autobot';
import { UiContainer } from './UiContainer';
import { UiElement } from './UiElement';

export class Page extends UiContainer {
  constructor(baseUrl, urlPath = undefined) {
    if (urlPath && !urlPath.startsWith('/')) {
      throw new Error('urlPath should start with forward slash (/)');
    }
    super();
    this.url = baseUrl + (urlPath || '');
  }

  get pageName() { return this.constructor.name; }

  load() {
    livy.logAction2([
      { text: 'Load ', style: abStyle.verb },
      { text: `${this.pageName} Page `, style: abStyle.object },
      { text: this.url, style: abStyle.selector }]);

    browser.url(this.url);
    super.waitForLoad();
  }

  /* eslint class-methods-use-this: "off" */
  get(selector) {
    return new UiElement(selector);
  }
}
