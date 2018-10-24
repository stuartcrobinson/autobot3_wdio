// @ts-check
import { AbElement, autobotBrowser, logMessage, Page } from '../../../../../autobot_framework/autobot';

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
        // browser.click('//*[@id="' + id + '"]')
        // browser.keys(we.getAttribute("placeholder"))
      })


  }
}();
