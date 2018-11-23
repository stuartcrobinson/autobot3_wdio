// @ts-check
import { UiAtom } from "../../../../../autobot_framework/support/UiAtom";
import { Page } from "../../../../../autobot_framework/support/Page";
import { UiElement } from "../../../../../autobot_framework/support/UiElement";



export const projectPage = new class Project extends Page {
  constructor() {
    super();
    this.dataIcon = new UiElement('//*[@*="icon--dataset"]').tagAsLoadCriterion();
    this.dataDropdownButton = this.dataIcon.getChild('/../../..//button')
    this.dataDropdownButton_ChangeDataTypes = this.dataDropdownButton.getChild('/..//li[1]')
    this.dataDropdownButton_DownloadDataFile = this.dataDropdownButton.getChild('/..//li[2]')

    /** Only present in projects with no templates. */
    this.createNewTemplateButton = new UiAtom('//*[@*="empty-table"]//button');

    super.nameElements();
  }

}();
