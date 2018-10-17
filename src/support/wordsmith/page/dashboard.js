import { AbElement, Page } from "../../../../autobot_framework/autobot";

export const dashboardPage = new class Dashboard extends Page {

    constructor() {
        super();
        this.newProjectButton = new AbElement('//button[text()="New Project"]').tagAsLoadCriterion();
        this.newProjectDropdown = new AbElement('//button[text()="New Project"]/following-sibling::div[@class="dropdown"]');
        this.createCsvDropdownOption = new AbElement('//a[text()="Create CSV"]');
        this.uploadCsvDropdownOption = new AbElement('//a[text()="Upload CSV"]');
        this.projectsTabLink = new AbElement('//a[text()="Projects"]');
        this.downloadsTabLink = new AbElement('//a[text()="Downloads"]').tagAsLoadCriterion();
        super.nameElements();
    }
}();
