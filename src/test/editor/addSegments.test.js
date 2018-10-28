// @ts-check
import { assert } from 'chai';
import {
  AutobotAssert,
  // livy,
  options,
  autobotBrowser
} from '../../../autobot_framework/autobot';
import { editorPage } from '../../support/wordsmith/editor/editor.page';
import { editDataNumberComp } from '../../support/wordsmith/editor/segmentEditors/dataEditors/editDataNumber.comp';
import { editSynonymComp } from '../../support/wordsmith/editor/segmentEditors/editSynonym.comp';
import { header } from '../../support/wordsmith/misc/component/header.comp';
import { loginPage } from '../../support/wordsmith/misc/page/login.page';
import { editBranchComp } from '../../support/wordsmith/editor/segmentEditors/editBranch.comp';

describe('Add', () => {
  before(() => { loginPage.logIn(options.email, options.password, options.url); });

  before('create project', () => {
    // dashboardPage.newProjectDropdown.click();
    // dashboardPage.uploadCsvDropdownOption.click();
    // createAProjectUploadCsvPage.nameYourProjectField.setValue(`Autobot ${livy.specDate} ${livy.specTime}`);
    // createAProjectUploadCsvPage.fileUploadInput.uploadFile('./resources/eachDataType_date2.csv');
    // editorPage.waitForLoad();

    // browser.url('https://wordsmith.automatedinsights.com/projects/qwerff_1/templates/awegasgfg-template/edit/editor');
    browser.url('https://wordsmith.automatedinsights.com/projects/qwerff_2/templates/awegasgfg-template/edit/editor');

    // // console.log('before assert(editorPage.isLoaded()');


    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');

    // console.log('after assert(editorPage.isLoaded()');
  });

  // done
  it('synonym', () => {
    editorPage.toolbar.addSynonymButton.click();

    editSynonymComp.getNthSynonymBox(1).textInput.setValue('pancakes');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes', 2000);

    editSynonymComp.addAnotherSynonymLink.click();

    editSynonymComp.getNthSynonymBox(2).textInput.setValue('flapjacks');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'flapjacks', 2000);

    editSynonymComp.addAnotherSynonymLink.click();

    editSynonymComp.getNthSynonymBox(3).textInput.setValue('hotcakes');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'hotcakes', 2000);

    editSynonymComp.getNthSynonymBox(3).xCloseButton.click_waitForNotExisting();

    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes', 2000);

    AutobotAssert.elementExists(header.savedDiv, 10000);

    editDataNumberComp.doneButton.click_waitForNotExisting();

    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'pancakes', 'last segment text');
  });



  // done
  it('branch', () => {
    editorPage.toolbar.addBranchButton.click();


    editBranchComp.getNthBranchBox(1).trashButton.click_waitForNotExisting(); //test trash icon for single rule

    editorPage.waitForLoad();

    editorPage.toolbar.addBranchButton.click();

    editBranchComp.getNthBranchBox(1).conditionLabel.click();
    editBranchComp.addAnotherRuleLink.click();
    editBranchComp.getNthBranchBox(2).conditionLabel.click();
    // editBranchComp.getNthBranchBox(2).trashButton.hover();
    editBranchComp.getNthBranchBox(2).trashButton.click_waitForNotExisting();


    editBranchComp.getNthBranchBox(1).conditionLabel.click(); //to close dropdown

    AutobotAssert.elementExists(editBranchComp.getNthBranchBox(1).conditionError);

    editBranchComp.getNthBranchBox(1).conditionTextarea.click();

    autobotBrowser.keys('\uE015\uE007\uE015\uE007\uE015\uE007\uE004cheeto'); // down enter down enter down enter tab cheeto

    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'cheeto');

    editBranchComp.getNthBranchBox(1).hover().elipsisDropdown.click_waitForChange();
    editBranchComp.getNthBranchBox(1).elipsisDropdown_AddDescription.click_waitForNotExisting();
    autobotBrowser.keys('Dangerously cheesy ™'); // down down enter enter down enter tab cheez-it


    editBranchComp.addAnotherRuleLink.click();
    editBranchComp.getNthBranchBox(2).conditionTextarea.waitForExist();  //don't click - cursor should already be at condition input
    autobotBrowser.keys('\uE015\uE015\uE007\uE007\uE015\uE007\uE004cheez-it'); // down down enter enter down enter tab cheez-it
    editBranchComp.getNthBranchBox(2).hover().elipsisDropdown.click_waitForChange();
    editBranchComp.getNthBranchBox(2).elipsisDropdown_AddDescription.click_waitForNotExisting();
    autobotBrowser.keys('A safe level of cheese ™'); // down down enter enter down enter tab cheez-it

    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'cheez-it');

    //make sure preview changes when click different rule
    editBranchComp.getNthBranchBox(1).editorInput.click();
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'cheeto');

    //ensure both descriptions were saved in rules
    AutobotAssert.elementText(editBranchComp.getNthBranchBox(1).descriptionSpan, 'Dangerously cheesy ™');
    AutobotAssert.elementText(editBranchComp.getNthBranchBox(2).descriptionSpan, 'A safe level of cheese ™');


    //test drag
    // editBranchComp.getNthBranchBox(1).bulletHandle.
    autobotBrowser.dragAndDrop(editBranchComp.getNthBranchBox(1).bulletHandle, editBranchComp.getNthBranchBox(2).bulletHandle);

    //check editor contents to make sure rules moved
    AutobotAssert.elementText(editBranchComp.getNthBranchBox(1).editorInput, 'cheez-it');
    AutobotAssert.elementText(editBranchComp.getNthBranchBox(2).editorInput, 'cheeto');


    //test duplication
    editBranchComp.getNthBranchBox(1).hover().elipsisDropdown.click_waitForChange();
    // editBranchComp.getNthBranchBox(1).elipsisDropdown.click_waitForChange();
    editBranchComp.getNthBranchBox(1).elipsisDropdown_DuplicateRule.click_waitForNotExisting();

    //check condition, description, and editor content of 1st 2 rules - should match
    AutobotAssert.elementText(
      editBranchComp.getNthBranchBox(1).conditionTextarea,
      editBranchComp.getNthBranchBox(2).conditionTextarea.getWebElement().getText()
    );
    // TODO https://autoin.atlassian.net/browse/QS-302 
    // AutobotAssert.elementText(
    //   editBranchComp.getNthBranchBox(1).descriptionSpan,
    //   editBranchComp.getNthBranchBox(2).descriptionSpan.getWebElement().getText()
    // );
    // AutobotAssert.elementText(
    //   editBranchComp.getNthBranchBox(1).editorInput,
    //   editBranchComp.getNthBranchBox(2).editorInput.getWebElement().getText()
    // );

    AutobotAssert.elementExists(header.savedDiv, 10000);

    editDataNumberComp.doneButton.click_waitForNotExisting();

    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'cheez-it', 'last segment text');





    // editSynonymComp.getNthSynonymBox(1).textInput.setValue('pancakes');
    // AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes', 2000);

    // editSynonymComp.addAnotherSynonymLink.click();

    // editSynonymComp.getNthSynonymBox(2).textInput.setValue('flapjacks');
    // AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'flapjacks', 2000);

    // editSynonymComp.addAnotherSynonymLink.click();

    // editSynonymComp.getNthSynonymBox(3).textInput.setValue('hotcakes');
    // AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'hotcakes', 2000);

    // editSynonymComp.getNthSynonymBox(3).xCloseButton.click_waitForNotExisting();

    // AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes', 2000);

    // AutobotAssert.elementExists(header.savedDiv, 10000);

    // editDataNumberComp.doneButton.click_waitForNotExisting();

    // AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'pancakes', 'last segment text');
  });


});
