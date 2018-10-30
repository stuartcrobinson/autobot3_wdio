// @ts-check
import { assert } from 'chai';
import { options } from '../../autobot_framework/autobot';
import { sidebar } from '../support/wordsmith/misc/component/sideBar.comp';
import { loginPage } from '../support/wordsmith/misc/page/login.page';

describe('Login', () => {
  it('with invalid creds', () => {
    // browser.reload();
    loginPage.attemptLogIn(options.email, `${options.password}invalid`, options.url);
    loginPage.toast_invalidEmailOrPwd.close();
    assert(loginPage.isLoaded(), 'Login page should be loaded.');
  });

  it('and logout', () => {
    loginPage.logIn(options.email, options.password, options.url);
    sidebar.signOut();
    assert(loginPage.isLoaded(), 'Login page should be loaded.');
  });
});
