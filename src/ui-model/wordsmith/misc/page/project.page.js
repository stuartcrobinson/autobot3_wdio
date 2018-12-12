// @ts-check
import { UiElement } from '../../../../../aquifer/support/UiElement';
import { WordsmithPage } from '../../WordsmithPage';


export const projectPage = new class Project extends WordsmithPage {
  constructor(urlPath) {
    super(urlPath);
    this.dataIcon = this.get('//*[@*="icon--dataset"]').tagAsLoadCriterion();
    this.dataDropdownButton = this.dataIcon.get('/../../..//button');
    this.dataDropdownButton_ChangeDataTypes = this.dataDropdownButton.get('/..//li[1]');
    this.dataDropdownButton_DownloadDataFile = this.dataDropdownButton.get('/..//li[2]');

    /** Only present in projects with no templates. */
    this.createNewTemplateButton = this.get('//*[@*="empty-table"]//button');


    super.nameElements();
  }

  getNthTemplateLink(n) {
    return this.get(`.table-row.clickable:nth-of-type(${n})`).setName(`Template Row ${n}`);
  }
}();
