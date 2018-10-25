// @ts-check
import { assert } from 'chai';
import {
  options,
  AutobotAssert,
} from '../../autobot_framework/autobot';
import { editorPage } from '../support/wordsmith/editor/editor.page';
import { editDataNumberComp } from '../support/wordsmith/editor/segmentEditors/dataEditors/editDataText.comp';
// import { createAProjectUploadCsvPage } from '../support/wordsmith/misc/page/createAProjectUploadCsv.page';
// import { dashboardPage } from '../support/wordsmith/misc/page/dashboard.page';
import { loginPage } from '../support/wordsmith/misc/page/login.page';
import { header } from '../support/wordsmith/misc/component/header.comp';

describe('Create a project', () => {
  before(() => { loginPage.logIn(options.email, options.password, options.url); });

  before('create project', () => {
    // dashboardPage.newProjectDropdown.click();
    // dashboardPage.uploadCsvDropdownOption.click();
    // createAProjectUploadCsvPage.nameYourProjectField.setValue(`Autobot ${livy.specDate} ${livy.specTime}`);
    // createAProjectUploadCsvPage.fileUploadInput.uploadFile('./resources/eachDataType.csv');
    // editorPage.waitForLoad();

    // browser.url('https://wordsmith.automatedinsights.com/projects/autobot-20181024-05-23-56pm/templates/autobot-20181024-05-23-56pm-template/edit/editor');
    // browser.url('https://wordsmith.automatedinsights.com/projects/autobot-20181024-04-53-29pm/templates/autobot-20181024-04-53-29pm-template/edit/editor');
    browser.url('https://wordsmith.automatedinsights.com/projects/autobot-20181024-04-59-54pm/templates/autobot-20181024-04-59-54pm-template/edit/editor');
    // browser.url('https://wordsmith.automatedinsights.com/projects/autobot-20181024-05-16-21pm/templates/autobot-20181024-05-16-21pm-template/edit/editor');

    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
  });


  it('data var insert number', () => {
    // editorPage.toolbar.insertDataButton.click();
    // editorPage.toolbar.insertDataDropdown.xCloseButton.click();
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

    //should this be logged?  it's a critical and non-obvious step
    header.savedDiv.waitForExist(); 

    editDataNumberComp.doneButton.click();

    AutobotAssert.elementExists(editorPage.segmentWithText('10 000'));
  });



  it('data var insert number', () => {
    // editorPage.toolbar.insertDataButton.click();
    // editorPage.toolbar.insertDataDropdown.xCloseButton.click();
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

    //should this be logged?  it's a critical and non-obvious step
    header.savedDiv.waitForExist(); 

    editDataNumberComp.doneButton.click();

    AutobotAssert.elementExists(editorPage.segmentWithText('10 000'));
  });
});
