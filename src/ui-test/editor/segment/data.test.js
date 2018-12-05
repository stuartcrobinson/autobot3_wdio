// @ts-check
import { AutobotAssert } from '../../../../autobot_framework/support/AutobotAssert';
import { Load } from '../../../../autobot_framework/support/hooks';
import { key } from '../../../../autobot_framework/support/Key';
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
    editDataNumberPage.checkVisual(header, sidebar);
    header.savedDiv.waitForExist(10000);
    editDataNumberPage.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), '10 000', 'last segment text');
    AutobotAssert.visualTestsPassed();
  });

  it('Text', () => {
    editDataNumberPage.doneButton.click_ifExists();
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option1.click();

    const comp = editDataTextPage;

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.keepAsIs.click();
    comp.highlightedPreviewSpan.waitForText('anneau du Vic-Bilh');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.firstWord.click();
    comp.highlightedPreviewSpan.waitForText('Anneau du Vic-Bilh');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachWord.click();
    comp.highlightedPreviewSpan.waitForText('Anneau Du Vic-bilh');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachLetter.click();
    comp.highlightedPreviewSpan.waitForText('ANNEAU DU VIC-BILH');

    comp.dropdown_capitalization.click();
    comp.checkVisual(header, sidebar);
    comp.dropdown_capitalization.noLetters.click();
    comp.highlightedPreviewSpan.waitForText('anneau du vic-bilh');

    header.savedDiv.waitForExist(10000);
    comp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'anneau du vic-bilh', 'last segment text');
    AutobotAssert.visualTestsPassed();
  });

  it('True/False', () => {
    editDataNumberPage.doneButton.click_ifExists();
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option4.click();

    const comp = editDataBooleanPage;

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.keepAsIs.click();
    comp.highlightedPreviewSpan.waitForText('true');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.firstWord.click();
    comp.highlightedPreviewSpan.waitForText('True');

    comp.dropdown_capitalization.click();
    comp.checkVisual(header, sidebar);
    comp.dropdown_capitalization.eachWord.click();
    comp.highlightedPreviewSpan.waitForText('True');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.noLetters.click();
    comp.highlightedPreviewSpan.waitForText('true');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachLetter.click();
    comp.highlightedPreviewSpan.waitForText('TRUE');

    header.savedDiv.waitForExist(10000);
    comp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'TRUE', 'last segment text');
    AutobotAssert.visualTestsPassed();
  });


  it('List', () => {
    editDataNumberPage.doneButton.click_ifExists();
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option3.click();

    const comp = editDataListPage;

    comp.highlightedPreviewSpan.waitForText('one, Two, and tHREE');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.keepAsIs.click();
    comp.highlightedPreviewSpan.waitForText('one, Two, and tHREE');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.firstWord.click();
    comp.highlightedPreviewSpan.waitForText('One, Two, and tHREE');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachWord.click();
    comp.highlightedPreviewSpan.waitForText('One, Two, and Three');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachLetter.click();
    comp.highlightedPreviewSpan.waitForText('ONE, TWO, AND THREE');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.noLetters.click();
    comp.highlightedPreviewSpan.waitForText('one, two, and three');

    comp.dropdown_conjunction.click();
    comp.dropdown_conjunction.none.click();
    comp.highlightedPreviewSpan.waitForText('one, two, three');

    comp.dropdown_conjunction.click();
    comp.dropdown_conjunction.and.click();
    comp.highlightedPreviewSpan.waitForText('one, two, and three');

    comp.toggle_oxfordComma.turnOff();
    comp.highlightedPreviewSpan.waitForText('one, two and three');

    comp.toggle_oxfordComma.turnOn();
    comp.highlightedPreviewSpan.waitForText('one, two, and three');

    comp.dropdown_conjunction.click();
    comp.dropdown_conjunction.or.click();
    comp.highlightedPreviewSpan.waitForText('one, two, or three');

    comp.toggle_oxfordComma.turnOff();
    comp.highlightedPreviewSpan.waitForText('one, two or three');

    comp.toggle_oxfordComma.turnOn();
    comp.highlightedPreviewSpan.waitForText('one, two, or three');

    comp.dropdown_listSettings.click();
    comp.dropdown_listSettings.first.click();
    comp.highlightedPreviewSpan.waitForText('one');

    comp.subsetLimit.click();
    comp.keys(key.LEFT); // left
    comp.keys('2');
    comp.keys(key.DELETE); // delete
    comp.highlightedPreviewSpan.waitForText('one or two');

    comp.dropdown_listSettings.click();
    comp.dropdown_listSettings.last.click();
    comp.highlightedPreviewSpan.waitForText('two or three');

    comp.dropdown_listSettings.click();
    comp.dropdown_listSettings.nth.click();
    comp.highlightedPreviewSpan.waitForText('two');

    comp.dropdown_listSettings.click();
    comp.dropdown_listSettings.sort.click();
    comp.highlightedPreviewSpan.waitForText('three');

    comp.dropdown_sortedCutoff.click();
    comp.dropdown_sortedCutoff.none.click();
    comp.highlightedPreviewSpan.waitForText('one, three, or two');

    comp.dropdown_ascendingDescending.click();
    comp.checkVisual(header, sidebar);
    comp.dropdown_ascendingDescending.descending.click();
    comp.highlightedPreviewSpan.waitForText('two, three, or one');

    header.savedDiv.waitForExist(10000);
    comp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'two, three, or one', 'last segment text');
    AutobotAssert.visualTestsPassed();
  });

  // TODO https://autoin.atlassian.net/browse/QS-395 test datetime data custom format
  it('Date', () => {
    editDataNumberPage.doneButton.click_ifExists();

    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option5.click();

    const comp = editDataDatePage;

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._1_June_2c_1970.click();
    comp.highlightedPreviewSpan.waitForText('February 1, 1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._2_June_2ndc_1970.click();
    comp.highlightedPreviewSpan.waitForText('February 1st, 1900');

    comp.dropdown_capitalization.click();
    comp.checkVisual(header, sidebar);
    comp.dropdown_capitalization._3__2_June_1970.click();
    comp.highlightedPreviewSpan.waitForText('1 February 1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._4__2nd_June_1970.click();
    comp.highlightedPreviewSpan.waitForText('1st February 1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._5__1970.click();
    comp.highlightedPreviewSpan.waitForText('1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._6_June.click();
    comp.highlightedPreviewSpan.waitForText('February');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._7_Jun.click();
    comp.highlightedPreviewSpan.waitForText('Feb');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._8__06.click();
    comp.highlightedPreviewSpan.waitForText('02');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._9__6.click();
    comp.highlightedPreviewSpan.waitForText('2');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._10__02.click();
    comp.highlightedPreviewSpan.waitForText('01');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._11__2.click();
    comp.highlightedPreviewSpan.waitForText('1');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._12__2nd.click();
    comp.highlightedPreviewSpan.waitForText('1st');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._13_Tuesday.click();
    comp.highlightedPreviewSpan.waitForText('Thursday');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._14__6_slash_2.click();
    comp.highlightedPreviewSpan.waitForText('2/1');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._15__06_02_1970.click();
    comp.highlightedPreviewSpan.waitForText('02-01-1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._16__02_06_1970.click();
    comp.highlightedPreviewSpan.waitForText('01-02-1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._17__06s02s1970.click();
    comp.highlightedPreviewSpan.waitForText('02/01/1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._18__02s06s1970.click();
    comp.highlightedPreviewSpan.waitForText('01/02/1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._19__1970_06_02.click();
    comp.highlightedPreviewSpan.waitForText('1900-02-01');

    header.savedDiv.waitForExist(10000);
    comp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), '1900-02-01', 'last segment text');
    AutobotAssert.visualTestsPassed();
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
    page.checkVisual(header, sidebar);
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
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), '13:45', 'last segment text');
    AutobotAssert.visualTestsPassed();
  });
});
