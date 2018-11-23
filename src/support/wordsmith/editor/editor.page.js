// @ts-check
import { WordsmithPage } from '../../../../autobot_framework/support/WordsmithPage';
import { editorPageToolbar } from './toolbar.comp';
import { UiElement } from '../../../../autobot_framework/support/UiElement';

export const editorPage = new class Editor extends WordsmithPage {
  constructor() {
    super();
    this.toolbar = editorPageToolbar.tagAsLoadCriterion();
    this.editor = new UiElement('.editor-textarea').tagAsLoadCriterion();

    /** Used for waiting for editor to load after closing segment editors. */
    this.editorOnlyElement = new UiElement('.narrative:not(.narrative--is-segment-selected)').tagAsLoadCriterion();
    super.nameElements();
  }

  segmentWithText(text) {
    return new UiElement(`//span[@data-text='true' and text()='${text}']`).setName('Segment with text: "' + text + '"')
  }

  getLastSegmentText() {
    const segmentsSpans = this.findWebElements('span[data-text="true"]');
    return segmentsSpans[segmentsSpans.length - 1].getText();
  }

}();
