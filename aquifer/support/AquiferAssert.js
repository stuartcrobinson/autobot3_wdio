// @ts-check
import { log } from './AquiferLog';

const defaultAutobotTimeoutMillis = 5000;

export class AquiferAssert {
  static visualTestsPassed() {
    if (log.aVisualTestFailed) {
      log.aVisualTestFailed = false;
      throw new Error('A visual test failed.');
    }
  }

  static valueEquals(f, value, targetDescription, timoutMillis = defaultAutobotTimeoutMillis) {
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
