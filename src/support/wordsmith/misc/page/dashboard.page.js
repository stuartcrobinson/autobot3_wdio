// @ts-check
import { AbElement, Page } from '../../../../../autobot_framework/autobot';
import Table from '../../table';


class DownloadsTable extends AbElement {

  constructor() {
    super('//div[@class="table-wrapper table-wrapper--search-with-tabs"]');
    this.totalNarrativesHeader = new AbElement('//div[text()="Total Narratives"]').tagAsLoadCriterion();
    // new AbElement('.spinner').waitForNotExist();  //whould 


  }

  //should Table be a comp?  and should all comps have a waitToLoad function?  but how to standardize...
  waitToLoad() {

    new AbElement('//div[text()="Total Narratives"]').waitForExist();

    //not sure if this works or is accurate.  should replace with waitForStableDom() <-- need to write
    new AbElement('.spinner').waitForNotExist();
  }
}


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

    super.nameElements();
  }
}();
