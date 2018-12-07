// @ts-check
import { WordsmithPage } from '../../WordsmithPage';
import { UiElement } from '../../../../../aquifer/support/UiElement';


export const createAProjectUploadCsvPage = new class CreateAProject extends WordsmithPage {
  constructor() {
    super();
    this.nameYourProjectField = new UiElement('#name').tagAsLoadCriterion();
    this.fileUploadInput = new UiElement('#file-upload');
    super.nameElements();
  }

  uploadCsv(filePath) {
    this.fileUploadInput.uploadFile(filePath);
  }
}();
