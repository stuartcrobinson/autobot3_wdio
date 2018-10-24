// @ts-check
import { AbElement, Page } from '../../../../autobot_framework/autobot';
import { editorPageToolbar } from './toolbar.comp';

export const editorPage = new class Editor extends Page {
  constructor() {
    super();
    this.toolbar = editorPageToolbar.tagAsLoadCriterion();

    // this.insertDataButton = new AbElement('.btn-insert-data').tagAsLoadCriterion();
    // this.addSynonymButtom = new AbElement('.btn-synonym').tagAsLoadCriterion();
    // this.addBranchButton = new AbElement('.btn-branch').tagAsLoadCriterion();
    // this.moreDropdownButton = new AbElement('.btn-more').tagAsLoadCriterion();

    this.editorTextarea = new AbElement('.editor-textarea').tagAsLoadCriterion();



    // this.toaster_signedOutSuccessfully = toaster.withMessage('Signed out successfully.');
    // this.toaster_invalidEmailOrPwd = toaster.withMessage('Invalid Email or password.');
    super.nameElements();
  }

}();
