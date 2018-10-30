// @ts-check
/* eslint import/no-cycle: "off" */
import { AbElement } from './AbElement';

/**
 * Any class that contains custom web element objects.
 */
/* eslint guard-for-in: "off", no-restricted-syntax: "off",  */
export class Component {
  // constructor() {
  // }

  /* eslint guard-for-in: "off", no-restricted-syntax: "off" */
  /**
   * This adds a custom name parameter to each element object so that the variable's name
   * can be displayed in the ui test logs instead of just a potentially cryptic selector.
   *
   * This was inspired by the idea that maybe we should avoid using visible values in selectors to prepare for multi-language support
   */
  nameElements() {
    for (const propName in this) {
      const propValue = this[propName];
      if (propValue instanceof AbElement) {
        // @ts-ignore
        // propValue.stuartname = propName;
        propValue.setName(propName);
      }
    }
  }

  /**
   *
   */
  get loadCriteriaElements() {
    const abElements = [];

    for (const propName in this) {
      const propValue = this[propName];
      if (propValue instanceof AbElement && propValue.isLoadCriterion) {
        abElements.push(propValue);
      }
    }
    return abElements;
  }

  waitForLoad(timeoutInMillis = 12000) {
    for (let i = 0; i < this.loadCriteriaElements.length; i++) {
      const element = this.loadCriteriaElements[i];
      element.waitForExist(timeoutInMillis);
    }
  }

  isLoaded() {
    for (let i = 0; i < this.loadCriteriaElements.length; i++) {
      const element = this.loadCriteriaElements[i];
      element.getWebElement();
    }
    return true;
  }

  /* eslint class-methods-use-this: "off" */
  findWebElements(selector) {
    return $$(selector);
  }

  /* eslint class-methods-use-this: "off" */
  findWebElement(selector) {
    return $(selector);
  }
}
