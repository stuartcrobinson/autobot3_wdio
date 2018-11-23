/* eslint no-multi-assign: "off" */
/*  eslint no-undef: "off" */

import assert from 'assert';
import { options, Autobot } from '../../autobot_framework/autobot';
import { sidebar } from '../support/wordsmith/misc/component/sideBar.comp';
import { loginPage } from '../support/wordsmith/misc/page/login.page';
import { dashboardPage } from '../support/wordsmith/misc/page/dashboard.page';

const path = require('path');

describe('Login', () => {
  it('with invalid creds', () => {
    loginPage.attemptLogIn(options.email, `${options.password}invalid`, options.wordsmithUrl);

    loginPage.checkVisual(loginPage.emailInput);

    // Autobot.checkVisual(loginPage.emailInput);
    loginPage.toast_invalidEmailOrPwd.close();
  });

  it('login and click Settings', () => {
    loginPage.logIn(options.email, options.password, options.wordsmithUrl);

    // sidebar.signOut();

    sidebar.settingsLink.click();
    sidebar.settingsMenu.signOutLink.waitForExist();

    dashboardPage.checkVisual(dashboardPage.projectsTableBody, sidebar.settingsMenu.greetingSpan);

    Autobot.checkVisual(dashboardPage.projectsTableBody, sidebar.settingsMenu.greetingSpan);
  });

  // TODO start here.  finish this test with smart vis logging and REMOVE ASSERTS they're just pointless clutter


  it('logout', () => {
    loginPage.logIn(options.email, options.password, options.wordsmithUrl);

    Autobot.checkVisual(loginPage.emailInput);

    sidebar.signOut();
    assert(loginPage.isLoaded(), 'Login page should be loaded.');
  });

  // src/test/login.test.js///Users/stuartrobinson/repos/autobot3_wdio/src/test/login.test.js
});
