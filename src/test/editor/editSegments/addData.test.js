// @ts-check
import { editorPage } from '../../../support/wordsmith/editor/editor.page';
import { editDataBooleanComp } from '../../../support/wordsmith/editor/segmentEditors/dataEditors/editDataBoolean.comp';
import { editDataDateComp } from '../../../support/wordsmith/editor/segmentEditors/dataEditors/editDataDate.comp';
import { editDataListComp } from '../../../support/wordsmith/editor/segmentEditors/dataEditors/editDataList.comp';
import { editDataNumberComp } from '../../../support/wordsmith/editor/segmentEditors/dataEditors/editDataNumber.comp';
import { editDataTextComp } from '../../../support/wordsmith/editor/segmentEditors/dataEditors/editDataText.comp';
import { editDataTimeComp } from '../../../support/wordsmith/editor/segmentEditors/dataEditors/editDataTime.comp';
import { header } from '../../../support/wordsmith/misc/component/header.comp';
import { autobotBrowser } from '../../../../autobot_framework/autobot';
import { AutobotAssert } from '../../../../autobot_framework/support/AutobotAssert';
import { Load } from '../../../../autobot_framework/support/hooks';

describe('Format and insert data var of type', () => {

  before(() => { Load.newTemplateEditor(); });

  it('Number', () => {
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.xCloseButton.click();
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option2.click();
    editDataNumberComp.dropdown_decimalPlaces.click();
    editDataNumberComp.dropdown_decimalPlaces._2.click();
    editDataNumberComp.dropdown_decimalSeparator.click();
    editDataNumberComp.dropdown_decimalSeparator.comma.click();
    editDataNumberComp.dropdown_thousandsSeparator.click();
    editDataNumberComp.dropdown_thousandsSeparator.space.click();
    editDataNumberComp.toggle_absoluteValue.click();
    editDataNumberComp.toggle_percentage.click();
    AutobotAssert.elementText(editDataNumberComp.highlightedPreviewSpan, '10 000,00', 2000);
    editDataNumberComp.toggle_stripTrailingZeros.click();
    AutobotAssert.elementText(editDataNumberComp.highlightedPreviewSpan, '10 000', 2000);
    AutobotAssert.elementExists(header.savedDiv, 10000);
    editDataNumberComp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), '10 000', 'last segment text');
  });

  it('Text', () => {
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option1.click();

    const comp = editDataTextComp;

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.keepAsIs.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'anneau du Vic-Bilh');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.firstWord.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'Anneau du Vic-Bilh');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachWord.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'Anneau Du Vic-bilh');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachLetter.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'ANNEAU DU VIC-BILH');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.noLetters.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'anneau du vic-bilh');

    AutobotAssert.elementExists(header.savedDiv, 10000);
    comp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'anneau du vic-bilh', 'last segment text');
  });

  it('True/False', () => {
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option4.click();

    const comp = editDataBooleanComp;

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.keepAsIs.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'true');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.firstWord.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'True');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachWord.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'True');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.noLetters.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'true');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachLetter.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'TRUE');

    AutobotAssert.elementExists(header.savedDiv, 10000);
    comp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'TRUE', 'last segment text');
  });


  it('List', () => {
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option3.click();

    const comp = editDataListComp;

    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, Two, and tHREE');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.keepAsIs.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, Two, and tHREE');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.firstWord.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'One, Two, and tHREE');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachWord.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'One, Two, and Three');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.eachLetter.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'ONE, TWO, AND THREE');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization.noLetters.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, two, and three');

    comp.dropdown_conjunction.click();
    comp.dropdown_conjunction.none.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, two, three');

    comp.dropdown_conjunction.click();
    comp.dropdown_conjunction.and.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, two, and three');

    comp.toggle_oxfordComma.turnOff();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, two and three');

    comp.toggle_oxfordComma.turnOn();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, two, and three');

    comp.dropdown_conjunction.click();
    comp.dropdown_conjunction.or.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, two, or three');

    comp.toggle_oxfordComma.turnOff();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, two or three');

    comp.toggle_oxfordComma.turnOn();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, two, or three');

    comp.dropdown_listSettings.click();
    comp.dropdown_listSettings.first.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one');

    comp.subsetLimit.click();
    autobotBrowser.keys('\uE012'); // left
    autobotBrowser.keys('2');
    autobotBrowser.keys('\uE017'); // delete
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one or two');

    comp.dropdown_listSettings.click();
    comp.dropdown_listSettings.last.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'two or three');

    comp.dropdown_listSettings.click();
    comp.dropdown_listSettings.nth.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'two');

    comp.dropdown_listSettings.click();
    comp.dropdown_listSettings.sort.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'three');

    comp.dropdown_sortedCutoff.click();
    comp.dropdown_sortedCutoff.none.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'one, three, or two');

    comp.dropdown_ascendingDescending.click();
    comp.dropdown_ascendingDescending.descending.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'two, three, or one');

    AutobotAssert.elementExists(header.savedDiv, 10000);
    comp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'two, three, or one', 'last segment text');
  });

  it('Date', () => {
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option5.click();

    const comp = editDataDateComp;

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._1_June_2c_1970.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'February 1, 1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._2_June_2ndc_1970.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'February 1st, 1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._3__2_June_1970.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1 February 1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._4__2nd_June_1970.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1st February 1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._5__1970.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._6_June.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'February');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._7_Jun.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'Feb');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._8__06.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '02');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._9__6.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '2');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._10__02.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '01');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._11__2.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._12__2nd.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1st');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._13_Tuesday.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, 'Thursday');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._14__6_slash_2.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '2/1');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._15__06_02_1970.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '02-01-1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._16__02_06_1970.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '01-02-1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._17__06s02s1970.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '02/01/1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._18__02s06s1970.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '01/02/1900');

    comp.dropdown_capitalization.click();
    comp.dropdown_capitalization._19__1970_06_02.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1900-02-01');

    AutobotAssert.elementExists(header.savedDiv, 10000);
    comp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), '1900-02-01', 'last segment text');
  });


  it('Time', () => {
    editorPage.toolbar.insertDataButton.click();
    editorPage.toolbar.insertDataDropdown.option6.click();

    const comp = editDataTimeComp;

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option1.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1:45:12 pm');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option2.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '01:45:12 pm');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option3.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1:45:12pm');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option4.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '01:45:12pm');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option5.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '13:45:12');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option6.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '13:45:12');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option7.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1:45 pm');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option8.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '01:45 pm');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option9.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '1:45pm');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option10.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '01:45pm');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option11.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '13:45');

    comp.dropdown_timeFormat.click();
    comp.dropdown_timeFormat.option12.click();
    AutobotAssert.elementText(comp.highlightedPreviewSpan, '13:45');

    AutobotAssert.elementExists(header.savedDiv, 10000);
    comp.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), '13:45', 'last segment text');
  });
});
