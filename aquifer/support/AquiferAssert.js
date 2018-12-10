// @ts-check
import { livy } from './Livy';

const defaultAutobotTimeoutMillis = 5000;

export class AquiferAssert {
  static visualTestsPassed() {
    if (livy.aVisualTestFailed) {
      livy.aVisualTestFailed = false;
      throw new Error('A visual test failed.');
    }
  }

  static valueEquals(f, value, targetDescription, timoutMillis = defaultAutobotTimeoutMillis) {
    const screenshotId = livy.logRichMessages([
      { text: '🤔  ', style: livy.style.emoji },
      { text: 'Assert ', style: livy.style.verb },
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
    livy.saveScreenshot(screenshotId);
  }
}
