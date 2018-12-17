// @ts-check
import { UiElement } from '../../../../../aquifer/UiElement';
import { WordsmithPage } from '../../WordsmithPage';


export const googlePage = new class Google extends WordsmithPage {
  constructor() {
    super();
    this.aboutLink = this.get('//*[text()="About"]');
    this.storeLink = this.get('//*[text()="Store"]');
    super.nameElements();
  }
}();
