## Installation

``yarn``

## Execution

``yarn start --s <spec name> --wsUrl <ws base url> --wsLogin <email> --wsPassword <password> ``

as in

``yarn start --s loginForRye  --wsUrl https://wordsmith.automatedinsights.com --wsLogin srobinson@automatedinsights.com --wsPassword himom``

## If you don't want your password in your shell history

You can save those options to ``file.txt`` in the project root directory in the same format (``--wsLogin <email> --wsPassword <password> --wsUrl <ws base url> --s <spec name>``).

eg, with creds saved to ``file.txt``, you can just do:

``yarn start --s Rye``

or run all the tests with:

``yarn start``

## other options

``--s`` spec file name(s) [parts].  this does not need to be a path or full name.  ``glob`` is used to search ``src/ui-test`` for tests that match this string.  multiple tests can be specified by separating with commas or enquoting and separating with spaces, that is ``--s test1,test2,test3`` or ``--s "test1 test2, test3"``.  Case insensitive.  Target specs must end with ".test.js".

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

## Running from fresh linux instance (jenkins using ubuntu 16 0 4)
https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/#platform-linux


# Redhat/Centos

## everything
``sudo  yum update -y; sudo yum install git -y; curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo; curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -; sudo yum install yarn -y; sudo yum install -y nodejs; sudo yum install java-1.8.0 -y; sudo yum remove java-1.7.0-openjdk -y; curl https://intoli.com/install-google-chrome.sh | bash; ssh-keygen -t rsa -b 4096 -C "srobinson@automatedinsights.com"; eval "$(ssh-agent -s)"; ssh-add ~/.ssh/id_rsa; cat ~/.ssh/id_rsa.pub;``

``ssh-keygen -F github.com || ssh-keyscan github.com >>~/.ssh/known_hosts; git clone git@github.com:ai-wordsmith/autobot.git; cd autobot; yarn; cp selenium-standalone-default-config-updated.js node_modules/selenium-standalone/lib/default-config.js; ./node_modules/selenium-standalone/bin/selenium-standalone install; yarn start --s loginForRye  --wsUrl https://wordsmith.automatedinsights.com --wsLogin srobinson@automatedinsights.com --wsPassword himom``

## forcibly update selenium-standalone to use latest selenium version to fix thread bug

``cd ~/autobot``
``cp selenium-standalone-default-config-updated.js node_modules/selenium-standalone/lib/default-config.js``
``./node_modules/selenium-standalone/bin/selenium-standalone install``

## install chrome

``curl https://intoli.com/install-google-chrome.sh | bash``


## git
``sudo  yum update -y; sudo yum install git -y``

## yarn & npm
``curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo``
``curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -``
``sudo yum install yarn -y``
``sudo yum install -y nodejs``

## java
``sudo yum install java-1.8.0 -y``
``sudo yum remove java-1.7.0-openjdk -y``

## Add SSH key

``ssh-keygen -t rsa -b 4096 -C "srobinson@automatedinsights.com"``

``eval "$(ssh-agent -s)"``

``ssh-add ~/.ssh/id_rsa``

``cat ~/.ssh/id_rsa.pub``

--
``ssh-keygen -t rsa -b 4096 -C "srobinson@automatedinsights.com"; eval "$(ssh-agent -s)"; ssh-add ~/.ssh/id_rsa; cat ~/.ssh/id_rsa.pub``


## get code
https://serverfault.com/questions/447028/non-interactive-git-clone-ssh-fingerprint-prompt

``ssh-keygen -F github.com || ssh-keyscan github.com >>~/.ssh/known_hosts; git clone git@github.com:ai-wordsmith/autobot.git``

``cd autobot; yarn; ``

## run
``yarn start --s loginForRye  --wsUrl https://wordsmith.automatedinsights.com --wsLogin srobinson@automatedinsights.com --wsPassword himom``



yum install java-1.8.0-openjdk
??
 


 # ------end------------------------------------------


# Ubuntu
## Add SSH key

``ssh-keygen -t rsa -b 4096 -C "srobinson@automatedinsights.com"``

``eval "$(ssh-agent -s)"``

``ssh-add ~/.ssh/id_rsa``

``cat ~/.ssh/id_rsa.pub``

--
``ssh-keygen -t rsa -b 4096 -C "srobinson@automatedinsights.com"; eval "$(ssh-agent -s)"; ssh-add ~/.ssh/id_rsa; cat ~/.ssh/id_rsa.pub``


copy results and add to github.com > topright button > ssh... > new ssh key

## Install yarn & npm
https://yarnpkg.com/lang/en/docs/install/#debian-stable

``curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -``

``sudo apt-get update && sudo apt-get install yarn``

``sudo apt-get install npm -y``

``curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -; sudo apt-get update && sudo apt-get install yarn; sudo apt-get install npm -y``


## Install Java
``sudo apt-get update; sudo apt-get install default-jre -y``

## get code
https://serverfault.com/questions/447028/non-interactive-git-clone-ssh-fingerprint-prompt

``ssh-keygen -F github.com || ssh-keyscan github.com >>~/.ssh/known_hosts; git clone git@github.com:ai-wordsmith/autobot.git``

``cd autobot; yarn; ``


 