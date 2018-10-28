// @ts-check
import { CapitalizationDropdown, EditDataComp, nthDropdownButtonCssSelector } from '../editData.comp';

// var cssToXPath = require('css-to-xpath');

export const editDataTextComp = new class EditDataTextComp extends EditDataComp {
  constructor() {
    super();
    this.dropdown_capitalization = new CapitalizationDropdown(this.getChild(nthDropdownButtonCssSelector(1)).selector);
    super.nameElements();
  }
}();