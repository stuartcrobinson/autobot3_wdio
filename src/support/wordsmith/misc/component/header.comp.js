// @ts-check
import { AbElement } from '../../../../../autobot_framework/autobot';

export const header = new class HeaderComp extends AbElement {
  constructor() {
    super('header.header');

    this.savedDiv = this.getChild('.header__meta-icon__saved');
    super.nameElements();
  }
}();
