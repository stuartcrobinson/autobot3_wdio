HOW TO RUN:


``npm install``


``echo "--email your@email.com --password y0urp4$$w0rd --url https://wordsmith.automatedinsights.com" > file.txt; npm run wdio -- --spec src/test/loginForRye.test.js``

OR

``npm run wdio -- --spec src/test/login/loginForRye.js --key "email=your@email.com password=y0urp4$$w0rd url=https://wordsmith.automatedinsights.com"``

(alternatively, you can just save that echoed string to file.txt beforehand)

as a live Ai tool, i'm imagining that we'll have a saved config file with a list of different user accounts with different permission levels for different levels of testing.

the nice thing about mocha is that you can run subsets of tests using "grep."  so certain tests could be tagged to run only for admin accounts, etc.  

as in 

``npm run wdio -- --mochaOpts.grep "Login"``

notes:

- to run NOT in headless mode, comment out this stuff in wdio.conf.js:

        chromeOptions: {
            args: ['--headless', '--disable-gpu', '--window-size=1280,800'],
            binary: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
        }

- if you're using iTerm2, you can command-click on files in the stack trace to load in your defaul js editor


STYLE RULES

*  at some point after running x = Autobot.httpRequestCreateProject_begin(...), you must run Autobot.httpRequestComplete(x);
*  super.nameElements(); must be called at the end of every page object constructor
*  do not call "browser" from tests.  must be wrapped in autobot functions for proper logging and error handling.
*  all files must start with //@ts-check

 