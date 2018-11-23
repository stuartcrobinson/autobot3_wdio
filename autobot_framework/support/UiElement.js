import { UiAtom } from './UiAtom';

// @ts-check

/**
 * Any class that contains custom web element objects.
 */
/* eslint guard-for-in: "off", no-restricted-syntax: "off",  */
export class UiElement extends UiAtom {
  /* eslint guard-for-in: "off", no-restricted-syntax: "off" */

  // constructor(selector) {
  //   super(selector);
  // }

  /**
   * This adds a custom name parameter to each element object so that the variable's name
   * can be displayed in the ui test logs instead of just a potentially cryptic selector.
   *
   * This was inspired by the idea that maybe we should avoid using visible values in selectors to prepare for multi-language support
   */
  nameElements() {
    for (const propName in this) {
      const propValue = this[propName];
      // don't delete.  commented out to hopefully fix weird errors caused from circular import dependencies
      // if (propValue instanceof UiAtom) {
      // @ts-ignore
      // propValue.stuartname = propName;
      if (propValue) {
        try {
          // @ts-ignore
          propValue.setName(propName);
        } catch (err) {
          // do nothing.  i would love to check if propValue was instanceOf UiAtom but that gives circular dependency errors
        }
      }
      // }
    }
  }

  get criteriaElements() {
    const abElements = [];

    for (const propName in this) {
      const propValue = this[propName];
      try {
        // @ts-ignore
        if (propValue.isLoadCriterion) { // propValue instanceof UiAtom &&
          abElements.push(propValue);
        }
      } catch (err) {
        // do nothing.  i would love to check if propValue was instanceOf UiAtom but that gives circular dependency errors
      }
    }
    return abElements;
  }

  waitForLoad(timeoutInMillis = 12000) {
    for (let i = 0; i < this.criteriaElements.length; i++) {
      const element = this.criteriaElements[i];
      // @ts-ignore
      element.waitForExist(timeoutInMillis);
    }
  }

  isLoaded() {
    for (let i = 0; i < this.criteriaElements.length; i++) {
      const element = this.criteriaElements[i];
      // @ts-ignore
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


  getChild(selector) {
    if (this.selector.startsWith('/') && selector.startsWith('/')) {
      return new UiElement(this.selector + selector);
    }
    if (!this.selector.startsWith('/') && !selector.startsWith('/')) {
      return new UiElement(`${this.selector} ${selector}`);
    }

    throw new Error(
      `Parent and child elements must have selectors of the same type. Parent: <${this.selector}>, Child: <${selector}>.`,
    );
  }

  getChildren(selector) {
    if (this.selector.startsWith('/') && selector.startsWith('/')) {
      return this.findWebElements(this.selector + selector);
    }
    if (!this.selector.startsWith('/') && !selector.startsWith('/')) {
      return this.findWebElements(`${this.selector} ${selector}`);
    }

    throw new Error(
      `Parent and child elements must have selectors of the same type. Parent: <${this.selector}>, Child: <${selector}>.`,
    );
  }
}
