// @ts-check
import { AutobotAssert } from '../../../../autobot_framework/support/AutobotAssert';
import { Load } from '../../../../autobot_framework/support/hooks';
import { key } from '../../../../autobot_framework/support/Key';
import { editorPage } from '../../../ui-model/wordsmith/editor/editor.page';
import { editDataNumberComp } from '../../../ui-model/wordsmith/editor/segmentEditors/dataEditors/editDataNumber.comp';
import { editBranchComp } from '../../../ui-model/wordsmith/editor/segmentEditors/editBranch.comp';
import { editSynonymComp } from '../../../ui-model/wordsmith/editor/segmentEditors/editSynonym.comp';
import { header } from '../../../ui-model/wordsmith/misc/component/header.comp';


// describe('Test', () => {

// done
describe('Branches:', () => {
  before(() => { Load.newTemplateEditorUsingDataFile("resources/eachDataType_date2.csv"); });

  // it('delete a new empty branch', () => {
  //   editorPage.toolbar.addBranchButton.click();
  //   editBranchComp.getNthBranchBox(1).trashButton.click_waitForNotExisting(); //test trash icon for single rule
  //   editorPage.waitForLoad();
  // });
  // it('create and delete a new rule', () => {
  //   editorPage.toolbar.addBranchButton.click();
  //   editBranchComp.getNthBranchBox(1).conditionLabel.click();
  //   editBranchComp.addAnotherRuleLink.click();
  //   editBranchComp.getNthBranchBox(2).conditionLabel.click();
  //   editBranchComp.getNthBranchBox(2).trashButton.click_waitForNotExisting();
  // });

  // it('fill out valid condition, text, and description for first rule', () => {
  //   editBranchComp.getNthBranchBox(1).conditionLabel.click(); //to close dropdown
  //   editBranchComp.getNthBranchBox(1).conditionError.waitForExist();
  //   editBranchComp.getNthBranchBox(1).conditionTextarea.click();
  //   editBranchComp.keys([key.DOWN, key.ENTER, key.DOWN, key.ENTER, key.DOWN, key.ENTER, key.TAB, 'cheeto']);
  //   editBranchComp.highlightedPreviewSpan.waitForText('cheeto');
  //   editBranchComp.getNthBranchBox(1).hover().elipsisDropdown.click_waitForChange();
  //   editBranchComp.getNthBranchBox(1).elipsisDropdown_AddDescription.click_waitForNotExisting();
  //   editBranchComp.keys('Dangerously cheesy ™');
  // });

  // it('add and fill out another rule', () => {
  //   editBranchComp.addAnotherRuleLink.click();
  //   editBranchComp.getNthBranchBox(2).conditionTextarea.waitForExist();  //don't click - cursor should already be at condition input
  //   editBranchComp.keys([key.DOWN, key.DOWN, key.ENTER, key.ENTER, key.DOWN, key.ENTER, key.TAB, 'cheeto']);
  //   editBranchComp.getNthBranchBox(2).hover().elipsisDropdown.click_waitForChange();
  //   editBranchComp.getNthBranchBox(2).elipsisDropdown_AddDescription.click_waitForNotExisting();
  //   editBranchComp.keys('A safe level of cheese ™'); // down down enter enter down enter tab cheez-it
  // });

  // it('preview should display new rule text', () => {
  //   editBranchComp.highlightedPreviewSpan.waitForText('cheez-it');
  // });

  // it('clicking first rule should change preview text', () => {
  //   editBranchComp.getNthBranchBox(1).editorInput.click();
  //   editSynonymComp.highlightedPreviewSpan.waitForText('cheeto');
  // });

  // it('rule descriptions should be saved', () => {
  //   editBranchComp.getNthBranchBox(1).descriptionSpan.waitForText('Dangerously cheesy ™');
  //   editBranchComp.getNthBranchBox(2).descriptionSpan.waitForText('A safe level of cheese ™');
  // });

  // it('drag and drop 2nd rule to 1st rule position', () => {
  //   editBranchComp.getNthBranchBox(1).bulletHandle.dragAndDropTo(editBranchComp.getNthBranchBox(2).bulletHandle);
  //   editBranchComp.getNthBranchBox(1).editorInput.waitForText('cheez-it');
  //   editBranchComp.getNthBranchBox(2).editorInput.waitForText('cheeto');
  // });

  // it('duplicate a rule', () => {
  //   editBranchComp.getNthBranchBox(1).hover().elipsisDropdown.click_waitForChange();
  //   editBranchComp.getNthBranchBox(1).elipsisDropdown_DuplicateRule.click_waitForNotExisting();

  //   //check condition, description, and editor content of 1st 2 rules - should match

  //   editBranchComp.getNthBranchBox(1).conditionTextarea.waitForText(
  //     editBranchComp.getNthBranchBox(2).conditionTextarea.getWebElement().getText()
  //   );
  //   //test duplication - still broken in prod ??
  //   // TODO https://autoin.atlassian.net/browse/QS-302 
  //   // 
  //   //   editBranchComp.getNthBranchBox(1).descriptionSpan.waitForText(
  //   //   editBranchComp.getNthBranchBox(2).descriptionSpan.getWebElement().getText()
  //   // );
  //   // 
  //   //   editBranchComp.getNthBranchBox(1).editorInput,
  //   //   editBranchComp.getNthBranchBox(2).editorInput.getWebElement().getText()
  //   // );
  // });

  // it('editor should show top rule text after waiting for save and closing', () => {
  //   header.savedDiv.waitForExist(10000);
  //   editDataNumberComp.doneButton.click_waitForNotExisting();
  //   AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'cheez-it', 'last segment text');
  // });

  it('open new branch from highlighted text', () => {

    const content = "moar meiji please";

    editorPage.editor.clickAndType(content);

    editorPage.keys("ArrowLeft", 7, "Shift", 1, "ArrowLeft", 5, "Shift", 1)

    editorPage.toolbar.addBranchButton.click_waitForChange();

    editBranchComp.highlightedPreviewSpan.waitForText('meiji');
  });

  it('click away and confirm empty rule condition error', () => {
    editBranchComp.getNthBranchBox(1).conditionLabel.click_waitForChange();
    editBranchComp.getNthBranchBox(1).conditionError.waitForText(editBranchComp.YOUR_RULE_IS_EMPTY_MSG);
  });

  // it('enter string condition and confirm "...no data variable..." error', () => {
  //   editBranchComp.getNthBranchBox(1).conditionTextarea.setValue('what is the meaning of life');
  //   editBranchComp.getNthBranchBox(1).conditionLabel.click_waitForChange();
  //   editBranchComp.getNthBranchBox(1).conditionError.waitForText(editBranchComp.no_data_msg('what'));
  // });

  // it('enter numeric condition and confirm "...Number result" error', () => {
  //   editBranchComp.getNthBranchBox(1).conditionTextarea.setValue('42');
  //   editBranchComp.getNthBranchBox(1).conditionLabel.click_waitForChange();
  //   editBranchComp.getNthBranchBox(1).conditionError.waitForText(editBranchComp.NUMBER_RESULT_MSG);
  // });

  // it('enter problematic condition and confirm "problem with syntax" error', () => {
  //   editBranchComp.getNthBranchBox(1).conditionTextarea.setValue("string string");
  //   editBranchComp.getNthBranchBox(1).conditionLabel.click_waitForChange();
  //   editBranchComp.getNthBranchBox(1).conditionError.waitForText(editBranchComp.PROBLEM_WITH_SYNTAX_MSG);
  // });

  it('change rule text', () => {
    editBranchComp.getNthBranchBox(1).editorInput.setValue('pocky');

    editBranchComp.getNthBranchBox(1).editorInput.clear();
    editBranchComp.getNthBranchBox(1).editorInput.keys('hello')
    editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE);

    editBranchComp.getNthBranchBox(1).editorInput.keys('hi')
    // editBranchComp.keys(['Alt', 'Shift', 'ArrowLeft', 'Delete', 'Alt', 'Shift']);

    // browser
    //   .keys("Alt")
    //   .keys("Shift")
    //   .keys("ArrowLeft")
    //   .keys("Delete")

    // browser
    //   .keys("Alt")
    //   .keys("Shift")

    // editSynonymComp.getNthSynonymBox(1).textInput.clickAndType('pocky');
    editBranchComp.highlightedPreviewSpan.waitForText('pocky');
  });

  it('"branch is invalid" modal should appear after clicking Done', () => {
    header.savedDiv.waitForExist(10000);
    editDataNumberComp.doneButton.click_waitForChange();
    editDataNumberComp.modalYesButton.click_waitForNotExisting();
  });

  it('edited invalid branch text should be visible in editor after closing modal', () => {
    editorPage.invalidSegmentWithText("pocky").waitForExist();
  });

});

/*

TODO 

enter text, select text, insert branch.  

1.  create lots of rules and verify output in Review page.
2.  create deepy nested branches and verify output.
3.  create a branch with a synonym and verify.

*/