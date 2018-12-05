// @ts-check
import { AquaAssert } from '../../../../aqua/support/AquaAssert';
import { Load } from '../../../../aqua/support/hooks';
import { key } from '../../../../aqua/support/Key';
import { editorPage } from '../../../ui-model/wordsmith/editor/editor.page';
import { editDataBooleanPage } from '../../../ui-model/wordsmith/editor/segmentEditors/dataEditors/editDataBoolean.page';
import { editDataDatePage } from '../../../ui-model/wordsmith/editor/segmentEditors/dataEditors/editDataDate.page';
import { editDataListPage } from '../../../ui-model/wordsmith/editor/segmentEditors/dataEditors/editDataList.page';
import { editDataNumberPage } from '../../../ui-model/wordsmith/editor/segmentEditors/dataEditors/editDataNumber.page';
import { editDataTextPage } from '../../../ui-model/wordsmith/editor/segmentEditors/dataEditors/editDataText.page';
import { editDataTimePage } from '../../../ui-model/wordsmith/editor/segmentEditors/dataEditors/editDataTime.page';
import { header } from '../../../ui-model/wordsmith/misc/component/header.cont';
import { sidebar } from '../../../ui-model/wordsmith/misc/component/sideBar.cont';


export const data = [{
  string: 'anneau du Vic-Bilh',
  num: 100,
  list: 'one,Two,tHREE',
  bool: 'true',
  date: '2/1/1900',
  time: '1:45:12 PM',
}];


describe('Format and insert data var of type', () => {
  before(() => { Load.newTemplateEditor(data); });

  it('Number', () => {
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.xCloseButton.click();
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option2.click();
    editorPage.checkVisual(header, sidebar);
    editDataNumberPage.dropdown_decimalPlaces.click();
    editDataNumberPage.dropdown_decimalPlaces._2.click();
    editDataNumberPage.dropdown_decimalSeparator.click();
    editDataNumberPage.dropdown_decimalSeparator.comma.click();
    editDataNumberPage.dropdown_thousandsSeparator.click();
    editDataNumberPage.dropdown_thousandsSeparator.space.click();
    editDataNumberPage.toggle_absoluteValue.click();
    editDataNumberPage.toggle_percentage.click();
    editDataNumberPage.highlightedPreviewSpan.waitForText('10 000,00', 2000);
    editDataNumberPage.toggle_stripTrailingZeros.click();
    editDataNumberPage.highlightedPreviewSpan.waitForText('10 000', 2000);
    editDataNumberPage.segmentContainer.checkVisual();
    header.savedDiv.waitForExist(10000);
    editDataNumberPage.doneButton.click_waitForNotExisting();
    AquaAssert.valueEquals(() => editorPage.getLastSegmentText(), '10 000', 'last segment text');
    AquaAssert.visualTestsPassed();
  });

  it('Text', () => {
    editDataNumberPage.doneButton.click_ifExists();
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option1.click();

    const page = editDataTextPage;

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.keepAsIs.click();
    page.highlightedPreviewSpan.waitForText('anneau du Vic-Bilh');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.firstWord.click();
    page.highlightedPreviewSpan.waitForText('Anneau du Vic-Bilh');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.eachWord.click();
    page.highlightedPreviewSpan.waitForText('Anneau Du Vic-bilh');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.eachLetter.click();
    page.highlightedPreviewSpan.waitForText('ANNEAU DU VIC-BILH');

    page.dropdown_capitalization.click();
    page.segmentContainer.checkVisual();
    page.dropdown_capitalization.noLetters.click();
    page.highlightedPreviewSpan.waitForText('anneau du vic-bilh');

    header.savedDiv.waitForExist(10000);
    page.doneButton.click_waitForNotExisting();
    AquaAssert.valueEquals(() => editorPage.getLastSegmentText(), 'anneau du vic-bilh', 'last segment text');
    AquaAssert.visualTestsPassed();
  });

  it('True/False', () => {
    editDataNumberPage.doneButton.click_ifExists();
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option4.click();

    const page = editDataBooleanPage;

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.keepAsIs.click();
    page.highlightedPreviewSpan.waitForText('true');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.firstWord.click();
    page.highlightedPreviewSpan.waitForText('True');

    page.dropdown_capitalization.click();
    page.segmentContainer.checkVisual();
    page.dropdown_capitalization.eachWord.click();
    page.highlightedPreviewSpan.waitForText('True');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.noLetters.click();
    page.highlightedPreviewSpan.waitForText('true');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.eachLetter.click();
    page.highlightedPreviewSpan.waitForText('TRUE');

    header.savedDiv.waitForExist(10000);
    page.doneButton.click_waitForNotExisting();
    AquaAssert.valueEquals(() => editorPage.getLastSegmentText(), 'TRUE', 'last segment text');
    AquaAssert.visualTestsPassed();
  });


  it('List', () => {
    editDataNumberPage.doneButton.click_ifExists();
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option3.click();

    const page = editDataListPage;

    page.highlightedPreviewSpan.waitForText('one, Two, and tHREE');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.keepAsIs.click();
    page.highlightedPreviewSpan.waitForText('one, Two, and tHREE');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.firstWord.click();
    page.highlightedPreviewSpan.waitForText('One, Two, and tHREE');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.eachWord.click();
    page.highlightedPreviewSpan.waitForText('One, Two, and Three');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.eachLetter.click();
    page.highlightedPreviewSpan.waitForText('ONE, TWO, AND THREE');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization.noLetters.click();
    page.highlightedPreviewSpan.waitForText('one, two, and three');

    page.dropdown_conjunction.click();
    page.dropdown_conjunction.none.click();
    page.highlightedPreviewSpan.waitForText('one, two, three');

    page.dropdown_conjunction.click();
    page.dropdown_conjunction.and.click();
    page.highlightedPreviewSpan.waitForText('one, two, and three');

    page.toggle_oxfordComma.turnOff();
    page.highlightedPreviewSpan.waitForText('one, two and three');

    page.toggle_oxfordComma.turnOn();
    page.highlightedPreviewSpan.waitForText('one, two, and three');

    page.dropdown_conjunction.click();
    page.dropdown_conjunction.or.click();
    page.highlightedPreviewSpan.waitForText('one, two, or three');

    page.toggle_oxfordComma.turnOff();
    page.highlightedPreviewSpan.waitForText('one, two or three');

    page.toggle_oxfordComma.turnOn();
    page.highlightedPreviewSpan.waitForText('one, two, or three');

    page.dropdown_listSettings.click();
    page.dropdown_listSettings.first.click();
    page.highlightedPreviewSpan.waitForText('one');

    page.subsetLimit.click();
    page.keys(key.LEFT); // left
    page.keys('2');
    page.keys(key.DELETE); // delete
    page.highlightedPreviewSpan.waitForText('one or two');

    page.dropdown_listSettings.click();
    page.dropdown_listSettings.last.click();
    page.highlightedPreviewSpan.waitForText('two or three');

    page.dropdown_listSettings.click();
    page.dropdown_listSettings.nth.click();
    page.highlightedPreviewSpan.waitForText('two');

    page.dropdown_listSettings.click();
    page.dropdown_listSettings.sort.click();
    page.highlightedPreviewSpan.waitForText('three');

    page.dropdown_sortedCutoff.click();
    page.dropdown_sortedCutoff.none.click();
    page.highlightedPreviewSpan.waitForText('one, three, or two');

    page.dropdown_ascendingDescending.click();
    page.segmentContainer.checkVisual();
    page.dropdown_ascendingDescending.descending.click();
    page.highlightedPreviewSpan.waitForText('two, three, or one');

    header.savedDiv.waitForExist(10000);
    page.doneButton.click_waitForNotExisting();
    AquaAssert.valueEquals(() => editorPage.getLastSegmentText(), 'two, three, or one', 'last segment text');
    AquaAssert.visualTestsPassed();
  });

  // TODO https://autoin.atlassian.net/browse/QS-395 test datetime data custom format
  it('Date', () => {
    editDataNumberPage.doneButton.click_ifExists();

    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option5.click();

    const page = editDataDatePage;

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._1_June_2c_1970.click();
    page.highlightedPreviewSpan.waitForText('February 1, 1900');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._2_June_2ndc_1970.click();
    page.highlightedPreviewSpan.waitForText('February 1st, 1900');

    page.dropdown_capitalization.click();
    page.segmentContainer.checkVisual();
    page.dropdown_capitalization._3__2_June_1970.click();
    page.highlightedPreviewSpan.waitForText('1 February 1900');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._4__2nd_June_1970.click();
    page.highlightedPreviewSpan.waitForText('1st February 1900');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._5__1970.click();
    page.highlightedPreviewSpan.waitForText('1900');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._6_June.click();
    page.highlightedPreviewSpan.waitForText('February');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._7_Jun.click();
    page.highlightedPreviewSpan.waitForText('Feb');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._8__06.click();
    page.highlightedPreviewSpan.waitForText('02');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._9__6.click();
    page.highlightedPreviewSpan.waitForText('2');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._10__02.click();
    page.highlightedPreviewSpan.waitForText('01');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._11__2.click();
    page.highlightedPreviewSpan.waitForText('1');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._12__2nd.click();
    page.highlightedPreviewSpan.waitForText('1st');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._13_Tuesday.click();
    page.highlightedPreviewSpan.waitForText('Thursday');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._14__6_slash_2.click();
    page.highlightedPreviewSpan.waitForText('2/1');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._15__06_02_1970.click();
    page.highlightedPreviewSpan.waitForText('02-01-1900');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._16__02_06_1970.click();
    page.highlightedPreviewSpan.waitForText('01-02-1900');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._17__06s02s1970.click();
    page.highlightedPreviewSpan.waitForText('02/01/1900');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._18__02s06s1970.click();
    page.highlightedPreviewSpan.waitForText('01/02/1900');

    page.dropdown_capitalization.click();
    page.dropdown_capitalization._19__1970_06_02.click();
    page.highlightedPreviewSpan.waitForText('1900-02-01');

    header.savedDiv.waitForExist(10000);
    page.doneButton.click_waitForNotExisting();
    AquaAssert.valueEquals(() => editorPage.getLastSegmentText(), '1900-02-01', 'last segment text');
    AquaAssert.visualTestsPassed();
  });


  it('Time', () => {
    editDataNumberPage.doneButton.click_ifExists();

    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option6.click();

    const page = editDataTimePage;

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option1.click();
    page.highlightedPreviewSpan.waitForText('1:45:12 pm');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option2.click();
    page.highlightedPreviewSpan.waitForText('01:45:12 pm');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option3.click();
    page.highlightedPreviewSpan.waitForText('1:45:12pm');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option4.click();
    page.highlightedPreviewSpan.waitForText('01:45:12pm');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option5.click();
    page.highlightedPreviewSpan.waitForText('13:45:12');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option6.click();
    page.highlightedPreviewSpan.waitForText('13:45:12');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option7.click();
    page.highlightedPreviewSpan.waitForText('1:45 pm');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option8.click();
    page.highlightedPreviewSpan.waitForText('01:45 pm');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option9.click();
    page.highlightedPreviewSpan.waitForText('1:45pm');

    page.dropdown_timeFormat.click();
    page.segmentContainer.checkVisual();
    page.dropdown_timeFormat.option10.click();
    page.highlightedPreviewSpan.waitForText('01:45pm');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option11.click();
    page.highlightedPreviewSpan.waitForText('13:45');

    page.dropdown_timeFormat.click();
    page.dropdown_timeFormat.option12.click();
    page.highlightedPreviewSpan.waitForText('13:45');

    header.savedDiv.waitForExist(10000);
    page.doneButton.click_waitForNotExisting();
    AquaAssert.valueEquals(() => editorPage.getLastSegmentText(), '13:45', 'last segment text');
    AquaAssert.visualTestsPassed();
  });
});
