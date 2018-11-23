// @ts-check
import Table from '../../table';
import { UiElement } from '../../../../../autobot_framework/support/UiElement';
import { WordsmithPage } from '../../../../../autobot_framework/support/Page';

export const dashboardPage = new class Dashboard extends WordsmithPage {
  constructor() {
    super("/dashboard");
    this.newProjectButton = new UiElement('//button[text()="New Project"]').tagAsLoadCriterion();
    this.newProjectDropdown = new UiElement('//button[text()="New Project"]/following-sibling::div[@class="dropdown"]');
    this.createCsvDropdownOption = new UiElement('//a[text()="Create CSV"]');
    this.uploadCsvDropdownOption = new UiElement('//a[text()="Upload CSV"]');
    this.projectsTabLink = new UiElement('//a[text()="Projects"]');
    this.downloadsTabLink = new UiElement('//a[text()="Downloads"]').tagAsLoadCriterion();
    this.table = new Table();
    this.projectsTableBody = new UiElement('tbody');

    super.nameElements();
  }
}();
