// @ts-check
import { UiElement } from '../../../../../aquifer/UiElement';


export const header = new class HeaderComp extends UiElement {
  constructor() {
    super('header.header');

    this.savedDiv = this.get('.header__meta-icon__saved');
    super.nameElements();
  }
}();
