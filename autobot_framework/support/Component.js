// @ts-check

/**
 * Any class that contains custom web element objects.
 */
/* eslint guard-for-in: "off", no-restricted-syntax: "off",  */
export class Component {

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
      // don't delete.  commented out to hopefully fix weird errors caused from circular import dependencies
      // if (propValue instanceof AbElement) {
      // @ts-ignore
      // propValue.stuartname = propName;
      if (propValue) {
        try {
          // @ts-ignore
          propValue.setName(propName);
        } catch (err) {
          // do nothing.  i would love to check if propValue was instanceOf AbElement but that gives circular dependency errors
        }
      }
      // }
    }
  }

  /**
   *
   */
  get loadCriteriaElements() {
    const abElements = [];

    for (const propName in this) {
      const propValue = this[propName];
      try {
        // @ts-ignore
        if (propValue.isLoadCriterion) { // propValue instanceof AbElement &&
          abElements.push(propValue);
        }
      } catch (err) {
        // do nothing.  i would love to check if propValue was instanceOf AbElement but that gives circular dependency errors
      }
    }
    return abElements;
  }

  waitForLoad(timeoutInMillis = 12000) {
    for (let i = 0; i < this.loadCriteriaElements.length; i++) {
      const element = this.loadCriteriaElements[i];
      // @ts-ignore
      element.waitForExist(timeoutInMillis);
    }
  }

  isLoaded() {
    for (let i = 0; i < this.loadCriteriaElements.length; i++) {
      const element = this.loadCriteriaElements[i];
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
}
