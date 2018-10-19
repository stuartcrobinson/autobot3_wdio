// @ts-check
import { AbElement } from '../autobot';
import { ElementContainer } from './ElementContainer';

/**
 * Parent class for a Page Object.  
 */
export class Page extends ElementContainer {
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
