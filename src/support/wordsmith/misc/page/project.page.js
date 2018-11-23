// @ts-check
import { UiElement } from "../../../../../autobot_framework/support/UiElement";
import { WordsmithPage } from "../../../../../autobot_framework/support/Page";



export const projectPage = new class Project extends WordsmithPage {
  constructor() {
    super();
    this.dataIcon = new UiElement('//*[@*="icon--dataset"]').tagAsLoadCriterion();
    this.dataDropdownButton = this.dataIcon.getChild('/../../..//button')
    this.dataDropdownButton_ChangeDataTypes = this.dataDropdownButton.getChild('/..//li[1]')
    this.dataDropdownButton_DownloadDataFile = this.dataDropdownButton.getChild('/..//li[2]')

    /** Only present in projects with no templates. */
    this.createNewTemplateButton = new UiElement('//*[@*="empty-table"]//button');

    super.nameElements();
  }

}();
