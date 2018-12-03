// @ts-check
import { EditSegmentPage } from '../editSegment.page';
import { UiElement } from '../../../../../autobot_framework/support/UiElement';

// TODO - logs aren't useful that just say "textInput" - need to specify which SynonymBOx the textInput is in

class SynonymBox extends UiElement {
  constructor(selector) {
    super(selector);
    this.xCloseButton = this.get('.delete-button');
    this.textInput = this.get('.public-DraftEditor-content');
    super.nameElements();
  }
}
export const editSynonymPage = new class EditSynonymPage extends EditSegmentPage {
  constructor(urlPath) {
    super(urlPath);

    this.addAnotherSynonymLink = this.get('.insert-wrapper span a').tagAsLoadCriterion();
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
  getNthSynonymBox(n) {
    return new SynonymBox(`li.synonym-variation:nth-of-type(${n})`).setName(`synonym box ${n}`);
  }

  getNthBreadcrumbLink(n) {
    return new UiElement(`li.synonym:nth-of-type(${n}) a`).setName(`breadcrumb link ${n}`);
  }

  getNthBreadcrumbText(n) {
    return this.getNthBreadcrumbLink(n).getWebElement().getText();
  }
}();
