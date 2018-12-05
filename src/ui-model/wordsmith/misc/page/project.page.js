// @ts-check
import { UiElement } from '../../../../../aqua/support/UiElement';
import { WordsmithPage } from '../../../../../aqua/support/WordsmithPage';


export const projectPage = new class Project extends WordsmithPage {
  constructor(urlPath) {
    super(urlPath);
    this.dataIcon = new UiElement('//*[@*="icon--dataset"]').tagAsLoadCriterion();
    this.dataDropdownButton = this.dataIcon.get('/../../..//button');
    this.dataDropdownButton_ChangeDataTypes = this.dataDropdownButton.get('/..//li[1]');
    this.dataDropdownButton_DownloadDataFile = this.dataDropdownButton.get('/..//li[2]');

    /** Only present in projects with no templates. */
    this.createNewTemplateButton = new UiElement('//*[@*="empty-table"]//button');


    super.nameElements();
  }

  getNthTemplateLink(n) {
    return this.get(`.table-row.clickable:nth-of-type(${n})`).setName(`Template Row ${n}`);
  }
}();
