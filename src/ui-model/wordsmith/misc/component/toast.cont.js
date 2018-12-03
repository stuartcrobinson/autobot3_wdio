// @ts-check
import { UiElement } from '../../../../../autobot_framework/support/UiElement';


export const toast = new class Toast extends UiElement {
  constructor(message) {
    const container = new UiElement('//div[contains(@class, "loaded-message")]');

    if (message) {
      super(container.get(`//*[contains(text(),"${message}")]/..`).selector);
    } else {
      super(container.selector);
    }

    this.xCloseIcon = container.get('//i[@title="Dismiss alert"]');
    this.messageSpan = container.get('//span[contains(@class="message__text"]');
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
    return new Toast(message);
  }
}();
