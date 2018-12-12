## HOW TO RUN:


``yarn install``

then

``yarn start --wsLogin <email> --wsPassword <password> --wsUrl <ws base url> --s <spec name>``

as in

``yarn start --wsLogin srobinson@automatedinsights.com --wsPassword himom --wsUrl https://wordsmith.automatedinsights.com --s loginForRye``

## If you don't want your password in your shell history
You can save those options to ``file.txt`` in the project root directory in the same format (``--wsLogin <email> --wsPassword <password> --wsUrl <ws base url> --s <spec name>``).

eg, with creds saved to ``file.txt``, you can just do:

``yarn start --s Rye``

or run all the tests with:

``yarn start``

## other options

``--s`` spec file name(s).  this does not need to be a path or full name.  ``glob`` is used to search ``src/ui-test`` for tests that match this string.  multiple tests can be specified by separating with commas or enquoting and separating with spaces, that is ``--s test1,test2,test3`` or ``--s "test1 test2, test3"``.  Capitalization matters.

``--n`` number of times to run the given spec files.  this happens in parallel with max threads stipulated in wdio.conf.js

``--noPics`` defaults to false - setting this to true prevents screenshots from being taken per logged action.  this will make the testing report less useful, but let the tests run faster

``--notHeadless`` defaults to false - set this flag to force autobot to load a visible

``--wsApiKey <your api key>`` some tests use the api to create a new project with specific data.  if you don't give it your api key, it will grab it from the api_access page which will slow the tests down

``--hidePassword``  this will hide all passwords in the console and logs.  by default, only prod passwords are hidden.


## Rules

*  super.nameElements(); must be called at the end of every element container constructor (handled with eslint)
*  do not call "browser" from tests.  must be wrapped in autobot functions for proper logging and error handling.
*  all files must start with //@ts-check (handled with eslint)
*  don't use asserts.  every action should be fail-fast and reported clearly.
*  tests including visual tests must end with AquiferAssert.visualTestsPassed(); - this creates soft asserts for visual testing.  (handled with eslint)


notes:

- if you start seeing errors in vscode for references to ``global`` attribute variables, just open ``.d.ts`` for a second -- that should fix things.
- if you're using iTerm2, you can command-click on files in the stack trace to load in your defaul js editor
- browser.scroll doesn't work.
- you can't use ``npm install`` because it doesn't grab the autobot eslint plugin (`eslint-plugin-autobot`). 
- it's dangerous to ``export`` instantiated ``UiElement`` objects cos something might be tagged as loadCriterion somewhere, but shouldn't be everywhere it's used.
- a spec file must import something that extends UiContainer, otherwise the logging tool will never get created.  this would be unnecessary if mocha supported the ``--file`` option from their command line tools hmph


 