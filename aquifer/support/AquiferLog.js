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
import rimraf from 'rimraf';

const entities = new AllHtmlEntities();

function passthrough(message) {
  return message;
}


/** holds DOMs as well as event screenshots */
const EVENT_SNAPSHOTS_DIR_NAME = 'eventSnapshots';
/** these files get copied from the visual regression service when an image test fails. */
const DIFF_IMAGES_DIR_NAME = 'diffImages';

/**
 *
 * @param {Object} style has a parameter '_styles' which is an array of strings describing the style, like "red", or "emoji"
 */
function convertStylesToClassValue(style) {
  return style ? style._styles.join(' ') : '';
}

function getEventDomFileRelPath(id) {
  return `${EVENT_SNAPSHOTS_DIR_NAME}/${id}.html`;
}
function getEventScreenshotFileRelPath(id) {
  return `${EVENT_SNAPSHOTS_DIR_NAME}/${id}.png`;
}

function getDiffImageCopyRelPath(base) {
  return `${DIFF_IMAGES_DIR_NAME}/${base}`;
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

class AquiferLog {
  constructor() {
    this.doPrintToConsole = !global.aquiferOptions.muteConsole;
    this.doSaveEventScreenshots = !global.aquiferOptions.noPics;
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
      emoji: { _styles: ['emoji'] },
      password: 'password',
    };
    this.screenshotTargetName = undefined;
    this.screenshotTargetSelector = undefined;
    this.specFailed = false;
    this.aVisualTestFailed = false;
  }

  /**
     * Called in global "before", once test's spec file path has been determined.
     * @param {String} specFile
     */
  initialize(specFile) {
    this.isInTestCase = false;
    this.hasPrintedNontestLine = false;

    const randomWait = Math.random() * 100;

    browser.pause(randomWait); // to prevent two parallel-running tests from starting at exactly the same time


    console.log(`paused ms: ${randomWait}`);

    const testParentDateTime = new Date();

    this.specMillis = dateFormat(testParentDateTime, 'l');
    this.specTime = dateFormat(testParentDateTime, 'hh:MM:ss.ltt');
    this.specDate = dateFormat(testParentDateTime, 'yyyymmdd');

    this.specFilePath = specFile;

    fs_extra.mkdirsSync(this.getReportDir());
    fs_extra.mkdirsSync(this.getEventScreenshotsDir());

    this.logRawToHtml(`
    <!doctype html>
      <head>
        <link rel="icon" href="../../../../autobot_favicon.png" type="image/x-icon">
      </head>
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
        .selector-text:hover {
          color: darkgray;
          background-color: azure !important;
        }
        .header img {
          padding-left: 10px;
          float: left;
          width: 50px;
          height: 50px;
        }
        .header h1 {
          position: relative;
          top: 8px;
          left: 10px;
        }
        .monospace {font-family: monospace;}
        input {display:none;font-family:inherit;font-size:inherit;height:12px;margin-left:-3px;margin-right:-4px;}
        .red {color:red;}
        .green {color:green;}
        .blue {color:blue;}
        .gray {color:#C8C8C8;}
        .bold {font-weight:bold;}
        .italic {font-style:italic;}
        .bold {font-weight:bold;}
        .gray {color:#C8C8C8;}
        .emoji {font-size:11px;}
        .gray {color:#C8C8C8;}
        .whitespace {white-space:pre;}
        #image {position:fixed;bottom:0;right:0;width:45%;border:1px solid blue;}
      </style>

      <script>
        function dblclickSelectorSpan(e) {
          e.firstElementChild.style.display = 'none';
          e.lastElementChild.style.width = ((e.lastElementChild.value.length) * 8) + 'px';
          e.lastElementChild.style.display = 'inline';
          // e.lastElementChild.focus();
          e.lastElementChild.select();
        }
        function blurSelectorInput(e) {
          e.style.display = 'none';
          e.parentElement.firstElementChild.style.display = 'inline';
        }
        function logEntryMouseover(screenshotId, eventScreenshotFileRelPath) {
          var elements = document.getElementsByClassName('logline');
          for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor="inherit"; //to undo highlighting of prev log line
          }
          document.images['image'].src=eventScreenshotFileRelPath;
          document.getElementById('entrySpan'+screenshotId).style.backgroundColor="white";
        }
      </script>
      <img src="" id="image"/>
      
      <div class="header">
        <img src="../../../../autobot_icon.svg" alt="logo" />
        <h1>${this.specFilePath}</h1>
      </div>
      `);
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
    this.testCaseFullTitle = undefined;
    this.hasPrintedNontestLine = false;
  }

  getSpecFileName() {
    const split = this.specFilePath.split('/');

    return split[split.length - 1].replace('.js', '');
  }

  getSpecFileDirName() {
    const split = this.specFilePath.split('/');

    return split[split.length - 2];
  }

  getDateDir() {
    return `log/${this.specDate}`;
  }

  getTimeDir() {
    return `${this.getDateDir()}/${this.specTime}`;
  }

  /** one log file per test js file */
  getReportDir() {
    let result = `${this.getTimeDir()}/${this.getSpecFileDirName()}__${this.getSpecFileName()}`;
    result = result.replace('ui-test__', ''); // unhelpful in filename
    return result;
  }

  getEventScreenshotsDir() {
    return `${this.getReportDir()}/${EVENT_SNAPSHOTS_DIR_NAME}`;
  }

  getDiffImagesDir() {
    return `${this.getReportDir()}/${DIFF_IMAGES_DIR_NAME}`;
  }

  getEventDomFileAbsPath(id) {
    return `${this.getEventScreenshotsDir()}/${id}.html`;
  }

  getEventScreenshotFileAbsPath(id) {
    return `${this.getEventScreenshotsDir()}/${id}.png`;
  }

  getDiffImageCopyAbsPath(base) {
    return `${this.getDiffImagesDir()}/${base}`;
  }

  getErrorScreenshotFileAbsPath() {
    return `${this.getReportDir()}/${this.getSpacelessTestCaseFullTitle()}.png`;
  }

  getErrorScreenshotFileRelPath() {
    return `${this.getSpacelessTestCaseFullTitle()}.png`;
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

  /**
   *
   * @param {*} screenshotId used to associate a log line with a screenshot file
   * @param {*} screenshotFile only passed in when called from the visual regression service, so we use their image instead of taking a new one.  if undefined, then a screenshot is taken and saved here.
   */
  saveScreenshot(screenshotId, screenshotFile = undefined) {
    if (this.doSaveEventScreenshots) {
      if (screenshotFile) {
        // screenshotFile from visual regression service.  using it instead of taking new screenshot
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
      } else {
        browser.saveScreenshot(this.getEventScreenshotFileAbsPath(screenshotId));
      }
    }
  }

  /**
   *
   * @param {Array | undefined} messages
   * @param {string | undefined} screenshotFile
   */
  logRichMessagesWithScreenshot(messages = [], screenshotFile = undefined) {
    const screenshotId = this.logRichMessages(messages);
    this.saveScreenshot(screenshotId, screenshotFile);
  }

  /**
   *
   * @param {string} message
   * @param {string | undefined} screenshotFile
   */
  logScreenshottedMessage(message = '', screenshotFile = undefined) {
    const screenshotId = this.logPrefixedText(message);
    this.saveScreenshot(screenshotId, screenshotFile);
  }

  logPrefixedText(message) {
    return this.logRichMessages([{ text: message }]);
  }

  /**
   *
   * @param {Object} messageChunks an array of {text, style} objects
   * @param {Boolean} withPrefix
   */
  logRichMessages(messageChunks = [], withPrefix = true) {
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
    htmlBuilder += `<span class="logline" id="entrySpan${screenshotId}" onmouseover="logEntryMouseover('${screenshotId}', '${getEventScreenshotFileRelPath(screenshotId)}');" ${onClickHtml}>`;

    htmlBuilder += withPrefix ? entities.encode(`${currDate} ${currTime}> `) : '';

    messageChunks.forEach((chunk) => {
      let style = chunk.style;
      let message = chunk.text;

      if (message) {
        if (style === this.style.password) {
          message = message.replace(/[^\s]/g, '•');
          style = this.style.object;
        }

        const classValue = convertStylesToClassValue(style);

        if (!style) {
          style = passthrough;
        }

        if (!message) {
          message = '';
        }

        if (message.startsWith('http')) {
          htmlBuilder += `<span class="${classValue}"><a href=${message}>${entities.encode(message)}</a></span>`;
        } else if (!message.startsWith(' excluding') && (style === this.style.selector || style === this.style.selector_red)) {
          htmlBuilder += `
          <span class="${classValue} monospace;"  ondblclick="dblclickSelectorSpan(this);">
              <span class='selector-text'>${entities.encode(message)}</span>
              <input onblur="blurSelectorInput(this);" type='text'  value='${entities.encode(message)}'>
          </span>`;
        } else {
          htmlBuilder += `<span class="${classValue}">${entities.encode(message)}</span>`;
        }
        consoleBuilder += `${typeof style === 'function' ? style(message) : message}`;
      }
    });
    htmlBuilder += '</span><br/>';
    this.logRawToHtml(htmlBuilder);


    let prefix;

    if (this.doPrintToConsole) {
      if (this.isInTestCase) {
        prefix = !withPrefix ? ''
          : `${currTime} ${colors.gray(`${this.testGrandparentsTitle} ${this.testParentTitle}`.trim())} ${this.testCaseTitle}> `;
      } else {
        prefix = !withPrefix ? '' : `${currTime} ${colors.gray(this.getSpecFileDirName())}/${this.getSpecFileName()}>  `;
      }
      console.log(prefix + consoleBuilder); // don't delete
    }
    return screenshotId;
  }


  logErrorImageToHtml() {
    log.logRawToHtml(`<img id="logErrorImage" src=${log.getErrorScreenshotFileRelPath()} width=45%></img><br/>`);
  }

  logFailedVisualTest(diffImageFilePath, report) {
    fs.mkdirSync(this.getDiffImagesDir());

    const diffImageNewAbsPath = this.getDiffImageCopyAbsPath(path.parse(diffImageFilePath).base.replace(/ /g, '_'));
    const diffImageNewRelPath = getDiffImageCopyRelPath(path.parse(diffImageFilePath).base.replace(/ /g, '_'));

    fs.copyFileSync(diffImageFilePath, diffImageNewAbsPath);

    this.logRichMessages([{ text: `Visual test failed: ${JSON.stringify(report)}`, style: colors.red }]);

    this.logWithoutPrefix_toHtml('Diff image: ', colors.red);

    this.logRawToHtml(`<img style="width:35%" src="${diffImageNewRelPath}"><br>`);
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
    const classValue = convertStylesToClassValue(style);

    this.logRawToHtml(`<span class="whitespace ${classValue}">${entities.encode(message)}</span><br/>`);
  }

  /* eslint no-param-reassign: "off" */
  logWithoutPrefix_toConsole(message, style) {
    if (!style) {
      style = passthrough;
    }
    if (this.doPrintToConsole) {
      console.log(style(message));
    }
  }

  // run this before "it"
  logTestStart() {
    this.logRawToHtml(`<span id=${this.getSpacelessTestCaseFullTitle()}></span>`);
    this.logHorizontalLine();

    this.logRichMessages([
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
    log.logRichMessagesWithScreenshot([{ text: '✅ ', style: this.style.emoji }, { text: 'PASS', style: colors.green.bold }]);
  }


  // /**
  //  *
  //  * @param {Array | undefined} messages
  //  * @param {string | undefined} screenshotFile
  //  */
  // logScreenshottedAction(messages = [], screenshotFile = undefined) {
  //   const screenshotId = this.logRichMessages(messages);
  //   this.saveScreenshot(screenshotId, screenshotFile);
  // }


  logFailed(stack) {
    log.specFailed = true;

    // @ts-ignore
    log.logRichMessagesWithScreenshot([{ text: '❌ ', style: this.style.emoji }, { text: 'FAIL', style: colors.red.bold }]);

    log.logRawToHtml(`<span name="thisIsWhereStackGoes" class="monospace red"><pre>${entities.encode(stack)}</pre></span><br/>`);

    browser.saveScreenshot(this.getErrorScreenshotFileAbsPath());
    log.logErrorImageToHtml();
  }

  /** Called from global in wdio.conf.js */
  logVisualTestReset(screenshotFile) {
    this.logRichMessagesWithScreenshot([
      { text: '📷 ', style: this.style.emoji },
      { text: 'Reset ', style: this.style.verb_red },
      { text: 'screenshot ', style: this.style.filler_red },
      { text: this.screenshotTargetName, style: this.style.object_red },
      { text: this.screenshotTargetSelector, style: this.style.selector_red }],
    screenshotFile);
  }

  /** Called from global in wdio.conf.js */
  logVisualTestCreate(screenshotFile) {
    this.logRichMessagesWithScreenshot([
      { text: '📷 ', style: this.style.emoji },
      { text: 'Save ', style: this.style.verb_red },
      { text: 'screenshot ', style: this.style.object_red },
      { text: this.screenshotTargetName, style: this.style.object_red },
      { text: this.screenshotTargetSelector, style: this.style.selector_red }],
    screenshotFile);
  }

  /** Called from global in wdio.conf.js */
  logVisualTestVerify(screenshotFile) {
    this.logRichMessagesWithScreenshot([
      { text: '📸 ', style: this.style.emoji },
      { text: 'Verify ', style: this.style.verb },
      { text: 'screenshot ', style: this.style.object },
      { text: this.screenshotTargetName, style: this.style.object },
      { text: this.screenshotTargetSelector, style: this.style.selector }],
    screenshotFile);
  }

  wdioConf_beforeSuite(suite, runId) {
    this.isInTestCase = false;
    this.specFilePath = suite.file;
    this.testCaseTitle = undefined;
    this.testParentTitle = suite.parent;
    this.testCaseFullTitle = suite.fullTitle;
    this.testGrandparentsTitle = undefined;
    this.runId = runId;

    this.initialize(this.specFilePath);
    console.log('\n📝   🚧  ', this.reportClickablePath, '\n');
  }

  wdioConf_beforeTest(test) {
    const grandparentsTitle = getGrandparentsTitle(test.fullTitle, test.title, test.parent);
    this.initializeNewTestCase(test.title.trim(), test.parent.trim(), test.fullTitle.trim(), grandparentsTitle.trim());
    this.logTestStart();
  }

  /** called from wdio.conf.js */
  wdioConf_after() {
    if (!global.aquiferOptions.muteConsole) {
      console.log('\n📝 ', this.reportClickablePath, '\n');
    }
  }

  /** called from wdio.conf.js */
  wdioConf_afterSession() {
    fs.appendFileSync(this.runId, `${this.specFailed ? '❌ ' : '✅ '} ${this.reportClickablePath}${os.EOL}`);

    // so you can scroll code up so the screenshot isn't blocking it
    for (let i = 0; i < 30; i++) {
      this.logRawToHtml('</br>');
    }

    rimraf.sync('screenshots/screen');
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
    this.endNewTestCase();
  }

  wdioConf_afterSuite(err, runId) {
    if (err) {
      this.wdioConf_afterTest(false, err);
    }
  }
}

export const log = new AquiferLog();

global.log = log;
