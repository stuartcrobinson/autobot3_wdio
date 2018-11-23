// @ts-check
import Table from '../../table';
import { UiAtom } from '../../../../../autobot_framework/support/UiAtom';
import { Page } from '../../../../../autobot_framework/support/Page';

export const dashboardPage = new class Dashboard extends Page {
  constructor() {
    super("/dashboard");
    this.newProjectButton = new UiAtom('//button[text()="New Project"]').tagAsLoadCriterion();
    this.newProjectDropdown = new UiAtom('//button[text()="New Project"]/following-sibling::div[@class="dropdown"]');
    this.createCsvDropdownOption = new UiAtom('//a[text()="Create CSV"]');
    this.uploadCsvDropdownOption = new UiAtom('//a[text()="Upload CSV"]');
    this.projectsTabLink = new UiAtom('//a[text()="Projects"]');
    this.downloadsTabLink = new UiAtom('//a[text()="Downloads"]').tagAsLoadCriterion();
    this.table = new Table();
    this.projectsTableBody = new UiAtom('tbody');

    super.nameElements();
  }
}();
