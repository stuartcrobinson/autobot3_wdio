// @ts-check
import { options } from '../autobot';
import { Component } from './Component';

/**
 * Parent class for a Page Object.
 */
export class Page extends Component {
  // maybe this should have url sometimes?  what's the difference in a page and a component ...

  // page: url

  /**
   *
   * @param {String} urlPath starts with "/" https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL
   */
  constructor(urlPath = undefined) {
    if (urlPath && !urlPath.startsWith('/')) {
      throw new Error('urlPath should start with forward slash (/)');
    }
    super();
    this.urlPath = urlPath;
  }


  /**
   * TODO -- first check to see if it's already loaded.  don't load if so.
   */
  load() {
    browser.url(options.url + this.urlPath);
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
  //     if (propValue instanceof AbElement) {
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
  //     if (propValue instanceof AbElement && propValue.isLoadCriterion) {
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
