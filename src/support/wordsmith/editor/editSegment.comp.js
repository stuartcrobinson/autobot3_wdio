// @ts-check
import { AbElement } from '../../../../autobot_framework/autobot';

/** Abstract class */
export class EditSegmentComp extends AbElement {
  constructor() {
    super('.narrative--is-segment-selected');
    if (this.constructor === EditSegmentComp) {
      throw new TypeError('Abstract class cannot be instantiated directly.');
    }

    this.segmentPreview = this.getChild('.segment-preview').tagAsLoadCriterion();
    this.highlightedPreviewSpan = this.getChild('.highlight');

    //note: doneButton and backButton are the same element
    this.doneButton = this.getChild('.btn-primary').tagAsLoadCriterion();
    this.backButton = this.getChild('.back-button').tagAsLoadCriterion();
    super.nameElements();
  }
};