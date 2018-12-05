// @ts-check
import { Page } from '../../../../aqua/support/Page';

// @ts-check

export const tableauSitePage = new class Site extends Page {
  constructor() {
    super();
    this.defaultSiteOption = this.get('//*[text()="Default"]').tagAsLoadCriterion();
    super.nameElements();
  }
}();
