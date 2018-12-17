/* ************************************************************************************************************ */
/* **** This is the WebdriverIO configuration file.  It's not using ES6 cos I couldn't figure out how. ******** */
/* **** It's accessing external local files using the global object since it can't run ES6 code. ************** */
/* ************************************************************************************************************ */
var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');
var glob = require("glob")
var yargsParse = require('yargs-parser');
var stringArgv = require('string-argv');
var fs = require('fs');
var rimraf = require('rimraf')


!fs.existsSync('tmp') && fs.mkdirSync('tmp');

const POINTLESS_ANNOYING_WDIO_ERROR_SHOTS_DIR = 'tmp/errorShots'

/* Store input parameters in global.aquiferOptions object. */

const optionsFileContents = fs.existsSync('file.txt') ? yargsParse(stringArgv(fs.readFileSync('file.txt'))) : '';
const options = { ...optionsFileContents, ...yargsParse(process.argv) }
options.hidePassword = options.hidePassword || options.wsUrl.includes('wordsmith.automatedinsights');
// options.myRunId = 'progressFileShouldntExistAfterRun ' + options.myRunId;

global.aquiferOptions = options

/** For wdio-visual-regression-service.  Used by aquilog.  */
function getScreenshotName(basePath) {
  return function (context) {
    var type = context.type;
    var testName = context.test.fullTitle;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    const tag = global.customScreenshotTag;

    const result = path.join(basePath, `${testName}_${type}_${tag}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);

    // Used to display the diff image in the html report.
    global.previousImageFileLocation = result;

    /* Log the screenshot. */

    if (basePath.includes('screenshots/reference')) {

      let resultScreen = result.replace('screenshots/reference', 'screenshots/screen');

      if (global.doDeleteReferenceImage) {
        global.livy.logVisualTestReset(resultScreen);
      }
      else if (!fs.existsSync(result)) {
        global.livy.logVisualTestCreate(resultScreen);
      }
      else {
        global.livy.logVisualTestVerify(resultScreen);
      }
    }

    /* Reset visual test reference image. */

    if (global.doDeleteReferenceImage && basePath.includes('screenshots/reference')) {
      if (!fs.existsSync(result)) {
        throw new Error('You tried to delete a reference image that does not exist.  Images are specific to environment (including headless or not).  File: ' + result);
      }
      else {
        fs.unlinkSync(result);
      }
    }

    return result;
  };
}

/**
 * Note: this fails when pattern starts w/ './' or '/'
 * https://stackoverflow.com/questions/29447637/node-glob-isnt-matching-anything-if-path-starts-with-and-nocase-true-bu
 * @param {string} pattern 
 */
function find(pattern) {
  return glob.sync(pattern, { nocase: true });
}
/**
 * Builds an array of filepaths to be used as a wdio suite, defined below.  
 * 
 * @param {string | Array} s from --s (for spec files) input.  Will be an array if --s was specified multiple times in which case only the last element of the array will be used.  This allows an overrideable default to be listed in the npm script.  the --s term can be a substring of a test, or multiple test substrings concatenated by comma or space.
 * Defaults to '.test' which matches any test (a la '*.test.js')
 * @param {number} n number of times to run all the matched spec files.  useful for test development, so you can run a test a bunch of times to make sure it's not "flaky"
 */
function buildSpecsArrayForWdioSuite(s = '.test', n = 1) {

  let specFilePaths =
    (typeof s === 'object' ? s[s.length - 1] : s) //override default spec files option if multiple --s's passed
      .trim()
      .split(/[ ,]+/)
      .concat('awe8fy9wflasidufasid7yf')    //to ensure array length is > 1 to trigger reduce
      .map(s => s.includes('src/ui-test') ? s : 'src/ui-test/**/*' + s + '*')
      .reduce((a, c) => typeof a === 'string' ? find(a).concat(find(c)) : a.concat(find(c)))
      .filter(s => !s.includes('*'));

  let specFilePathsRepeated = [];

  Array(n).fill(1).forEach(x => { specFilePathsRepeated = specFilePathsRepeated.concat(specFilePaths) });

  if (doPrintSpecsToRun()) {
    console.log(`🔨 Preparing to run the following spec file${specFilePaths.length > 1 ? 's' : ''}${n > 1 ? (' ' + n + ' times') : ''}:`)
    console.log(specFilePaths);
  }

  return specFilePathsRepeated;
}

const FILE_PATH_DID_PRINT_SPECS = "tmp/printedSpecsToRun" + options.myRunId;
const FILE_PATH_PROGRESS_FILE = "tmp/progressFile" + options.myRunId;

function doPrintSpecsToRun() {
  const FILE = FILE_PATH_DID_PRINT_SPECS;
  if (fs.existsSync(FILE)) {
    return false;
  }
  else {
    fs.writeFileSync(FILE, 'existence of this file means that specs to run were already printed in console and should not be reprinted.  this file should be deleted when all tests finish.');
    return true;
  }
}

function getChromeBinaryLocation() {
  switch (process.platform) {
    case 'darwin':
      // return 'node_modules/chromedriver/lib/chromedriver/chromedriver';
      return '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';
    case 'linux':
      // return 'node_modules/chromedriver/lib/chromedriver/chromedriver'
      return '/usr/bin/google-chrome-stable' //install using https://intoli.com/blog/installing-google-chrome-on-centos/ `curl https://intoli.com/install-google-chrome.sh | bash`

  }
}

exports.config = {
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    // './src/ui-test/**/*.js'  //note: don't use this.  gives annoying output.  use yarn start and use --s to specify tests
  ],
  // define specific suites
  // NOTE - don't use wildcards here.  it will "work" but only run the first match, i think. 
  suites: {
    login: [
      './src/ui-test/dummy.test.js',
      './src/ui-test/loginForRye.test.js'
    ],
    branch: [
      './src/ui-test/editor/segment/branch.test.js',
      './src/ui-test/editor/segment/branch.test.js',
      './src/ui-test/editor/segment/branch.test.js',
      './src/ui-test/editor/segment/branch.test.js',
      './src/ui-test/editor/segment/branch.test.js'
    ],
    dummy: [
      'src/ui-test/dummy/dummy.js',
      'src/ui-test/dummy/dummy.js',
      'src/ui-test/dummy/dummy.js',
    ],
    dummies: [
      'src/ui-test/dummy/dummy1.js',
      'src/ui-test/dummy/dummy2.js',
      'src/ui-test/dummy/dummy3.js',
    ],
    dummies2: [
      'src/ui-test/dummy/dummy*.js'
    ],
    dev: global.aquiferOptions.suite === 'dev' ? buildSpecsArrayForWdioSuite(global.aquiferOptions.s, global.aquiferOptions.n) : []
  },
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 10,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 5,
    //
    browserName: 'chrome',
    chromeOptions: global.aquiferOptions.notHeadless ? {} : {
      args: ['--headless', '--disable-gpu', '--window-size=1280,800'],
      binary: getChromeBinaryLocation()
    }
  }],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  sync: true,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'silent',
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // Warns when a deprecated command is used
  deprecationWarnings: false,
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: POINTLESS_ANNOYING_WDIO_ERROR_SHOTS_DIR + '/',   //commented out cos was saving useless screenshots in stupid places. hope it still works.
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: 'http://localhost',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 90000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Initialize the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as properties. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  // plugins: {
  //     webdrivercss: {
  //         screenshotRoot: 'my-shots',
  //         failedComparisonsRoot: 'diffs',
  //         misMatchTolerance: 0.05,
  //         screenWidth: [320,480,640,1024]
  //     },
  //     webdriverrtc: {},
  //     browserevent: {}
  // },
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['selenium-standalone', 'visual-regression'],
  //from wdio main page:
  visualRegression: {
    compare: new VisualRegressionCompare.LocalCompare({
      referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
      screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
      diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
      misMatchTolerance: 0.00,
    }),
    // viewportChangePause: 300,
    // viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
    // orientations: ['landscape', 'portrait'],
  },
  // visualRegression: {
  //   compare: new VisualRegressionCompare.LocalCompare({
  //     referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
  //     screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/taken')),
  //     diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
  //   }),
  // },
  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/reporters/dot.html
  reporters: ['spec'],
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000,
    compilers: ['js:@babel/register'],
    file: 'mocha.global.js'
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // beforeSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // before: function (capabilities, specs) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },

  /**
   * Hook that gets executed before the suite starts.  (Suite is a mocha thing, not the wdio.conf-defined "suites" above.  So there is 1 spec file per suite. - stuart)
   * @param {Object} suite suite details
   */
  beforeSuite: function (suite) {
    if (!global.livy) {
      console.log('Logging object doesnt exist on the global var. import a page or UiElement into your test to fix this.');
      process.abort();
    }
    global.livy.wdioConf_beforeSuite(suite, FILE_PATH_PROGRESS_FILE);
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  beforeTest: function (test) {
    global.livy.wdioConf_beforeTest(test);

  },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function () {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function () {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
   * @param {Object} test test details
   */
  afterTest: function (test) {
    global.livy.wdioConf_afterTest(test.passed, test.err);
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  afterSuite: function (suite) {
    global.livy.wdioConf_afterSuite(suite.err, FILE_PATH_PROGRESS_FILE);
  },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  afterCommand: function (commandName, args, result, error) {
  },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  after: function (result, capabilities, specs) {
    global.livy && global.livy.wdioConf_after()
  },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  afterSession: function (config, capabilities, specs) {
    global.livy && global.livy.wdioConf_afterSession()
  },
  /**
   * Gets executed after all workers got shut down and the process is about to exit.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onComplete: function (exitCode, config, capabilities) {
    console.log(fs.readFileSync(FILE_PATH_PROGRESS_FILE).toString());
    //TODO put these in a dir and delete the whole dir here QS-480
    fs.unlinkSync(FILE_PATH_PROGRESS_FILE);
    fs.unlinkSync(FILE_PATH_DID_PRINT_SPECS);
    rimraf.sync(POINTLESS_ANNOYING_WDIO_ERROR_SHOTS_DIR);
    rimraf.sync('tmp');
  }
}