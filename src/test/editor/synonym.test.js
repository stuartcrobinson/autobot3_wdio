// @ts-check
import countBy from 'lodash';
import { AutobotAssert } from '../../../autobot_framework/support/AutobotAssert';
import { Load } from '../../../autobot_framework/support/hooks';
import { editorPage } from '../../support/wordsmith/editor/editor.page';
import { reviewPage } from '../../support/wordsmith/editor/review.page';
import { editDataNumberComp } from '../../support/wordsmith/editor/segmentEditors/dataEditors/editDataNumber.comp';
import { editSynonymComp } from '../../support/wordsmith/editor/segmentEditors/editSynonym.comp';
import { header } from '../../support/wordsmith/misc/component/header.comp';
import { sidebar } from '../../support/wordsmith/misc/component/sideBar.comp';
import { autobotBrowser } from '../../../autobot_framework/autobot';

describe('Add', () => {
  before(() => { Load.newTemplateEditorUsingDataFile("resources/eachDataType_date2.csv"); });

  // done
  it('synonym', () => {

    const content = "moar pancakes please";

    editorPage.editor.clickAndType(content);
    autobotBrowser.sleep(1000); //delete me


    //TODO wrap these somehow

    browser
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")

    browser
      .keys("Shift")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")
      .keys("ArrowLeft")

    browser
      .keys("Shift")  //releases shift probably?


    autobotBrowser.sleep(1000);   //delete me


    editorPage.toolbar.addSynonymButton.click();

    // AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes', 2000);

    //change primary synonym

    browser
      .keys("Alt")
      .keys("Shift")
      .keys("ArrowLeft")
      .keys("Delete")

    browser
      .keys("Alt")
      .keys("Shift")

    editSynonymComp.getNthSynonymBox(1).textInput.clickAndType('slapjacks');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'slapjacks', 2000);

    //add more synonyms
    editSynonymComp.addAnotherSynonymLink.click();
    editSynonymComp.getNthSynonymBox(2).textInput.clickAndType('flapjacks');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'flapjacks', 2000);

    editSynonymComp.addAnotherSynonymLink.click();
    editSynonymComp.getNthSynonymBox(3).textInput.clickAndType('oladyi');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'oladyi', 2000);

    editSynonymComp.addAnotherSynonymLink.click();
    editSynonymComp.getNthSynonymBox(4).textInput.clickAndType('pancakes');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes', 2000);

    editSynonymComp.addAnotherSynonymLink.click();
    editSynonymComp.getNthSynonymBox(5).textInput.clickAndType('griddle cakes');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'griddle cakes', 2000);

    AutobotAssert.elementExists(header.savedDiv, 10000);

    editDataNumberComp.doneButton.click_waitForNotExisting();


    //now make sure synonym is clickable-to-edit, and that primary synonym changed

    editorPage.segmentWithText("slapjacks").click_waitForChange();

    editSynonymComp.getNthSynonymBox(3).textInput.click();

    browser
      .keys("Alt")
      .keys("ArrowRight")
      .keys("Shift")
      .keys("ArrowLeft")
      .keys("Delete")

    browser
      .keys("Alt")
      .keys("Shift")

    editSynonymComp.getNthSynonymBox(3).textInput.clickAndType('hotcakes');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'hotcakes', 2000);

    AutobotAssert.elementExists(header.savedDiv, 10000);

    editDataNumberComp.doneButton.click_waitForNotExisting();

    //check main editor contents

    AutobotAssert.elementExists(editorPage.segmentWithText('slapjacks'));

    //now check the Review distribution

    sidebar.reviewLink.click_waitForChange();

    reviewPage.showAllLink.click_waitForChange();


    //go ahead and check run stats while we're here

    AutobotAssert.elementText(reviewPage.avgWordsValueDiv, "3");
    AutobotAssert.elementText(reviewPage.maxWordsValueDiv, "4");
    AutobotAssert.elementText(reviewPage.minWordsValueDiv, "3");
    AutobotAssert.elementText(reviewPage.maxCharsValueDiv, "25");
    AutobotAssert.elementText(reviewPage.readingTimesValueDiv, "1s");
    AutobotAssert.elementText(reviewPage.gradeLevelReadabilityValueDiv, "-");
    AutobotAssert.elementText(reviewPage.variabilityScoreValueDiv, "30");

    let synonyms = []

    synonyms = synonyms.concat(reviewPage.getNthSegmentSpan(2).getTexts());

    //randomize rows and get another 50 synonyms

    reviewPage.randomizeRows_turnOn();
    reviewPage.showAllLink.click_waitForChange();

    synonyms = synonyms.concat(reviewPage.getNthSegmentSpan(2).getTexts());

    reviewPage.generate50NewRowsLink.click_waitForChange();
    reviewPage.showAllLink.click_waitForChange();

    synonyms = synonyms.concat(reviewPage.getNthSegmentSpan(2).getTexts());

    const counts = countBy(synonyms);

    console.log(counts);







    //TODO - get actual counts object.  this is what's getting printed rn:

    /*
01:18:29am Add synonym> Click generate50NewRowsLink then wait for change in //body target: h2 a
01:18:33am Add synonym> Click showAllLink then wait for change in //body target: .pagination + span .page-item.show-all
LodashWrapper {
  __wrapped__:
   [ 'flapjacks',
     'flapjacks',
     'hotcakes',
     'flapjacks',
     'griddle cakes',
     'hotcakes',
     'hotcakes',
     'slapjacks',
     'flapjacks',
     'flapjacks',
     'slapjacks',
     'hotcakes',
     'griddle cakes',
     'slapjacks',
     'flapjacks',
     'hotcakes',
     'hotcakes',
     'flapjacks',
     'pancakes',
     'hotcakes',
     'pancakes',
     'pancakes',
     'griddle cakes',
     'slapjacks',
     'slapjacks',
     'hotcakes',
     'griddle cakes',
     'slapjacks',
     'griddle cakes',
     'pancakes',
     'slapjacks',
     'pancakes',
     'griddle cakes',
     'flapjacks',
     'flapjacks',
     'hotcakes',
     'griddle cakes',
     'hotcakes',
     'hotcakes',
     'flapjacks',
     'flapjacks',
     'slapjacks',
     'pancakes',
     'flapjacks',
     'slapjacks',
     'griddle cakes',
     'hotcakes',
     'pancakes',
     'pancakes',
     'slapjacks',
     'slapjacks',
     'pancakes',
     'flapjacks',
     'griddle cakes',
     'hotcakes',
     'pancakes',
     'slapjacks',
     'slapjacks',
     'flapjacks',
     'flapjacks',
     'pancakes',
     'hotcakes',
     'pancakes',
     'hotcakes',
     'flapjacks',
     'hotcakes',
     'griddle cakes',
     'flapjacks',
     'flapjacks',
     'flapjacks',
     'pancakes',
     'flapjacks',
     'pancakes',
     'griddle cakes',
     'griddle cakes',
     'flapjacks',
     'pancakes',
     'griddle cakes',
     'pancakes',
     'hotcakes',
     'flapjacks',
     'pancakes',
     'flapjacks',
     'slapjacks',
     'hotcakes',
     'griddle cakes',
     'pancakes',
     'griddle cakes',
     'pancakes',
     'slapjacks',
     'flapjacks',
     'griddle cakes',
     'slapjacks',
     'slapjacks',
     'slapjacks',
     'hotcakes',
     'flapjacks',
     'hotcakes',
     'griddle cakes',
     'flapjacks',
     ... 50 more items ],
  __actions__: [],
  __chain__: false,
  __index__: 0,
  __values__: undefined }
01:18:34am Add synonym> PASS


    */
  });




});



/*

TODO 

enter text, select text, insert branch.  

1.  create lots of rules and verify output in Review page.
2.  create deepy nested branches and verify output.
3.  create a branch with a synonym and verify.

*/