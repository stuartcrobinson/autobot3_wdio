// @ts-check
import { log, A_VISUAL_TEST_FAILED } from './AquiferLog';

const timeout = require('../wdio.conf').config.waitforTimeout;

export class AquiferAssert {
  static visualTestsPassed() {
    if (log.aVisualTestFailed) {
      log.aVisualTestFailed = false;
      throw new Error(A_VISUAL_TEST_FAILED);
    }
  }

  static valueEquals(f, value, targetDescription, timoutMillis = timeout) {
    const screenshotId = log.logRichMessages([
      { text: '🤔  ', style: log.style.emoji },
      { text: 'Assert ', style: log.style.verb },
      { text: `${targetDescription} `, style: log.style.object },
      { text: 'equals ', style: log.style.verb },
      { text: value, style: log.style.object }]);

    try {
      browser.waitUntil(() => f() === value, timoutMillis);
    } catch (err) {
      console.log('original error:');
      console.log(err);
      throw new Error(`${targetDescription}: Expected:  "${value}". Actual: "${f()}"`);
    }
    log.saveScreenshot(screenshotId);
  }
}
