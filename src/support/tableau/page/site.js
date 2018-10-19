// @ts-check
import { AbElement, Page, loadPage } from '../../../../autobot_framework/autobot';

export const tableauSitePage = new class Site extends Page {
  constructor() {
    super();
    this.defaultSiteOption = new AbElement('//*[text()="Default"]').tagAsLoadCriterion();
    super.nameElements();
  }
}();
