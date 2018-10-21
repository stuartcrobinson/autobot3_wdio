// @ts-check
import { assert } from 'chai';
import { options } from '../../autobot_framework/autobot';
import { dashboardPage, loginPage } from '../support/wordsmith/pages';
import { sidebar } from '../support/wordsmith/component/sideBar.comp';
// import '../../autobot_framework/hooks/freshBrowsers';

describe('Login', () => {
  it('with valid creds', () => {
    loginPage.logIn(options.email, options.password, options.url);
    assert(dashboardPage.isLoaded(), 'Dashboard page should be loaded.');
  });

  it('with invalid creds', () => {
    browser.reload();
    loginPage.attemptLogIn(options.email, `${options.password}invalid`, options.url);
    loginPage.toaster_invalidEmailOrPwd.close();
    assert(loginPage.isLoaded(), 'Login page should be loaded.');
  });

  it('then logout', () => {
    loginPage.logIn(options.email, options.password, options.url);
    sidebar.signOut();
    assert(loginPage.isLoaded(), 'Login page should be loaded.');
  });
});
