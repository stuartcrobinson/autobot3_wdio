// @ts-check
import { AquiferAssert } from '../../aquifer/AquiferAssert';
import { dashboardPage } from '../ui-model/wordsmith/misc/page/dashboard.page';
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';

describe('Login', () => {
  it('with invalid creds', () => {
    loginPage.attemptLogIn(global.aquiferOptions.wsLogin, `${global.aquiferOptions.wsPassword}invalidBit`);
    loginPage.checkVisual(loginPage.emailInput);
    loginPage.toast_invalidEmailOrPwd.close();
    AquiferAssert.visualTestsPassed();
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
      AquiferAssert.visualTestsPassed();
    });

    it('click Sign Out', () => {
      dashboardPage.sidebar.settingsMenu.signOutLink.click_waitForNotExisting();
      loginPage.toast_signedOutSuccessfully.checkVisual();
      AquiferAssert.visualTestsPassed();
    });
  });
});
