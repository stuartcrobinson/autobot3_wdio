// @ts-check
import { WordsmithPage } from '../../WordsmithPage';
import { log } from '../../../../../aquifer/AquiferLog';

export const createAProjectPage = new class CreateAProject extends WordsmithPage {
  constructor(urlPath) {
    super(urlPath);
    this.dataInputTable = this.get('.wizard-table-wrapper').tagAsLoadCriterion();
    this.createProjectButton = this.get('//button[text()="Create Project"]').tagAsLoadCriterion();
    super.nameElements();
  }

  populateTable() {
    log.logRichMessagesWithScreenshot([
      { text: '🧙  ', style: log.style.emoji },
      { text: 'Populate wizard table.', style: log.style.filler },
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
