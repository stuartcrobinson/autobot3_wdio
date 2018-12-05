// @ts-check
import assert from 'assert';
import { AquaAssert } from '../../aqua/support/AquaAssert';
import { Load } from '../../aqua/support/hooks';
import { livy } from '../../aqua/support/Livy';
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
    createAProjectUploadCsvPage.checkVisual(header, sidebar);
    createAProjectUploadCsvPage.fileUploadInput.uploadFile('./resources/eachDataType.csv');
    editorPage.waitForLoad();
    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
    AquaAssert.visualTestsPassed();
  });

  it('from input table', () => {
    dashboardPage.load();
    dashboardPage.newProjectButton.click();
    createAProjectPage.populateTable();
    createAProjectPage.checkVisual(header);
    createAProjectPage.createProjectButton.click();
    editorPage.waitForLoad();
    assert(editorPage.isLoaded(), 'Dashboard page should be loaded.');
    AquaAssert.visualTestsPassed();
  });
});
