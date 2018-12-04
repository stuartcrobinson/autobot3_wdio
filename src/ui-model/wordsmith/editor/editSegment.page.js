// @ts-check
import { WordsmithPage } from '../../../../autobot_framework/support/WordsmithPage';
import { toolbar } from './toolbar.cont';

/** Abstract class */
export class EditSegmentPage extends WordsmithPage {
  /** @param {string} urlPath   */
  constructor(urlPath) {
    super(urlPath);
    if (this.constructor === EditSegmentPage) {
      throw new TypeError('Abstract class cannot be instantiated directly.');
    }

    this.segmentPreview = this.get('.segment-preview').tagAsLoadCriterion();
    this.highlightedPreviewSpan = this.get('.highlight');
    this.deleteButton = this.get('[data-test="close-button"]');
    // this.modalYesButton = this.get('.modal-dialog-content .btn-primary'); // not within the seg editor container

    // note: doneButton and backButton are the same element
    this.doneButton = this.get('.btn-primary').tagAsLoadCriterion();
    this.backButton = this.get('.back-button').tagAsLoadCriterion();
    this.h3 = this.get('h3').tagAsLoadCriterion();
    this.editSegmentPaneHeader = this.get('.segment__header').tagAsLoadCriterion();
    this.toolbar = toolbar;
    super.nameElements();
  }

  scrollUp() {
    this.editSegmentPaneHeader.scroll();
    return this;
  }
}
