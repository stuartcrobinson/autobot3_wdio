// @ts-check
import { AbElement, Page } from '../../../../autobot_framework/autobot';

export const createAProjectUploadCsvPage = new class CreateAProject extends Page {
  constructor() {
    super();
    this.nameYourProjectField = new AbElement('#name').tagAsLoadCriterion();
    this.fileUploadInput = new AbElement('#file-upload');
    super.nameElements();
  }

  uploadCsv(filePath) {
    this.fileUploadInput.uploadFile(filePath);
  }

}();
