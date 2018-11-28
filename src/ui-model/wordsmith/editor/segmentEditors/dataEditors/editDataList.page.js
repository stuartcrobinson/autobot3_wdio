// @ts-check
import { CapitalizationDropdown, EditDataPage, nthDropdownButtonCssSelector, EditDataDropdown, nthDropDownOptionFromButton } from '../editData.page';
import { Toggle } from '../../../toggle';

class ConjunctionDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.none = this.get(nthDropDownOptionFromButton(1));
    this.and = this.get(nthDropDownOptionFromButton(2));
    this.or = this.get(nthDropDownOptionFromButton(3));
    super.nameElements();
  }
}

export class ListSettingsDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.none = this.get(nthDropDownOptionFromButton(1));
    this.first = this.get(nthDropDownOptionFromButton(2));
    this.last = this.get(nthDropDownOptionFromButton(3));
    this.nth = this.get(nthDropDownOptionFromButton(4));
    this.sort = this.get(nthDropDownOptionFromButton(5));
    super.nameElements();
  }
}

export class AscendingDescendingDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.ascending = this.get(nthDropDownOptionFromButton(1));
    this.descending = this.get(nthDropDownOptionFromButton(2));
    super.nameElements();
  }
}

export class SortedCutoffDropdown extends EditDataDropdown {
  constructor(dropdownButtonSelector) {
    super(dropdownButtonSelector);
    this.none = this.get(nthDropDownOptionFromButton(1));
    this.first = this.get(nthDropDownOptionFromButton(2));
    this.last = this.get(nthDropDownOptionFromButton(3));
    this.nth = this.get(nthDropDownOptionFromButton(4));
    super.nameElements();
  }
}


export const editDataListPage = new class EditDataListPage extends EditDataPage {
  constructor(urlPath) {
    super(urlPath);
    this.dropdown_capitalization = new CapitalizationDropdown(
      this.get('.columns.medium-4:nth-of-type(1) ' + nthDropdownButtonCssSelector(1)).selector);

    this.dropdown_conjunction = new ConjunctionDropdown(
      this.get('.columns.medium-4:nth-of-type(2) ' + nthDropdownButtonCssSelector(1)).selector);

    this.dropdown_listSettings = new ListSettingsDropdown(
      this.get('.columns.medium-4:nth-of-type(3) ' + nthDropdownButtonCssSelector(1)).selector);

    this.dropdown_ascendingDescending = new AscendingDescendingDropdown(
      this.get('.columns.medium-4:nth-of-type(3) .input-container .input-container button').selector);

    this.dropdown_sortedCutoff = new SortedCutoffDropdown(
      this.get('.columns.medium-4:nth-of-type(3) .input-container + .input-container button').selector);

    this.subsetLimit = this.get('#listSubsetLimit')

    this.toggle_oxfordComma = new Toggle('listOxfordComma');

    super.nameElements();
  }
}();