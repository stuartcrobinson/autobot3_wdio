// @ts-check
import { UiElement } from '../../../../aquifer/UiElement';
import { WordsmithPage } from '../WordsmithPage';
import { EditorToolbar } from './toolbar.cont';
import { sidebar } from '../misc/component/sideBar.cont';
import { Preview } from './preview.cont';

export const editorPage = new class Editor extends WordsmithPage {
  constructor(urlPath) {
    super(urlPath);
    this.toolbar = new EditorToolbar().tagAsLoadCriterion();
    this.editor = this.get('.editor-textarea').tagAsLoadCriterion();
    this.openPreviewButton = this.get('.btn--editor-root--preview');
    this.openToolsButton = this.get('.btn--editor-root--toolpane');
    this.previewPane = new Preview();
    this.sidebar = sidebar;

    /** Used for waiting for editor to load after closing segment editors. */
    this.editorOnlyElement = this.get('.narrative:not(.narrative--is-segment-selected)').tagAsLoadCriterion();
    super.nameElements();
  }

  segmentWithText(text) {
    return new UiElement(`//span[@data-text='true' and text()='${text}']`).setName(`Segment with text: "${text}"`);
  }

  invalidSegmentWithText(text) {
    return new UiElement(`//span[@data-text='true' and text()='${text}']/../../../*[contains(@class, 'err')]`)
      .setName(`Invalid segment with text: "${text}"`);
  }

  getLastSegmentText() {
    const segmentsSpans = this.findWebElements('span[data-text="true"]');
    return segmentsSpans[segmentsSpans.length - 1].getText();
  }
}();
