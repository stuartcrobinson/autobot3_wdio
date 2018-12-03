// @ts-check
import {
  EditDataPage, EditDataDropdown, nthDropdownButtonCssSelector, nthDropDownOptionFromButton,
} from '../editData.page';


/**
 * Used by Text and List and Boolean data vars.
 */
export class DateFormatDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this._1_June_2c_1970 = this.get(nthDropDownOptionFromButton(1));
    this._2_June_2ndc_1970 = this.get(nthDropDownOptionFromButton(2));
    this._3__2_June_1970 = this.get(nthDropDownOptionFromButton(3));
    this._4__2nd_June_1970 = this.get(nthDropDownOptionFromButton(4));
    this._5__1970 = this.get(nthDropDownOptionFromButton(5));
    this._6_June = this.get(nthDropDownOptionFromButton(6));
    this._7_Jun = this.get(nthDropDownOptionFromButton(7));
    this._8__06 = this.get(nthDropDownOptionFromButton(8));
    this._9__6 = this.get(nthDropDownOptionFromButton(9));
    this._10__02 = this.get(nthDropDownOptionFromButton(10));
    this._11__2 = this.get(nthDropDownOptionFromButton(11));
    this._12__2nd = this.get(nthDropDownOptionFromButton(12));
    this._13_Tuesday = this.get(nthDropDownOptionFromButton(13));
    this._14__6_slash_2 = this.get(nthDropDownOptionFromButton(14));
    this._15__06_02_1970 = this.get(nthDropDownOptionFromButton(15));
    this._16__02_06_1970 = this.get(nthDropDownOptionFromButton(16));
    this._17__06s02s1970 = this.get(nthDropDownOptionFromButton(17));
    this._18__02s06s1970 = this.get(nthDropDownOptionFromButton(18));
    this._19__1970_06_02 = this.get(nthDropDownOptionFromButton(19));
    super.nameElements();
  }
}


export const editDataDatePage = new class EditDataDatePage extends EditDataPage {
  constructor(urlPath) {
    super(urlPath);
    this.dropdown_capitalization = new DateFormatDropdown(this.get(nthDropdownButtonCssSelector(1)).selector);
    super.nameElements();
  }
}();
