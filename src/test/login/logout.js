// @ts-check
import { assert } from 'chai';
import { options } from '../../../autobot_framework/autobot';
import { sidebar } from '../../support/wordsmith/component/sideBar';
import { dashboardPage, loginPage } from '../../support/wordsmith/pages';

describe('Login', () => {
  it('then logout should return to login page', () => {
    loginPage.logIn(options.email, options.password, options.url);
    loginPage.logInButton.waitForNotExist();
    dashboardPage.waitForLoad();
    sidebar.settingsLink.hover();
    sidebar.settingsMenu.signOutLink.click();
    loginPage.toaster_signedOutSuccessfully.waitForExist();
    loginPage.toaster_signedOutSuccessfully.close();
    loginPage.toaster_signedOutSuccessfully.waitForNotExist();
    assert(loginPage.isLoaded(), 'Login page should be loaded.');
  });
});
