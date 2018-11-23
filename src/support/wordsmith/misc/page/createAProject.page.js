import { autobotBrowser, logMessage } from '../../../../../autobot_framework/autobot';
// import { autobotBrowser, logMessage } from 'autobot_framework';

import { UiElement } from '../../../../../autobot_framework/support/UiElement';
// import { UiElement } from 'support/UiElement';
import { WordsmithPage } from '../../../../../autobot_framework/support/Page';

export const createAProjectPage = new class CreateAProject extends WordsmithPage {
  constructor() {
    super();
    this.dataInputTable = new UiElement('.wizard-table-wrapper').tagAsLoadCriterion();
    this.createProjectButton = new UiElement('//button[text()="Create Project"]').tagAsLoadCriterion();
    super.nameElements();
  }

  populateTable() {

    logMessage('Populate wizard table.');

    this.dataInputTable
      .getChildren('.ws-input')
      .forEach((we, index) => {

        const id = we.getAttribute("id")

        new UiElement('//*[@id="' + id + '"]').click(false);

        autobotBrowser.keys(we.getAttribute("placeholder"), false)
      })


  }
}();
