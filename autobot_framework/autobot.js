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

export function logAndWait2(messages, waiteeSelector) {
  const screenshotId = livy.logAction2(messages);
  if (waiteeSelector) {
    browser.waitForExist(waiteeSelector);
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
        { text: 'Type ', style: colors.bold },
        { text: keysToType, style: colors.italic }]);
    }
    browser.keys(keysToType);
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
      { text: 'Assert ', style: colors.bold },
      { text: `${abElement.stuartname}`, style: colors.italic },
      { text: "'s text is " },
      { text: expected, style: colors.italic },
      { text: ` ${abElement.selector}`, style: colors.gray }]);

    try {
      browser.waitUntil(() => abElement.getWebElement().getText() === expected, timoutMillis);
    } catch (err) {
      console.log("original error:")
      console.log(err)
      throw new Error(`Element "${abElement.stuartname}"'s text is "${abElement.getWebElement().getText()}" after ${timoutMillis} ms.  Expected: "${expected}". Selector: ${abElement.selector}`);
    }

    // assert.equal(abElement.getWebElement().getText(), expected);
  }

  /**
   * 
   * @param {AbElement} abElement 
   * @param {Number} timoutMillis 
   */
  static elementExists(abElement, timoutMillis = defaultAutobotTimeoutMillis) {
    log([
      { text: 'Assert ', style: colors.bold },
      { text: `${abElement.stuartname} `, style: colors.italic },
      { text: "exists " },
      { text: abElement.selector, style: colors.gray }]);
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
}

/******************************** hooks **************************************/
//these should be pulled out into a separate file and imported per test, since some tests might want unique before/after code
export let driver;
export let currentTest, currentSpec, currentTestCustom;

console.log("options.noPics ? ?")
console.log(options.noPics);
console.log("options.noPics === true")
console.log(options.noPics === true);
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

// beforeEach(function () {
//     console.log('beforeeach2')
// });

// afterEach(function () {
//   livy.endNewTestCase();
// })

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




