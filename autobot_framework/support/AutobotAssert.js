// @ts-check
import { abStyle, livy } from '../autobot';
/* eslint no-unused-vars: "off" */
import { UiElement } from './UiElement';


/** ****************************** assert ************************************* */

const defaultAutobotTimeoutMillis = 5000;
export class AutobotAssert {
// TODO it would be cleaner to wrap all these in a function that accepted the main assert code as a function and
  // did the logging stuff b4 and after

  // /**
  //  *
  //  * @param {UiElement} uiElement
  //  * @param {String} expected
  //  * @param {Number} timoutMillis
  //  */
  // static elementText(uiElement, expected, timoutMillis = defaultAutobotTimeoutMillis) {
  //   const screenshotId = livy.logAction2([
  //     { text: 'Assert ', style: abStyle.verb },
  //     { text: `${uiElement.stuartname}`, style: abStyle.object },
  //     { text: "'s text is ", style: abStyle.filler },
  //     { text: expected, style: abStyle.object },
  //     { text: ` ${uiElement.selector}`, style: abStyle.selector }]);

  //   try {
  //     uiElement.waitForExist();
  //     browser.waitUntil(() => uiElement.getWebElement().getText() === expected, timoutMillis);
  //   } catch (err) {
  //     console.log('original error:');
  //     console.log(err);
  //     throw new Error(`Element "${uiElement.stuartname}"'s text is "${uiElement.getWebElement().getText()}" after ${timoutMillis} ms.  Expected: "${expected}". Selector: ${uiElement.selector}`);
  //   }
  //   livy.setMouseoverEventScreenshotFunction(screenshotId);
  // }

  // /**
  //  *
  //  * @param {UiElement} uiElement
  //  * @param {Number} timoutMillis
  //  */
  // static elementExists(uiElement, timoutMillis = defaultAutobotTimeoutMillis) {
  //   const screenshotId = livy.logAction2([
  //     { text: 'Assert ', style: abStyle.verb },
  //     { text: `${uiElement.stuartname} `, style: abStyle.object },
  //     { text: 'exists ', style: abStyle.verb },
  //     { text: uiElement.selector, style: abStyle.selector }]);
  //   // browser.waitUntil(() => uiElement.isExisting(), timoutMillis);
  //   // assert(uiElement.isExisting());

  //   try {
  //     browser.waitUntil(() => uiElement.isExisting(), timoutMillis);
  //   } catch (err) {
  //     console.log('original error:');
  //     console.log(err);
  //     throw new Error(`Element "${uiElement.stuartname}" not found after ${timoutMillis} ms. Selector: ${uiElement.selector}`);
  //   }
  //   livy.setMouseoverEventScreenshotFunction(screenshotId);
  // }

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
