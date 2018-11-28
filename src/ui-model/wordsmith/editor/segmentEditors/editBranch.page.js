// @ts-check
import { EditSegmentPage } from '../editSegment.page';
import { UiElement } from '../../../../../autobot_framework/support/UiElement';

class BranchBox extends UiElement {
  constructor(selector) {
    super(selector);
    this.trashButton = this.get('.delete-button');
    this.bulletHandle = this.get('.bullet--handle')
    const conditionDiv = this.get('.code-wrapper');
    this.conditionTextarea = conditionDiv.get('.condition-textarea')
    /** for clicking away from the condition editor. */
    this.conditionLabel = conditionDiv.get('.label')
    this.conditionError = conditionDiv.get('.error-message')
    this.descriptionSpan = conditionDiv.get('.description-textarea span span')

    this.editorInput = this.get('.editor-wrapper .public-DraftEditor-content')
    // TODO - incorporate and test these 2:
    // this.addAnotherRuleLink = this.getChild('.insert-button-wrapper > .insert-text')
    // this.OR_link = this.getChild('.insert-wrapper > .insert-or-label')
    this.elipsisDropdown = this.get('.more-wrapper > .dropdown');
    this.elipsisDropdown_AddDescription = this.elipsisDropdown.get('.dropdown-menu li:nth-of-type(1)');
    this.elipsisDropdown_DuplicateRule = this.elipsisDropdown.get('.dropdown-menu li:nth-of-type(2)');
    super.nameElements();
  }
}
export const editBranchPage = new class EditBranchPage extends EditSegmentPage {
  constructor(urlPath) {
    super(urlPath);

    this.writeFirstRuleThatIsTrueLink = this.get('.branch-logic-summary')
    this.addAnotherRuleLink = this.get('div.conditions .insert-button-wrapper > .insert-text').tagAsLoadCriterion();
    this.addTextIfNoRulesAreThereLink = this.get('.insert-wrapper span a').tagAsLoadCriterion();
    this.YOUR_RULE_IS_EMPTY_MSG = 'Your rule is empty.';
    this.NUMBER_RESULT_MSG = 'Rules must evaluate to true or false. This rule returns a Number result.';
    this.PROBLEM_WITH_SYNTAX_MSG = 'There is a problem with the syntax of this rule.';
    super.nameElements();
  }

  no_data_msg(firstWord) {
    return `There is no data variable or formula called "${firstWord}".`
  }
  /**
   * n starts at 1
   * @param {Number} n 
   */
  getNthBranchBox(n) {
    return new BranchBox(`li.condition:nth-of-type(${n})`);
  }
}();