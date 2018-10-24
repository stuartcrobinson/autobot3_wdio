// @ts-check
import colors from 'colors/safe';
import { logAndWait2 } from '../autobot';
/* eslint import/no-cycle: "off" */
import { Component } from './Component';


function getParentFromStack(stack) {
  const line = stack.split(' at ')[2];

  const endPart = line.split('src/support/')[1];
  const result = endPart.split('.js')[0];
  return result;
}

/*
considering pulling out all wdio-specific code from AbElement into a separate place

like so:
*/

function getWebElements(selector) {
  return $$(selector);
}

function getWebElement(selector) {
  return $(selector);
}


/**
 * WebElement wrapper - allows for:
 * 1.  custom actions (click, hover, etc) to wait for target before attempting action.
 * 2.  custom logging per relevant action
 * 3.  child web elements
 */
export class AbElement extends Component {
  /**
     * @param {String} selector - xpath or css selector
     */
  constructor(selector) {
    super();
    this.selector = selector;
    try {
      this.parentString = getParentFromStack(new Error().stack);
    } catch (err) {
      this.parentString = 'ERROR_GETTING_PARENT';
    }
    this.isLoadCriterion = false;
  }

  setName(name) {
    this.stuartname = name;
    return this;
  }

  tagAsLoadCriterion() {
    this.isLoadCriterion = true;
    return this;
  }

  getWebElement() {
    return getWebElement(this.selector);
  }


  getChild(selector) {
    if (this.selector.startsWith('/') && selector.startsWith('/')) {
      return new AbElement(this.selector + selector);
    }
    if (!this.selector.startsWith('/') && !selector.startsWith('/')) {
      return new AbElement(`${this.selector} ${selector}`);
    }

    throw new Error(`Parent and child elements must have selectors of the same type. Parent: <${this.selector}>, Child: <${selector}>.`);
  }

  getChildren(selector) {
    if (this.selector.startsWith('/') && selector.startsWith('/')) {
      return getWebElements(this.selector + selector);
    }
    if (!this.selector.startsWith('/') && !selector.startsWith('/')) {
      return getWebElements(`${this.selector} ${selector}`);
    }

    throw new Error(`Parent and child elements must have selectors of the same type. Parent: <${this.selector}>, Child: <${selector}>.`);
  }


  click(doLog = true) {
    // livy.logAction('Click: ' + this.selector);
    // browser.waitForExist(this.selector);
    // this.logAction2({ text: 'PASS', style: colors.green.bold });
    if (doLog) {
      logAndWait2([
        { text: 'Click ', style: colors.bold },
        { text: `${this.stuartname} `, style: colors.italic },
        { text: `${this.selector}`, style: colors.gray }],
      this.selector);
    }
    // logAndWait(`Click: "${this.stuartname}" via ${this.selector}`,
    //   this.selector);
    browser.click(this.selector);
  }

  hover() {
    // livy.logAction('Hover: ' + this.selector);
    // browser.waitForExist(this.selector);

    logAndWait2([
      { text: 'Hover ', style: colors.bold },
      { text: `${this.stuartname} `, style: colors.italic },
      { text: `${this.selector}`, style: colors.gray }],
    this.selector);
    browser.moveToObject(this.selector);
  }

  click_waitForChange(indicatorSelector = '//body') {
    const initialIndicatorElementHtml = browser.element(indicatorSelector).getHTML();

    // livy.logAction('click: ' + this.selector + ', then wait for change in: ' + indicatorSelector);
    // browser.waitForExist(this.selector);


    logAndWait2([
      { text: 'Click ', style: colors.bold },
      { text: `${this.stuartname} `, style: colors.italic },
      { text: `${this.selector} `, style: colors.gray },
      { text: 'then wait for change in ' },
      { text: indicatorSelector, style: colors.gray }],
    this.selector);


    // logAndWait(`Click: "${this.stuartname}" via ${this.selector}, then wait for change in: ${indicatorSelector}`,
    //   this.selector);

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
    // logAndWait(`Click: "${this.stuartname}" via ${this.selector}, then wait for element to exist: ${indicatorSelector}`,
    //   this.selector);


    logAndWait2([
      { text: 'Click ', style: colors.bold },
      { text: `${this.stuartname} `, style: colors.italic },
      { text: `${this.selector} `, style: colors.gray },
      { text: 'then wait for element to exist: ' },
      { text: indicatorSelector, style: colors.gray }],
    this.selector);


    // logAndWait(`Click: "${this.stuartname}" via ${this.selector}, then wait for element to exist: ${indicatorSelector}`,
    //   this.selector);


    // this.logAction2({ text: 'PASS', style: colors.green.bold });

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


    logAndWait2([
      { text: 'Click ', style: colors.bold },
      { text: `${this.stuartname} `, style: colors.italic },
      { text: `${this.selector} `, style: colors.gray },
      { text: 'then wait for element to disappear: ' },
      { text: indicatorSelector, style: colors.gray }],
    this.selector);


    // logAndWait(`Click: "${this.stuartname}" via ${this.selector}, then wait for element to disappear: ${indicatorSelector}`,
    //   this.selector);
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
    logAndWait2([
      { text: 'Set value ', style: colors.bold },
      { text: 'of ' },
      { text: `${this.stuartname} `, style: colors.italic },
      { text: `${this.selector} `, style: colors.gray },
      { text: `to "${value}"` }],
    this.selector);


    // logAndWait(`Set value of [${this.selector}] to [${value}]`,
    //   this.selector);

    browser.setValue(this.selector, value);
  }


  uploadFile(filePath) {
    logAndWait2([
      { text: 'Upload file ', style: colors.bold },
      { text: `${filePath} `, style: colors.italic },
      { text: 'to ' },
      { text: `${this.stuartname} `, style: colors.italic },
      { text: `${this.selector} `, style: colors.gray }],
    this.selector);

    browser.chooseFile(this.selector, filePath);
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
