import { Page } from "../../../../autobot_framework/support/Page";

// @ts-check

export const tableauSitePage = new class Site extends Page {
  constructor() {
    super();
    this.defaultSiteOption = this.get('//*[text()="Default"]').tagAsLoadCriterion();
    super.nameElements();
  }
}();
