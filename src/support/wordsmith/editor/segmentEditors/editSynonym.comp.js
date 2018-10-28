// @ts-check
import { AbElement } from '../../../../../autobot_framework/autobot';
import { EditSegmentComp } from '../editSegment.comp';

class SynonymBox extends AbElement{
  constructor(selector){
    super(selector);
    this.xCloseButton = this.getChild('.delete-button');
    this.textInput = this.getChild('.public-DraftEditor-content');
    super.nameElements();

  }
}
export const editSynonymComp = new class EditSynonymComp extends EditSegmentComp {
  constructor() {
    super();

    this.addAnotherSynonymLink = this.getChild('.insert-wrapper span a').tagAsLoadCriterion();
    this.synonymBox1 = this.getNthSynonymBox(1).tagAsLoadCriterion();
    this.synonymBox2 = this.getNthSynonymBox(2);
    this.synonymBox3 = this.getNthSynonymBox(3);
    this.synonymBox4 = this.getNthSynonymBox(4);
    this.synonymBox5 = this.getNthSynonymBox(5);
    super.nameElements();
  }

  /**
   * n starts at 1
   * @param {Number} n 
   */
  getNthSynonymBox(n){
    return new SynonymBox(`li.synonym-variation:nth-of-type(${n})`);
  }

  getNthBreadcrumbLink(n){
    return new AbElement(`li.synonym:nth-of-type(${n}) a`);
  }

  getNthBreadcrumbText(n){
    return this.getNthBreadcrumbLink(n).getWebElement().getText();
  }
}();