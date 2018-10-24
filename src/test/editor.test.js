// @ts-check
import { assert } from 'chai';
import { options } from '../../autobot_framework/autobot';
import { editorPage } from '../support/wordsmith/editor/editor.page';
import { editDataNumberComp } from '../support/wordsmith/editor/segmentEditors/dataEditors/editDataNumber.comp';
// import { createAProjectUploadCsvPage } from '../support/wordsmith/misc/page/createAProjectUploadCsv.page';
// import { dashboardPage } from '../support/wordsmith/misc/page/dashboard.page';
import { loginPage } from '../support/wordsmith/misc/page/login.page';

describe('Create a project', () => {
  before(() => { loginPage.logIn(options.email, options.password, options.url); });

  before('create project', () => {
    // dashboardPage.newProjectDropdown.click();
    // dashboardPage.uploadCsvDropdownOption.click();
    // createAProjectUploadCsvPage.nameYourProjectField.setValue(`Autobot ${livy.specDate} ${livy.specTime}`);
    // createAProjectUploadCsvPage.fileUploadInput.uploadFile('./resources/eachDataType.csv');
    // editorPage.waitForLoad();

    browser.url('https://wordsmith.automatedinsights.com/projects/autobot-20181024-05-23-56pm/templates/autobot-20181024-05-23-56pm-template/edit/editor');

    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
  });


  it('data var editor', () => {
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


    browser.waitUntil(() => editDataNumberComp.highlightedPreviewSpan.getWebElement().getText() === '10 000,00', 2000);
    assert.equal(editDataNumberComp.highlightedPreviewSpan.getWebElement().getText(), '10 000,00');

    editDataNumberComp.toggle_stripTrailingZeros.click();

    browser.waitUntil(() => editDataNumberComp.highlightedPreviewSpan.getWebElement().getText() === '10 000', 2000);
    assert.equal(editDataNumberComp.highlightedPreviewSpan.getWebElement().getText(), '10 000');


    /*
    10 000,00

    10 000

<span class="ws-preview-span highlight datavar" style="">10,000</span>

    */

    // browser.pause(100000);
  });
});
