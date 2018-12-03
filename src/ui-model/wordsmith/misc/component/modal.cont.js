// @ts-check
import { UiElement } from '../../../../../autobot_framework/support/UiElement';

export const modal = new class Modal extends UiElement {
  constructor() {
    super('.ws-modal');
    this.yesButton = this.get('.modal-dialog-content .btn-primary').tagAsLoadCriterion();
    super.nameElements();
  }
}();
