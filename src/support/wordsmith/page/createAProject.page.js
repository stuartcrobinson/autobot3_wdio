// @ts-check
import { AbElement, Page } from '../../../../autobot_framework/autobot';

export const createAProjectPage = new class CreateAProject extends Page {
  constructor() {
    super();
    this.createProjectButton = new AbElement('//button[text()="Create Project"]').tagAsLoadCriterion();
    super.nameElements();
  }
}();
