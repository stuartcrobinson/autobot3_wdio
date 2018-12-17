// @ts-check
import { WordsmithPage } from '../../WordsmithPage';
import { UiElement } from '../../../../../aquifer/UiElement';


export const createAProjectUploadCsvPage = new class CreateAProject extends WordsmithPage {
  constructor() {
    super();
    this.nameYourProjectField = this.get('#name').tagAsLoadCriterion();
    this.fileUploadInput = this.get('#file-upload');
    super.nameElements();
  }

  uploadCsv(filePath) {
    this.fileUploadInput.uploadFile(filePath);
  }
}();
