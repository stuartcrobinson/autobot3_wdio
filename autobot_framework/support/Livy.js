// var dateFormat = require('dateformat');
// var fs = require('fs')
// var os = require('os')
// // var colors = require('colors');
// var colors = require('colors/safe');
// var fs_extra = require('fs-extra')

// // var Entities = require('html-entities').AllHtmlEntities;

// var filenamify = require('filenamify');

import colors from 'colors/safe';
import dateFormat from 'dateformat';
import filenamify from 'filenamify';
import * as fs from 'fs';
import * as fs_extra from 'fs-extra';
import { AllHtmlEntities } from 'html-entities';
import * as os from 'os';
import * as path from 'path';
import Tools from './Tools';




// var colors = require('colors/safe');
// var dateFormat = require('dateformat');
// var filenamify = require('filenamify');
// var fs = require('fs');
// var fs_extra = require('fs-extra');
// var AllHtmlEntities = require('html-entities').AllHtmlEntities;
// var os = require('os');
// var Tools = require('../Tools');



var entities = new AllHtmlEntities();
////////////

// import {currentTest, currentSpec} from '../autobot';


function passthrough(message) {
    return message;
}

export class Livy {


    /**
     * do this per spec file.
     * @param {String} specFile 
     */
    initialize(specFile) {

        this.livyDoDisplay = true;
        this.livyDoSaveEventScreenshots = true;

        const testParentDateTime = new Date();

        this.specMillis = dateFormat(testParentDateTime, "l");
        this.specTime = dateFormat(testParentDateTime, "hh:MM:sstt");
        this.specDate = dateFormat(testParentDateTime, "yyyymmdd");

        this.specFilePath = specFile;

        fs_extra.mkdirsSync(this.getReportDir());
        fs_extra.mkdirsSync(this.getEventScreenshotsDir());

        var html = '<!doctype html><style>body{background-color:#f5f5f5}</style>' + os.EOL;

        html += '<img src="" id="image" style="position:fixed;top:0;right:0;width:45%;border:1px solid blue"/>'

        html += `<h1>${this.specFilePath}</h1>`

        fs.appendFileSync(this.getFile(), html + os.EOL);
    }


    initializeNewTestCase(testCaseTitle, testParentTitle, testCaseFullTitle, testGrandparentsTitle) {
        this.testCaseTitle = testCaseTitle;
        this.testParentTitle = testParentTitle;
        this.testCaseFullTitle = testCaseFullTitle;
        this.testGrandparentsTitle = testGrandparentsTitle;
    }

    ////////////////////////////////////////////////


    getSpecFileName() {

        // const specFilePath = currentTest.file;

        // /Users/stuartrobinson/repos/autobot/autobot/test/dashboard.js

        const split = this.specFilePath.split('/')

        return split[split.length - 1].replace(".js", "")
    }
    getSpecFileDirName() {

        // const specFilePath = currentTest.file;

        // /Users/stuartrobinson/repos/autobot/autobot/test/dashboard.js

        const split = this.specFilePath.split('/')

        const fileName = split[split.length - 1]
        return split[split.length - 2]
    }

    getDateDir() {
        return 'livy/' + this.specDate;
    }
    getTimeDir() {
        return this.getDateDir() + '/' + this.specTime
    }

    /** one log file per test js file */
    getReportDir() {
        return this.getTimeDir() + '/' + this.getSpecFileDirName() + '__' + this.getSpecFileName() + '_' + this.specMillis;
    }

    /**
     * TODO - rename to eventSnapshot instead of screenshot.   cos holding DOM also. 
     */
    getEventScreenshotsDirName() {
        return 'eventScreenshots';
    }

    getEventScreenshotsDir() {
        return this.getReportDir() + '/' + this.getEventScreenshotsDirName();
    }
    // getErrorScreenshotsDir() {
    //   return this.getReportDir() + '/errorScreenshots';
    // }

    // livy.getErrorScreenshotFile(); //testCaseSpacelessName

    //getEventDomFileAbsPath

    getEventDomFileRelPath(id) {
        return this.getEventScreenshotsDirName() + '/' + id + '.html';
    }

    getEventDomFileAbsPath(id) {
        return this.getEventScreenshotsDir() + '/' + id + '.html';
    }

    getEventScreenshotFileRelPath(id) {
        return this.getEventScreenshotsDirName() + '/' + id + '.png';
    }

    getEventScreenshotFileAbsPath(id) {
        return this.getEventScreenshotsDir() + '/' + id + '.png';
    }

    getErrorScreenshotFileAbsPath() {
        return this.getReportDir() + '/' + this.getSpacelessTestCaseFullTitle() + '.png';
    }

    getErrorScreenshotFileRelPath() {
        return this.testCaseFullTitle.replace(/ /g, '_') + '.png';
    }

    getSpacelessTestCaseFullTitle() {
        return filenamify(this.testCaseFullTitle.replace(/ /g, '_'));
    }


    getFile() {
        return this.getReportDir() + "/report.html";
    }

    getScreenshotId(a, b, c) {
        return filenamify(a + '_' + b + '_' + c).replace(/ /g, '_');
    }


    getReportClickablePath() {
        return 'file://' + path.resolve(this.getFile()) + '#' + this.getSpacelessTestCaseFullTitle();
    }
    convertNpmColorsToCss(style) {
        var htmlStyle = '';

        if (!style) {
            style = passthrough;
        }
        else {

            var styles = style._styles;

            if (styles.includes('red')) {
                htmlStyle += "color:red;"
            } else if (styles.includes('green')) {
                htmlStyle += "color:green;"
            } else if (styles.includes('blue')) {
                htmlStyle += "color:blue;"
            }
            if (styles.includes('bold')) {
                htmlStyle += "font-weight:bold;"
            }
        }
        return htmlStyle;
    }

    setMouseoverEventScreenshotFunction(screenshotId) {

        if (this.livyDoSaveEventScreenshots) {
            // autobot.saveScreenshot(this.getEventScreenshotFileAbsPath(screenshotId))
            browser.saveScreenshot(this.getEventScreenshotFileAbsPath(screenshotId));
        }

        fs.appendFileSync(this.getEventDomFileAbsPath(screenshotId), Tools.getFullDom() + os.EOL);


        var html = ''
        html += `<script>` + os.EOL
        html += `function logEntryMouseover${screenshotId}() {` + os.EOL
        html += `    var elements = document.getElementsByTagName('span');` + os.EOL
        html += `    for (var i = 0; i < elements.length; i++) {` + os.EOL
        html += `        elements[i].style.backgroundColor="inherit";` + os.EOL
        html += `    }` + os.EOL
        html += `    document.images['image'].src="${this.getEventScreenshotFileRelPath(screenshotId)}";` + os.EOL
        html += `    document.getElementById('entrySpan${screenshotId}').style.backgroundColor="white";` + os.EOL
        html += `}` + os.EOL
        html += `</script>` + os.EOL

        fs.appendFileSync(this.getFile(), html + os.EOL);
    }


    logAction(message, style) {
        var htmlStyle = this.convertNpmColorsToCss(style);

        if (!style) {
            style = passthrough;
        }


        const testDateTime = new Date();

        const currTime = dateFormat(testDateTime, "hh:MM:sstt");
        const currDate = dateFormat(testDateTime, "yyyymmdd");


        if (!message) {
            message = ''
        }


        // var screenshotId = this.getScreenshotId(currDate, currTime, message);
        var screenshotId = dateFormat(new Date(), "MMssl");


        var html = ''
        html += `<span id="entrySpan${screenshotId}" onmouseover="logEntryMouseover${screenshotId}();" onclick="window.open('${this.getEventDomFileRelPath(screenshotId)}');">`
        html += entities.encode(currDate + ' ' + currTime + '> ')
        html += `<span style="${htmlStyle}">${entities.encode(message)}</span>`
        html += '</span><br/>'

        fs.appendFileSync(this.getFile(), html + os.EOL);

        if (this.livyDoDisplay) {
            if (this.testCaseTitle) {
                console.log(currTime + ' ' + colors.gray(this.testGrandparentsTitle) + ' ' + this.testParentTitle + ' ' + colors.black.bold(this.testCaseTitle + "> ") + style(message))
            }
            else {
                //message must be logged from outside a test (before or after?) so just preface message with spec full name
                console.log(currTime + ' ' + colors.gray(this.getSpecFileDirName()) + '/' + colors.black.bold(this.getSpecFileName() + "> ") + style(message))

            }
        }
        return screenshotId;
    }
    logFail(type, message, stack) {

        var html = '<span onmouseover="document.images[\'image\'].src=\'' + this.getEventScreenshotFileRelPath(screenshotId) + '\';" onmouseout="document.images[\'image\'].src=\'\';">'
            + entities.encode(currDate + ' ' + currTime + "> " + message)
            + '</span><br/>'
        fs.appendFileSync(this.getFile(), html + os.EOL);

        this.logReportError(stack);
    }

    logReportError(stack) {
        var html = ''//`<span style="font-family:monospace"><span style="font-weight:bold">${entities.encode(type)}:</span><span style="color:red">${entities.encode(message)}</span><br/>${os.EOL}`

        // console.log("logFailed(stack) ")
        // console.log(stack)

        // console.log("typeof stack")
        // console.log(typeof stack)
        // const asdf = stack + ' '
        // console.log("asdf")
        // console.log(asdf)
        // console.log("asdf plus stuff")
        // console.log(`${asdf} hi`)
        html += `<span name="thisIsWhereStackGoes" style="font-family:monospace;color:red"><pre>${entities.encode(stack)}</pre></span><br/>`
        // html += `<span name="thisIsWhereStackGoes" style="font-family:monospace;color:red"><pre>${stack}</pre></span><br/>`

        // console.log("entities.encode(stack) !!!!")
        // console.log(entities.encode(stack))

        // console.log("html")
        // console.log(html)

        // console.log("this.getFile()")
        // console.log(this.getFile())


        fs.appendFileSync(this.getFile(), html + os.EOL);
    }

    logErrorImage() {
        // <img src=${imageClickablePath} width=900></img>
        fs.appendFileSync(this.getFile(), `<img id="logErrorImage" src=${this.getErrorScreenshotFileRelPath()} width=45%></img><br/>` + os.EOL);

    }

    logWithoutPrefix(message, style) {

        var htmlStyle = this.convertNpmColorsToCss(style);

        if (!style) {
            style = passthrough;
        }

        //TODO start here -- not enough stylres are supported 
        var html = `<span style="white-space:pre;${htmlStyle}">${entities.encode(message)}</span><br/>`
        // fs.appendFileSync(file, message + os.EOL);
        fs.appendFileSync(this.getFile(), html + os.EOL);

        if (this.livyDoDisplay) {
            console.log(style(message))
        }
    }

    //run this before "it"
    logTestStart() {

        this.logWithoutPrefix('---------------------------------------------------------------------------------------');

        fs.appendFileSync(this.getFile(), `<span id=${this.getSpacelessTestCaseFullTitle()}></span>` + os.EOL);

        this.logWithoutPrefix('Starting test: ' + this.testGrandparentsTitle);
        this.logWithoutPrefix('                         ' + this.testParentTitle, colors.blue);
        this.logWithoutPrefix('                             ' + this.testCaseTitle, colors.bold.blue);
        this.logWithoutPrefix('');
    }


    logPassed() {
        var screenshotId = this.logAction('PASS', colors.green.bold);
        this.setMouseoverEventScreenshotFunction(screenshotId);

    }
    logFailed(stack) {
        // console.log("logFailed(stack) ")
        // console.log(stack)
        var screenshotId = this.logAction('FAIL', colors.red.bold);
        this.logReportError(stack);
        this.setMouseoverEventScreenshotFunction(screenshotId);

    }
    sayHi() {
        console.log("Oh, Hello");
    }

    logAfterEachStuff(testDidPass, stack){

        // let livy = global.livy;


        // let testDidPass = test.passed   //this.currentTest.state === "passed"
        // let stack = test.err.stack      //this.currentTest.err.stack


        // // if test passed, ignore, else take and save screenshot.
        if (testDidPass) {
            this.logPassed();
        }
        else {
            this.logFailed(stack);
            browser.saveScreenshot(this.getErrorScreenshotFileAbsPath());
            this.logErrorImage();
        }
        // const reportClickablePath = 'file://' + path.resolve(livy.getFile()) + '#' + livy.getSpacelessTestCaseFullTitle();

        console.log('\n\tReport:\n\t\t', this.getReportClickablePath(), '\n');
    }

}

