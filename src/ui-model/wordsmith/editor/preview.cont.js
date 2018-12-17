// @ts-check
import { UiElement } from '../../../../aquifer/UiElement';

export class Preview extends UiElement {
  constructor() {
    super('//div[@data-test="toolpane-right"]');
    this.closeButton = this.get('//*[@data-test="close-button"]').tagAsLoadCriterion();
    this.narrativeOutput = this.get('//*[@data-test="preview-narrative-output"]').tagAsLoadCriterion();
    this.refreshButton = this.get('//button').tagAsLoadCriterion();
    super.nameElements();
  }
}
