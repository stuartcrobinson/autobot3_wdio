// @ts-check
import { assert } from 'chai';
import { options, livy } from '../../autobot_framework/autobot';
import { editorPage } from '../support/wordsmith/editor/editor.page';
import { createAProjectPage } from '../support/wordsmith/misc/page/createAProject.page';
import { dashboardPage } from '../support/wordsmith/misc/page/dashboard.page';
import { loginPage } from '../support/wordsmith/misc/page/login.page';
import { createAProjectUploadCsvPage } from '../support/wordsmith/misc/page/createAProjectUploadCsv.page';

describe('Create a project', () => {
  before(() => { loginPage.logIn(options.email, options.password, options.url); });

  it('from CSV upload', () => {
    dashboardPage.newProjectDropdown.click();
    dashboardPage.uploadCsvDropdownOption.click();
    createAProjectUploadCsvPage.nameYourProjectField.setValue(`Autobot ${livy.specDate} ${livy.specTime}`);
    createAProjectUploadCsvPage.fileUploadInput.uploadFile('./resources/eachDataType.csv');
    editorPage.waitForLoad();
    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
  });

  it('from input table', () => {
    dashboardPage.newProjectButton.click();
    createAProjectPage.populateTable();
    createAProjectPage.createProjectButton.click();
    editorPage.waitForLoad();
    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
  });
});
