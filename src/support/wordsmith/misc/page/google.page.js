// @ts-check
import { Page } from "../../../../../autobot_framework/support/Page";
import { UiAtom } from "../../../../../autobot_framework/support/UiAtom";



export const googlePage = new class Google extends Page {
  constructor() {
    super();
    this.aboutLink = new UiAtom('//*[text()="About"]');
    this.storeLink = new UiAtom('//*[text()="Store"]');
    super.nameElements();
  }
}();
