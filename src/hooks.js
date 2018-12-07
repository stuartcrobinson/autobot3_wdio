// @ts-check
import { assert } from 'chai';
import { editorPage } from './ui-model/wordsmith/editor/editor.page';
import { loginPage } from './ui-model/wordsmith/misc/page/login.page';
import { projectPage } from './ui-model/wordsmith/misc/page/project.page';
import { Autobot } from '../aquifer/aqua';
import { httpRequestComplete, httpRequestCreateProjectFromDataFile_begin, httpRequestCreateProjectFromDataObject_begin_and_complete } from '../aquifer/support/ApiStuff';
import { livy } from '../aquifer/support/Livy';
import { galleryCityGuideNarrative } from './ui-model/wordsmith/misc/page/galleryNarrative.page';

export const defaultDataForApi = [{
  string: 'anneau du Vic-Bilh',
  num: 100,
  list: 'one,Two,tHREE',
  bool: 'true',
  date: '2/1/1900',
  time: '1:45:12 PM',
}];


// Hooks class

/**
 * "Before"-level hooks.  Named by the page on which the functions end.
 */
export class Load {
  static dashboard() {
    loginPage.logIn();
  }

  static cityGuideTemplateFromGallery() {
    loginPage.logIn();
    galleryCityGuideNarrative.load();
    galleryCityGuideNarrative.getProjectButton.click_waitForNotExisting();
    projectPage.getNthTemplateLink(1).click_waitForNotExisting();
  }

  static newTemplateEditor(data = defaultDataForApi) {
    const projectName = Autobot.makeSlugSafeName(`Aqua data obj ${livy.specDate} ${livy.specTime}`);
    loginPage.logIn();
    livy.logAction2([
      { text: '☁️  ', style: livy.style.emoji },
      { text: `Api use data object to create project: ${projectName}`, style: livy.style.filler }]);
    httpRequestCreateProjectFromDataObject_begin_and_complete(projectName, data);

    projectPage.setUrl(Autobot.getProjectUrlFromName(projectName)).loadWithRetry();

    // browser.url(Autobot.getProjectUrlFromName(projectName));
    // Page.load(Autobot.getProjectUrlFromName(projectName));
    projectPage.createNewTemplateButton.click_waitForNotExisting();
    assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
  }

  static newTemplateEditorUsingDataFile(file) {
    const projectName = Autobot.makeSlugSafeName(`Aqua data file ${livy.specDate} ${livy.specTime} ${livy.specMillis}`);
    loginPage.logIn();

    livy.logAction2([
      { text: '☁️  ', style: livy.style.emoji },
      { text: `Api use data file to create project: ${projectName}`, style: livy.style.filler }]);
    const httpRequestPromise = httpRequestCreateProjectFromDataFile_begin(projectName, file);

    httpRequestComplete(httpRequestPromise);

    projectPage.setUrl(Autobot.getProjectUrlFromName(projectName)).loadWithRetry();
    projectPage.createNewTemplateButton.click_waitForNotExisting();
    assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
  }
}
