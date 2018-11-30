// @ts-check
/* eslint no-unused-vars: "off" */
import { UiElement } from './UiElement';
import { livy } from './Livy';


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
  //     { text: 'Assert ', style: livy.style.verb },
  //     { text: `${uiElement.stuartname}`, style: livy.style.object },
  //     { text: "'s text is ", style: livy.style.filler },
  //     { text: expected, style: livy.style.object },
  //     { text: ` ${uiElement.selector}`, style: livy.style.selector }]);

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
  //     { text: 'Assert ', style: livy.style.verb },
  //     { text: `${uiElement.stuartname} `, style: livy.style.object },
  //     { text: 'exists ', style: livy.style.verb },
  //     { text: uiElement.selector, style: livy.style.selector }]);
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
      { text: '🤔 Assert ', style: livy.style.verb },
      { text: `${targetDescription} `, style: livy.style.object },
      { text: 'equals ', style: livy.style.verb },
      { text: value, style: livy.style.object }]);

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
