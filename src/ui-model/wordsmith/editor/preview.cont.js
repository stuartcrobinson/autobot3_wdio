// @ts-check
import { UiElement } from '../../../../aqua/support/UiElement';

export class Preview extends UiElement {
  constructor() {
    super('//div[@data-test="toolpane-right"]');
    this.closeButton = this.get('//*[@data-test="close-button"]').tagAsLoadCriterion();
    this.narrativeOutput = this.get('//*[@data-test="preview-narrative-output"]').tagAsLoadCriterion();
    this.refreshButton = this.get('//button').tagAsLoadCriterion();
    // this.insertDataButton = this.get('.btn-insert-data').tagAsLoadCriterion();
    // this.addSynonymButton = this.get('.btn-synonym').tagAsLoadCriterion();
    // this.addBranchButton = this.get('.btn-branch').tagAsLoadCriterion();
    // this.moreDropdownButton = this.get('.btn-more').tagAsLoadCriterion();
    // this.insertDataDropdown = new InsertDataDropdown();
    super.nameElements();
  }
}
