import { UiElement } from "../../../../autobot_framework/support/UiElement";

// @ts-check

/** Abstract class */
export class EditSegmentComp extends UiElement {
  constructor() {
    super('.narrative--is-segment-selected');
    if (this.constructor === EditSegmentComp) {
      throw new TypeError('Abstract class cannot be instantiated directly.');
    }

    this.segmentPreview = this.get('.segment-preview').tagAsLoadCriterion();
    this.highlightedPreviewSpan = this.get('.highlight');

    //note: doneButton and backButton are the same element
    this.doneButton = this.get('.btn-primary').tagAsLoadCriterion();
    this.backButton = this.get('.back-button').tagAsLoadCriterion();
    super.nameElements();
  }
};