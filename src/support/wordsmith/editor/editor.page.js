// @ts-check
import { Page } from '../../../../autobot_framework/support/Page';
import { editorPageToolbar } from './toolbar.comp';
import { UiAtom } from '../../../../autobot_framework/support/UiAtom';

export const editorPage = new class Editor extends Page {
  constructor() {
    super();
    this.toolbar = editorPageToolbar.tagAsLoadCriterion();
    this.editor = new UiAtom('.editor-textarea').tagAsLoadCriterion();

    /** Used for waiting for editor to load after closing segment editors. */
    this.editorOnlyElement = new UiAtom('.narrative:not(.narrative--is-segment-selected)').tagAsLoadCriterion();
    super.nameElements();
  }

  segmentWithText(text) {
    return new UiAtom(`//span[@data-text='true' and text()='${text}']`).setName('Segment with text: "' + text + '"')
  }

  getLastSegmentText() {
    const segmentsSpans = this.findWebElements('span[data-text="true"]');
    return segmentsSpans[segmentsSpans.length - 1].getText();
  }

}();
