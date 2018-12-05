// @ts-check
import { assert } from 'chai';
import { editorPage } from '../../src/ui-model/wordsmith/editor/editor.page';
import { loginPage } from '../../src/ui-model/wordsmith/misc/page/login.page';
import { projectPage } from '../../src/ui-model/wordsmith/misc/page/project.page';
import { Autobot, options } from '../aqua';
import { httpRequestComplete, httpRequestCreateProjectFromDataFile_begin, httpRequestCreateProjectFromDataObject_begin_and_complete } from './ApiStuff';
import { livy } from './Livy';
import { Page } from './Page';

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
    const projectName = Autobot.makeSlugSafeName(`Aqua data obj ${livy.specDate} ${livy.specTime}`);
    loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);
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
    const projectName = Autobot.makeSlugSafeName(`Aqua data file ${livy.specDate} ${livy.specTime} ${livy.specMillis}`);
    // const httpRequestPromise = Autobot.httpRequestCreateProjectFromDataFile_begin(projectName, file);
    loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);

    livy.logAction2([
      { text: '☁️  ', style: livy.style.emoji },
      { text: `Api use data file to create project: ${projectName}`, style: livy.style.filler }]);
    // httpRequestCreateProjectFromDataFile_begin_and_complete(projectName, file);
    const httpRequestPromise = httpRequestCreateProjectFromDataFile_begin(projectName, file);

    httpRequestComplete(httpRequestPromise);
    // Autobot.httpRequestComplete(httpRequestPromise);
    // Page.load(Autobot.getProjectUrlFromName(projectName));

    projectPage.setUrl(Autobot.getProjectUrlFromName(projectName)).loadWithRetry();
    // browser.url(Autobot.getProjectUrlFromName(projectName));
    projectPage.createNewTemplateButton.click_waitForNotExisting();
    assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
  }
}
