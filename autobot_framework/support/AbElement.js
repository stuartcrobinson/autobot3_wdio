// @ts-check
import { Component } from './Component';
import {
  abStyle,
  livy,
} from '../autobot';


function getParentFromStack(stack) {
  const line = stack.split(' at ')[2];
  const endPart = line.split('src/support/')[1];
  const result = endPart.split('.js')[0];
  return result;
}

/**
 * WebElement wrapper - allows for:
 * 1.  custom actions (click, hover, etc) to wait for target before attempting action.
 * 2.  custom logging per relevant action
 * 3.  child web elements
 */
export class AbElement extends Component {
  static $(selector) {
    return new AbElement(selector);
  }

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

  /* eslint class-methods-use-this: "off" */
  getWebElement() {
    this.waitForExist();
    return browser.element(this.selector);
  }

  getWebElements() {
    this.waitForExist();
    return $$(this.selector);
  }

  getChild(selector) {
    if (this.selector.startsWith('/') && selector.startsWith('/')) {
      return new AbElement(this.selector + selector);
    }
    if (!this.selector.startsWith('/') && !selector.startsWith('/')) {
      return new AbElement(`${this.selector} ${selector}`);
    }

    throw new Error(
      `Parent and child elements must have selectors of the same type. Parent: <${this.selector}>, Child: <${selector}>.`,
    );
  }

  getChildren(selector) {
    if (this.selector.startsWith('/') && selector.startsWith('/')) {
      return this.findWebElements(this.selector + selector);
    }
    if (!this.selector.startsWith('/') && !selector.startsWith('/')) {
      return this.findWebElements(`${this.selector} ${selector}`);
    }

    throw new Error(
      `Parent and child elements must have selectors of the same type. Parent: <${this.selector}>, Child: <${selector}>.`,
    );
  }

  /** Returns an array of text values of all web elements matching the given AbElement's selector. */
  getTexts() {
    const wes = this.getWebElements();

    const texts = [];

    wes.forEach((we) => {
      texts.push(we.getText());
    });

    // console.log('in getTexts, new texts array: ');
    // console.log(texts);
    // console.log(typeof (texts));

    return texts;
  }

  click(doLogAndWait = true) {
    if (doLogAndWait) {
      this.logAndWait2([
        { text: 'Click ', style: abStyle.verb },
        { text: `${this.stuartname} `, style: abStyle.object },
        { text: `${this.selector}`, style: abStyle.selector }]);
    }
    browser.click(this.selector);
  }

  doubleClick(doLog = true) {
    if (doLog) {
      this.logAndWait2([
        { text: 'Double-click ', style: abStyle.verb },
        { text: `${this.stuartname} `, style: abStyle.object },
        { text: `${this.selector}`, style: abStyle.selector }]);
    }
    browser.click(this.selector);
  }

  hover() {
    this.logAndWait2([
      { text: 'Hover ', style: abStyle.verb },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: `${this.selector}`, style: abStyle.selector }]);
    browser.moveToObject(this.selector);
    return this;
  }

  click_waitForChange(indicatorSelector = '//body') {
    const initialIndicatorElementHtml = browser.element(indicatorSelector).getHTML();
    this.logAndWait2([
      { text: 'Click ', style: abStyle.verb },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: 'then wait for change in ', style: abStyle.filler },
      { text: indicatorSelector, style: abStyle.selector },
      { text: ' target: ', style: abStyle.filler },
      { text: `${this.selector} `, style: abStyle.selector },
    ]);

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
    this.logAndWait2([
      { text: 'Click ', style: abStyle.verb },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: 'then wait for element to exist: ', style: abStyle.filler },
      { text: indicatorSelector, style: abStyle.selector },
      { text: ' target: ', style: abStyle.filler },
      { text: `${this.selector} `, style: abStyle.selector },
    ]);

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
    this.logAndWait2([
      { text: 'Click ', style: abStyle.verb },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: 'then wait for element to disappear: ', style: abStyle.filler },
      { text: indicatorSelector, style: abStyle.selector },
      { text: ' target: ', style: abStyle.filler },
      { text: `${this.selector} `, style: abStyle.selector },
    ]);
    browser.click(this.selector);

    browser.waitUntil(() => !browser.isExisting(indicatorSelector));
  }

  setValue(value) {
    this.logAndWait2([
      { text: 'Set value ', style: abStyle.verb },
      { text: 'of ', style: abStyle.filler },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: 'to ', style: abStyle.filler },
      { text: `${value} `, style: abStyle.object },
      { text: `${this.selector} `, style: abStyle.selector }]);

    browser.setValue(this.selector, value);
  }

  /** If event screenshots are being saved, attempt to hover over an object prior to interacting with it so that the mouse-over state is captured in the image.  */
  failSafeHover(timeoutInMillis = 5000) {
    try {
      browser.waitUntil(() => (browser.isExisting(this.selector)), timeoutInMillis);
      browser.moveToObject(this.selector);
    } catch (err) {
      // do nothing
    }
  }


  logAndWait2(messages) {
    const timeoutMillis = 5000;
    if (livy.doSaveEventScreenshots) {
      this.failSafeHover(timeoutMillis);
    }
    const screenshotId = livy.logAction2(messages);
    this.waitForExist(timeoutMillis);
    livy.setMouseoverEventScreenshotFunction(screenshotId);
  }

  clickAndType(value) {
    this.logAndWait2([
      { text: 'Click ', style: abStyle.verb },
      { text: this.stuartname, style: abStyle.object },
      { text: ' and ', style: abStyle.filler },
      { text: 'type ', style: abStyle.verb },
      { text: value, style: abStyle.object },
      { text: ` ${this.selector}`, style: abStyle.selector }]);

    browser.click(this.selector);

    browser.keys(value);
  }


  /**
   *
   * @param {AbElement} abEl2
   */
  dragAndDropTo(abEl2) {
    this.logAndWait2([
      { text: 'Drag ', style: abStyle.verb },
      { text: this.stuartname, style: abStyle.object },
      { text: ' to ', style: abStyle.filler },
      { text: abEl2.stuartname, style: abStyle.object },
      { text: ' [', style: abStyle.filler },
      { text: this.selector, style: abStyle.selector },
      { text: '], [', style: abStyle.filler },
      { text: abEl2.selector, style: abStyle.selector },
      { text: ']', style: abStyle.filler },
    ]);
    browser.dragAndDrop(this.selector, abEl2.selector);
  }

  uploadFile(filePath) {
    this.logAndWait2([
      { text: 'Upload file ', style: abStyle.verb },
      { text: `${filePath} `, style: abStyle.object },
      { text: 'to ', style: abStyle.filler },
      { text: `${this.stuartname} `, style: abStyle.object },
      { text: `${this.selector} `, style: abStyle.selector }]);

    browser.chooseFile(this.selector, filePath);
  }

  waitForNotExist(timeoutInMillis = 1000) {
    try {
      browser.waitUntil(() => (!browser.isExisting(this.selector)), timeoutInMillis);
    } catch (err) {
      throw new Error(`Error waiting for ${this.stuartname} to not exist within ${timeoutInMillis} ms. Selector: ${this.selector} `);
    }
  }

  /**
   * Doesn't log.
   * @param {Number} timeoutInMillis
   */
  waitForExist(timeoutInMillis = 5000) {
    try {
      browser.waitUntil(() => (browser.isExisting(this.selector)), timeoutInMillis);
    } catch (err) {
      throw new Error(`Error finding ${this.stuartname} within ${timeoutInMillis} ms. Selector: ${this.selector} `);
    }
  }

  isExisting() {
    return browser.isExisting(this.selector);
  }

  // ////////from Component, rip (circ dependencies)


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
        // propValue.stuartname = propName;
        propValue.setName(propName);
      }
    }
  }

  // /**
  //  *
  //  */
  // get loadCriteriaElements() {
  //   const abElements = [];

  //   for (const propName in this) {
  //     const propValue = this[propName];
  //     if (propValue instanceof AbElement && propValue.isLoadCriterion) {
  //       abElements.push(propValue);
  //     }
  //   }
  //   return abElements;
  // }

  // waitForLoad(timeoutInMillis = 12000) {
  //   for (let i = 0; i < this.loadCriteriaElements.length; i++) {
  //     const element = this.loadCriteriaElements[i];
  //     element.waitForExist(timeoutInMillis);
  //   }
  // }

  // isLoaded() {
  //   for (let i = 0; i < this.loadCriteriaElements.length; i++) {
  //     const element = this.loadCriteriaElements[i];
  //     element.getWebElement();
  //   }
  //   return true;
  // }

  // /* eslint class-methods-use-this: "off" */
  // findWebElements(selector) {
  //   return $$(selector);
  // }

  // /* eslint class-methods-use-this: "off" */
  // findWebElement(selector) {
  //   return $(selector);
  // }
}
