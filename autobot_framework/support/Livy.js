// @ts-check
/* eslint prefer-destructuring: "off" */


import colors from 'colors/safe';
import dateFormat from 'dateformat';
import filenamify from 'filenamify';
import * as fs from 'fs';
import * as fs_extra from 'fs-extra';
import { AllHtmlEntities } from 'html-entities';
import * as os from 'os';
import * as path from 'path';
// import * as Tools from './Tools';

const entities = new AllHtmlEntities();

function passthrough(message) {
  return message;
}

function convertNpmColorsToCss(style) {
  let myStyle = style;
  let htmlStyle = '';

  if (!myStyle) {
    myStyle = passthrough;
  } else {
    const styles = myStyle._styles;

    if (styles.includes('red')) {
      htmlStyle += 'color:red;';
    } else if (styles.includes('green')) {
      htmlStyle += 'color:green;';
    } else if (styles.includes('blue')) {
      htmlStyle += 'color:blue;';
    } else if (styles.includes('gray')) {
      htmlStyle += 'color:gray;';
    }
    if (styles.includes('bold')) {
      htmlStyle += 'font-weight:bold;';
    }
    if (styles.includes('italic')) {
      htmlStyle += 'font-style: italic;';
    }
  }
  return htmlStyle;
}

function getEventDomFileRelPath(id) {
  return `${getEventScreenshotsDirName()}/${id}.html`;
}

/**
     * TODO - rename to eventSnapshot instead of screenshot.   cos holding DOM also.
     */
function getEventScreenshotsDirName() {
  return 'eventScreenshots';
}


function getEventScreenshotFileRelPath(id) {
  return `${getEventScreenshotsDirName()}/${id}.png`;
}
export class Livy {
  /**
   *
   * @param {Boolean} doDisplay
   * @param {Boolean} doSaveEventScreenshots
   */
  constructor(doDisplay = true, doSaveEventScreenshots = true) {
    this.livyDoDisplay = doDisplay;
    this.doSaveEventScreenshots = doSaveEventScreenshots;
    console.log('doSaveEventScreenshots?');
    console.log(doSaveEventScreenshots);
  }

  /**
     * Called in global "before", once test's spec file path has been determined.
     * @param {String} specFile
     */
  initialize(specFile) {
    this.isInTestCase = false;
    this.hasPrintedNontestLine = false;

    const testParentDateTime = new Date();

    this.specMillis = dateFormat(testParentDateTime, 'l');
    this.specTime = dateFormat(testParentDateTime, 'hh:MM:sstt');
    this.specDate = dateFormat(testParentDateTime, 'yyyymmdd');

    this.specFilePath = specFile;

    fs_extra.mkdirsSync(this.getReportDir());
    fs_extra.mkdirsSync(this.getEventScreenshotsDir());

    let html = `<!doctype html><style>body{background-color:#f5f5f5}</style>${os.EOL}`;

    html += '<img src="" id="image" style="position:fixed;bottom:0;right:0;width:45%;border:1px solid blue"/>';

    html += `<h1>${this.specFilePath}</h1>`;

    fs.appendFileSync(this.getFile(), html + os.EOL);
  }


  initializeNewTestCase(testCaseTitle, testParentTitle, testCaseFullTitle, testGrandparentsTitle) {
    this.isInTestCase = true;
    this.testCaseTitle = testCaseTitle;
    this.testParentTitle = testParentTitle;
    this.testCaseFullTitle = testCaseFullTitle;
    this.testGrandparentsTitle = testGrandparentsTitle;
    this.hasPrintedNontestLine = false;


    console.log('initializeNewTestCase:::::::::::::::::::::::::::::::::::');
    console.log('testCaseTitle');
    console.log(testCaseTitle);
    console.log('testParentTitle');
    console.log(testParentTitle);
    console.log('testCaseFullTitle');
    console.log(testCaseFullTitle);
    console.log('testGrandparentsTitle');
    console.log(testGrandparentsTitle);
  }

  endNewTestCase() {
    this.isInTestCase = false;
    // this.testCaseTitle = undefined;
    // this.testParentTitle = undefined;
    // this.testCaseFullTitle = undefined;
    // this.testGrandparentsTitle = undefined;
    this.hasPrintedNontestLine = false;
  }

  // //////////////////////////////////////////////


  getSpecFileName() {
    // const specFilePath = currentTest.file;

    // /Users/stuartrobinson/repos/autobot/autobot/test/dashboard.js

    const split = this.specFilePath.split('/');

    return split[split.length - 1].replace('.js', '');
  }

  getSpecFileDirName() {
    // const specFilePath = currentTest.file;

    // /Users/stuartrobinson/repos/autobot/autobot/test/dashboard.js

    const split = this.specFilePath.split('/');

    return split[split.length - 2];
  }

  getDateDir() {
    return `livy/${this.specDate}`;
  }

  getTimeDir() {
    return `${this.getDateDir()}/${this.specTime}`;
  }

  /** one log file per test js file */
  getReportDir() {
    return `${this.getTimeDir()}/${this.getSpecFileDirName()}__${this.getSpecFileName()}_${this.specMillis}`;
  }


  getEventScreenshotsDir() {
    return `${this.getReportDir()}/${getEventScreenshotsDirName()}`;
  }


  getEventDomFileAbsPath(id) {
    return `${this.getEventScreenshotsDir()}/${id}.html`;
  }


  getEventScreenshotFileAbsPath(id) {
    return `${this.getEventScreenshotsDir()}/${id}.png`;
  }

  getErrorScreenshotFileAbsPath() {
    return `${this.getReportDir()}/${this.getSpacelessTestCaseFullTitle()}.png`;
  }

  getErrorScreenshotFileRelPath() {
    return `${this.testCaseFullTitle.replace(/ /g, '_')}.png`;
  }

  getSpacelessTestCaseFullTitle() {
    return filenamify(this.testCaseFullTitle.replace(/ /g, '_'));
  }


  getFile() {
    return `${this.getReportDir()}/report.html`;
  }


  get reportClickablePathWithHash() {
    return `${this.reportClickablePath}#${this.getSpacelessTestCaseFullTitle()}`;
  }

  get reportClickablePath() {
    return `file://${path.resolve(this.getFile())}`;
  }

  setMouseoverEventScreenshotFunction(screenshotId) {
    if (this.doSaveEventScreenshots) {
      // autobot.saveScreenshot(this.getEventScreenshotFileAbsPath(screenshotId))
      browser.saveScreenshot(this.getEventScreenshotFileAbsPath(screenshotId));
    }

    // fs.appendFileSync(this.getEventDomFileAbsPath(screenshotId), Tools.getFullDom() + os.EOL);


    let html = '';
    html += `<script>${os.EOL}`;
    html += `function logEntryMouseover${screenshotId}() {${os.EOL}`;
    html += `    var elements = document.getElementsByTagName('span');${os.EOL}`;
    html += `    for (var i = 0; i < elements.length; i++) {${os.EOL}`;
    html += `        elements[i].style.backgroundColor="inherit";${os.EOL}`;
    html += `    }${os.EOL}`;
    html += `    document.images['image'].src="${getEventScreenshotFileRelPath(screenshotId)}";${os.EOL}`;
    html += `    document.getElementById('entrySpan${screenshotId}').style.backgroundColor="white";${os.EOL}`;
    html += `}${os.EOL}`;
    html += `</script>${os.EOL}`;

    fs.appendFileSync(this.getFile(), html + os.EOL);
  }


  // logAction(inputMessage, inputStyle) {
  //   let style = inputStyle;
  //   let message = inputMessage;

  //   const htmlStyle = convertNpmColorsToCss(style);

  //   if (!style) {
  //     style = passthrough;
  //   }


  //   const testDateTime = new Date();

  //   const currTime = dateFormat(testDateTime, 'hh:MM:sstt');
  //   const currDate = dateFormat(testDateTime, 'yyyymmdd');


  //   if (!message) {
  //     message = '';
  //   }

  //   if (!this.isInTestCase && !this.hasPrintedNontestLine) {
  //     this.logWithoutPrefix('---------------------------------------------------------------------------------------');
  //     this.hasPrintedNontestLine = true;
  //   }

  //   const screenshotId = dateFormat(new Date(), 'MMssl');


  //   let html = '';
  //   html += `<span id="entrySpan${screenshotId}" onmouseover="logEntryMouseover${screenshotId}();" onclick="window.open('${getEventDomFileRelPath(screenshotId)}');">`;
  //   html += entities.encode(`${currDate} ${currTime}> `);
  //   html += `<span style="${htmlStyle}">${entities.encode(message)}</span>`;
  //   html += '</span><br/>';

  //   fs.appendFileSync(this.getFile(), html + os.EOL);

  //   if (this.livyDoDisplay) {
  //     if (this.isInTestCase) {
  //       // @ts-ignore
  //       console.log(`${currTime} ${colors.gray(this.testGrandparentsTitle)} ${this.testParentTitle} ${colors.black.bold(`${this.testCaseTitle}> `)}${style(message)}`);
  //     } else {
  //       // message must be logged from outside a test (before or after?) so just preface message with spec full name
  //       // @ts-ignore
  //       console.log(`${currTime} ${colors.gray(this.getSpecFileDirName())}/${colors.black.bold(`${this.getSpecFileName()}> `)}${style(message)}`);
  //     }
  //   }
  //   return screenshotId;
  // }


  logMessage(message) {
    return this.logAction2([{ text: message }]);
  }

  logAction2(messageChunks) {
    const testDateTime = new Date();

    const currTime = dateFormat(testDateTime, 'hh:MM:sstt');
    const currDate = dateFormat(testDateTime, 'yyyymmdd');

    if (!this.isInTestCase && !this.hasPrintedNontestLine) {
      this.logWithoutPrefix('---------------------------------------------------------------------------------------');
      this.hasPrintedNontestLine = true;
    }

    const screenshotId = dateFormat(new Date(), 'MMssl');

    let consoleBuilder = '';


    let htmlBuilder = '';
    htmlBuilder += `<span id="entrySpan${screenshotId}" onmouseover="logEntryMouseover${screenshotId}();" onclick="window.open('${getEventDomFileRelPath(screenshotId)}');">`;
    htmlBuilder += entities.encode(`${currDate} ${currTime}> `);


    // console.log('messageChunks: ');
    // console.log(messageChunks);

    for (let i = 0; i < messageChunks.length; i++) {
      const chunk = messageChunks[i];
      let style = chunk.style;
      let message = chunk.text;

      if (message) {
        // console.log('style: ');
        // console.log(style);

        // console.log('message: ');
        // console.log(message);

        const htmlStyle = convertNpmColorsToCss(style);

        if (!style) {
          style = passthrough;
        }

        if (!message) {
          message = '';
        }

        htmlBuilder += `<span style="${htmlStyle}">${entities.encode(message)}</span>`;
        consoleBuilder += `${style(message)}`;
      }
    }
    htmlBuilder += '</span><br/>';
    fs.appendFileSync(this.getFile(), htmlBuilder + os.EOL);

    if (this.livyDoDisplay) {
      if (this.isInTestCase) {
        // @ts-ignore
        console.log(`${currTime} ${colors.gray(`${this.testGrandparentsTitle} ${this.testParentTitle}`.trim())} ${this.testCaseTitle}> ${consoleBuilder}`);
      } else {
        // message must be logged from outside a test (before or after?) so just preface message with spec full name
        // @ts-ignore
        console.log(`${currTime} ${colors.gray(this.getSpecFileDirName())}/${this.getSpecFileName()}> ${consoleBuilder}`);
      }
    }

    return screenshotId;
  }

  logReportError(stack) {
    let html = '';// `<span style="font-family:monospace"><span style="font-weight:bold">${entities.encode(type)}:</span><span style="color:red">${entities.encode(message)}</span><br/>${os.EOL}`
    html += `<span name="thisIsWhereStackGoes" style="font-family:monospace;color:red"><pre>${entities.encode(stack)}</pre></span><br/>`;


    fs.appendFileSync(this.getFile(), html + os.EOL);
  }

  logErrorImage() {
    // <img src=${imageClickablePath} width=900></img>
    fs.appendFileSync(this.getFile(), `<img id="logErrorImage" src=${this.getErrorScreenshotFileRelPath()} width=45%></img><br/>${os.EOL}`);
  }

  logWithoutPrefix(message, inputStyle) {
    let style = inputStyle;

    const htmlStyle = convertNpmColorsToCss(style);

    if (!style) {
      style = passthrough;
    }

    // TODO start here -- not enough stylres are supported
    const html = `<span style="white-space:pre;${htmlStyle}">${entities.encode(message)}</span><br/>`;
    // fs.appendFileSync(file, message + os.EOL);
    fs.appendFileSync(this.getFile(), html + os.EOL);

    if (this.livyDoDisplay) {
      console.log(style(message));
    }
  }

  // run this before "it"
  logTestStart() {
    fs.appendFileSync(this.getFile(), `<span id=${this.getSpacelessTestCaseFullTitle()}></span>${os.EOL}`);
    this.logWithoutPrefix('---------------------------------------------------------------------------------------');
    this.logWithoutPrefix(`Starting test: ${this.testGrandparentsTitle}`);
    this.logWithoutPrefix(`                         ${this.testParentTitle}`, colors.blue);
    // @ts-ignore
    this.logWithoutPrefix(`                             ${this.testCaseTitle}`, colors.bold.blue);
    this.logWithoutPrefix('');
  }


  logPassed() {
    // @ts-ignore
    const screenshotId = this.logAction2([{ text: 'PASS', style: colors.green.bold }]);
    this.setMouseoverEventScreenshotFunction(screenshotId);
  }

  logFailed(stack) {
    // @ts-ignore
    const screenshotId = this.logAction2({ text: 'FAIL', style: colors.red.bold });
    this.logReportError(stack);
    this.setMouseoverEventScreenshotFunction(screenshotId);
  }

  logAfterEachStuff(testDidPass, stack) {
    // let livy = global.livy;


    // let testDidPass = test.passed   //this.currentTest.state === "passed"
    // let stack = test.err.stack      //this.currentTest.err.stack


    // // if test passed, ignore, else take and save screenshot.
    if (testDidPass) {
      this.logPassed();
    } else {
      this.logFailed(stack);
      browser.saveScreenshot(this.getErrorScreenshotFileAbsPath());
      this.logErrorImage();
      console.log('\n\tTest case report:\n\t\t', this.reportClickablePathWithHash, '\n');
    }
    // const reportClickablePath = 'file://' + path.resolve(livy.getFile()) + '#' + livy.getSpacelessTestCaseFullTitle();


    this.endNewTestCase();
  }

  endSpec() {
    fs.appendFileSync(this.getFile(), `</br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>${os.EOL}`);
  }
}
