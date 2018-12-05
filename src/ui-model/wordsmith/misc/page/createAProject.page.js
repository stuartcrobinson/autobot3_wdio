// @ts-check
import { WordsmithPage } from '../../../../../aqua/support/WordsmithPage';
import { livy } from '../../../../../aqua/support/Livy';

export const createAProjectPage = new class CreateAProject extends WordsmithPage {
  constructor(urlPath) {
    super(urlPath);
    this.dataInputTable = this.get('.wizard-table-wrapper').tagAsLoadCriterion();
    this.createProjectButton = this.get('//button[text()="Create Project"]').tagAsLoadCriterion();
    super.nameElements();
  }

  populateTable() {
    livy.logScreenshottedAction([
      { text: '🧙  ', style: livy.style.emoji },
      { text: 'Populate wizard table.', style: livy.style.filler },
    ]);

    this.dataInputTable
      .getChildren('.ws-input')
      .forEach((we) => {
        const id = we.getAttribute('id');

        this.get(`//*[@id="${id}"]`).click(false);

        this.keys(we.getAttribute('placeholder'), 1, false);
      });
  }
}();
