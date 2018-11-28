// @ts-check
import { WordsmithPage } from '../../../../../autobot_framework/support/WordsmithPage';
import { Table } from '../../table';
import { sidebar } from '../component/sideBar.cont';

export const dashboardPage = new class Dashboard extends WordsmithPage {
  constructor() {
    super("/dashboard");
    this.newProjectButton = this.get('//button[text()="New Project"]').tagAsLoadCriterion();
    this.newProjectDropdown = this.get('//button[text()="New Project"]/following-sibling::div[@class="dropdown"]');
    this.createCsvDropdownOption = this.get('//a[text()="Create CSV"]');
    this.uploadCsvDropdownOption = this.get('//a[text()="Upload CSV"]');
    this.projectsTabLink = this.get('//a[text()="Projects"]');
    this.downloadsTabLink = this.get('//a[text()="Downloads"]').tagAsLoadCriterion();
    this.paginationContainer = this.get('//div[@class="pagination-container"]').tagAsLoadCriterion();

    this.table = new Table();
    this.sidebar = sidebar;

    super.nameElements();
  }
}();
