// @ts-check
import { CapitalizationDropdown, EditDataComp, nthDropdownButtonCssSelector } from '../editData.comp';

export const editDataBooleanComp = new class EditDataBooleanComp extends EditDataComp {
  constructor() {
    super();
    this.dropdown_capitalization = new CapitalizationDropdown(this.get(nthDropdownButtonCssSelector(1)).selector);
    super.nameElements();
  }
}();