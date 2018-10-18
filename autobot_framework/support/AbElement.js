// @ts-check
import { livy } from '../autobot';

function getParentFromStack(stack) {
  // console.log("stack");
  // console.log(stack);
  const line = stack.split(' at ')[2];

  // console.log("line");
  // console.log(line);
  const endPart = line.split('src/support/')[1];
  const result = endPart.split('.js')[0];
  return result;
}

function logAndWait(message, waiteeSelector) {
  const screenshotId = livy.logAction(message);
  if (waiteeSelector) {
    browser.waitForExist(waiteeSelector);
  }
  livy.setMouseoverEventScreenshotFunction(screenshotId);
}

// interface IFirst{
//   first:number;
// }

export class AbElement {
  /**
     * @param {String} selector - xpath or css selector
     */
  constructor(selector) {
    this.selector = selector;
    try {
      this.parentString = getParentFromStack(new Error().stack);
    } catch (err) {
      this.parentString = 'ERROR_GETTING_PARENT';
    }
    this.isLoadCriterion = false;
  }

  /* eslint guard-for-in: "off", no-restricted-syntax: "off" */
  nameElements() {
    for (const propName in this) {
      const propValue = this[propName];
      if (propValue instanceof AbElement) {
        // TODO what's the point here ... oh for outputting right?
        // @ts-ignore
        propValue.stuartname = propName;
      }
    }
  }


  tagAsLoadCriterion() {
    this.isLoadCriterion = true;
    return this;
  }


  getWebElement() {
    return browser.element(this.selector);
  }
  // get element() { return browser.element(this.selector); }


  getChild(selector) {
    if ((this.selector.startsWith('//') && !selector.startsWith('//')) || (!this.selector.startsWith('//') && selector.startsWith('//'))) {
      throw new Error(`Parent and child elements must have selectors of the same time. Parent: <${this.selector}>, Child: <${selector}>.`);
    }
    return new AbElement(this.selector + selector);
  }


  click() {
    // livy.logAction('Click: ' + this.selector);
    // browser.waitForExist(this.selector);

    logAndWait(`Click: ${this.selector}`,
      this.selector);
    browser.click(this.selector);
  }

  hover() {
    // livy.logAction('Hover: ' + this.selector);
    // browser.waitForExist(this.selector);

    logAndWait(`Hover: ${this.selector}`,
      this.selector);
    browser.moveToObject(this.selector);
  }

  click_waitForChange(indicatorSelector) {
    const initialIndicatorElementHtml = browser.element(indicatorSelector).getHTML();

    // livy.logAction('click: ' + this.selector + ', then wait for change in: ' + indicatorSelector);
    // browser.waitForExist(this.selector);


    logAndWait(`Click: ${this.selector}, then wait for change in: ${indicatorSelector}`,
      this.selector);

    browser.click(this.selector);

    const init = new Date().getTime();

    const timeout = 2000;

    while (browser.element(indicatorSelector).getHTML() === initialIndicatorElementHtml) {
      browser.pause(200);

      if (new Date().getTime() - init > timeout) {
        throw new Error(`timeout waiting for ${indicatorSelector} to change after clicking ${this.selector}`);
      }
    }
  }

  click_waitForExisting(indicatorSelector) {
    if (browser.isExisting(indicatorSelector)) {
      throw new Error(`Element already exists: ${indicatorSelector}`);
    }

    // livy.logAction('Click: ' + this.selector + ', then wait for element to exist: ' + indicatorSelector);
    // browser.waitForExist(this.selector);
    logAndWait(`Click: ${this.selector}, then wait for element to exist: ${indicatorSelector}`,
      this.selector);

    browser.click(this.selector);

    const init = new Date().getTime();

    const timeout = 2000;

    while (!browser.isExisting(indicatorSelector)) {
      browser.pause(200);

      if (new Date().getTime() - init > timeout) {
        throw new Error(`timeout waiting for ${indicatorSelector} to exist after clicking ${this.selector}`);
      }
    }
  }

  click_waitForNotExisting(indicatorSelector) {
    if (!browser.isExisting(indicatorSelector)) {
      throw new Error(`Element [${indicatorSelector}] should exist prior to clicking [${this.selector}]`);
    }

    // livy.logAction('Click: ' + this.selector + ', then wait for element to disappear: ' + indicatorSelector);
    // browser.waitForExist(this.selector);

    logAndWait(`Click: ${this.selector}, then wait for element to disappear: ${indicatorSelector}`,
      this.selector);
    browser.click(this.selector);

    const init = new Date().getTime();

    const timeout = 2000;

    while (browser.isExisting(indicatorSelector)) {
      browser.pause(200);

      if (new Date().getTime() - init > timeout) {
        throw new Error(`Timeout waiting for ${indicatorSelector} to no longer exist after clicking ${this.selector}`);
      }
    }
  }


  setValue(value) {
    // livy.logAction('Set value of [' + this.selector + '] to [' + value + ']');
    // browser.waitForExist(this.selector);

    logAndWait(`Set value of [${this.selector}] to [${value}]`,
      this.selector);

    browser.setValue(this.selector, value);
  }

  waitForNotExist(timeoutInMillis = 1000) {
    browser.waitUntil(() => (!browser.isExisting(this.selector)), timeoutInMillis);
  }

  waitForExist(timeoutInMillis = 5000) {
    browser.waitUntil(() => (browser.isExisting(this.selector)), timeoutInMillis);
  }

  isExisting() {
    return browser.isExisting(this.selector);
  }
}
