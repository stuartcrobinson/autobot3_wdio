// @ts-check
import { options } from '../../autobot_framework/autobot';
import { dashboardPage } from '../ui-model/wordsmith/misc/page/dashboard.page';
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';
import { AutobotAssert } from '../../autobot_framework/support/AutobotAssert';

describe('Login', () => {
  it('with invalid creds', () => {
    loginPage.attemptLogIn(options.wsLogin, `${options.wsPassword}invalid`, options.wsUrl);
    loginPage.checkVisual(loginPage.emailInput);
    loginPage.toast_invalidEmailOrPwd.close();
    AutobotAssert.visualTestsPassed();
  });

  describe('with valid creds', () => {
    it('click Settings', () => {
      loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);
      dashboardPage.sidebar.settingsLink.click_waitForChange();
      dashboardPage.checkVisual(
        dashboardPage.table,
        dashboardPage.sidebar.settingsMenu.greetingSpan,
        dashboardPage.paginationContainer,
      );
      AutobotAssert.visualTestsPassed();
    });

    it('click Sign Out', () => {
      dashboardPage.sidebar.settingsMenu.signOutLink.click_waitForNotExisting();
      loginPage.toast_signedOutSuccessfully.checkVisual();
      AutobotAssert.visualTestsPassed();
    });
  });
});
