// @ts-check
// @ts-check
import { countBy } from 'lodash';
import { AutobotAssert } from '../../../../autobot_framework/support/AutobotAssert';
import { Load } from '../../../../autobot_framework/support/hooks';
import { livy } from '../../../../autobot_framework/support/Livy';
import { editorPage } from '../../../ui-model/wordsmith/editor/editor.page';
import { reviewPage } from '../../../ui-model/wordsmith/editor/review.page';
import { editSynonymPage } from '../../../ui-model/wordsmith/editor/segmentEditors/editSynonym.page';
import { header } from '../../../ui-model/wordsmith/misc/component/header.cont';
import { sidebar } from '../../../ui-model/wordsmith/misc/component/sideBar.cont';

editorPage.segmentWithText('slapjacks').click_waitForChange();


// done
describe('Synonyms:', () => {
  before(() => { Load.newTemplateEditorUsingDataFile('resources/eachDataType_date2.csv'); });

  it('load synonym editor', () => {
    editorPage.toolbar.addSynonymButton.click_waitForChange();
    editSynonymPage.waitForLoad();
  });
  it('new first synonym should display in highlighted content', () => {
    editSynonymPage.getNthSynonymBox(1).textInput.clickAndType('pancakes');
    editSynonymPage.highlightedPreviewSpan.waitForText('pancakes', 2000);
  });
  it('add 2 more synonyms', () => {
    editSynonymPage.addAnotherSynonymLink.click();
    editSynonymPage.getNthSynonymBox(2).textInput.clickAndType('flapjacks');
    editSynonymPage.highlightedPreviewSpan.waitForText('flapjacks', 2000);

    editSynonymPage.addAnotherSynonymLink.click();
    editSynonymPage.getNthSynonymBox(3).textInput.clickAndType('hotcakes');
    editSynonymPage.highlightedPreviewSpan.waitForText('hotcakes', 2000);
  });
  it('delete a synonym', () => {
    editSynonymPage.getNthSynonymBox(3).xCloseButton.click_waitForNotExisting();
    editSynonymPage.highlightedPreviewSpan.waitForText('pancakes', 2000);
  });
  it('highlighted content should change per synonym click', () => {
    editSynonymPage.getNthSynonymBox(2).click_waitForChange();
    editSynonymPage.highlightedPreviewSpan.waitForText('flapjacks', 2000);

    editSynonymPage.getNthSynonymBox(1).click_waitForChange();
    editSynonymPage.highlightedPreviewSpan.waitForText('pancakes', 2000);
  });
  it('main editor should display first synonym', () => {
    header.savedDiv.waitForExist(10000);
    editSynonymPage.doneButton.click_waitForNotExisting();
    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'pancakes', 'last segment text');
  });
  // it('deleting all variations should delete the synonym ', () => {
  //   editorPage.segmentWithText('pancakes').click_waitForChange();
  //   editSynonymPage.deleteButton.clickAll();
  // });

  it('create new from highlighted text', () => {
    const content = 'moar pancakes please';

    editorPage.editor.clickAndType(content);

    browser
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft');

    browser
      .keys('Shift')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft')
      .keys('ArrowLeft');

    browser
      .keys('Shift'); // releases shift probably?

    editorPage.toolbar.addSynonymButton.click_waitForChange();

    editSynonymPage.highlightedPreviewSpan.waitForText('pancakes');
  });
  it('change first synonym', () => {
    browser
      .keys('Alt')
      .keys('Shift')
      .keys('ArrowLeft')
      .keys('Delete');

    browser
      .keys('Alt')
      .keys('Shift');

    editSynonymPage.getNthSynonymBox(1).textInput.clickAndType('slapjacks');
    editSynonymPage.highlightedPreviewSpan.waitForText('slapjacks');
  });
  it('add more synonyms', () => {
    editSynonymPage.addAnotherSynonymLink.click();
    editSynonymPage.getNthSynonymBox(2).textInput.clickAndType('flapjacks');
    editSynonymPage.highlightedPreviewSpan.waitForText('flapjacks');

    editSynonymPage.addAnotherSynonymLink.click();
    editSynonymPage.getNthSynonymBox(3).textInput.clickAndType('oladyi');
    editSynonymPage.highlightedPreviewSpan.waitForText('oladyi');

    editSynonymPage.addAnotherSynonymLink.click();
    editSynonymPage.getNthSynonymBox(4).textInput.clickAndType('pancakes');
    editSynonymPage.highlightedPreviewSpan.waitForText('pancakes');

    editSynonymPage.addAnotherSynonymLink.click();
    editSynonymPage.getNthSynonymBox(5).textInput.clickAndType('griddle cakes');
    editSynonymPage.highlightedPreviewSpan.waitForText('griddle cakes');
  });
  it('close after saving and confirm changed first synonym', () => {
    header.savedDiv.waitForExist(10000);
    editSynonymPage.doneButton.click_waitForNotExisting();
    editorPage.segmentWithText('slapjacks').waitForExist();
  });
  it('open existing synonym', () => {
    editorPage.segmentWithText('slapjacks').click_waitForChange();
    editSynonymPage.waitForLoad();
  });
  it('change a different synonym', () => {
    editSynonymPage.getNthSynonymBox(3).textInput.click();

    browser
      .keys('Alt')
      .keys('ArrowRight')
      .keys('Shift')
      .keys('ArrowLeft')
      .keys('Delete');

    // releases pressed keys:
    browser
      .keys('Alt')
      .keys('Shift');

    editSynonymPage.getNthSynonymBox(3).textInput.clickAndType('hotcakes');
    editSynonymPage.highlightedPreviewSpan.waitForText('hotcakes', 2000);
  });
  it('close segment editor after save and confirm main editor segment text', () => {
    header.savedDiv.waitForExist(10000);
    editSynonymPage.doneButton.click_waitForNotExisting();
    editorPage.segmentWithText('slapjacks').waitForExist();
  });

  describe('Confirm random synonym distribution in review', () => {
    it('click Review tab', () => {
      sidebar.reviewLink.click_waitForChange();
      reviewPage.showAllLink.click_waitForChange();
    });

    it('check the run stats', () => {
      reviewPage.avgWordsValueDiv.waitForText('3');
      reviewPage.maxWordsValueDiv.waitForText('4');
      reviewPage.minWordsValueDiv.waitForText('3');
      reviewPage.maxCharsValueDiv.waitForText('25');
      reviewPage.readingTimesValueDiv.waitForText('1s');
      reviewPage.gradeLevelReadabilityValueDiv.waitForText('-');
      reviewPage.variabilityScoreValueDiv.waitForText('30');
    });

    let synonyms = [];

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
      livy.logMessage('Confirm reasonable synonym distribution 📊.');
      const counts = countBy(synonyms);
      try {
        // TODO do this differnetly. eslint warning:
        //
        // /Users/stuartrobinson/repos/autobot/src/ui-test/editor/segment/synonym.test.js
        // 194:9  error  iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations  no-restricted-syntax
        // // @ts-ignore
        // for (const value of Object.values(counts)) {
        //   expect(value).to.be.lessThan(50);
        //   expect(value).to.be.greaterThan(10);
        // }
      } catch (err) {
        livy.logMessage(JSON.stringify(err));
        throw new Error(`Weird synonym distribution: ${JSON.stringify(counts)}`);
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
