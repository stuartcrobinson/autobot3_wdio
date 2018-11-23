// @ts-check
import { EditSegmentComp } from '../editSegment.comp';
import { UiElement } from '../../../../../autobot_framework/support/UiElement';

export class EditDataDropdown extends UiElement {
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
    this.keepAsIs = this.get(nthDropDownOptionFromButton(1));
    this.firstWord = this.get(nthDropDownOptionFromButton(2));
    this.eachWord = this.get(nthDropDownOptionFromButton(3));
    this.eachLetter = this.get(nthDropDownOptionFromButton(4));
    this.noLetters = this.get(nthDropDownOptionFromButton(5));
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

    this.dataVarNameSpan = this.get('.segment__header-datavar').tagAsLoadCriterion();
    super.nameElements();
  }
};

