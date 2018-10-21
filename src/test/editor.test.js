// @ts-check
import { assert } from 'chai';
import { livy, options } from '../../autobot_framework/autobot';
import { createAProjectUploadCsvPage } from '../support/wordsmith/page/createAProjectUploadCsv.page';
import { editorPage } from '../support/wordsmith/page/editor.page';
import { dashboardPage, loginPage } from '../support/wordsmith/pages';

describe('Editor', () => {
  before(() => { loginPage.logIn(options.email, options.password, options.url); });

  it('synonym test', () => {
    dashboardPage.newProjectDropdown.click();
    dashboardPage.uploadCsvDropdownOption.click();
    createAProjectUploadCsvPage.nameYourProjectField.setValue(`Autobot ${livy.specDate} ${livy.specTime}`);
    createAProjectUploadCsvPage.fileUploadInput.uploadFile('./resources/eachDataType.csv');

    editorPage.waitForLoad();

    assert(dashboardPage.isLoaded(), 'Dashboard page should be loaded.');
  });
});
