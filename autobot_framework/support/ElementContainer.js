// @ts-check
import { AbElement } from "./AbElement";

/**
 * Any class that contains custom web element objects.  
 */
export class ElementContainer {
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
        propValue.stuartname = propName;
      }
    }
  }

}
