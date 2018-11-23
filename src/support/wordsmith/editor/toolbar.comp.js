import { UiAtom } from "../../../../../autobot3_wdio/autobot_framework/support/UiAtom";

// @ts-check

class InsertDataDropdown_SegmentListOption extends UiAtom {
  constructor(n) {
    super(`.segment-list li:nth-of-type(${n})`);
    this.datavarNameDiv = this.getChild('.name')
    this.datavarValuesDiv = this.getChild('.name .examples')
  }
}

class InsertDataDropdown extends UiAtom {
  constructor() {
    super('.ws-insert-segment-modal-container--open');
    this.createFormulaButton = this.getChild('.padding-all button:nth-of-type(1)').tagAsLoadCriterion();
    this.addDataButton = this.getChild('.padding-all button:nth-of-type(2)').tagAsLoadCriterion();
    this.xCloseButton = this.getChild('.delete-button').tagAsLoadCriterion();
    this.searchInput = this.getChild('.search-input').tagAsLoadCriterion();
    this.option1 = this.getChild(new InsertDataDropdown_SegmentListOption(1).selector);
    this.option2 = this.getChild(new InsertDataDropdown_SegmentListOption(2).selector);
    this.option3 = this.getChild(new InsertDataDropdown_SegmentListOption(3).selector);
    this.option4 = this.getChild(new InsertDataDropdown_SegmentListOption(4).selector);
    this.option5 = this.getChild(new InsertDataDropdown_SegmentListOption(5).selector);
    this.option6 = this.getChild(new InsertDataDropdown_SegmentListOption(6).selector);
    this.option7 = this.getChild(new InsertDataDropdown_SegmentListOption(7).selector);
    super.nameElements();
  }
}

export const editorPageToolbar = new class EditorToolbar extends UiAtom {
  constructor() {
    super('.toolbar__list');
    this.insertDataButton = this.getChild('.btn-insert-data').tagAsLoadCriterion();
    this.addSynonymButton = this.getChild('.btn-synonym').tagAsLoadCriterion();
    this.addBranchButton = this.getChild('.btn-branch').tagAsLoadCriterion();
    this.moreDropdownButton = this.getChild('.btn-more').tagAsLoadCriterion();
    this.insertDataDropdown = new InsertDataDropdown();
    super.nameElements();
  }
}();
