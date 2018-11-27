// @ts-check
import assert from 'assert';
import { Load } from '../../autobot_framework/support/hooks';
import { editorPage } from '../ui-model/wordsmith/editor/editor.page';
import { createAProjectPage } from '../ui-model/wordsmith/misc/page/createAProject.page';
import { createAProjectUploadCsvPage } from '../ui-model/wordsmith/misc/page/createAProjectUploadCsv.page';
import { dashboardPage } from '../ui-model/wordsmith/misc/page/dashboard.page';
import { livy } from '../../autobot_framework/support/Livy';

describe('Create a project', () => {
  before(() => { Load.dashboard(); });

  it('from CSV upload', () => {
    dashboardPage.newProjectDropdown.click();
    dashboardPage.uploadCsvDropdownOption.click();
    createAProjectUploadCsvPage.nameYourProjectField.setValue(`Autobot ${livy.specDate} ${livy.specTime}`);
    createAProjectUploadCsvPage.fileUploadInput.uploadFile('./resources/eachDataType.csv');
    editorPage.waitForLoad();
    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
  });

  it('from input table', () => {
    dashboardPage.load();
    dashboardPage.newProjectButton.click();
    createAProjectPage.populateTable();
    createAProjectPage.createProjectButton.click();
    editorPage.waitForLoad();
    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
  });
});
