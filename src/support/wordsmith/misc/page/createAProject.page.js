import { autobotBrowser, logMessage } from '../../../../../autobot_framework/autobot';
// import { autobotBrowser, logMessage } from 'autobot_framework';

import { UiAtom } from '../../../../../autobot_framework/support/UiAtom';
// import { UiAtom } from 'support/UiAtom';
import { Page } from '../../../../../autobot_framework/support/Page';

export const createAProjectPage = new class CreateAProject extends Page {
  constructor() {
    super();
    this.dataInputTable = new UiAtom('.wizard-table-wrapper').tagAsLoadCriterion();
    this.createProjectButton = new UiAtom('//button[text()="Create Project"]').tagAsLoadCriterion();
    super.nameElements();
  }

  populateTable() {

    logMessage('Populate wizard table.');

    this.dataInputTable
      .getChildren('.ws-input')
      .forEach((we, index) => {

        const id = we.getAttribute("id")

        new UiAtom('//*[@id="' + id + '"]').click(false);

        autobotBrowser.keys(we.getAttribute("placeholder"), false)
      })


  }
}();
