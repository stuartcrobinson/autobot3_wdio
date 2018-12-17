// @ts-check
import { countBy } from 'lodash';
import { expect } from 'chai';
import { AquiferAssert } from '../../../../aquifer/AquiferAssert';
import { Load } from '../../../hooks';
import { log } from '../../../../aquifer/AquiferLog';
import { editorPage } from '../../../ui-model/wordsmith/editor/editor.page';
import { reviewPage } from '../../../ui-model/wordsmith/editor/review.page';
import { editSynonymPage } from '../../../ui-model/wordsmith/editor/segmentEditors/editSynonym.page';
import { header } from '../../../ui-model/wordsmith/misc/component/header.cont';
import { sidebar } from '../../../ui-model/wordsmith/misc/component/sideBar.cont';

expect(1).to.be.lessThan(50);

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
    AquiferAssert.valueEquals(() => editorPage.getLastSegmentText(), 'pancakes', 'last segment text');
  });
  it('deleting all variations should delete the synonym ', () => {
    editorPage.segmentWithText('pancakes').click_waitForChange();
    editSynonymPage.deleteButton.clickAll_disappearing();
  });

  it('create new from highlighted text', () => {
    const content = 'moar pancakes please';

    editorPage.editor.clickAndType(content);

    editorPage.keys('ArrowLeft', 7, 'Shift', 1, 'ArrowLeft', 8, 'Shift', 1);

    // browser
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft');

    // browser
    //   .keys('Shift')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft')
    //   .keys('ArrowLeft');

    // browser
    //   .keys('Shift'); // releases shift probably?

    editorPage.toolbar.addSynonymButton.click_waitForChange();

    editSynonymPage.highlightedPreviewSpan.waitForText('pancakes');
  });
  it('change first synonym', () => {
    editSynonymPage.keys(['Alt', 'Shift', 'ArrowLeft', 'Delete', 'Alt', 'Shift']);

    // browser
    //   .keys('Alt')
    //   .keys('Shift')
    //   .keys('ArrowLeft')
    //   .keys('Delete');

    // browser
    //   .keys('Alt')
    //   .keys('Shift');

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
    editSynonymPage.keys(['Alt', 'ArrowRight', 'Shift', 'ArrowLeft', 'Delete', 'Alt', 'Shift']);

    // browser
    //   .keys('Alt')
    //   .keys('ArrowRight')
    //   .keys('Shift')
    //   .keys('ArrowLeft')
    //   .keys('Delete');

    // // releases pressed keys:
    // browser
    //   .keys('Alt')
    //   .keys('Shift');

    editSynonymPage.getNthSynonymBox(3).textInput.clickAndType('hotcakes');
    editSynonymPage.highlightedPreviewSpan.waitForText('hotcakes', 2000);
    editSynonymPage.toolbar.addSynonymButton.hover();
    editSynonymPage.checkVisual(header, sidebar.liveChatLink);
    AquiferAssert.visualTestsPassed();
  });
  it('close segment editor after save and confirm main editor segment text', () => {
    header.savedDiv.waitForExist(10000);
    editSynonymPage.doneButton.click_waitForNotExisting();
    editorPage.segmentWithText('slapjacks').waitForExist();
  });

  describe('Confirm random synonym distribution in review', () => {
    it('click Review tab', () => {
      editorPage.sidebar.reviewLink.click_waitForChange();
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
      log.logPrefixedText('📊 Confirm reasonable synonym distribution.');
      const counts = countBy(synonyms);
      Object.values(counts).forEach((value) => {
        console.log('value awe8fidsfusf');
        console.log(value);
        expect(value).to.be.lessThan(50);
        expect(value).to.be.greaterThan(10);
      });
    });
  });
});
