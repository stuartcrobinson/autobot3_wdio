// @ts-check
import { key } from './Key';
import { livy } from './Livy';
import { UiContainer } from './UiContainer';
// import { Page } from './Page';


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
export class UiElement extends UiContainer {
  static $(selector) {
    return new UiElement(selector);
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
    this.parentPage = undefined;
  }

  // these would allow a UiElement to know their parent page.  maybe a good idea for logging ... ?
  // /**
  //  *
  //  * //@param {Page} page //commented to avoid  Dependency cycle
  //  */
  // setPage(page) {
  //   this.parentPage = page;
  //   return this;
  // }

  // getPage() {
  //   return this.parentPage;
  // }

  setName(name) {
    // this.stuartname = name;
    return super.setName(name);
  }

  /**
   * Marks the given UiElement as being a critical component of its parent container.  Absence of this item in the DOM means the parent container is not loaded.
   */
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

  /**
   * Returns a child UiElement component with the given relative selector.
   * @param {string} selector must match parent selector style (xpath vs css-selector)
   */
  get(selector) {
    if (this.selector.startsWith('/') && selector.startsWith('/')) {
      return new UiElement(this.selector + selector);
    }
    if (!this.selector.startsWith('/') && !selector.startsWith('/')) {
      return new UiElement(`${this.selector} ${selector}`);
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


  /** Returns an array of text values of all web elements matching the given UiElement's selector. */
  getTexts() {
    const wes = this.getWebElements();

    const texts = [];

    wes.forEach((we) => {
      texts.push(we.getText());
    });

    // console.log(`texts: ${JSON.stringify(texts)}`);
    return texts;
  }

  getText() {
    // this.ensureContainerIsLoaded();
    return this.getWebElement().getText();
  }

  click(doLogAndWait = true) {
    if (doLogAndWait) {
      this.logAndWait2([
        { text: '👇 ', style: livy.style.emoji },
        { text: 'Click ', style: livy.style.verb },
        { text: `${this.stuartname} `, style: livy.style.object },
        { text: `${this.selector}`, style: livy.style.selector }]);
    }
    browser.click(this.selector);
  }

  click_ifExists(doLogAndWait = true) {
    if (this.isExisting()) {
      if (doLogAndWait) {
        this.logAndWait2([
          { text: '👇 ', style: livy.style.emoji },
          { text: 'Click ', style: livy.style.verb },
          { text: `${this.stuartname} `, style: livy.style.object },
          { text: `${this.selector}`, style: livy.style.selector }]);
      }
      browser.click(this.selector);
    }
  }

  doubleClick(doLog = true) {
    if (doLog) {
      this.logAndWait2([
        { text: '👇👇 ', style: livy.style.emoji },
        { text: 'Double-click ', style: livy.style.verb },
        { text: `${this.stuartname} `, style: livy.style.object },
        { text: `${this.selector}`, style: livy.style.selector }]);
    }
    browser.click(this.selector);
  }

  /**
   * I think this places the mouse over the center of the element and scrolls the page so the entire element is within view.
   */
  hover(doLog = true) {
    if (doLog) {
      this.logAndWait2([
        { text: '🕴  ', style: livy.style.emoji },
        { text: 'Hover ', style: livy.style.verb },
        { text: `${this.stuartname} `, style: livy.style.object },
        { text: `${this.selector}`, style: livy.style.selector }]);
    }
    browser.moveToObject(this.selector);
    return this;
  }

  scroll() {
    return this.hover(false);
  }

  click_waitForChange(indicatorSelector = '//body', doLog = true) {
    const initialIndicatorElementHtml = browser.element(indicatorSelector).getHTML();
    doLog
      && this.logAndWait2([
        { text: '👇 ', style: livy.style.emoji },
        { text: 'Click ', style: livy.style.verb },
        { text: `${this.stuartname} `, style: livy.style.object },
        { text: 'then wait for change in ', style: livy.style.filler },
        { text: indicatorSelector, style: livy.style.selector },
        { text: ' target: ', style: livy.style.filler },
        { text: `${this.selector} `, style: livy.style.selector },
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
      { text: '👇 ', style: livy.style.emoji },
      { text: 'Click ', style: livy.style.verb },
      { text: `${this.stuartname} `, style: livy.style.object },
      { text: 'then wait for element to exist: ', style: livy.style.filler },
      { text: indicatorSelector, style: livy.style.selector },
      { text: ' target: ', style: livy.style.filler },
      { text: `${this.selector} `, style: livy.style.selector },
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

  /**
   * Clicks each instance of the given webelement assuming it disappears upon click.
   */
  clickAll_disappearing() {
    this.logAndWait2([
      { text: '👇 ', style: livy.style.emoji },
      { text: 'Click to remove all instances of ', style: livy.style.verb },
      { text: `${this.stuartname} `, style: livy.style.object },
      { text: this.selector, style: livy.style.selector },
    ]);
    this.click_waitForChange('//body', false);

    while (this.isExisting()) {
      this.click_waitForChange('//body', false);
    }
  }


  click_waitForNotExisting(indicatorSelector = this.selector) {
    if (indicatorSelector === this.selector) {
      this.logAndWait2([
        { text: '👇 ', style: livy.style.emoji },
        { text: 'Click ', style: livy.style.verb },
        { text: `${this.stuartname} `, style: livy.style.object },
        { text: 'then wait for target to disappear ', style: livy.style.filler },
        { text: indicatorSelector, style: livy.style.selector },
      ]);
    } else {
      this.logAndWait2([
        { text: '👇 ', style: livy.style.emoji },
        { text: 'Click ', style: livy.style.verb },
        { text: `${this.stuartname} `, style: livy.style.object },
        { text: 'then wait for element to disappear: ', style: livy.style.filler },
        { text: indicatorSelector, style: livy.style.selector },
        { text: ' target: ', style: livy.style.filler },
        { text: `${this.selector} `, style: livy.style.selector },
      ]);
    }
    browser.click(this.selector);

    browser.waitUntil(() => !browser.isExisting(indicatorSelector));
  }

  setValue(value, maskTextInLogs = false) {
    if (typeof value === 'number') {
      throw new Error('input can be string or array, not number');
    }
    this.logAndWait2([
      { text: '⌨  ', style: livy.style.emoji },
      { text: 'Set value ', style: livy.style.verb },
      { text: 'of ', style: livy.style.filler },
      { text: `${this.stuartname} `, style: livy.style.object },
      { text: 'to ', style: livy.style.filler },
      { text: `${value} `, style: maskTextInLogs ? livy.style.password : livy.style.object },
      { text: `${this.selector} `, style: livy.style.selector }]);

    // try {
    //   browser.setValue(this.selector, value);
    //   console.log('nooooooooonooooooooonooooooooonooooooooonooooooooo ');
    // } catch (err) {
    //   console.log('caught error: ');
    //   console.log(err);
    // this.click_waitForChange();


    /* note: browser.setValue doesn't work with the WS editor in branch rules. */

    this.clear(false);
    this.keys(value, 1, false);
    // browser.pause(100);
    // browser.keys(' ');
    // browser.keys(key.BACKSPACE);
    // browser.click(this.selector);
    // browser.pause(100);
    // browser.keys([value]);
    // }
  }

  /**
   * Performs Command-a Delete.
   */
  clear(doLog = true) {
    doLog
      && this.logAndWait2([
        { text: '✨ ', style: livy.style.emoji },
        { text: 'Clear ', style: livy.style.verb },
        { text: `${this.stuartname} `, style: livy.style.object },
        { text: `${this.selector} `, style: livy.style.selector }]);

    this.click(false);
    this.sleep(100);
    this.keys(key.DELETE, 20, key.BACKSPACE, 40, false);
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
    if (!this.name) {
      throw new Error(`Found ${this.constructor.name} with no name.  Make sure that the constructor for each class extending UiContainer ends with super.nameElements(). selector: ${this.selector}`);
    }
    const timeoutMillis = 5000;
    if (livy.doSaveEventScreenshots) {
      this.failSafeHover(timeoutMillis);
    }
    const screenshotId = livy.logRichMessages(messages);

    this.waitForExist(timeoutMillis);

    livy.saveScreenshot(screenshotId);
  }

  clickAndType(value) {
    this.logAndWait2([
      { text: '👇 ', style: livy.style.emoji },
      { text: 'Click ', style: livy.style.verb },
      { text: this.stuartname, style: livy.style.object },
      { text: ' and ', style: livy.style.filler },
      { text: 'type ', style: livy.style.verb },
      { text: value, style: livy.style.object },
      { text: ` ${this.selector}`, style: livy.style.selector }]);

    browser.click(this.selector);

    browser.keys(value);
  }


  /**
   *
   * @param {UiElement} abEl2
   */
  dragAndDropTo(abEl2) {
    this.logAndWait2([
      { text: '🏎  ', style: livy.style.emoji },
      { text: 'Drag ', style: livy.style.verb },
      { text: this.stuartname, style: livy.style.object },
      { text: ' to ', style: livy.style.filler },
      { text: abEl2.stuartname, style: livy.style.object },
      { text: ' [', style: livy.style.filler },
      { text: this.selector, style: livy.style.selector },
      { text: '], [', style: livy.style.filler },
      { text: abEl2.selector, style: livy.style.selector },
      { text: ']', style: livy.style.filler },
    ]);
    browser.dragAndDrop(this.selector, abEl2.selector);
  }

  uploadFile(filePath) {
    this.logAndWait2([
      { text: '📂 ', style: livy.style.emoji },
      { text: 'Upload file ', style: livy.style.verb },
      { text: `${filePath} `, style: livy.style.object },
      { text: 'to ', style: livy.style.filler },
      { text: `${this.stuartname} `, style: livy.style.object },
      { text: `${this.selector} `, style: livy.style.selector }]);

    browser.chooseFile(this.selector, filePath);
  }


  /**
   *
   * @param {Number} timoutMillis
   */
  waitForText(text, timoutMillis = 2000) {
    super.waitForLoad();
    const screenshotId = livy.logRichMessages([
      { text: '🤔 ', style: livy.style.emoji },
      { text: 'Assert ', style: livy.style.verb },
      { text: this.stuartname, style: livy.style.object },
      { text: "'s text is ", style: livy.style.filler },
      { text, style: livy.style.object },
      { text: ` ${this.selector}`, style: livy.style.selector }]);

    let actual;
    // try {
    this.waitForExist();
    console.log('here1');
    // browser.waitUntil(() => this.getWebElement().getText() === text, timoutMillis);

    actual = this.getWebElement().getText();
    console.log(`actual 1: ${actual}`);

    const expected = text;

    const initTime = new Date().getTime();
    while (actual !== expected && new Date().getTime() - initTime < timoutMillis) {
      browser.pause(100);
      actual = this.getWebElement().getText();
      console.log(`actual loop: ${actual}`);
      console.log('new Date().getMilliseconds()');
      console.log(new Date().getMilliseconds());
      console.log('initTime');
      console.log(initTime);
      console.log('timoutMillis');
      console.log(timoutMillis);
      console.log('new Date().getMilliseconds() - initTime');
      console.log(new Date().getMilliseconds() - initTime);
    }
    if (actual !== expected) {
      throw new Error(`Element "${this.stuartname}"'s text is "${actual}" after ${timoutMillis} ms.  Expected: "${text}". Selector: ${this.selector}`);
    }
    // } catch (err) {
    //   console.log('original error:');
    //   console.log(err);
    //   throw new Error(`Element "${this.stuartname}"'s text is "${actual}" after ${timoutMillis} ms.  Expected: "${text}". Selector: ${this.selector}`);
    // }
    livy.saveScreenshot(screenshotId);
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

  /**
   * This is not a super reliable function since selenium isn't 100% accurate at determining visibility.
   * @param {Number} timeoutInMillis
   */
  waitForVisible(timeoutInMillis = 5000) {
    try {
      browser.waitUntil(() => (browser.isVisible(this.selector)), timeoutInMillis);
    } catch (err) {
      throw new Error(`Error finding visible ${this.stuartname} within ${timeoutInMillis} ms. Selector: ${this.selector} `);
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
      if (propValue instanceof UiElement) {
        propValue.setName(propName);
      }
    }
  }
}
