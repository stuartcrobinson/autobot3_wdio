import { AssertionError } from 'assert';
import filenamify from 'filenamify';
import { livy } from '../autobot';

// @ts-check

/**
 * Any class that contains custom web element objects.
 */
/* eslint guard-for-in: "off", no-restricted-syntax: "off",  */
export class UiContainer {
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
      // if (propValue instanceof UiElement) {
      // @ts-ignore
      // propValue.stuartname = propName;
      if (propValue) {
        try {
          // @ts-ignore
          propValue.setName(propName);
        } catch (err) {
          // do nothing.  i would love to check if propValue was instanceOf UiElement but that gives circular dependency errors
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
        if (propValue.isLoadCriterion) { // propValue instanceof UiElement &&
          abElements.push(propValue);
        }
      } catch (err) {
        // do nothing.  i would love to check if propValue was instanceOf UiElement but that gives circular dependency errors
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

  /**
   * Asserts that the browser screen matches the screenshot saved in screenshots/reference.
   *
   * To reset the reference image, replace `checkVisual(...)` with `resetVisual(...)` and re-run.
   * @param  excludedElements UiElement - cssSelectors or xpaths for sections of the screen to ignore
   */
  checkVisual(...excludedElements) {
    // console.log(this.constructor.name)

    excludedElements.forEach((uiElement) => {
      uiElement.waitForVisible();
    });

    const excludedSelectors = excludedElements.map(uiElement => uiElement.selector);

    let report;
    if (this.selector) {
      // is an element

      this.waitForExist();

      global.customScreenshotTag = filenamify(this.selector);

      /* eslint prefer-destructuring: "off" */
      report = browser.checkElement(this.selector, { hide: excludedSelectors })[0];
    } else {
      // is a page


      this.waitForLoad();

      global.customScreenshotTag = `${this.constructor.name}Page`;

      /* eslint prefer-destructuring: "off" */
      report = browser.checkDocument({ hide: excludedSelectors })[0];
    }

    // @ts-ignore
    if (!report.isWithinMisMatchTolerance) {
      // @ts-ignore
      livy.logFailedVisualTest(global.previousImageFileLocation);
      throw new AssertionError({ message: 'Visual test failed.' });
    }
    global.customScreenshotTag = undefined;
  }

  resetVisual(...excludedElements) {
    // this is sloppy but i'm not sure how to determine the ref image name - stuart 11/22/2018

    // @ts-ignore
    global.doDeleteReferenceImage = true;
    this.checkVisual(...excludedElements);
    // @ts-ignore
    global.doDeleteReferenceImage = false;
  }
}
