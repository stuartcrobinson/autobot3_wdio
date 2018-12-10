// @ts-check
import assert from 'assert';
import { AquiferAssert } from '../../aquifer/support/AquiferAssert';
import { Load } from '../hooks';
import { livy } from '../../aquifer/support/Livy';
import { editorPage } from '../ui-model/wordsmith/editor/editor.page';
import { header } from '../ui-model/wordsmith/misc/component/header.cont';
import { sidebar } from '../ui-model/wordsmith/misc/component/sideBar.cont';
import { createAProjectPage } from '../ui-model/wordsmith/misc/page/createAProject.page';
import { createAProjectUploadCsvPage } from '../ui-model/wordsmith/misc/page/createAProjectUploadCsv.page';
import { dashboardPage } from '../ui-model/wordsmith/misc/page/dashboard.page';

describe('Create a project', () => {
  before(() => { Load.dashboard(); });

  it('from CSV upload', () => {
    dashboardPage.newProjectDropdown.click();
    dashboardPage.uploadCsvDropdownOption.click();
    createAProjectUploadCsvPage.nameYourProjectField.setValue(`Autobot ${livy.specDate} ${livy.specTime}`);
    createAProjectUploadCsvPage.checkVisual(header, sidebar, createAProjectUploadCsvPage.nameYourProjectField);
    createAProjectUploadCsvPage.fileUploadInput.uploadFile('./resources/eachDataType.csv');
    editorPage.waitForLoad();
    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
    AquiferAssert.visualTestsPassed();
  });

  it('from input table', () => {
    dashboardPage.load();
    dashboardPage.newProjectButton.click();
    createAProjectPage.populateTable();
    createAProjectPage.checkVisual(header);
    createAProjectPage.createProjectButton.click();
    editorPage.waitForLoad();
    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
    AquiferAssert.visualTestsPassed();
  });
});
