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
// import { options } from '../autobot';


const entities = new AllHtmlEntities();

/*  TODO - this file is terrible.  should be broken up.  */

function passthrough(message) {
  return message;
}

function convertNpmColorsToCss(style) {
  let myStyle = style;
  let htmlStyle = '';

  if (!myStyle) {
    myStyle = passthrough;
  } else {
    const styles = myStyle._styles ? myStyle._styles : myStyle; // could be colors object or string ('emoji') // this is a mess

    if (styles.includes('red')) {
      htmlStyle += 'color:red;';
    } else if (styles.includes('green')) {
      htmlStyle += 'color:green;';
    } else if (styles.includes('blue')) {
      htmlStyle += 'color:blue;';
    } else if (styles.includes('gray')) {
      htmlStyle += 'color:#C8C8C8;'; // lighter than gray, darker than lightgray
    }
    if (styles.includes('bold')) {
      htmlStyle += 'font-weight:bold;';
    }
    if (styles.includes('italic')) {
      htmlStyle += 'font-style: italic;';
    }
    if (styles.includes('emoji')) {
      htmlStyle += 'font-size:11px;';
    }
  }
  return htmlStyle;
}

function getEventDomFileRelPath(id) {
  return `${getEventSnapshotsDirName()}/${id}.html`;
}

/** holds DOMs as well as event screenshots */
function getEventSnapshotsDirName() {
  return 'eventSnapshots';
}

function getEventScreenshotFileRelPath(id) {
  return `${getEventSnapshotsDirName()}/${id}.png`;
}

/**
 *
 * @param {string} fullTitle
 * @param {string} title
 * @param {string} parent
 */
const getGrandparentsTitle = (fullTitle, title, parent) => {
  const bitToRemove = `${parent} ${title}`;
  return fullTitle.replace(bitToRemove, '');
};
// @ts-ignore

class Livy {
  constructor() {
    // @ts-ignore
    const options = global.autobotOptions;

    this.livyDoDisplay = !options.muteConsole;
    this.doSaveEventScreenshots = !options.noPics;
    this.doSaveEventDom = false;
    this.style = {
      verb: colors.italic,
      // @ts-ignore
      verb_red: colors.italic.red,
      object: colors.bold,
      // @ts-ignore
      object_red: colors.bold.red,
      filler: colors.reset,
      // @ts-ignore
      filler_red: colors.red,
      // @ts-ignore
      selector_red: colors.dim.red,
      selector: colors.gray,
      emoji: 'emoji',
      password: 'password',
    };
    // console.log('doSaveEventScreenshots?');
    // console.log(doSaveEventScreenshots);
    this.screenshotTargetName = undefined;
    this.screenshotTargetSelector = undefined;
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
    this.specTime = dateFormat(testParentDateTime, 'hh:MM:ss.ltt');
    this.specDate = dateFormat(testParentDateTime, 'yyyymmdd');

    this.specFilePath = specFile;

    fs_extra.mkdirsSync(this.getReportDir());
    fs_extra.mkdirsSync(this.getEventScreenshotsDir());

    let html = `<!doctype html>
    <style>
      body {
        background-color: #f5f5f5
      }
      a:link {
        color: inherit;
      }
      a:visited {
        color: inherit;
      }
      a:hover {
        color: inherit;
      }
      a:active {
        color: inherit;
      }
      a:link {
        text-decoration: none;
      }
      a:visited {
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
    ${os.EOL}`;

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
  }

  endNewTestCase() {
    this.isInTestCase = false;
    this.testCaseTitle = undefined;
    // this.testParentTitle = undefined;
    this.testCaseFullTitle = undefined;
    // this.testGrandparentsTitle = undefined;
    this.hasPrintedNontestLine = false;
  }

  // //////////////////////////////////////////////


  getSpecFileName() {
    const split = this.specFilePath.split('/');

    return split[split.length - 1].replace('.js', '');
  }

  getSpecFileDirName() {
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
    return `${this.getTimeDir()}/${this.getSpecFileDirName()}__${this.getSpecFileName()}`;
  }


  getEventScreenshotsDir() {
    return `${this.getReportDir()}/${getEventSnapshotsDirName()}`;
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
    return `${this.getSpacelessTestCaseFullTitle()}.png`;
    // return `${this.testCaseFullTitle.replace(/ /g, '_')}.png`;
  }

  getSpacelessTestCaseFullTitle() {
    if (this.isInTestCase) {
      return filenamify(this.testCaseFullTitle.replace(/ /g, '_'));
    }

    return filenamify(this.testParentTitle.replace(/ /g, '_'));
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

  setMouseoverEventScreenshotFunction(screenshotId, screenshotFile = undefined) {
    if (this.doSaveEventScreenshots) {
      if (screenshotFile) {
        // screenshotFile doens't exist yet!  but it will in a second.
        // need to spin off a thread that will wait until the file exists, and then copy it.
        // or wait to copy until later??? no, this might be the last step of a test.

        const that = this;
        browser.call(() => {
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          async function demo() {
            let count = 0;
            while (!fs.existsSync(screenshotFile)) {
              /* eslint no-await-in-loop: "off" */
              await sleep(100);
              count += 1;
              if (count > 100) { // after 10 seconds
                break;
              }
            }
            fs.copyFileSync(screenshotFile, that.getEventScreenshotFileAbsPath(screenshotId));
          }
          demo();
        });

        // fs.copyFileSync(screenshotFile, this.getEventScreenshotFileAbsPath(screenshotId));
      } else {
        browser.saveScreenshot(this.getEventScreenshotFileAbsPath(screenshotId));
      }
    }

    // TODO clean up livy html report javascript https://autoin.atlassian.net/browse/QS-404

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

  /**
   *
   * @param {Array | undefined} messages
   * @param {string | undefined} screenshotFile
   */
  logScreenshottedAction(messages = [], screenshotFile = undefined) {
    const screenshotId = this.logAction2(messages);
    this.setMouseoverEventScreenshotFunction(screenshotId, screenshotFile);
  }

  /**
   *
   * @param {string} message
   * @param {string | undefined} screenshotFile
   */
  logScreenshottedMessage(message = '', screenshotFile = undefined) {
    const screenshotId = this.logMessage(message);
    this.setMouseoverEventScreenshotFunction(screenshotId, screenshotFile);
  }

  logMessage(message) {
    return this.logAction2([{ text: message }]);
  }

  /**
   *
   * @param {Object} messageChunks an array of {text, style} objects
   * @param {Boolean} withPrefix
   */
  logAction2(messageChunks = [], withPrefix = true) {
    const testDateTime = new Date();

    const currTime = dateFormat(testDateTime, 'hh:MM:sstt');
    const currDate = dateFormat(testDateTime, 'yyyymmdd');

    if (!this.isInTestCase && !this.hasPrintedNontestLine) {
      this.logHorizontalLine();
      this.hasPrintedNontestLine = true;
    }

    const screenshotId = dateFormat(new Date(), 'MMssl');

    let consoleBuilder = '';


    const onClickHtml = this.doSaveEventDom ? `onclick="window.open('${getEventDomFileRelPath(screenshotId)}');"` : '';

    let htmlBuilder = '';
    htmlBuilder += `<span id="entrySpan${screenshotId}" onmouseover="logEntryMouseover${screenshotId}();" ${onClickHtml}>`;


    htmlBuilder += withPrefix ? entities.encode(`${currDate} ${currTime}> `) : '';

    for (let i = 0; i < messageChunks.length || 0; i++) {
      const chunk = messageChunks[i];
      let style = chunk.style;
      let message = chunk.text;

      if (message) {
        if (style === this.style.password) {
          message = message.replace(/[^\s]/g, '•');
          style = this.style.object;
        }

        const htmlStyle = convertNpmColorsToCss(style);

        if (!style) {
          style = passthrough;
        }

        if (!message) {
          message = '';
        }

        if (message.startsWith('http')) {
          htmlBuilder += `<span style="${htmlStyle}"><a href=${message}>${entities.encode(message)}</a></span>`;
        } else {
          htmlBuilder += `<span style="${htmlStyle}">${entities.encode(message)}</span>`;
        }
        consoleBuilder += `${typeof style === 'function' ? style(message) : message}`;
      }
    }
    htmlBuilder += '</span><br/>';
    fs.appendFileSync(this.getFile(), htmlBuilder + os.EOL);

    let prefix;

    if (this.livyDoDisplay) {
      if (this.isInTestCase) {
        prefix = !withPrefix ? ''
          : `${currTime} ${colors.gray(`${this.testGrandparentsTitle} ${this.testParentTitle}`.trim())} ${this.testCaseTitle}> `;
      } else {
        prefix = !withPrefix ? '' : `${currTime} ${colors.gray(this.getSpecFileDirName())}/${this.getSpecFileName()}>  `;
      }
      console.log(prefix + consoleBuilder);
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
    // console.log('in logErrorImage');
    // console.log('html:');
    // console.log(`<img id="logErrorImage" src=${this.getErrorScreenshotFileRelPath()} width=45%></img><br/>${os.EOL}`);

    fs.appendFileSync(this.getFile(), `<img id="logErrorImage" src=${this.getErrorScreenshotFileRelPath()} width=45%></img><br/>${os.EOL}`);
  }

  logFailedVisualTest(diffImageFilePath, report) {
    this.logAction2([{ text: `Visual test failed: ${JSON.stringify(report)}`, style: colors.red }]);

    this.logWithoutPrefix_toHtml('Diff image: ', colors.red);

    const html = `<img style="width:35%" src="${diffImageFilePath}"><br>`;
    fs.appendFileSync(this.getFile(), html + os.EOL);
  }

  logWithoutPrefix(message, style) {
    this.logWithoutPrefix_toConsole(message, style);
    this.logWithoutPrefix_toHtml(message, style);
  }


  logRawToHtml(text) {
    fs.appendFileSync(this.getFile(), text + os.EOL);
  }

  logHorizontalLine() {
    console.log('---------------------------------------------------------------------------------------');
    console.log('');
    this.logRawToHtml('<hr/><br/>');
  }

  /* eslint no-param-reassign: "off" */
  logWithoutPrefix_toHtml(message, style) {
    const htmlStyle = convertNpmColorsToCss(style);

    const html = `<span style="white-space:pre;${htmlStyle}">${entities.encode(message)}</span><br/>`;
    fs.appendFileSync(this.getFile(), html + os.EOL);
  }

  /* eslint no-param-reassign: "off" */
  logWithoutPrefix_toConsole(message, style) {
    if (!style) {
      style = passthrough;
    }

    if (this.livyDoDisplay) {
      console.log(style(message));
    }
  }


  // run this before "it"
  logTestStart() {
    fs.appendFileSync(this.getFile(), `<span id=${this.getSpacelessTestCaseFullTitle()}></span>${os.EOL}`);


    this.logHorizontalLine();

    // this.logWithoutPrefix(`Starting test: ${this.testGrandparentsTitle}`);
    // this.logWithoutPrefix(`                         ${this.testParentTitle}`, colors.blue);
    // // @ts-ignore
    // this.logWithoutPrefix(`                             ${this.testCaseTitle}`, colors.bold.blue);

    this.logAction2([
      { text: 'Starting test:  ', style: colors.bold },
      { text: `${this.testGrandparentsTitle} `, style: colors.reset },
      { text: `${this.testParentTitle} `, style: colors.blue },
      // @ts-ignore
      { text: this.testCaseTitle, style: colors.bold.blue },
    ], false);
    this.logWithoutPrefix('');
  }

  logPassed() {
    // @ts-ignore
    const screenshotId = this.logAction2([{ text: 'PASS', style: colors.green.bold }]);
    this.setMouseoverEventScreenshotFunction(screenshotId);
  }

  logFailed(stack) {
    // @ts-ignore
    global.specFailed = true;
    // @ts-ignore
    const screenshotId = this.logAction2([{ text: 'FAIL', style: colors.red.bold }]);
    this.setMouseoverEventScreenshotFunction(screenshotId);

    this.logReportError(stack);

    browser.saveScreenshot(this.getErrorScreenshotFileAbsPath());
    this.logErrorImage();
  }

  logVisualTestReset(screenshotFile) {
    this.logScreenshottedAction([
      { text: '📷 ', style: livy.style.emoji },
      { text: 'Reset ', style: livy.style.verb_red },
      { text: 'screenshot ', style: livy.style.filler_red },
      { text: this.screenshotTargetName, style: livy.style.object_red },
      { text: this.screenshotTargetSelector, style: livy.style.selector_red }],
    screenshotFile);
  }

  logVisualTestCreate(screenshotFile) {
    this.logScreenshottedAction([
      { text: '📷 ', style: livy.style.emoji },
      { text: 'Save ', style: livy.style.verb_red },
      { text: 'screenshot ', style: livy.style.object_red },
      { text: this.screenshotTargetName, style: livy.style.object_red },
      { text: this.screenshotTargetSelector, style: livy.style.selector_red }],
    screenshotFile);
  }

  logVisualTestVerify(screenshotFile) {
    this.logScreenshottedAction([
      { text: '📸 ', style: livy.style.emoji },
      { text: 'Verify ', style: livy.style.verb },
      { text: 'screenshot ', style: livy.style.object },
      { text: this.screenshotTargetName, style: livy.style.object },
      { text: this.screenshotTargetSelector, style: livy.style.selector }],
    screenshotFile);
  }

  wdioConf_beforeSuite(suite, runId) {
    this.isInTestCase = false;
    this.specFilePath = suite.file;
    this.testCaseTitle = undefined;
    this.testParentTitle = suite.parent;
    this.testCaseFullTitle = suite.fullTitle;
    this.testGrandparentsTitle = undefined;

    this.initialize(this.specFilePath);
    console.log('\nReport, in progress: ', this.reportClickablePath, '\n');
    // fs.appendFileSync(runId, this.reportClickablePath + os.EOL);
  }

  wdioConf_beforeTest(test) {
    const grandparentsTitle = getGrandparentsTitle(test.fullTitle, test.title, test.parent);
    this.initializeNewTestCase(test.title.trim(), test.parent.trim(), test.fullTitle.trim(), grandparentsTitle.trim());
    this.logTestStart();
  }

  /** called from wdio.conf.js */
  wdioConf_after() {
    // @ts-ignore
    if (!global.autobotOptions.muteConsole) {
      console.log('\nReport: ', this.reportClickablePath, '\n');
    }
  }

  /** called from wdio.conf.js */
  wdioConf_afterSession(configTimestamp) {
    // so you can scroll code up so the screenshot isn't blocking it
    for (let i = 0; i < 30; i++) {
      this.logRawToHtml('</br>');
    }
  }

  /**
   * Called from wdio.conf.js after testcase or suite completion
   * @param {boolean} testDidPass
   * @param {*} err
   */
  wdioConf_afterTest(testDidPass, err) {
    // // if test passed, ignore, else take and save screenshot.
    if (testDidPass) {
      this.logPassed();
    } else {
      this.logFailed(err.stack);
      console.log('\n\tTest case report:\n\t\t', this.reportClickablePathWithHash, '\n');
    }
    // const reportClickablePath = 'file://' + path.resolve(livy.getFile()) + '#' + livy.getSpacelessTestCaseFullTitle();

    this.endNewTestCase();
  }

  wdioConf_afterSuite(err, runId) {
    // @ts-ignore
    fs.appendFileSync(runId, (global.specFailed ? '❌ ' : '✅ ') + this.reportClickablePath + os.EOL);
    if (err) {
      this.wdioConf_afterTest(false, err);
    }
  }
}


export const livy = new Livy();

// @ts-ignore
global.livy = livy;
