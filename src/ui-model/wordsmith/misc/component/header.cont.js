// @ts-check
import { UiElement } from '../../../../../autobot_framework/support/UiElement';


export const header = new class HeaderComp extends UiElement {
  constructor() {
    super('header.header');

    this.savedDiv = this.get('.header__meta-icon__saved');
    super.nameElements();
  }
}();
