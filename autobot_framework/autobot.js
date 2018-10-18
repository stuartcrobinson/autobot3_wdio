import { readFileSync } from 'fs';
import stringArgv from 'string-argv';
import yargsParse from 'yargs-parser';
import { Livy } from './support/Livy';
export { AbElement } from './support/AbElement';
export { Page } from './support/Page';


/******************************** config *************************************/
export let options = yargsParse(stringArgv(readFileSync('file.txt')));


// /******************************** browser ************************************/
export function loadPage(url) {
    browser.url(url);
}

/******************************** hooks **************************************/
export let driver;
export let currentTest, currentSpec, currentTestCustom;
export let livy = new Livy();

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
    livy.initializeNewTestCase(currentTest.title, currentTest.parent.title, fullName, testGrandparentsTitle);
    livy.logTestStart();
});

before(function () {
    const filePath = this.test.parent.suites[0].tests[0].file
    livy.initialize(filePath);
    global.livy = livy;
});
