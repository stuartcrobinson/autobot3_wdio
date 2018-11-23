// @ts-check
import { Page } from "../../../../../autobot_framework/support/Page";
import { UiAtom } from "../../../../../autobot_framework/support/UiAtom";



export const createAProjectUploadCsvPage = new class CreateAProject extends Page {
  constructor() {
    super();
    this.nameYourProjectField = new UiAtom('#name').tagAsLoadCriterion();
    this.fileUploadInput = new UiAtom('#file-upload');
    super.nameElements();
  }

  uploadCsv(filePath) {
    this.fileUploadInput.uploadFile(filePath);
  }

}();
