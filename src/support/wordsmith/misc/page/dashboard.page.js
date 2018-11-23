// @ts-check
import Table from '../../table';
import { AbElement } from '../../../../../autobot_framework/support/AbElement';
import { Page } from '../../../../../autobot_framework/support/Page';

export const dashboardPage = new class Dashboard extends Page {
  constructor() {
    super("/dashboard");
    this.newProjectButton = new AbElement('//button[text()="New Project"]').tagAsLoadCriterion();
    this.newProjectDropdown = new AbElement('//button[text()="New Project"]/following-sibling::div[@class="dropdown"]');
    this.createCsvDropdownOption = new AbElement('//a[text()="Create CSV"]');
    this.uploadCsvDropdownOption = new AbElement('//a[text()="Upload CSV"]');
    this.projectsTabLink = new AbElement('//a[text()="Projects"]');
    this.downloadsTabLink = new AbElement('//a[text()="Downloads"]').tagAsLoadCriterion();
    this.table = new Table();
    this.projectsTableBody = new AbElement('tbody');

    super.nameElements();
  }
}();
