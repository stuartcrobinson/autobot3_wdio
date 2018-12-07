// @ts-check
import { options } from '../../aquifer/aqua';
import { dashboardPage } from '../ui-model/wordsmith/misc/page/dashboard.page';
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';
import { AquaAssert } from '../../aquifer/support/AquaAssert';

describe('Login', () => {
  it('with invalid creds', () => {
    loginPage.attemptLogIn(options.wsLogin, `${options.wsPassword}invalid`, options.wsUrl);
    loginPage.checkVisual(loginPage.emailInput);
    loginPage.toast_invalidEmailOrPwd.close();
    AquaAssert.visualTestsPassed();
  });

  describe('with valid creds', () => {
    it('click Settings', () => {
      loginPage.logIn();
      dashboardPage.sidebar.settingsLink.click_waitForChange();
      dashboardPage.checkVisual(
        dashboardPage.table,
        dashboardPage.sidebar.settingsMenu.greetingSpan,
        dashboardPage.paginationContainer,
      );
      AquaAssert.visualTestsPassed();
    });

    it('click Sign Out', () => {
      dashboardPage.sidebar.settingsMenu.signOutLink.click_waitForNotExisting();
      loginPage.toast_signedOutSuccessfully.checkVisual();
      AquaAssert.visualTestsPassed();
    });
  });
});
