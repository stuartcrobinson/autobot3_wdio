// @ts-check
import filenamify from 'filenamify';
import { log } from './AquiferLog';

const timeoutWdio = require('../wdio.conf').config.waitforTimeout;

/**
 * Any class that contains custom web element objects.
 *
 * Abstract class
 */
/* eslint guard-for-in: "off", no-restricted-syntax: "off",  */
export class UiContainer {
  constructor() {
    if (this.constructor === UiContainer) {
      throw new TypeError('Abstract class cannot be instantiated directly.');
    }
  }

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
      if (propValue) {
        try {
          // @ts-ignore
          propValue.setName(propName);
        } catch (err) {
          // do nothing. love to check if propValue was instanceOf UiElement but that requires circular dependency
        }
      }
    }
  }

  setName(name) {
    this.stuartname = name;
    return this;
  }

  get name() { return this.stuartname; }

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

  waitForLoad(timeout = timeoutWdio) {
    try {
      for (let i = 0; i < this.criteriaElements.length; i++) {
        const element = this.criteriaElements[i];
        // @ts-ignore
        element.waitForExist(timeout);
      }
    } catch (error) {
      throw new Error(`Container ${this.constructor.name} failed to load within ${timeout} ms. ${error}`);
    }
    return this;
  }

  waitFor(timeout = timeoutWdio) {
    // @ts-ignore
    if (this.waitForExist) {
      // @ts-ignore
      this.waitForExist(timeout);
    }
    return this.waitForLoad(timeout);
  }

  isLoaded(timeout = timeoutWdio) {
    for (let i = 0; i < this.criteriaElements.length; i++) {
      const element = this.criteriaElements[i];
      // @ts-ignore
      element.getWebElement(timeout);
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

  // TODO refactor, i think this is waste.  artifact of different hierarchy
  getChildren(selector) {
    return this.findWebElements(selector);
  }

  /**
   * Asserts that the browser screen matches the screenshot saved in screenshots/reference.
   *
   * To reset the reference image, replace `checkVisual(...)` with `resetVisual(...)` and re-run.
   * @param  excludedElements UiElement - cssSelectors or xpaths for sections of the screen to ignore
   */

  /**
    * Note: sometimes calling this on UiElement objects (instead of Page objects) gives a weird error: Error: There are some read requests waiting on finished stream
    // * @param  {...UiElement} excludedElements
    */
  checkVisual(...excludedElements) {
    this.waitFor();
    excludedElements.forEach((uiElement) => {
      uiElement.waitForVisible();
    });

    const excludedSelectors = excludedElements.map(uiElement => uiElement.selector);

    log.screenshotTargetName = this.name;
    log.screenshotTargetSelector = excludedSelectors.length > 0 ? ` excluding: ${JSON.stringify(excludedSelectors)}` : '';

    let report;
    // @ts-ignore
    if (this.selector) {
      /* is an element */

      // @ts-ignore
      global.customScreenshotTag = filenamify(this.selector);

      /* eslint prefer-destructuring: "off" */
      // @ts-ignore
      report = browser.checkElement(this.selector, { hide: excludedSelectors, misMatchTolerance: 0.05 })[0];
      // report = browser.checkElement(this.selector, { hide: excludedSelectors, misMatchTolerance: 0.04 })[0];
    } else {
      /* is a page */

      global.customScreenshotTag = `${this.constructor.name}Page`;

      /* eslint prefer-destructuring: "off" */
      // @ts-ignore
      report = browser.checkDocument({ hide: excludedSelectors, misMatchTolerance: 0.05 })[0];
    }

    // @ts-ignore
    if (!report.isWithinMisMatchTolerance) {
      log.logFailedVisualTest(global.previousImageFileLocation, report);
      log.aVisualTestFailed = true;
    }
    global.customScreenshotTag = undefined;
    log.screenshotTargetName = undefined;
    log.screenshotTargetSelector = undefined;
  }

  resetVisual(...excludedElements) {
    // this is sloppy but i'm not sure how else to determine the ref image name - stuart 11/22/2018
    global.doDeleteReferenceImage = true;
    this.checkVisual(...excludedElements);
    global.doDeleteReferenceImage = false;
  }

  keys(...inputs) {
    try {
      this.waitFor();
    } catch { /* do nothing */ } finally { /* do nothing */ }

    const asdf = [];

    let doLog = true;

    let outputString = '';

    if (inputs.length === 1) {
      asdf.push({ k: inputs[0], n: 1 });
      outputString = JSON.stringify(asdf[0].k);
    } else {
      for (let i = 0; i < inputs.length; i += 2) {
        const k = inputs[i];

        if (i + 1 < inputs.length) {
          const n = inputs[i + 1];

          asdf.push({ k, n });
          outputString += `${JSON.stringify(k) + (n > 1 ? `x${n}` : '')}, `;
        } else {
          doLog = k;
        }
      }
      outputString = outputString.slice(0, -2);
    }

    if (doLog) {
      log.logRichMessagesWithScreenshot([
        { text: '⌨  ', style: log.style.emoji },
        { text: 'Type ', style: log.style.verb },
        { text: outputString, style: log.style.object }]);
    }

    this.waitFor();
    // @ts-ignore
    this.click && this.click(false);

    for (let i = 0; i < asdf.length; i++) {
      const inputObject = asdf[i];
      for (let j = 0; j < inputObject.n; j++) {
        browser.keys(asdf[i].k);
      }
    }
  }

  sleep(timeout = timeoutWdio) {
    this.waitForLoad(timeout);
    browser.pause(timeout);
  }
}
