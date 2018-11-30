// @ts-check
import { assert } from 'chai';
import { editorPage } from '../../src/ui-model/wordsmith/editor/editor.page';
import { loginPage } from '../../src/ui-model/wordsmith/misc/page/login.page';
import { projectPage } from '../../src/ui-model/wordsmith/misc/page/project.page';
import { Autobot, options } from '../autobot';
import { Page } from './Page';
import { livy } from './Livy';

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
    loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);
  }

  static newTemplateEditor(data = defaultDataForApi) {
    try {
      // throw new Error('dummy error');
      const projectName = Autobot.makeSlugSafeName(`Autobot Add Data${livy.specDate} ${livy.specTime}`);
      const httpRequestPromise = Autobot.httpRequestCreateProjectFromDataObject_begin(projectName, data);
      loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);
      livy.logMessage(`☁️  Api use data object to create project: ${projectName}`);
      Autobot.httpRequestComplete(httpRequestPromise);
      // browser.url(Autobot.getProjectUrlFromName(projectName));
      Page.load(Autobot.getProjectUrlFromName(projectName));
      projectPage.createNewTemplateButton.click_waitForNotExisting();
      assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
    } catch (error) {
      throw new Error(error); // improves logging ?
    }
  }

  static newTemplateEditorUsingDataFile(file) {
    // browser.call(() => {

    //   function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    //   }
    //   async function demo() {


    //     console.log('Taking a break...');
    //     await sleep(1000);
    //     console.log('a seconds later');
    //     await sleep(1000);
    //     console.log('a seconds later');
    //     await sleep(1000);
    //     console.log('a seconds later');
    //     await sleep(1000);
    //     console.log('a seconds later');
    //     await sleep(1000);
    //     console.log('a seconds later');
    //     await sleep(1000);
    //     console.log('a seconds later');
    //     await sleep(1000);
    //     console.log('a seconds later');
    //   }
    //   demo();
    // });
    const projectName = Autobot.makeSlugSafeName(`Autobot Add Data${livy.specDate} ${livy.specTime}`);
    const httpRequestPromise = Autobot.httpRequestCreateProjectFromDataFile_begin(projectName, file);
    loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);
    livy.logMessage(`☁️  Api use data file to create project: ${projectName}`);
    Autobot.httpRequestComplete(httpRequestPromise);
    Page.load(Autobot.getProjectUrlFromName(projectName));
    // browser.url(Autobot.getProjectUrlFromName(projectName));
    projectPage.createNewTemplateButton.click_waitForNotExisting();
    assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
  }
}
