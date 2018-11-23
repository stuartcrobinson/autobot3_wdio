// @ts-check
import { UiElement } from "../../../../../autobot_framework/support/UiElement";



export const toast = new class toast extends UiElement {
  constructor(message) {
    const container = new UiElement('//div[contains(@class, "loaded-message")]');

    if (message) {
      super(container.getChild(`//*[contains(text(),"${message}")]/..`).selector);
    } else {
      super(container.selector);
    }

    this.xCloseIcon = container.getChild('//i[@title="Dismiss alert"]');
    this.messageSpan = container.getChild('//span[contains(@class="message__text"]');
    super.nameElements();
  }

  close() {
    this.waitForExist();
    this.xCloseIcon.click();
    this.xCloseIcon.waitForNotExist();
    this.waitForNotExist();
  }

  getMessage() {
    return this.messageSpan.getWebElement().getText();
  }


  /**
     * Not supported for messages that contain apostrophes!
     * @param {String} message
     *
     */
  /* eslint class-methods-use-this: "off" */
  withMessage(message) {
    if (message.includes('"') || message.includes("'")) {
      throw new Error('Apostrophes not yet supported.  This sounds like a good job for you.');
    }
    return new toast(message);
  }
}();
