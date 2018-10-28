// @ts-check
import { EditDataComp, EditDataDropdown, nthDropdownButtonCssSelector, nthDropDownOptionFromButton } from '../editData.comp';


/**
 * Used by Text and List and Boolean data vars.
 */
export class DateFormatDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this._1_June_2c_1970 = this.getChild(nthDropDownOptionFromButton(1));
    this._2_June_2ndc_1970 = this.getChild(nthDropDownOptionFromButton(2));
    this._3__2_June_1970 = this.getChild(nthDropDownOptionFromButton(3));
    this._4__2nd_June_1970 = this.getChild(nthDropDownOptionFromButton(4));
    this._5__1970 = this.getChild(nthDropDownOptionFromButton(5));
    this._6_June = this.getChild(nthDropDownOptionFromButton(6));
    this._7_Jun = this.getChild(nthDropDownOptionFromButton(7));
    this._8__06 = this.getChild(nthDropDownOptionFromButton(8));
    this._9__6 = this.getChild(nthDropDownOptionFromButton(9));
    this._10__02 = this.getChild(nthDropDownOptionFromButton(10));
    this._11__2 = this.getChild(nthDropDownOptionFromButton(11));
    this._12__2nd = this.getChild(nthDropDownOptionFromButton(12));
    this._13_Tuesday = this.getChild(nthDropDownOptionFromButton(13));
    this._14__6_slash_2 = this.getChild(nthDropDownOptionFromButton(14));
    this._15__06_02_1970 = this.getChild(nthDropDownOptionFromButton(15));
    this._16__02_06_1970 = this.getChild(nthDropDownOptionFromButton(16));
    this._17__06s02s1970 = this.getChild(nthDropDownOptionFromButton(17));
    this._18__02s06s1970 = this.getChild(nthDropDownOptionFromButton(18));
    this._19__1970_06_02 = this.getChild(nthDropDownOptionFromButton(19));
    super.nameElements();
  }
}


export const editDataDateComp = new class EditDataDateComp extends EditDataComp {
  constructor() {
    super();
    this.dropdown_capitalization = new DateFormatDropdown(this.getChild(nthDropdownButtonCssSelector(1)).selector);
    super.nameElements();
  }
}();