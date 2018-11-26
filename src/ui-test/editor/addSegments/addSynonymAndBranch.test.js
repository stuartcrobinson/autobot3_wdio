// @ts-check
import { autobotBrowser } from '../../../../autobot_framework/autobot';
import { AutobotAssert } from '../../../../autobot_framework/support/AutobotAssert';
import { Load } from '../../../../autobot_framework/support/hooks';
import { editorPage } from '../../../ui-model/wordsmith/editor/editor.page';
import { editDataNumberComp } from '../../../ui-model/wordsmith/editor/segmentEditors/dataEditors/editDataNumber.comp';
import { editBranchComp } from '../../../ui-model/wordsmith/editor/segmentEditors/editBranch.comp';
import { editSynonymComp } from '../../../ui-model/wordsmith/editor/segmentEditors/editSynonym.comp';
import { header } from '../../../ui-model/wordsmith/misc/component/header.comp';


describe('Add new segment: ', () => {
  before(() => { Load.newTemplateEditor(); });

  describe('synonym,', () => {
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
      editDataNumberComp.doneButton.click_waitForNotExisting();
      AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'pancakes', 'last segment text');
    });
  });

  describe('branch, ', () => {

    it('delete it', () => {
      editorPage.toolbar.addBranchButton.click();
      editBranchComp.getNthBranchBox(1).trashButton.click_waitForNotExisting(); //test trash icon for single rule
      editorPage.waitForLoad();
    });
    it('create and delete a new rule', () => {
      editorPage.toolbar.addBranchButton.click();
      editBranchComp.getNthBranchBox(1).conditionLabel.click();
      editBranchComp.addAnotherRuleLink.click();
      editBranchComp.getNthBranchBox(2).conditionLabel.click();
      editBranchComp.getNthBranchBox(2).trashButton.click_waitForNotExisting();
    });

    it('fill out valid condition, text, and description for first rule', () => {
      editBranchComp.getNthBranchBox(1).conditionLabel.click(); //to close dropdown
      editBranchComp.getNthBranchBox(1).conditionError.waitForExist();
      editBranchComp.getNthBranchBox(1).conditionTextarea.click();
      autobotBrowser.keys('\uE015\uE007\uE015\uE007\uE015\uE007\uE004cheeto'); // down enter down enter down enter tab cheeto
      editSynonymComp.highlightedPreviewSpan.waitForText('cheeto');
      editBranchComp.getNthBranchBox(1).hover().elipsisDropdown.click_waitForChange();
      editBranchComp.getNthBranchBox(1).elipsisDropdown_AddDescription.click_waitForNotExisting();
      autobotBrowser.keys('Dangerously cheesy ™');
    });

    it('add and fill out another rule', () => {
      editBranchComp.addAnotherRuleLink.click();
      editBranchComp.getNthBranchBox(2).conditionTextarea.waitForExist();  //don't click - cursor should already be at condition input
      autobotBrowser.keys('\uE015\uE015\uE007\uE007\uE015\uE007\uE004cheez-it'); // down down enter enter down enter tab cheez-it
      editBranchComp.getNthBranchBox(2).hover().elipsisDropdown.click_waitForChange();
      editBranchComp.getNthBranchBox(2).elipsisDropdown_AddDescription.click_waitForNotExisting();
      autobotBrowser.keys('A safe level of cheese ™'); // down down enter enter down enter tab cheez-it
    });

    it('preview should display new rule text', () => {
      editSynonymComp.highlightedPreviewSpan.waitForText('cheez-it');
    });

    it('clicking first rule should change preview text', () => {
      editBranchComp.getNthBranchBox(1).editorInput.click();
      editSynonymComp.highlightedPreviewSpan.waitForText('cheeto');
    });

    it('rule descriptions should be saved', () => {
      editBranchComp.getNthBranchBox(1).descriptionSpan.waitForText('Dangerously cheesy ™');
      editBranchComp.getNthBranchBox(2).descriptionSpan.waitForText('A safe level of cheese ™');
    });

    it('drag and drop 2nd rule to 1st rule position', () => {
      editBranchComp.getNthBranchBox(1).bulletHandle.dragAndDropTo(editBranchComp.getNthBranchBox(2).bulletHandle);
      editBranchComp.getNthBranchBox(1).editorInput.waitForText('cheez-it');
      editBranchComp.getNthBranchBox(2).editorInput.waitForText('cheeto');
    });

    it('duplicate a rule', () => {
      editBranchComp.getNthBranchBox(1).hover().elipsisDropdown.click_waitForChange();
      editBranchComp.getNthBranchBox(1).elipsisDropdown_DuplicateRule.click_waitForNotExisting();

      //check condition, description, and editor content of 1st 2 rules - should match

      editBranchComp.getNthBranchBox(1).conditionTextarea.waitForText(
        editBranchComp.getNthBranchBox(2).conditionTextarea.getWebElement().getText()
      );
      //test duplication - still broken in prod ??
      // TODO https://autoin.atlassian.net/browse/QS-302 
      // 
      //   editBranchComp.getNthBranchBox(1).descriptionSpan.waitForText(
      //   editBranchComp.getNthBranchBox(2).descriptionSpan.getWebElement().getText()
      // );
      // 
      //   editBranchComp.getNthBranchBox(1).editorInput,
      //   editBranchComp.getNthBranchBox(2).editorInput.getWebElement().getText()
      // );
    });

    it('editor should show top rule text after waiting for save and closing', () => {
      header.savedDiv.waitForExist(10000);
      editDataNumberComp.doneButton.click_waitForNotExisting();
      AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'cheez-it', 'last segment text');
    });
  });
});
