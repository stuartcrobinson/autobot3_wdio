// @ts-check
import { AssertionError } from 'assert';
import filenamify from 'filenamify';
import { livy } from './Livy';
// /* eslint import/no-cycle: "off" */
// import { UiElement } from './UiElement';

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

  setName(name) {
    this.stuartname = name;
    return this;
  }

  getName() {
    return this.stuartname;
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

  waitForLoad(timeoutInMillis = 12000) {
    try {
      for (let i = 0; i < this.criteriaElements.length; i++) {
        const element = this.criteriaElements[i];
        // @ts-ignore
        element.waitForExist(timeoutInMillis);
      }
    } catch (error) {
      throw new Error(`Container ${this.constructor.name} failed to load. ${error}`);
    }
    return this;
  }

  waitFor() {
    // @ts-ignore
    if (this.waitForExist) {
      // @ts-ignore
      this.waitForExist();
    } else {
      this.waitForLoad();
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

  // TODO refactor, i think this is waste.  artifact of different hierarchy
  getChildren(selector) {
    // if (this.selector.startsWith('/') && selector.startsWith('/')) {
    //   return this.findWebElements(this.selector + selector);
    // }
    // if (!this.selector.startsWith('/') && !selector.startsWith('/')) {
    return this.findWebElements(selector);
    // }

    // throw new Error(
    //   `Parent and child elements must have selectors of the same type. Parent: <${this.selector}>, Child: <${selector}>.`,
    // );
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

    livy.screenshotTargetName = this.name;
    livy.screenshotTargetSelector = excludedSelectors.length > 0 ? ` excluding: ${JSON.stringify(excludedSelectors)}` : '';

    let report;
    // @ts-ignore
    if (this.selector) {
      // is an element

      // @ts-ignore
      global.customScreenshotTag = filenamify(this.selector);
      // @ts-ignore

      /* eslint prefer-destructuring: "off" */
      // @ts-ignore
      report = browser.checkElement(this.selector, { hide: excludedSelectors, misMatchTolerance: 0.05 })[0];
      // report = browser.checkElement(this.selector, { hide: excludedSelectors, misMatchTolerance: 0.04 })[0];
    } else {
      // is a page

      // @ts-ignore
      global.customScreenshotTag = `${this.constructor.name}Page`;


      /* eslint prefer-destructuring: "off" */
      // @ts-ignore
      report = browser.checkDocument({ hide: excludedSelectors, misMatchTolerance: 0.05 })[0];
    }

    // @ts-ignore
    if (!report.isWithinMisMatchTolerance) {
      // @ts-ignore
      livy.logFailedVisualTest(global.previousImageFileLocation, report);
      throw new AssertionError({ message: `Visual test failed: ${JSON.stringify(report)}` });
    }
    // @ts-ignore
    global.customScreenshotTag = undefined;
    livy.screenshotTargetName = undefined;
    livy.screenshotTargetSelector = undefined;
  }

  resetVisual(...excludedElements) {
    // this is sloppy but i'm not sure how to determine the ref image name - stuart 11/22/2018

    // @ts-ignore
    global.doDeleteReferenceImage = true;
    this.checkVisual(...excludedElements);
    // @ts-ignore
    global.doDeleteReferenceImage = false;
  }


  keys(...inputs) {
    this.waitFor();
    // @ts-ignore
    this.click && this.click(false);

    const asdf = [];

    let doLog = true;

    let outputString = '';
    // console.log('inputs  98u98u');
    // console.log(inputs);
    // console.log('inputs lenght');
    // console.log(inputs.length);

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
      livy.logScreenshottedAction([
        { text: '⌨  ', style: livy.style.emoji },
        { text: 'Type ', style: livy.style.verb },
        { text: outputString, style: livy.style.object }]);
    }
    for (let i = 0; i < asdf.length; i++) {
      const inputObject = asdf[i];
      for (let j = 0; j < inputObject.n; j++) {
        // console.log('asdf[i].k');
        // console.log(asdf[i].k);
        browser.keys(asdf[i].k);
      }
    }
  }


  // keys(keysToType, n = 1, doLog = true) {
  //   this.waitForLoad();
  //   if (doLog) {
  //     livy.logScreenshottedAction([
  //       { text: 'Type ', style: livy.style.verb },
  //       { text: JSON.stringify(keysToType) + (n > 1 ? `x${n}` : ''), style: livy.style.object }]);
  //   }
  //   for (let i = 0; i < n; i++) {
  //     browser.keys(keysToType);
  //   }
  // }

  sleep(timeInMilliseconds) {
    this.waitForLoad();
    browser.pause(timeInMilliseconds);
  }
}
