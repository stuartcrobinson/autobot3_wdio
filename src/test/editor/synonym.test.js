// @ts-check
import { expect } from 'chai';
import { countBy } from 'lodash';
import { autobotBrowser, livy } from '../../../autobot_framework/autobot';
import { AutobotAssert } from '../../../autobot_framework/support/AutobotAssert';
import { Load } from '../../../autobot_framework/support/hooks';
import { editorPage } from '../../support/wordsmith/editor/editor.page';
import { reviewPage } from '../../support/wordsmith/editor/review.page';
import { editDataNumberComp } from '../../support/wordsmith/editor/segmentEditors/dataEditors/editDataNumber.comp';
import { editSynonymComp } from '../../support/wordsmith/editor/segmentEditors/editSynonym.comp';
import { header } from '../../support/wordsmith/misc/component/header.comp';
import { sidebar } from '../../support/wordsmith/misc/component/sideBar.comp';
describe('Test', () => {
  before(() => { Load.newTemplateEditorUsingDataFile("resources/eachDataType_date2.csv"); });

  // done
  describe('synonyms, ', () => {
    it('highlighting text and clicking Add Synonym should initialize editor', () => {

      const content = "moar pancakes please";

      editorPage.editor.clickAndType(content);

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


      editorPage.toolbar.addSynonymButton.click_waitForChange();

      AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes');

    });
    it('change first synonym', () => {
      browser
        .keys("Alt")
        .keys("Shift")
        .keys("ArrowLeft")
        .keys("Delete")

      browser
        .keys("Alt")
        .keys("Shift")

      editSynonymComp.getNthSynonymBox(1).textInput.clickAndType('slapjacks');
      AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'slapjacks');

    });
    it('add more synonyms', () => {

      //add more synonyms
      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(2).textInput.clickAndType('flapjacks');
      AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'flapjacks');

      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(3).textInput.clickAndType('oladyi');
      AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'oladyi');

      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(4).textInput.clickAndType('pancakes');
      AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes');

      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(5).textInput.clickAndType('griddle cakes');
      AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'griddle cakes');

    });
    it('close after saving and confirm changed first synonym', () => {
      AutobotAssert.elementExists(header.savedDiv, 10000);
      editDataNumberComp.doneButton.click_waitForNotExisting();
      AutobotAssert.elementExists(editorPage.segmentWithText("slapjacks"));
    });
    it('open existing synonym', () => {
      editorPage.segmentWithText("slapjacks").click_waitForChange();
      AutobotAssert.elementExists(editSynonymComp);
    });
    it('asdf', () => {
    });
    it('asdf', () => {
      
    });
    it('asdf', () => {
      
    });
    it('asdf', () => {
      
    });
    it('asdf', () => {
      
    });
    it('asdf', () => {
      

/*










TODO START HERE













*/

// start here 
// start here 
// start here 
// start here 
// start here 
// start here 
// start here 
// start here 
// start here 
// start here 
// start here 
// start here 
// start here 
// start here 
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

      livy.logMessage("Confirm reasonable synonym distribution.")
      const counts = countBy(synonyms);
      try {
        //@ts-ignore
        for (const value of Object.values(counts)) {
          expect(value).to.be.lessThan(50);
          expect(value).to.be.greaterThan(10);
        }
      } catch (err) {
        livy.logMessage(JSON.stringify(err));
        throw new Error("Weird synonym distribution: " + JSON.stringify(counts));
      }

    });
  });




});



/*

TODO 

enter text, select text, insert branch.  

1.  create lots of rules and verify output in Review page.
2.  create deepy nested branches and verify output.
3.  create a branch with a synonym and verify.

*/