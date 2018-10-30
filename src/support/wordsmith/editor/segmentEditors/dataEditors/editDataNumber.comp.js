// @ts-check
import { EditDataComp, EditDataDropdown, nthDropdownButtonCssSelector, nthDropDownOptionFromButton } from '../editData.comp';
import { Toggle } from '../../../toggle';

class DecimalPlacesDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.none = this.getChild(nthDropDownOptionFromButton(1));
    this._1 = this.getChild(nthDropDownOptionFromButton(2));
    this._2 = this.getChild(nthDropDownOptionFromButton(3));
    this._3 = this.getChild(nthDropDownOptionFromButton(4));
    this._4 = this.getChild(nthDropDownOptionFromButton(5));
    this._5 = this.getChild(nthDropDownOptionFromButton(6));
    this._6 = this.getChild(nthDropDownOptionFromButton(7));
    super.nameElements();
  }
}

class DecimalSeparatorDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.period = this.getChild(nthDropDownOptionFromButton(1));
    this.comma = this.getChild(nthDropDownOptionFromButton(2));
    super.nameElements();
  }
}

class ThousandsSeparatorDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.none = this.getChild(nthDropDownOptionFromButton(1));
    this.comma = this.getChild(nthDropDownOptionFromButton(2));
    this.period = this.getChild(nthDropDownOptionFromButton(3));
    this.space = this.getChild(nthDropDownOptionFromButton(4));
    super.nameElements();
  }
}

export const editDataNumberComp = new class EditDataNumberComp extends EditDataComp {
  constructor() {
    super();
    this.toggle_absoluteValue = new Toggle('absoluteValue');
    this.toggle_percentage = new Toggle('percentage')
    this.toggle_stripTrailingZeros = new Toggle('stripTrailingZeros')
    this.toggle_absoluteValue = new Toggle('absoluteValue')
    super.nameElements();
  }

  /* 
  Dropdown getters need separate functions because their selectors are state-dependent.
  Their selectors change based on what options are set which changes the available toggles & dropdowns
  */

  get numDropdowns() { return this.getChildren('.input-container .dropdown').length; }

  get dropdown_decimalPlaces() {
    return new DecimalPlacesDropdown(this.getChild(nthDropdownButtonCssSelector(1)).selector)
  }

  get dropdown_decimalSeparator() {
    if (this.numDropdowns === 3) {
      return new DecimalSeparatorDropdown(this.getChild(nthDropdownButtonCssSelector(2)).selector);
    }
    else {
      throw new Error('Decimal Places must be non-zero before Decimal Separator dropdown can be accessed. Num dropdowns rn = ' + this.numDropdowns)
    }
  }
  get dropdown_thousandsSeparator() {
    return new ThousandsSeparatorDropdown(this.getChild(nthDropdownButtonCssSelector(this.numDropdowns)).selector);
  }
}();