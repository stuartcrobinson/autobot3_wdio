// @ts-check
import { UiElement } from '../../../../autobot_framework/support/UiElement';

// @ts-check

class InsertDataDropdown_SegmentListOption extends UiElement {
  constructor(n) {
    super(`.segment-list li:nth-of-type(${n})`);
    this.datavarNameDiv = this.get('.name');
    this.datavarValuesDiv = this.get('.name .examples');
  }
}

class InsertDataDropdown extends UiElement {
  constructor() {
    super('.ws-insert-segment-modal-container--open');
    this.createFormulaButton = this.get('.padding-all button:nth-of-type(1)').tagAsLoadCriterion();
    this.addDataButton = this.get('.padding-all button:nth-of-type(2)').tagAsLoadCriterion();
    this.xCloseButton = this.get('.delete-button').tagAsLoadCriterion();
    this.searchInput = this.get('.search-input').tagAsLoadCriterion();
    this.option1 = this.get(new InsertDataDropdown_SegmentListOption(1).selector);
    this.option2 = this.get(new InsertDataDropdown_SegmentListOption(2).selector);
    this.option3 = this.get(new InsertDataDropdown_SegmentListOption(3).selector);
    this.option4 = this.get(new InsertDataDropdown_SegmentListOption(4).selector);
    this.option5 = this.get(new InsertDataDropdown_SegmentListOption(5).selector);
    this.option6 = this.get(new InsertDataDropdown_SegmentListOption(6).selector);
    this.option7 = this.get(new InsertDataDropdown_SegmentListOption(7).selector);
    super.nameElements();
  }
}

export const toolbar = new class EditorToolbar extends UiElement {
  constructor() {
    super('.toolbar__list');
    this.insertDataButton = this.get('.btn-insert-data').tagAsLoadCriterion();
    this.addSynonymButton = this.get('.btn-synonym').tagAsLoadCriterion();
    this.addBranchButton = this.get('.btn-branch').tagAsLoadCriterion();
    this.moreDropdownButton = this.get('.btn-more').tagAsLoadCriterion();
    this.insertDataDropdown = new InsertDataDropdown();
    super.nameElements();
  }
}();
