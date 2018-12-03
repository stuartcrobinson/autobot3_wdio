# TODO - UPDATE - OUT OF DATE - https://autoin.atlassian.net/browse/QS-413

HOW TO RUN:


``yarn install``

then


``npm run wdio -- --spec src/ui-test/loginForRye.test.js --wsLogin your@email.com --wsPassword y0urp4$$w0rd --wsUrl https://wordsmith.automatedinsights.com --noPics``


OR


``echo "--wsLogin your@email.com --wsPassword y0urp4$$w0rd --wsUrl https://wordsmith.automatedinsights.com" > file.txt; npm run wdio -- --spec src/test/loginForRye.test.js --notHeadless --noPics``


(alternatively, you can just save that echoed string to file.txt beforehand)

## options


``--noPics`` defaults to false - setting this to true prevents screenshots from being taken per logged action.  this will make the testing report less useful, but let the tests run faster

``--notHeadless`` defaults to false - set this flag to force autobot to load a visible

``--wsApiKey asdifuayiefewfiuhdkfhsdf`` if you don't give it your api key, it will grab it from the api_access page which will slow the tests down

``--hidePassword``  this will hide all passwords in the console and logs.  by default, only prod passwords are hidden.



as a live Ai tool, i'm imagining that we'll have a saved config file with a list of different user accounts with different permission levels for different levels of testing.

the nice thing about mocha is that you can run subsets of tests using "grep."  so certain tests could be tagged to run only for admin accounts, etc.  

as in 

``npm run wdio -- --mochaOpts.grep "Login"``

STYLE RULES

implementing in autobot eslint plugin

*  at some point after running x = Autobot.httpRequestCreateProject_begin(...), you must run Autobot.httpRequestComplete(x);
*  super.nameElements(); must be called at the end of every element container constructor
*  do not call "browser" from tests.  must be wrapped in autobot functions for proper logging and error handling.
* X  all files must start with //@ts-check (handled with eslint)
*  do NOT use chai.assert - too easy to mistakenly code: `assert(x)`
*  actually, don't `assert` at all.  each step should fail-fast. asserts are pointless clutter
* X tests including visual tests must end with AutobotAssert.visualTestsPassed() - this creates soft asserts for visual testing.  (handled with eslint)


notes:

- if you're using iTerm2, you can command-click on files in the stack trace to load in your defaul js editor
- browser.scroll doesn't work.
- you can't use ``npm install`` because it doesn't grab the autobot eslint plugin (`eslint-plugin-autobot`). 


 