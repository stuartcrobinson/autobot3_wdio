// @ts-check
import { CapitalizationDropdown, EditDataComp, nthDropdownButtonCssSelector } from '../editData.comp';

// var cssToXPath = require('css-to-xpath');

export const editDataNumberComp = new class EditDataNumberComp extends EditDataComp {
  constructor() {
    super();
    this.capitalizationDropdown = new CapitalizationDropdown(this.getChild(nthDropdownButtonCssSelector(1)).selector);
    super.nameElements();
  }
}();