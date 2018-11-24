/* eslint no-unreachable: "off" */
// @ts-check

import { assert } from 'chai';
import { editorPage } from '../../src/support/wordsmith/editor/editor.page';
import { loginPage } from '../../src/support/wordsmith/misc/page/login.page';
import { projectPage } from '../../src/support/wordsmith/misc/page/project.page';
import { Autobot, livy, options } from '../autobot';

export const data = [{
  string: 'anneau du Vic-Bilh',
  num: 100,
  list: 'one,Two,tHREE',
  bool: 'true',
  date: '2/1/1900',
  time: '1:45 PM',
}];


// Hooks class

/**
 * "Before"-level hooks.  Named by the page on which the functions end.
 */
export class Load {
  static dashboard() {
    loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);
  }

  static newTemplateEditor() {
    throw new Error('dummy error');
    const projectName = Autobot.makeSlugSafeName(`Autobot Add Data${livy.specDate} ${livy.specTime}`);
    const httpRequestPromise = Autobot.httpRequestCreateProjectFromDataObject_begin(projectName, data);
    loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);
    Autobot.httpRequestComplete(httpRequestPromise);
    browser.url(Autobot.getProjectUrlFromName(projectName));
    projectPage.createNewTemplateButton.click_waitForNotExisting();
    assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
  }

  static newTemplateEditorUsingDataFile(file) {
    const projectName = Autobot.makeSlugSafeName(`Autobot Add Data${livy.specDate} ${livy.specTime}`);
    const httpRequestPromise = Autobot.httpRequestCreateProjectFromDataFile_begin(projectName, file);
    loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);
    Autobot.httpRequestComplete(httpRequestPromise);
    browser.url(Autobot.getProjectUrlFromName(projectName));
    projectPage.createNewTemplateButton.click_waitForNotExisting();
    assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
  }
}
