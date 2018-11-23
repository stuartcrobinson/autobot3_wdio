// @ts-check
import { options, livy, abStyle } from '../autobot';
import { UiElement } from './UiElement';

/**
 * Parent class for a Page Object.
 */
export class Page extends UiElement {
  // maybe this should have url sometimes?  what's the difference in a page and a component ...

  // page: url

  /**
   *
   * @param {String} url starts with "/" https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL
   */
  constructor(url = undefined) {
    // if (urlPath && !urlPath.startsWith('/')) {
    //   throw new Error('urlPath should start with forward slash (/)');
    // }
    super('body');
    this.url = url;
  }


  get pageName() { return this.constructor.name; }

  /**
   * TODO -- first check to see if it's already loaded.  don't load if so.
   */
  load() {
    // if (!this.urlPath){
    //   throw new Error("urlPath is undefined");
    // }
    // console.log(`loading: ${options.url}${this.urlPath}`);
    // const url = options.url + this.urlPath;
    if (!this.url) {
      throw new Error('url is undefined');
    }
    livy.logAction2([
      { text: 'Load ', style: abStyle.verb },
      { text: `${this.pageName} Page `, style: abStyle.object },
      { text: this.url, style: abStyle.selector }]);

    browser.url(this.url);
    super.waitForLoad();
  }

  // /* eslint guard-for-in: "off", no-restricted-syntax: "off" */
  // /**
  //  * This adds a custom name parameter to each element object so that the variable's name
  //  * can be displayed in the ui test logs instead of just a potentially cryptic selector.
  //  *
  //  * This was inspired by the idea that maybe we should avoid using visible values in selectors to prepare for multi-language support
  //  */
  // nameElements() {
  //   for (const propName in this) {
  //     const propValue = this[propName];
  //     if (propValue instanceof UiAtom) {
  //       // @ts-ignore
  //       // propValue.stuartname = propName;
  //       propValue.setName(propName);
  //     }
  //   }
  // }

  // /**
  //  *
  //  */
  // get loadCriteriaElements() {
  //   const abElements = [];

  //   for (const propName in this) {
  //     const propValue = this[propName];
  //     if (propValue instanceof UiAtom && propValue.isLoadCriterion) {
  //       abElements.push(propValue);
  //     }
  //   }
  //   return abElements;
  // }

  // waitForLoad(timeoutInMillis = 12000) {
  //   for (let i = 0; i < this.loadCriteriaElements.length; i++) {
  //     const element = this.loadCriteriaElements[i];
  //     element.waitForExist(timeoutInMillis);
  //   }
  // }

  // isLoaded() {
  //   for (let i = 0; i < this.loadCriteriaElements.length; i++) {
  //     const element = this.loadCriteriaElements[i];
  //     element.getWebElement();
  //   }
  //   return true;
  // }

  // /* eslint class-methods-use-this: "off" */
  // findWebElements(selector) {
  //   return $$(selector);
  // }

  // /* eslint class-methods-use-this: "off" */
  // findWebElement(selector) {
  //   return $(selector);
  // }
}
