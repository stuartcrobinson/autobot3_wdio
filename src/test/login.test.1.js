import { assert } from 'chai';
import { options } from '../../autobot_framework/autobot';
// import { sidebar } from '../support/wordsmith/misc/component/sideBar.comp';
import { loginPage } from '../support/wordsmith/misc/page/login.page';

describe('Login', () => {
  it('with invalid creds', () => {
    // browser.reload();
    loginPage.attemptLogIn(options.email, `${options.password}invalid`, options.url);

    // TODO wrap and log this:
    // @ts-ignore
    const visualTestReport = browser.checkViewport()[0];
    console.log('visualTestReport:');
    console.log(visualTestReport);
    assert(visualTestReport.isWithinMisMatchTolerance);

    loginPage.toast_invalidEmailOrPwd.close();
    assert(loginPage.isLoaded(), 'Login page should be loaded.');
  });

  // it('and logout', () => {
  //   loginPage.logIn(options.email, options.password, options.url);
  //   sidebar.signOut();
  //   assert(loginPage.isLoaded(), 'Login page should be loaded.');
  // });  //src/test/login.test.js///Users/stuartrobinson/repos/autobot3_wdio/src/test/login.test.js
});
