// @ts-check
import axios, { AxiosPromise } from 'axios';
import { assert } from 'chai';
import colors from 'colors/safe';
import { existsSync, readFileSync } from 'fs';
import stringArgv from 'string-argv';
import yargsParse from 'yargs-parser';
import { editorPage } from '../src/support/wordsmith/editor/editor.page';
import { loginPage } from '../src/support/wordsmith/misc/page/login.page';
import { projectPage } from '../src/support/wordsmith/misc/page/project.page';
import { AbElement } from './support/AbElement';
import { Livy } from './support/Livy';
// export { AbElement } from './support/AbElement';
// export { Page } from './support/Page';




/* ******************************* wrapped *************************************/



function getAxiosBody(projectName, projectData) {
  return {
    "data": {
      "name": projectName,
      "dataset": {
        "format": "json",
        "data": projectData
      }
    }
  }
}


export class Autobot {

  static getProjectUrlFromName(name) {
    return `https://wordsmith.automatedinsights.com/projects/` + name;
  }
  /**
   * 
   * @param {String} x 
   */
  static makeSlugSafeName(x) {
    let slugSafe = x;
    slugSafe = slugSafe.replace(/[^\w-]/g, ' ');
    slugSafe = slugSafe.replace(/\s\s+/g, ' ');
    slugSafe = slugSafe.replace(/ /g, '-');
    slugSafe = slugSafe.toLowerCase();
    return slugSafe;
  }

  static httpRequestCreateProject_begin(name, data) {

    const body = getAxiosBody(name, data);

    return this.httpRequestBegin('https://api.automatedinsights.com/v1.8/projects', body);
  }

  /**
   * 
   * @param {Object} body 
   */
  static httpRequestBegin(url, body) {
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer aba82e1a30db642b781bc99e23eb38c23929741ccdec16cacc196d1dcddc0ecc',
        'User-Agent': 'Autobot',
        'Content-Type': 'application/json'
      },
    };
    return axios.post(url, body, axiosConfig)
  }

  /**
   * 
   * @param {AxiosPromise} axiosPromise 
   */
  static httpRequestComplete(axiosPromise) {

    //does wait and does print
    browser.call(function () {
      return axiosPromise
        .then(function (response) {
          console.log('response status: ' + response.status);
        })
        .catch(function (error) {
          throw new Error(error);   //trace is useful this way
        });
    });

  }
};

/******************************** config *************************************/
let _options;

if (existsSync('file.txt')) {
  _options = yargsParse(stringArgv(readFileSync('file.txt')));
}
else {
  let argv = stringArgv(browser.options.key);

  for (let i = 0; i < argv.length; i++) {
    argv[i] = '--' + argv[i]
  }
  _options = yargsParse(argv);
}
export const options = _options;


/******** tools *******/

export const abStyle = new class AutobotSyles {
  constructor() {
    this.verb = colors.italic;
    this.object = colors.bold;
    this.filler = colors.reset;
    this.selector = colors.gray;
  }
}();



export function log(messages) {
  const screenshotId = livy.logAction2(messages);
  livy.setMouseoverEventScreenshotFunction(screenshotId);
}

export function logMessage(message) {
  const screenshotId = livy.logMessage(message);
  livy.setMouseoverEventScreenshotFunction(screenshotId);
}

// /******************************** browser ************************************/
/**
 * Should this method be in the Page parent class, so that we always make sure all the critical elements have finished loaded first?
 * 
 * Yeah probably.  You might want to check to see if something exists or not on a fully-loaded page.  Can't always rely on waiting for a given target.
 * 
 * TODO - move this to Page
 * 
 * @param {String} url 
 */
export function loadPage(url) {
  browser.url(url);
}

export const autobotBrowser = new class AutobotBrowser {

  keys(keysToType, doLog = true) {
    if (doLog) {
      log([
        { text: 'Type ', style: abStyle.verb },
        { text: keysToType, style: abStyle.object }]);
    }
    browser.keys(keysToType);
  }


  /**
   * 
   * @param {AbElement} abEl1 
   * @param {AbElement} abEl2 
   */
  dragAndDrop(abEl1, abEl2) {
    log([
      { text: 'Drag ', style: abStyle.verb },
      { text: abEl1.stuartname, style: abStyle.object },
      { text: ' to ', style: abStyle.filler },
      { text: abEl2.stuartname, style: abStyle.object },
      { text: ' [', style: abStyle.filler },
      { text: abEl1.selector, style: abStyle.selector },
      { text: '], [', style: abStyle.filler },
      { text: abEl2.selector, style: abStyle.selector },
      { text: ']', style: abStyle.filler },
    ]);
    browser.dragAndDrop(abEl1.selector, abEl2.selector);
  }
}


/******************************** assert **************************************/

const defaultAutobotTimeoutMillis = 5000;
export class AutobotAssert {

  /**
   * 
   * @param {AbElement} abElement 
   * @param {String} expected 
   * @param {Number} timoutMillis 
   */
  static elementText(abElement, expected, timoutMillis = defaultAutobotTimeoutMillis) {
    log([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${abElement.stuartname}`, style: abStyle.object },
      { text: "'s text is ", style: abStyle.filler },
      { text: expected, style: abStyle.object },
      { text: ` ${abElement.selector}`, style: abStyle.selector }]);

    try {
      abElement.waitForExist();
      browser.waitUntil(() => abElement.getWebElement().getText() === expected, timoutMillis);
    } catch (err) {
      console.log("original error:")
      console.log(err)
      throw new Error(`Element "${abElement.stuartname}"'s text is "${abElement.getWebElement().getText()}" after ${timoutMillis} ms.  Expected: "${expected}". Selector: ${abElement.selector}`);
    }
  }

  /**
   * 
   * @param {AbElement} abElement 
   * @param {Number} timoutMillis 
   */
  static elementExists(abElement, timoutMillis = defaultAutobotTimeoutMillis) {
    log([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${abElement.stuartname} `, style: abStyle.object },
      { text: "exists ", style: abStyle.verb },
      { text: abElement.selector, style: abStyle.selector }]);
    // browser.waitUntil(() => abElement.isExisting(), timoutMillis);
    // assert(abElement.isExisting());

    try {
      browser.waitUntil(() => abElement.isExisting(), timoutMillis);
    } catch (err) {
      console.log("original error:")
      console.log(err)
      throw new Error(`Element "${abElement.stuartname}" not found after ${timoutMillis} ms. Selector: ${abElement.selector}`);
    }
  }

  static valueEquals(f, value, targetDescription, timoutMillis = defaultAutobotTimeoutMillis) {
    // console.log("in valueEquals")

    log([
      { text: 'Assert ', style: abStyle.verb },
      { text: `${targetDescription} `, style: abStyle.object },
      { text: "equals ", style: abStyle.verb },
      { text: value, style: abStyle.object }]);

    try {
      browser.waitUntil(() => f() === value, timoutMillis);
    } catch (err) {
      console.log("original error:")
      console.log(err)
      throw new Error(`${targetDescription}: Expected:  "${value}". Actual: "${f()}"`);
    }
  }
}

//Hooks class

/**
 * Just syntax sugar to make "before" line more readable.  Good/bad idea?
 * 
 *   Named by the page on which the functions end.
 */
class Load {
  dashboard() {
    loginPage.logIn(options.email, options.password, options.url);
  }
  newTemplateEditor() {
    const projectName = Autobot.makeSlugSafeName("Autobot Add Data" + livy.specDate + ' ' + livy.specTime);
    let httpRequestPromise = Autobot.httpRequestCreateProject_begin(projectName, data);
    loginPage.logIn(options.email, options.password, options.url);
    Autobot.httpRequestComplete(httpRequestPromise);
    browser.url(Autobot.getProjectUrlFromName(projectName));
    projectPage.createNewTemplateButton.click_waitForNotExisting();
    assert(editorPage.isLoaded(), 'Template editor page should be loaded.');
  }
}
/**
 * "Before"-level hooks.  Named by the page on which the functions end.
 */
export class Before {
  static get load() { return new Load(); }
}

/******************************** hooks **************************************/
//these should be pulled out into a separate file and imported per test, since some tests might want unique before/after code
export let driver;
export let currentTest, currentSpec, currentTestCustom;


export let livy = new Livy(true, options.noPics ? false : true, false);

beforeEach(function () {
  currentTest = this.currentTest;
  let fullName = "";
  let ancestor = currentTest;
  let testGrandparentsTitle = "";
  let count = 0;
  while (ancestor !== undefined) {

    fullName = ancestor.title + " " + fullName;

    if (count >= 2) {
      testGrandparentsTitle = ancestor.title + " " + testGrandparentsTitle;
    }
    ancestor = ancestor.parent;
    count++;
  }
  livy.initializeNewTestCase(currentTest.title.trim(), currentTest.parent.title.trim(), fullName.trim(), testGrandparentsTitle.trim());
  livy.logTestStart();
});

before(function () {
  const filePath = this.test.parent.suites[0].file
  livy.initialize(filePath);

  // @ts-ignore
  global.livy = livy;
});

after(function () {
  // console.log('after global')
  console.log('\nReport:\t\t', livy.reportClickablePath, '\n');
  livy.endSpec();
});


/* ****** data *****/

// string, num, list, bool, date, time, truedata
// anneau du Vic - Bilh, 100, "one,Two,tHREE", true, 2 / 1 / 1900, 1: 45 PM, 3

export const data = [{
  "string": "anneau du Vic-Bilh",
  "num": 100,
  "list": "one,Two,tHREE",
  "bool": "true",
  "date": "2/1/1900",
  "time": "1:45 PM"
}];

