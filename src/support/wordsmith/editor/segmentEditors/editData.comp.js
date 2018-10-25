// @ts-check
import { EditSegmentComp } from '../editSegment.comp';
import { AbElement } from '../../../../../autobot_framework/autobot';



export class EditDataDropdown extends AbElement {
  constructor(selector) {
    super(selector);
    if (this.constructor === EditDataDropdown) {
      throw new TypeError('Abstract class cannot be instantiated directly.');
    }
    this.setName(this.constructor.name)
  }
}

/**
 * Used by Text and List and Boolean data vars.
 */
export class CapitalizationDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.keepAsIs = this.getChild(nthDropDownOptionFromButton(1));
    this.firstWord = this.getChild(nthDropDownOptionFromButton(2));
    this.eachWord = this.getChild(nthDropDownOptionFromButton(3));
    this.eachLetter = this.getChild(nthDropDownOptionFromButton(4));
    this.noLetters = this.getChild(nthDropDownOptionFromButton(5));
    super.nameElements();
  }
}
export function nthDropdownButtonCssSelector(n) {
  return `.input-container:nth-of-type(${n}) .dropdown button`
}

export function nthDropDownOptionFromButton(n) {
  return ` + .dropdown-menu li:nth-of-type(${n})`;
}
/** Abstract */
export class EditDataComp extends EditSegmentComp {
  constructor() {
    super();
    if (this.constructor === EditDataComp) {
      throw new TypeError('Abstract class cannot be instantiated directly.');
    }
    // this.formatterCard = this.getChild('.card--datavar-formatter').tagAsLoadCriterion(); //not useful
    this.dataVarNameSpan = this.getChild('.segment__header-datavar').tagAsLoadCriterion();
    super.nameElements();
  }



};

