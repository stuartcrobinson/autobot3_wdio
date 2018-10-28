// @ts-check
// import colors from 'colors/safe';
import { logAndWait2, abStyle } from '../autobot';
/* eslint import/no-cycle: "off" */
import { Component } from './Component';

// const cssToXPath = require('css-to-xpath');


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

  // /* eslint class-methods-use-this: "off" */
  // getWebElements(selector) {
  //   return $$(selector);
  // }

  /* eslint class-methods-use-this: "off" */
  getWebElement() {
    return browser.element(this.selector);
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
      return this.findWebElements(this.selector + selector);
    }
    if (!this.selector.startsWith('/') && !selector.startsWith('/')) {
      return this.findWebElements(`${this.selector} ${selector}`);
    }

    throw new Error(`Parent and child elements must have selectors of the same type. Parent: <${this.selector}>, Child: <${selector}>.`);
  }

  // spanWithText(text) {
  //   if (this.selector.startsWith('/')) {
  //     return this.getChild(this.selector + "//span[text()='" + text + "']");
  //   }
  //   if (!this.selector.startsWith('/')) {
  //     return this.getChild(`${cssToXPath(this.selector)} ${selector}`);
  //   }
  // }

  click(doLog = true) {
    // livy.logAction('Click: ' + this.selector);
    // browser.waitForExist(this.selector);
    // this.logAction2({ text: 'PASS', style: colors.green.bold });
    if (doLog) {
      logAndWait2([
        { text: 'Click ', style: abStyle.verb },
        { text: `${this.stuartname} `, style: abStyle.object },
        { text: `${this.selector}`, style: abStyle.selector }],
      this.selector);
    }
    // logAndWait(`Click: "${this.stuartname}" via ${this.selector}`,
    //   this.selector);
    browser.click(this.selector);
  }

  doubleClick(doLog = true) {
    // livy.logAction('Click: ' + this.selector);
    // browser.waitForExist(this.selector);
    // this.logAction2({ text: 'PASS', style: colors.green.bold });
    if (doLog) {
      logAndWait2([
        { text: 'Double-click ', style: abStyle.verb },
        { text: `${this.stuartname} `, style: abStyle.object },
        { text: `${this.selector}`, style: abStyle.selector }],
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
      { text: 'Hover ', style: abStyle.verb },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: `${this.selector}`, style: abStyle.selector }],
    this.selector);
    browser.moveToObject(this.selector);
    return this;
  }

  click_waitForChange(indicatorSelector = '//body') {
    const initialIndicatorElementHtml = browser.element(indicatorSelector).getHTML();

    // livy.logAction('click: ' + this.selector + ', then wait for change in: ' + indicatorSelector);
    // browser.waitForExist(this.selector);


    logAndWait2([
      { text: 'Click ', style: abStyle.verb },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: 'then wait for change in ', style: abStyle.filler },
      { text: indicatorSelector, style: abStyle.selector },
      { text: ' target: ', style: abStyle.filler },
      { text: `${this.selector} `, style: abStyle.selector },

    ],
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
      { text: 'Click ', style: abStyle.verb },
      { text: `${this.stuartname} `, style: abStyle.object },
      // { text: `${this.selector} `, style: abStyle.selector },
      { text: 'then wait for element to exist: ', style: abStyle.filler },
      { text: indicatorSelector, style: abStyle.selector },
      { text: ' target: ', style: abStyle.filler },
      { text: `${this.selector} `, style: abStyle.selector },

    ],
    this.selector);

    // { text: 'Click ', style: autobotSyles.verb },
    // { text: `${this.stuartname} `, style: autobotSyles.object },
    // { text: `${this.selector} `, style: autobotSyles.selector },
    // { text: 'then wait for change in ', style: autobotSyles.filler },
    // { text: indicatorSelector, style: autobotSyles.selector }],
    // this.selector);


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

  click_waitForNotExisting(indicatorSelector = this.selector) {
    if (!browser.isExisting(indicatorSelector)) {
      throw new Error(`Element [${indicatorSelector}] should exist prior to clicking [${this.selector}]`);
    }

    // livy.logAction('Click: ' + this.selector + ', then wait for element to disappear: ' + indicatorSelector);
    // browser.waitForExist(this.selector);

    logAndWait2([
      { text: 'Click ', style: abStyle.verb },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: 'then wait for element to disappear: ', style: abStyle.filler },
      { text: indicatorSelector, style: abStyle.selector },
      { text: ' target: ', style: abStyle.filler },
      { text: `${this.selector} `, style: abStyle.selector },

    ],
    this.selector);

    // logAndWait2([
    //   { text: 'Click ', style: colors.bold },
    //   { text: `${this.stuartname} `, style: colors.italic },
    //   { text: `${this.selector} `, style: colors.gray },
    //   { text: 'then wait for element to disappear: ' },
    //   { text: indicatorSelector, style: colors.gray }],
    //   this.selector);


    // logAndWait(`Click: "${this.stuartname}" via ${this.selector}, then wait for element to disappear: ${indicatorSelector}`,
    //   this.selector);
    browser.click(this.selector);

    browser.waitUntil(() => !browser.isExisting(indicatorSelector));

    // const init = new Date().getTime();

    // const timeout = 2000;

    // while (browser.isExisting(indicatorSelector)) {
    //   browser.pause(200);

    //   if (new Date().getTime() - init > timeout) {
    //     throw new Error(`Timeout waiting for ${indicatorSelector} to no longer exist after clicking ${this.selector}`);
    //   }
    // }
  }

  setValue(value) {
    logAndWait2([
      { text: 'Set value ', style: abStyle.verb },
      { text: 'of ', style: abStyle.filler },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: 'to ', style: abStyle.filler },
      { text: `${value} `, style: abStyle.object },
      { text: `${this.selector} `, style: abStyle.selector }],
    this.selector);

    browser.setValue(this.selector, value);
  }


  clickAndType(value) {
    logAndWait2([
      { text: 'Click ', style: abStyle.verb },
      // { text: 'of ', style: abStyle.filler },
      { text: this.stuartname, style: abStyle.object },
      { text: ' and ', style: abStyle.filler },
      { text: 'type ', style: abStyle.verb },
      { text: value, style: abStyle.object },
      { text: ` ${this.selector}`, style: abStyle.selector }],
    this.selector);

    browser.click(this.selector);

    browser.keys(value);
  }


  uploadFile(filePath) {
    logAndWait2([
      { text: 'Upload file ', style: abStyle.verb },
      { text: `${filePath} `, style: abStyle.object },
      { text: 'to ', style: abStyle.filler },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: `${this.selector} `, style: abStyle.selector }],
    this.selector);

    browser.chooseFile(this.selector, filePath);
  }


  waitForNotExist(timeoutInMillis = 1000) {
    browser.waitUntil(() => (!browser.isExisting(this.selector)), timeoutInMillis);
  }

  waitForExist(timeoutInMillis = 5000) {
    try {
      browser.waitUntil(() => (browser.isExisting(this.selector)), timeoutInMillis);
    } catch (err) {
      throw new Error(`Error finding ${this.stuartname} by ${this.selector} within  ${timeoutInMillis} ms`);
    }
  }

  isExisting() {
    return browser.isExisting(this.selector);
  }
}
