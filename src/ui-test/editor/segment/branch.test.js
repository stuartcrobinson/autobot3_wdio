// @ts-check
import { AutobotAssert } from '../../../../autobot_framework/support/AutobotAssert';
import { Load } from '../../../../autobot_framework/support/hooks';
import { key } from '../../../../autobot_framework/support/Key';
import { livy } from '../../../../autobot_framework/support/Livy';
import { editorPage } from '../../../ui-model/wordsmith/editor/editor.page';
import { editBranchPage } from '../../../ui-model/wordsmith/editor/segmentEditors/editBranch.page';
import { header } from '../../../ui-model/wordsmith/misc/component/header.cont';
import { modal } from '../../../ui-model/wordsmith/misc/component/modal.cont';
import { sidebar } from '../../../ui-model/wordsmith/misc/component/sideBar.cont';

describe('Branches:', () => {
  before(() => { Load.newTemplateEditorUsingDataFile('resources/eachDataType_date2.csv'); });

  it('delete a new empty branch', () => {
    editorPage.toolbar.addBranchButton.click();
    editBranchPage.checkVisual(header, sidebar.liveChatLink);
    editBranchPage.getNthBranchBox(1).trashButton.click_waitForNotExisting(); // test trash icon for single rule
    editorPage.waitForLoad();
    AutobotAssert.visualTestsPassed();
  });

  it('create and delete a new rule', () => {
    editorPage.toolbar.addBranchButton.click();
    editBranchPage.getNthBranchBox(1).conditionLabel.click();
    editBranchPage.addAnotherRuleLink.click();
    editBranchPage.getNthBranchBox(2).conditionLabel.click();
    editBranchPage.scrollUp().checkVisual(header, sidebar.liveChatLink);
    editBranchPage.getNthBranchBox(2).trashButton.click_waitForNotExisting();
    AutobotAssert.visualTestsPassed();
  });

  it('fill out first rule', () => {
    editBranchPage.getNthBranchBox(1).conditionTextarea.keys([key.DOWN, key.ENTER], 3, [key.TAB, 'cheeto'], 1);
    editBranchPage.highlightedPreviewSpan.waitForText('cheeto');
    editBranchPage.getNthBranchBox(1).hover().elipsisDropdown.click_waitForChange();
    editBranchPage.getNthBranchBox(1).checkVisual();

    // //TODO - implement soft asserts for visual testing.  don't stop the test if it fails.  just display diff image and somehow fail the test after all code completed
    // TODO - implement soft asserts for visual testing.  don't stop the test if it fails.  just display diff image and somehow fail the test after all code completed
    // TODO - implement soft asserts for visual testing.  don't stop the test if it fails.  just display diff image and somehow fail the test after all code completed
    // TODO - implement soft asserts for visual testing.  don't stop the test if it fails.  just display diff image and somehow fail the test after all code completed
    // TODO - implement soft asserts for visual testing.  don't stop the test if it fails.  just display diff image and somehow fail the test after all code completed
    // TODO - implement soft asserts for visual testing.  don't stop the test if it fails.  just display diff image and somehow fail the test after all code completed
    // TODO - implement soft asserts for visual testing.  don't stop the test if it fails.  just display diff image and somehow fail the test after all code completed
    // TODO - implement soft asserts for visual testing.  don't stop the test if it fails.  just display diff image and somehow fail the test after all code completed
    // TODO - implement soft asserts for visual testing.  don't stop the test if it fails.  just display diff image and somehow fail the test after all code completed


    editBranchPage.getNthBranchBox(1).elipsisDropdown_AddDescription.click_waitForNotExisting();
    editBranchPage.keys('Dangerously cheesy ™');
    editBranchPage.getNthBranchBox(1).descriptionSpan.waitForText('Dangerously cheesy ™');

    AutobotAssert.visualTestsPassed();
  });

  it('add and fill out another rule - preview should update', () => {
    editBranchPage.addAnotherRuleLink.click();
    editBranchPage.getNthBranchBox(2).conditionTextarea.keys(key.DOWN, 2, key.ENTER, 2, [key.DOWN, key.ENTER, key.TAB, 'cheez-it'], 1);

    editBranchPage.getNthBranchBox(2).hover().elipsisDropdown.click_waitForChange();
    editBranchPage.getNthBranchBox(2).elipsisDropdown_AddDescription.click_waitForNotExisting();
    editBranchPage.keys('A safe level of cheese ™');
    editBranchPage.highlightedPreviewSpan.waitForText('cheez-it');
    editBranchPage.getNthBranchBox(2).descriptionSpan.waitForText('A safe level of cheese ™');
  });

  // it('clicking first rule should change preview text', () => {
  //   editBranchPage.getNthBranchBox(1).editorInput.click();
  //   editBranchPage.highlightedPreviewSpan.waitForText('cheeto');
  // });

  // it('drag and drop 2nd rule to 1st rule position', () => {
  //   editBranchPage.getNthBranchBox(1).bulletHandle.dragAndDropTo(editBranchPage.getNthBranchBox(2).bulletHandle);
  //   editBranchPage.getNthBranchBox(1).editorInput.waitForText('cheez-it');
  //   editBranchPage.getNthBranchBox(2).editorInput.waitForText('cheeto');
  // });

  // it('duplicate a rule', () => {
  //   editBranchPage.getNthBranchBox(1).hover().elipsisDropdown.click_waitForChange();
  //   editBranchPage.getNthBranchBox(1).elipsisDropdown_DuplicateRule.click_waitForNotExisting();

  //   //check condition, description, and editor content of 1st 2 rules - should match

  //   editBranchPage.getNthBranchBox(1).conditionTextarea.waitForText(
  //     editBranchPage.getNthBranchBox(2).conditionTextarea.getWebElement().getText()
  //   );
  //   livy.logAction2([
  //     { text: '🤦 ', style: livy.style.emoji },
  //     { text: 'branch rule copy: not copying description ', style: livy.style.object_red },
  //     { text: 'https://autoin.atlassian.net/browse/QS-302 ', style: livy.style.selector_red },
  //     { text: 'https://autoin.atlassian.net/browse/WS-2282', style: livy.style.selector_red },
  //   ]);
  //   livy.logAction2([
  //     { text: '🤦 ', style: livy.style.emoji },
  //     { text: 'branch rule copy: not copying text ', style: livy.style.object_red },
  //     { text: 'https://autoin.atlassian.net/browse/QS-302 ', style: livy.style.selector_red },
  //     { text: 'https://autoin.atlassian.net/browse/WS-2282', style: livy.style.selector_red },
  //   ]);
  //       // TODO https://autoin.atlassian.net/browse/QS-302
  //   //   editBranchPage.getNthBranchBox(1).descriptionSpan.waitForText(
  //   //   editBranchPage.getNthBranchBox(2).descriptionSpan.getWebElement().getText()
  //   // );
  //   //   editBranchPage.getNthBranchBox(1).editorInput,
  //   //   editBranchPage.getNthBranchBox(2).editorInput.getWebElement().getText()
  //   // );
  // });

  // it('editor should show top rule text after waiting for save and closing', () => {
  //   header.savedDiv.waitForExist(10000);
  //   editBranchPage.doneButton.click_waitForNotExisting();
  //   AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'cheez-it', 'last segment text');
  // });

  // it('open new branch from highlighted text', () => {

  //   const content = "moar meiji please";

  //   editorPage.editor.clickAndType(content);

  //   editorPage.keys("ArrowLeft", 7, "Shift", 1, "ArrowLeft", 5, "Shift", 1)

  //   editorPage.toolbar.addBranchButton.click_waitForChange();

  //   editBranchPage.highlightedPreviewSpan.waitForText('meiji');
  // });

  // it('click away and confirm empty rule condition error', () => {
  //   editBranchPage.getNthBranchBox(1).conditionLabel.click_waitForChange();
  //   editBranchPage.getNthBranchBox(1).conditionError.waitForText(editBranchPage.YOUR_RULE_IS_EMPTY_MSG);
  // });

  // it('enter string condition and confirm "...no data variable..." error', () => {
  //   editBranchPage.getNthBranchBox(1).conditionTextarea.setValue('what is the meaning of life');
  //   editBranchPage.getNthBranchBox(1).conditionLabel.click_waitForChange();
  //   editBranchPage.getNthBranchBox(1).conditionError.waitForText(editBranchPage.no_data_msg('what'));
  // });

  // it('enter numeric condition and confirm "...Number result" error', () => {
  //   editBranchPage.getNthBranchBox(1).conditionTextarea.setValue('42');
  //   editBranchPage.getNthBranchBox(1).conditionLabel.click_waitForChange();
  //   editBranchPage.getNthBranchBox(1).conditionError.waitForText(editBranchPage.NUMBER_RESULT_MSG);
  // });

  // it('enter problematic condition and confirm "problem with syntax" error', () => {
  //   editBranchPage.getNthBranchBox(1).conditionTextarea.setValue("string string");
  //   editBranchPage.getNthBranchBox(1).conditionLabel.click_waitForChange();
  //   editBranchPage.getNthBranchBox(1).conditionError.waitForText(editBranchPage.PROBLEM_WITH_SYNTAX_MSG);
  // });

  // it('change rule text', () => {
  //   editBranchPage.getNthBranchBox(1).editorInput.setValue('pocky');
  //   editBranchPage.highlightedPreviewSpan.waitForText('pocky');
  // });

  // it('"branch is invalid" modal should appear after clicking Done', () => {
  //   header.savedDiv.waitForExist(10000);
  //   editBranchPage.doneButton.click_waitForChange();
  //   editBranchPage.checkVisual(header, sidebar.liveChatLink);
  //   // modal.checkVisual();
  //   // new UiElement('.modal-dialog').checkVisual();
  //   modal.yesButton.click_waitForNotExisting();
  // });

  // it('edited invalid branch text should be visible in editor after closing modal', () => {
  //   editorPage.invalidSegmentWithText("pocky").waitForExist();
  // });
});
