// @ts-check
import { autobotBrowser, logMessage } from '../../../../../autobot_framework/autobot';
import { AbElement } from '../../../../../autobot_framework/support/AbElement';
import { Page } from '../../../../../autobot_framework/support/Page';

export const createAProjectPage = new class CreateAProject extends Page {
  constructor() {
    super();
    this.dataInputTable = new AbElement('.wizard-table-wrapper').tagAsLoadCriterion();
    this.createProjectButton = new AbElement('//button[text()="Create Project"]').tagAsLoadCriterion();
    super.nameElements();
  }

  populateTable() {

    logMessage('Populate wizard table.');

    this.dataInputTable
      .getChildren('.ws-input')
      .forEach((we, index) => {

        const id = we.getAttribute("id")

        new AbElement('//*[@id="' + id + '"]').click(false);

        autobotBrowser.keys(we.getAttribute("placeholder"), false)
      })


  }
}();
