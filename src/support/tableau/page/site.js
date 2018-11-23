// @ts-check
import { UiElement, Page, loadPage } from '../../../../autobot_framework/autobot';

export const tableauSitePage = new class Site extends Page {
  constructor() {
    super();
    this.defaultSiteOption = new UiElement('//*[text()="Default"]').tagAsLoadCriterion();
    super.nameElements();
  }
}();
