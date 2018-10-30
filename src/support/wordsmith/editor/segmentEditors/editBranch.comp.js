// @ts-check
import { EditSegmentComp } from '../editSegment.comp';
import { AbElement } from '../../../../../autobot_framework/support/AbElement';

class BranchBox extends AbElement {
  constructor(selector) {
    super(selector);
    this.trashButton = this.getChild('.delete-button');
    this.bulletHandle = this.getChild('.bullet--handle')
    const conditionDiv = this.getChild('.code-wrapper');
    this.conditionTextarea = conditionDiv.getChild('.condition-textarea')
    /** for clicking away from the condition editor. */
    this.conditionLabel = conditionDiv.getChild('.label')
    this.conditionError = conditionDiv.getChild('.error-message')
    this.descriptionSpan = conditionDiv.getChild('.description-textarea span span')

    this.editorInput = this.getChild('.editor-wrapper .public-DraftEditor-content')
    // TODO - incorporate and test these 2:
    // this.addAnotherRuleLink = this.getChild('.insert-button-wrapper > .insert-text')
    // this.OR_link = this.getChild('.insert-wrapper > .insert-or-label')
    this.elipsisDropdown = this.getChild('.more-wrapper > .dropdown');
    this.elipsisDropdown_AddDescription = this.elipsisDropdown.getChild('.dropdown-menu li:nth-of-type(1)');
    this.elipsisDropdown_DuplicateRule = this.elipsisDropdown.getChild('.dropdown-menu li:nth-of-type(2)');
    super.nameElements();
  }
}
export const editBranchComp = new class EditBranchComp extends EditSegmentComp {
  constructor() {
    super();

    this.writeFirstRuleThatIsTrueLink = this.getChild('.branch-logic-summary')
    this.addAnotherRuleLink = this.getChild('div.conditions .insert-button-wrapper > .insert-text').tagAsLoadCriterion();
    this.addTextIfNoRulesAreThereLink = this.getChild('.insert-wrapper span a').tagAsLoadCriterion();
    super.nameElements();
  }

  /**
   * n starts at 1
   * @param {Number} n 
   */
  getNthBranchBox(n) {
    return new BranchBox(`li.condition:nth-of-type(${n})`);
  }
}();