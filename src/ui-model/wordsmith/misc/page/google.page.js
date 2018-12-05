// @ts-check
import { WordsmithPage } from '../../../../../aqua/support/WordsmithPage';
import { UiElement } from '../../../../../aqua/support/UiElement';


export const googlePage = new class Google extends WordsmithPage {
  constructor() {
    super();
    this.aboutLink = new UiElement('//*[text()="About"]');
    this.storeLink = new UiElement('//*[text()="Store"]');
    super.nameElements();
  }
}();
