/* eslint no-multi-assign: "off" */
/*  eslint no-undef: "off" */

import assert from 'assert';
import { options, Autobot } from '../../autobot_framework/autobot';
import { sidebar } from '../support/wordsmith/misc/component/sideBar.comp';
import { loginPage } from '../support/wordsmith/misc/page/login.page';
import { dashboardPage } from '../support/wordsmith/misc/page/dashboard.page';

const path = require('path');

describe('Dummy', () => {
  it('go home', () => {
    console.log('wtf here');
    loginPage.load();
    loginPage.checkVisual(loginPage.emailInput);


    browser.checkElement(loginPage.header.selector, { hide: loginPage.headerLogoLink.selector });

    // Autobot.checkVisual(loginPage.emailInput);
  });

  // src/test/login.test.js///Users/stuartrobinson/repos/autobot3_wdio/src/test/login.test.js
});
