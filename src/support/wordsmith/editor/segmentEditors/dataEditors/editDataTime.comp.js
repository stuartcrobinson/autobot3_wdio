// @ts-check
import { EditDataComp, EditDataDropdown, nthDropdownButtonCssSelector, nthDropDownOptionFromButton } from '../editData.comp';

export class TimeFormatDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    //probably would have made more sense as a single function and pass option # from test ?
    this.option1 = this.get(nthDropDownOptionFromButton(1));
    this.option2 = this.get(nthDropDownOptionFromButton(2));
    this.option3 = this.get(nthDropDownOptionFromButton(3));
    this.option4 = this.get(nthDropDownOptionFromButton(4));
    this.option5 = this.get(nthDropDownOptionFromButton(5));
    this.option6 = this.get(nthDropDownOptionFromButton(6));
    this.option7 = this.get(nthDropDownOptionFromButton(7));
    this.option8 = this.get(nthDropDownOptionFromButton(8));
    this.option9 = this.get(nthDropDownOptionFromButton(9));
    this.option10 = this.get(nthDropDownOptionFromButton(10));
    this.option11 = this.get(nthDropDownOptionFromButton(11));
    this.option12 = this.get(nthDropDownOptionFromButton(12));
    super.nameElements();
  }
}

export const editDataTimeComp = new class EditDataTimeComp extends EditDataComp {
  constructor() {
    super();
    this.dropdown_timeFormat = new TimeFormatDropdown(this.get(nthDropdownButtonCssSelector(1)).selector);
    super.nameElements();
  }
}();