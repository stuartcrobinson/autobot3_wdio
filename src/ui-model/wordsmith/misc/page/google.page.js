// @ts-check
import { UiElement } from '../../../../../aqua/support/UiElement';
import { WordsmithPage } from '../../WordsmithPage';


export const googlePage = new class Google extends WordsmithPage {
  constructor() {
    super();
    this.aboutLink = new UiElement('//*[text()="About"]');
    this.storeLink = new UiElement('//*[text()="Store"]');
    super.nameElements();
  }
}();
