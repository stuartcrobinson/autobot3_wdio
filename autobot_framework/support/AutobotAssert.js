// @ts-check
import { abStyle, livy } from '../autobot';
/* eslint no-unused-vars: "off" */
import { AbElement } from './AbElement';


/** ****************************** assert ************************************* */

const defaultAutobotTimeoutMillis = 5000;
export class AutobotAssert {
// TODO it would be cleaner to wrap all these in a function that accepted the main assert code as a function and
  // did the logging stuff b4 and after

  /**
   *
   * @param {AbElement} abElement
   * @param {String} expected
   * @param {Number} timoutMillis
   */
  static elementText(abElement, expected, timoutMillis = defaultAutobotTimeoutMillis) {
    const screenshotId = livy.logAction2([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${abElement.stuartname}`, style: abStyle.object },
      { text: "'s text is ", style: abStyle.filler },
      { text: expected, style: abStyle.object },
      { text: ` ${abElement.selector}`, style: abStyle.selector }]);

    try {
      abElement.waitForExist();
      browser.waitUntil(() => abElement.getWebElement().getText() === expected, timoutMillis);
    } catch (err) {
      console.log('original error:');
      console.log(err);
      throw new Error(`Element "${abElement.stuartname}"'s text is "${abElement.getWebElement().getText()}" after ${timoutMillis} ms.  Expected: "${expected}". Selector: ${abElement.selector}`);
    }
    livy.setMouseoverEventScreenshotFunction(screenshotId);
  }

  /**
   *
   * @param {AbElement} abElement
   * @param {Number} timoutMillis
   */
  static elementExists(abElement, timoutMillis = defaultAutobotTimeoutMillis) {
    const screenshotId = livy.logAction2([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${abElement.stuartname} `, style: abStyle.object },
      { text: 'exists ', style: abStyle.verb },
      { text: abElement.selector, style: abStyle.selector }]);
    // browser.waitUntil(() => abElement.isExisting(), timoutMillis);
    // assert(abElement.isExisting());

    try {
      browser.waitUntil(() => abElement.isExisting(), timoutMillis);
    } catch (err) {
      console.log('original error:');
      console.log(err);
      throw new Error(`Element "${abElement.stuartname}" not found after ${timoutMillis} ms. Selector: ${abElement.selector}`);
    }
    livy.setMouseoverEventScreenshotFunction(screenshotId);
  }

  static valueEquals(f, value, targetDescription, timoutMillis = defaultAutobotTimeoutMillis) {
    const screenshotId = livy.logAction2([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${targetDescription} `, style: abStyle.object },
      { text: 'equals ', style: abStyle.verb },
      { text: value, style: abStyle.object }]);

    try {
      browser.waitUntil(() => f() === value, timoutMillis);
    } catch (err) {
      console.log('original error:');
      console.log(err);
      throw new Error(`${targetDescription}: Expected:  "${value}". Actual: "${f()}"`);
    }
    livy.setMouseoverEventScreenshotFunction(screenshotId);
  }
}
