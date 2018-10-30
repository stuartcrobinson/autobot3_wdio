// @ts-check
import axios, { AxiosPromise } from 'axios';
import colors from 'colors/safe';
import { existsSync, readFileSync } from 'fs';
import stringArgv from 'string-argv';
import yargsParse from 'yargs-parser';
// import { AbElement } from './support/AbElement';
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
          // console.log('response status: ' + response.status);
          // do nothing
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
  console.log('\nReport:\t\t', livy.reportClickablePath, '\n');

  // @ts-ignore
  global.livy = livy;
});

after(function () {
  // console.log('after global')
  console.log('\nReport:\t\t', livy.reportClickablePath, '\n');
  livy.endSpec();
});

