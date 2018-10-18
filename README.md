HOW TO RUN:

cd into repo directory

enter:

npm install

then

npm run wdio -- --mochaOpts.grep "Login"


notes:

to run NOT in headless mode, comment out this stuff in wdio.conf.js:


        chromeOptions: {
            args: ['--headless', '--disable-gpu', '--window-size=1280,800'],
            binary: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
        }

i cloned this repo into a fresh directory and everything worked for me, so it should work for you assuming your node and npm are relatively up to date?



TODOS:

logging needs a lot of work.  going to update it so the html reports are printed at the end of all test completion.

need to write better demo tests.

need to possibly throw fresh Errors when "wait" methods fail in order to get full stack trace





old notes:

wdio fresh start, going to try to use es6 in tests and wdio.conf.js file

update - failed to get es6 working in wdio.conf file.  solution: passing in global object and using it's methods as defined in es6 files.

note - this is being cleaned up right now (wed oct 17 2018) just to prepare it to be later translated into typescript
