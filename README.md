HOW TO RUN:

cd into repo directory

enter:

``npm install``

then

``echo "--email your@email.com --password y0urp4$$w0rd --url https://wordsmith.automatedinsights.com" > file.txt; npm run wdio -- --mochaOpts.grep "Login"``

OR

``npm run wdio -- --spec src/test/login/login.js --key "email=your@email.com password=y0urp4$$w0rd url=https://wordsmith.automatedinsights.com"``

(alternatively, you can just save that echoed string to file.txt beforehand)

as a live Ai tool, i'm imagining that we'll have a saved config file with a list of different user accounts with different permission levels for different levels of testing.

the nice thing about mocha is that you can run subsets of tests using "grep."  so certain tests could be tagged to run only for admin accounts, etc.  

notes:

- to run NOT in headless mode, comment out this stuff in wdio.conf.js:


        chromeOptions: {
            args: ['--headless', '--disable-gpu', '--window-size=1280,800'],
            binary: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
        }

- if you're using iTerm2, you can command-click on files in the stack trace to load in your defaul js editor


TODOS:

logging needs a lot of work.  going to update it so the html reports are printed at the end of all test completion.

need to write better demo tests.

need to possibly throw fresh Errors when "wait" methods fail in order to get full stack trace





old notes:

wdio fresh start, going to try to use es6 in tests and wdio.conf.js file

update - failed to get es6 working in wdio.conf file.  solution: passing in global object and using it's methods as defined in es6 files.

note - tried and gave up on writing project in typescript.  it ruined the stack trace and also caused browsers to briefly open per test (even if not running that test), and i'm not sure why


STYLE RULES

*  at some point after running x = Autobot.httpRequestCreateProject_begin(...), you must run Autobot.httpRequestComplete(x);
*  super.nameElements(); must be called at the end of every page object constructor
*  do not call "browser" from tests.  must be wrapped in autobot functions for proper logging and error handling.
*  all files must start with //@ts-check

 