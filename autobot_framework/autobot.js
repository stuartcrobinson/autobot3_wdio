// @ts-check
import colors from 'colors/safe';
import { existsSync, readFileSync } from 'fs';
import stringArgv from 'string-argv';
import yargsParse from 'yargs-parser';
// import { assert } from 'chai';
import { AbElement } from './support/AbElement';
import { Livy } from './support/Livy';
export { AbElement } from './support/AbElement';
export { Page } from './support/Page';
// import { AssertionError } from 'assert';



/******************************** config *************************************/
let _options;

if (existsSync('file.txt')) {
  _options = yargsParse(stringArgv(readFileSync('file.txt')));
}
else {
  let argv = stringArgv(browser.options.key);

  for (let i = 0; i < argv.length; i++) {
    argv[i] = '--' + argv[i]
  }
  _options = yargsParse(argv);
}
export const options = _options;


/******** tools *******/

export const abStyle = new class AutobotSyles {
  constructor() {
    this.verb = colors.italic;
    this.object = colors.bold;
    this.filler = colors.reset;
    this.selector = colors.gray;
  }
}();


export function logAndWait2(messages, waiteeSelector) {
  const screenshotId = livy.logAction2(messages);
  if (waiteeSelector) {
    browser.waitForExist(waiteeSelector);
    // browser.waitForVisible(waiteeSelector);
  }
  livy.setMouseoverEventScreenshotFunction(screenshotId);
}

export function log(messages) {
  const screenshotId = livy.logAction2(messages);
  livy.setMouseoverEventScreenshotFunction(screenshotId);
}

export function logMessage(message) {
  const screenshotId = livy.logMessage(message);
  livy.setMouseoverEventScreenshotFunction(screenshotId);
}

// /******************************** browser ************************************/
/**
 * Should this method be in the Page parent class, so that we always make sure all the critical elements have finished loaded first?
 * 
 * Yeah probably.  You might want to check to see if something exists or not on a fully-loaded page.  Can't always rely on waiting for a given target.
 * 
 * TODO - move this to Page
 * 
 * @param {String} url 
 */
export function loadPage(url) {
  browser.url(url);
}

export const autobotBrowser = new class AutobotBrowser {

  keys(keysToType, doLog = true) {
    if (doLog) {
      log([
        { text: 'Type ', style: abStyle.verb },
        { text: keysToType, style: abStyle.object }]);
    }
    browser.keys(keysToType);
  }


  /**
   * 
   * @param {AbElement} abEl1 
   * @param {AbElement} abEl2 
   */
  dragAndDrop(abEl1, abEl2) {
    log([
      { text: 'Drag ', style: abStyle.verb },
      { text: abEl1.stuartname, style: abStyle.object },
      { text: ' to ', style: abStyle.filler },
      { text: abEl2.stuartname, style: abStyle.object },
      { text: ' [', style: abStyle.filler },
      { text: abEl1.selector, style: abStyle.selector },
      { text: '], [', style: abStyle.filler },
      { text: abEl2.selector, style: abStyle.selector },
      { text: ']', style: abStyle.filler },
    ]);
    browser.dragAndDrop(abEl1.selector, abEl2.selector);
  }

}


/******************************** assert **************************************/

const defaultAutobotTimeoutMillis = 5000;
export class AutobotAssert {

  /**
   * 
   * @param {AbElement} abElement 
   * @param {String} expected 
   * @param {Number} timoutMillis 
   */
  static elementText(abElement, expected, timoutMillis = defaultAutobotTimeoutMillis) {
    log([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${abElement.stuartname}`, style: abStyle.object },
      { text: "'s text is ", style: abStyle.filler },
      { text: expected, style: abStyle.object },
      { text: ` ${abElement.selector}`, style: abStyle.selector }]);

    try {
      abElement.waitForExist();
      browser.waitUntil(() => abElement.getWebElement().getText() === expected, timoutMillis);
    } catch (err) {
      console.log("original error:")
      console.log(err)
      throw new Error(`Element "${abElement.stuartname}"'s text is "${abElement.getWebElement().getText()}" after ${timoutMillis} ms.  Expected: "${expected}". Selector: ${abElement.selector}`);
    }
  }

  /**
   * 
   * @param {AbElement} abElement 
   * @param {Number} timoutMillis 
   */
  static elementExists(abElement, timoutMillis = defaultAutobotTimeoutMillis) {
    log([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${abElement.stuartname} `, style: abStyle.object },
      { text: "exists ", style: abStyle.verb },
      { text: abElement.selector, style: abStyle.selector }]);
    // browser.waitUntil(() => abElement.isExisting(), timoutMillis);
    // assert(abElement.isExisting());

    try {
      browser.waitUntil(() => abElement.isExisting(), timoutMillis);
    } catch (err) {
      console.log("original error:")
      console.log(err)
      throw new Error(`Element "${abElement.stuartname}" not found after ${timoutMillis} ms. Selector: ${abElement.selector}`);
    }
  }

  static valueEquals(f, value, targetDescription, timoutMillis = defaultAutobotTimeoutMillis) {
    // console.log("in valueEquals")

    log([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${targetDescription} `, style: abStyle.object },
      { text: "equals ", style: abStyle.verb },
      { text: value, style: abStyle.object }]);

    try {
      browser.waitUntil(() => f() === value, timoutMillis);
    } catch (err) {
      console.log("original error:")
      console.log(err)
      throw new Error(`${targetDescription}: Expected:  "${value}". Actual: "${f()}"`);
    }
  }



}

/******************************** hooks **************************************/
//these should be pulled out into a separate file and imported per test, since some tests might want unique before/after code
export let driver;
export let currentTest, currentSpec, currentTestCustom;

// console.log("options.noPics ? ?")
// console.log(options.noPics);
// console.log("options.noPics === true")
// console.log(options.noPics === true);
export let livy = new Livy(true, options.noPics ? false : true);


beforeEach(function () {
  // console.log('beforeeach1')

  currentTest = this.currentTest;
  let fullName = "";
  let ancestor = currentTest;
  let testGrandparentsTitle = "";
  let count = 0;
  while (ancestor !== undefined) {

    fullName = ancestor.title + " " + fullName;

    if (count >= 2) {
      testGrandparentsTitle = ancestor.title + " " + testGrandparentsTitle;
    }
    ancestor = ancestor.parent;
    count++;
  }
  livy.initializeNewTestCase(currentTest.title.trim(), currentTest.parent.title.trim(), fullName.trim(), testGrandparentsTitle.trim());
  livy.logTestStart();
});

before(function () {
  const filePath = this.test.parent.suites[0].tests[0].file
  livy.initialize(filePath);

  // @ts-ignore
  global.livy = livy;
});

after(function () {
  // console.log('after global')
  console.log('\nReport:\t\t', livy.reportClickablePath, '\n');
  livy.endSpec();
});




