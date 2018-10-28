// @ts-check
import { CapitalizationDropdown, EditDataComp, nthDropdownButtonCssSelector, EditDataDropdown, nthDropDownOptionFromButton } from '../editData.comp';
import { Toggle } from '../../../toggle';

// var cssToXPath = require('css-to-xpath');


class ConjunctionDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.none = this.getChild(nthDropDownOptionFromButton(1));
    this.and = this.getChild(nthDropDownOptionFromButton(2));
    this.or = this.getChild(nthDropDownOptionFromButton(3));
    super.nameElements();
  }
}


/**
 * Used by Text and List and Boolean data vars.
 */
export class ListSettingsDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.none = this.getChild(nthDropDownOptionFromButton(1));
    this.first = this.getChild(nthDropDownOptionFromButton(2));
    this.last = this.getChild(nthDropDownOptionFromButton(3));
    this.nth = this.getChild(nthDropDownOptionFromButton(4));
    this.sort = this.getChild(nthDropDownOptionFromButton(5));
    super.nameElements();
  }
}


/**
 * Used by Text and List and Boolean data vars.
 */
export class AscendingDescendingDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.ascending = this.getChild(nthDropDownOptionFromButton(1));
    this.descending = this.getChild(nthDropDownOptionFromButton(2));
    super.nameElements();
  }
}

/**
 * Used by Text and List and Boolean data vars.
 */
export class SortedCutoffDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.none = this.getChild(nthDropDownOptionFromButton(1));
    this.first = this.getChild(nthDropDownOptionFromButton(2));
    this.last = this.getChild(nthDropDownOptionFromButton(3));
    this.nth = this.getChild(nthDropDownOptionFromButton(4));
    super.nameElements();
  }
}


export const editDataListComp = new class EditDataListComp extends EditDataComp {
  constructor() {
    super();
    this.dropdown_capitalization = new CapitalizationDropdown(
      this.getChild('.columns.medium-4:nth-of-type(1) ' + nthDropdownButtonCssSelector(1)).selector);

    this.dropdown_conjunction = new ConjunctionDropdown(
      this.getChild('.columns.medium-4:nth-of-type(2) ' + nthDropdownButtonCssSelector(1)).selector);

    this.dropdown_listSettings = new ListSettingsDropdown(
      this.getChild('.columns.medium-4:nth-of-type(3) ' + nthDropdownButtonCssSelector(1)).selector);

    this.dropdown_ascendingDescending = new AscendingDescendingDropdown(
      this.getChild('.columns.medium-4:nth-of-type(3) .input-container .input-container button').selector);

    this.dropdown_sortedCutoff = new SortedCutoffDropdown(
      this.getChild('.columns.medium-4:nth-of-type(3) .input-container + .input-container button').selector);

    this.subsetLimit = this.getChild('#listSubsetLimit')

    this.toggle_oxfordComma = new Toggle('listOxfordComma');

    //  .columns.medium-4:nth-of-type(2)

    super.nameElements();
  }
}();