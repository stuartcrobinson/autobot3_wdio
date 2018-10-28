// @ts-check
import { EditDataComp, EditDataDropdown, nthDropdownButtonCssSelector, nthDropDownOptionFromButton } from '../editData.comp';

/**
 * Used by Text and List and Boolean data vars.
 */
export class TimeFormatDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.option1 = this.getChild(nthDropDownOptionFromButton(1));
    this.option2 = this.getChild(nthDropDownOptionFromButton(2));
    this.option3 = this.getChild(nthDropDownOptionFromButton(3));
    this.option4 = this.getChild(nthDropDownOptionFromButton(4));
    this.option5 = this.getChild(nthDropDownOptionFromButton(5));
    this.option6 = this.getChild(nthDropDownOptionFromButton(6));
    this.option7 = this.getChild(nthDropDownOptionFromButton(7));
    this.option8 = this.getChild(nthDropDownOptionFromButton(8));
    this.option9 = this.getChild(nthDropDownOptionFromButton(9));
    this.option10 = this.getChild(nthDropDownOptionFromButton(10));
    this.option11 = this.getChild(nthDropDownOptionFromButton(11));
    this.option12 = this.getChild(nthDropDownOptionFromButton(12));
    super.nameElements();
  }
}

export const editDataTimeComp = new class EditDataTimeComp extends EditDataComp {
  constructor() {
    super();
    this.dropdown_timeFormat = new TimeFormatDropdown(this.getChild(nthDropdownButtonCssSelector(1)).selector);
    super.nameElements();
  }
}();