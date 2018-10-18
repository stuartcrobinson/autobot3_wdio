HOW TO RUN:

cd into repo directory

enter:

npm install

then

npm run wdio -- --mochaOpts.grep "Login"


notes:

logging needs a lot of work.  going to update it so the html reports are printed at the end of all test completion.

need to write better demo tests.

need to possibly throw fresh Errors when "wait" methods fail in order to get full stack trace





old notes:

wdio fresh start, going to try to use es6 in tests and wdio.conf.js file

update - failed to get es6 working in wdio.conf file.  solution: passing in global object and using it's methods as defined in es6 files.

note - this is being cleaned up right now (wed oct 17 2018) just to prepare it to be later translated into typescript
