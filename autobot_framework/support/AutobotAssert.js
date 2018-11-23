// @ts-check
import { abStyle, livy } from '../autobot';
/* eslint no-unused-vars: "off" */
import { UiAtom } from './UiAtom';


/** ****************************** assert ************************************* */

const defaultAutobotTimeoutMillis = 5000;
export class AutobotAssert {
  // TODO it would be cleaner to wrap all these in a function that accepted the main assert code as a function and
  // did the logging stuff b4 and after

  /**
   *
   * @param {UiAtom} uiAtom
   * @param {String} expected
   * @param {Number} timoutMillis
   */
  static elementText(uiAtom, expected, timoutMillis = defaultAutobotTimeoutMillis) {
    const screenshotId = livy.logAction2([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${uiAtom.stuartname}`, style: abStyle.object },
      { text: "'s text is ", style: abStyle.filler },
      { text: expected, style: abStyle.object },
      { text: ` ${uiAtom.selector}`, style: abStyle.selector }]);

    try {
      uiAtom.waitForExist();
      browser.waitUntil(() => uiAtom.getWebElement().getText() === expected, timoutMillis);
    } catch (err) {
      console.log('original error:');
      console.log(err);
      throw new Error(`Element "${uiAtom.stuartname}"'s text is "${uiAtom.getWebElement().getText()}" after ${timoutMillis} ms.  Expected: "${expected}". Selector: ${uiAtom.selector}`);
    }
    livy.setMouseoverEventScreenshotFunction(screenshotId);
  }

  /**
   *
   * @param {UiAtom} uiAtom
   * @param {Number} timoutMillis
   */
  static elementExists(uiAtom, timoutMillis = defaultAutobotTimeoutMillis) {
    const screenshotId = livy.logAction2([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${uiAtom.stuartname} `, style: abStyle.object },
      { text: 'exists ', style: abStyle.verb },
      { text: uiAtom.selector, style: abStyle.selector }]);
    // browser.waitUntil(() => uiAtom.isExisting(), timoutMillis);
    // assert(uiAtom.isExisting());

    try {
      browser.waitUntil(() => uiAtom.isExisting(), timoutMillis);
    } catch (err) {
      console.log('original error:');
      console.log(err);
      throw new Error(`Element "${uiAtom.stuartname}" not found after ${timoutMillis} ms. Selector: ${uiAtom.selector}`);
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
