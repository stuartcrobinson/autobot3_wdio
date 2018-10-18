// @ts-check
import { AbElement } from '../../../../autobot_framework/autobot';

export const toaster = new class Toaster extends AbElement {
  constructor(message) {
    const container = new AbElement('//div[contains(@class, "loaded-message")]');

    if (message) {
      super(container.getChild(`//*[contains(text(),"${message}")]/..`).selector);
    } else {
      super(container.selector);
    }

    this.xCloseIcon = container.getChild('//i[@title="Dismiss alert"]');
    // console.log("xCloseIcon created! " + this.xCloseIcon)
    this.messageSpan = container.getChild('//span[contains(@class="message__text"]');
    super.nameElements();
  }

  close() {
    // console.log("about to click xCloseIcon! " + this.xCloseIcon)

    this.xCloseIcon.click();
    this.xCloseIcon.waitForNotExist();
  }

  getMessage() {
    return this.messageSpan.getWebElement().getText();
  }


  /**
     * Not supported for messages that contain apostrophes!
     * @param {*} message
     *
     */
  /* eslint class-methods-use-this: "off" */
  withMessage(message) {
    if (message.includes('"') || message.includes("'")) {
      throw new Error('Apostrophes not yet supported.  This sounds like a good job for you.');
    }
    return new Toaster(message);
  }
}();
