// @ts-check
import { assert } from 'chai';
import {
  httpRequestComplete, httpRequestCreateProjectFromDataFile_begin, httpRequestCreateProjectFromDataObject, httpRequestCreateProjectFromDataFile,
} from './ApiStuff';
import { log } from '../aquifer/AquiferLog';
import { editorPage } from './ui-model/wordsmith/editor/editor.page';
import { galleryCityGuideNarrative } from './ui-model/wordsmith/misc/page/galleryNarrative.page';
import { loginPage } from './ui-model/wordsmith/misc/page/login.page';
import { projectPage } from './ui-model/wordsmith/misc/page/project.page';

export const defaultDataForApi = [{
  string: 'anneau du Vic-Bilh',
  num: 100,
  list: 'one,Two,tHREE',
  bool: 'true',
  date: '2/1/1900',
  time: '1:45:12 PM',
}];

function getProjectUrlFromName(name) {
  return `https://wordsmith.automatedinsights.com/projects/${name}`;
}

/**
 *
 * @param {String} x
 */
function makeSlugSafeName(x) {
  let slugSafe = x;
  slugSafe = slugSafe.replace(/[^\w-]/g, ' ');
  slugSafe = slugSafe.replace(/\s\s+/g, ' ');
  slugSafe = slugSafe.replace(/ /g, '-');
  slugSafe = slugSafe.toLowerCase();
  return slugSafe;
}

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
    const projectName = makeSlugSafeName(`Aqua data obj ${log.specDate} ${log.specTime}`);
    loginPage.logIn();
    log.logRichMessages([
      { text: '☁️  ', style: log.style.emoji },
      { text: `Api use data object to create project: ${projectName}`, style: log.style.filler }]);
    httpRequestCreateProjectFromDataObject(projectName, data);

    projectPage.setUrl(getProjectUrlFromName(projectName)).loadWithRetry();

    projectPage.createNewTemplateButton.click_waitForNotExisting();
    assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
  }

  static newTemplateEditorUsingDataFile(file) {
    const projectName = makeSlugSafeName(`Aqua data file ${log.specDate} ${log.specTime} ${log.specMillis}`);
    loginPage.logIn();

    log.logRichMessages([
      { text: '☁️  ', style: log.style.emoji },
      { text: `Api use data file to create project: ${projectName}`, style: log.style.filler }]);

    httpRequestCreateProjectFromDataFile(projectName, file);

    projectPage.setUrl(getProjectUrlFromName(projectName)).loadWithRetry();
    projectPage.createNewTemplateButton.click_waitForNotExisting();
    assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
  }
}
