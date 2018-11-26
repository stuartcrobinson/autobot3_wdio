import { abStyle, autobotBrowser, livy } from '../../../../../autobot_framework/autobot';
import { WordsmithPage } from '../../../../../autobot_framework/support/WordsmithPage';

export const createAProjectPage = new class CreateAProject extends WordsmithPage {
  constructor() {
    super();
    this.dataInputTable = this.get('.wizard-table-wrapper').tagAsLoadCriterion();
    this.createProjectButton = this.get('//button[text()="Create Project"]').tagAsLoadCriterion();
    super.nameElements();
  }

  populateTable() {

    livy.logScreenshottedAction([{ text: 'Populate wizard table.', style: abStyle.filler }]);

    this.dataInputTable
      .getChildren('.ws-input')
      .forEach(we => {

        const id = we.getAttribute("id")

        this.get('//*[@id="' + id + '"]').click(false);

        autobotBrowser.keys(we.getAttribute("placeholder"), false)
      })
  }
}();
