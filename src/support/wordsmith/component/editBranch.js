// @ts-check
import { AbElement } from '../../../../autobot_framework/autobot';

export const toaster = new class Toaster extends AbElement {
  constructor(message) {
    const container = new AbElement('//div[contains(@class, "loaded-message")]');

    this.xCloseIcon = container.getChild('//i[@title="Dismiss alert"]');
    // console.log("xCloseIcon created! " + this.xCloseIcon)
    this.messageSpan = container.getChild('//span[contains(@class="message__text"]');
    super.nameElements();
  }
}();
