// @ts-check
import { Page } from "../../../../../autobot_framework/support/Page";
import { AbElement } from "../../../../../autobot_framework/support/AbElement";



export const googlePage = new class Google extends Page {
  constructor() {
    super();
    this.aboutLink = new AbElement('//*[text()="About"]');
    this.storeLink = new AbElement('//*[text()="Store"]');
    super.nameElements();
  }
}();
