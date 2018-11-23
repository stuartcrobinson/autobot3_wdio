// @ts-check
import { Page } from "../../../../autobot_framework/support/Page";



export const tableauSitePage = new class Site extends Page {
  constructor() {
    super('TODO - whats the url');
    this.defaultSiteOption = this.getChild('//*[text()="Default"]').tagAsLoadCriterion();
    super.nameElements();
  }
}();
