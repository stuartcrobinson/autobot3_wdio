// @ts-check

import { AbElement } from '../autobot';

export class Page {
  // waitForStableDom(timeoutInMillis = 10000) {
  //   Tools.waitForStableDom(timeoutInMillis);
  // }

  // TODO combine this with the other nameElements
  /* eslint guard-for-in: "off", no-restricted-syntax: "off" */
  nameElements() {
    for (const propName in this) {
      const propValue = this[propName];
      if (propValue instanceof AbElement) {
        // @ts-ignore
        propValue.stuartname = propName;
      }
    }
  }

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

  waitForLoad() {
    for (let i = 0; i < this.loadCriteriaElements.length; i++) {
      const element = this.loadCriteriaElements[i];
      element.waitForExist(12000);
    }
  }

  isLoaded() {
    for (let i = 0; i < this.loadCriteriaElements.length; i++) {
      const element = this.loadCriteriaElements[i];
      element.getWebElement();
    }
    return true;
  }
}
