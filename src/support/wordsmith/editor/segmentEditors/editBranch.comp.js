// @ts-check
import { AbElement } from '../../../../../autobot_framework/autobot';
import { EditSegmentComp } from '../editSegment.comp';
// import { timingSafeEqual } from 'crypto';

class BranchBox extends AbElement {
  constructor(selector) {
    super(selector);
    this.trashButton = this.getChild('.delete-button');
    this.bulletHandle = this.getChild('.bullet--handle')
    const conditionDiv = this.getChild('.code-wrapper');
    this.conditionTextarea = conditionDiv.getChild('.condition-textarea')
    // this.conditionTextSpan = conditionDiv.getChild('.condition-textarea span span')
    /** for clicking away from the condition editor. */
    this.conditionLabel = conditionDiv.getChild('.label')
    this.conditionError = conditionDiv.getChild('.error-message')
    this.descriptionSpan = conditionDiv.getChild('.description-textarea span span')

    this.editorInput = this.getChild('.editor-wrapper .public-DraftEditor-content')
    // this.addAnotherRuleLink = this.getChild('.insert-button-wrapper > .insert-text')
    // this.OR_link = this.getChild('.insert-wrapper > .insert-or-label')
    this.elipsisDropdown = this.getChild('.more-wrapper > .dropdown');
    this.elipsisDropdown_AddDescription = this.elipsisDropdown.getChild('.dropdown-menu li:nth-of-type(1)');
    this.elipsisDropdown_DuplicateRule = this.elipsisDropdown.getChild('.dropdown-menu li:nth-of-type(2)');
    this.descriptionTextArea = this.getChild('.description-textarea');  //maybe needs followed by .public-DraftEditor-content ?
    super.nameElements();
  }
}
export const editBranchComp = new class EditBranchComp extends EditSegmentComp {
  constructor() {
    super();

    this.writeFirstRuleThatIsTrueLink = this.getChild('.branch-logic-summary')
    this.addAnotherRuleLink = this.getChild('div.conditions .insert-button-wrapper > .insert-text').tagAsLoadCriterion();
    this.addTextIfNoRulesAreThereLink = this.getChild('.insert-wrapper span a').tagAsLoadCriterion();


    // this.synonymBox1 = this.getNthSynonymBox(1).tagAsLoadCriterion();
    // this.synonymBox2 = this.getNthSynonymBox(2);
    // this.synonymBox3 = this.getNthSynonymBox(3);
    // this.synonymBox4 = this.getNthSynonymBox(4);
    // this.synonymBox5 = this.getNthSynonymBox(5);
    super.nameElements();
  }

  /**
   * n starts at 1
   * @param {Number} n 
   */
  getNthBranchBox(n) {
    return new BranchBox(`li.condition:nth-of-type(${n})`);
  }

  // getNthBreadcrumbLink(n){
  //   return new AbElement(`li.synonym:nth-of-type(${n}) a`);
  // }

  // getNthBreadcrumbText(n){
  //   return this.getNthBreadcrumbLink(n).getWebElement().getText();
  // }
}();