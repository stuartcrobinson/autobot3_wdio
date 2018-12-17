// @ts-check
import { UiElement } from '../../../aquifer/UiElement';


/*
toggle code 10/30/2018:
<div class="input-container">
  <label class="mdl-switch mdl-js-switch is-upgraded is-checked" for="ordinal" data-upgraded=",MaterialSwitchd">
    <input id="ordinal" name="ordinal" type="checkbox" class="mdl-switch__input">
      <span class="mdl-switch__label">Ordinal ending (1st, 2nd, 3rd)</span>
      <div class="mdl-switch__track"></div>
      <div class="mdl-switch__thumb">
        <span class="mdl-switch__focus-helper"></span>
      </div>
  </label>
</div>
*/

/**
 * Modeling this, I think: https://getmdl.io/components/#toggles-section/switch
 */
export class Toggle extends UiElement {
  /**
   * Toggle selector is the toggle label.  This changes depending on state (on or off).
   *
   * This only works for toggles where the label class includes "is-checked" when checked.  Works for data format editors, but not for Review page.
   * @param {String} id
   */
  constructor(id) {
    super(`[for=${id}]`);
  }

  isOn() {
    return String(this.getWebElement().getAttribute('class')).includes('is-checked');
  }

  turnOn() {
    if (this.isOn()) {
      return;
    }
    this.click_waitForChange();
    browser.waitUntil(() => this.isOn());
  }

  turnOff() {
    if (!this.isOn()) {
      return;
    }
    this.click_waitForChange();
    browser.waitUntil(() => !this.isOn());
  }
}
