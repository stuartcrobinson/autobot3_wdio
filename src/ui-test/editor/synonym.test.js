      editorPage.segmentWithText("slapjacks").click_waitForChange();
// @ts-check
import { expect } from 'chai';
import { countBy } from 'lodash';
import { livy } from '../../../autobot_framework/autobot';
import { AutobotAssert } from '../../../autobot_framework/support/AutobotAssert';
import { Load } from '../../../autobot_framework/support/hooks';
import { editorPage } from '../../ui-model/wordsmith/editor/editor.page';
import { reviewPage } from '../../ui-model/wordsmith/editor/review.page';
import { editSynonymComp } from '../../ui-model/wordsmith/editor/segmentEditors/editSynonym.comp';
import { header } from '../../ui-model/wordsmith/misc/component/header.comp';
import { sidebar } from '../../ui-model/wordsmith/misc/component/sideBar.comp';

describe('Test', () => {
  before(() => { Load.newTemplateEditorUsingDataFile("resources/eachDataType_date2.csv"); });

  // done
  describe('synonyms, ', () => {

    it('load editor', () => {
      editorPage.toolbar.addSynonymButton.click_waitForChange();
      editSynonymComp.waitForLoad();
    });
    it('new first synonym should display in highlighted content', () => {
      editSynonymComp.getNthSynonymBox(1).textInput.clickAndType('pancakes');
      editSynonymComp.highlightedPreviewSpan.waitForText('pancakes', 2000);
    });
    it('add 2 more synonyms', () => {
      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(2).textInput.clickAndType('flapjacks');
      editSynonymComp.highlightedPreviewSpan.waitForText('flapjacks', 2000);

      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(3).textInput.clickAndType('hotcakes');
      editSynonymComp.highlightedPreviewSpan.waitForText('hotcakes', 2000);
    });
    it('delete a synonym', () => {
      editSynonymComp.getNthSynonymBox(3).xCloseButton.click_waitForNotExisting();
      editSynonymComp.highlightedPreviewSpan.waitForText('pancakes', 2000);
    });
    it('highlighted content should change per synonym click', () => {
      editSynonymComp.getNthSynonymBox(2).click_waitForChange();
      editSynonymComp.highlightedPreviewSpan.waitForText('flapjacks', 2000);

      editSynonymComp.getNthSynonymBox(1).click_waitForChange();
      editSynonymComp.highlightedPreviewSpan.waitForText('pancakes', 2000);
    });
    it('main editor should display first synonym', () => {
      header.savedDiv.waitForExist(10000);
      editSynonymComp.doneButton.click_waitForNotExisting();
      AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'pancakes', 'last segment text');
    });
    it('deleting all variations should delete the synonym ', () => {
    
      editorPage.segmentWithText("pancakes").click_waitForChange();
      editSynonymComp.deleteButton.clickAll();

      

    
    });

    it('create new from highlighted text', () => {

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

      editSynonymComp.highlightedPreviewSpan.waitForText('pancakes');

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
      editSynonymComp.highlightedPreviewSpan.waitForText('slapjacks');
    });
    it('add more synonyms', () => {

      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(2).textInput.clickAndType('flapjacks');
      editSynonymComp.highlightedPreviewSpan.waitForText('flapjacks');

      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(3).textInput.clickAndType('oladyi');
      editSynonymComp.highlightedPreviewSpan.waitForText('oladyi');

      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(4).textInput.clickAndType('pancakes');
      editSynonymComp.highlightedPreviewSpan.waitForText('pancakes');

      editSynonymComp.addAnotherSynonymLink.click();
      editSynonymComp.getNthSynonymBox(5).textInput.clickAndType('griddle cakes');
      editSynonymComp.highlightedPreviewSpan.waitForText('griddle cakes');

    });
    it('close after saving and confirm changed first synonym', () => {
      header.savedDiv.waitForExist(10000);
      editSynonymComp.doneButton.click_waitForNotExisting();
      editorPage.segmentWithText("slapjacks").waitForExist();
    });
    it('open existing synonym', () => {
      editorPage.segmentWithText("slapjacks").click_waitForChange();
      editSynonymComp.waitForExist();
    });
    it('change a different synonym', () => {
      editSynonymComp.getNthSynonymBox(3).textInput.click();

      browser
        .keys("Alt")
        .keys("ArrowRight")
        .keys("Shift")
        .keys("ArrowLeft")
        .keys("Delete")

      //releases pressed keys:
      browser
        .keys("Alt")
        .keys("Shift")

      editSynonymComp.getNthSynonymBox(3).textInput.clickAndType('hotcakes');
      editSynonymComp.highlightedPreviewSpan.waitForText('hotcakes', 2000);
    });
    it('close segment editor after save and confirm main editor segment text', () => {
      header.savedDiv.waitForExist(10000);
      editSynonymComp.doneButton.click_waitForNotExisting();
      editorPage.segmentWithText('slapjacks').waitForExist();
    });

    describe('Confirm random synonym distribution in review', () => {

      it('click Review tab', () => {
        sidebar.reviewLink.click_waitForChange();
        reviewPage.showAllLink.click_waitForChange();
      });

      it('check the run stats', () => {
        reviewPage.avgWordsValueDiv.waitForText("3");
        reviewPage.maxWordsValueDiv.waitForText("4");
        reviewPage.minWordsValueDiv.waitForText("3");
        reviewPage.maxCharsValueDiv.waitForText("25");
        reviewPage.readingTimesValueDiv.waitForText("1s");
        reviewPage.gradeLevelReadabilityValueDiv.waitForText("-");
        reviewPage.variabilityScoreValueDiv.waitForText("30");
      });

      let synonyms = []

      it('randomize rows #TODO confirm randomized', () => {
        synonyms = synonyms.concat(reviewPage.getNthSegmentSpan(2).getTexts());
        reviewPage.randomizeRows_turnOn();
      });

      it('Show All and save to array #TODO confirm showing all', () => {
        reviewPage.showAllLink.click_waitForChange();
        synonyms = synonyms.concat(reviewPage.getNthSegmentSpan(2).getTexts());
      });


      it('generate new rows', () => {
        reviewPage.generate50NewRowsLink.click_waitForChange();
        reviewPage.showAllLink.click_waitForChange();
        synonyms = synonyms.concat(reviewPage.getNthSegmentSpan(2).getTexts());
      });
      it('check distribution', () => {
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
});



/*

TODO 

enter text, select text, insert branch.  

1.  create lots of rules and verify output in Review page.
2.  create deepy nested branches and verify output.
3.  create a branch with a synonym and verify.

*/