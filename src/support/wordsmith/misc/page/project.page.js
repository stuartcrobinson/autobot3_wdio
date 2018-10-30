// @ts-check
import { AbElement } from "../../../../../autobot_framework/support/AbElement";
import { Page } from "../../../../../autobot_framework/support/Page";



export const projectPage = new class Project extends Page {
  constructor() {
    super();
    this.dataIcon = new AbElement('//*[@*="icon--dataset"]').tagAsLoadCriterion();
    this.dataDropdownButton = this.dataIcon.getChild('/../../..//button')
    this.dataDropdownButton_ChangeDataTypes = this.dataDropdownButton.getChild('/..//li[1]')
    this.dataDropdownButton_DownloadDataFile = this.dataDropdownButton.getChild('/..//li[2]')

    /** Only present in projects with no templates. */
    this.createNewTemplateButton = new AbElement('//*[@*="empty-table"]//button');

    super.nameElements();
  }

}();
