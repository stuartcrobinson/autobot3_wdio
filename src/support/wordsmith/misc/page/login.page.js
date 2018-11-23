// @ts-check
import { loadPage } from '../../../../../autobot_framework/autobot';
import { toast } from '../component/toast.comp';
import { dashboardPage } from './dashboard.page';
import { Page } from '../../../../../autobot_framework/support/Page';
import { UiAtom } from '../../../../../autobot_framework/support/UiAtom';

export const loginPage = new class Login extends Page {
  constructor(urlPath) {
    super(urlPath);
    this.emailInput = new UiAtom('input.email').tagAsLoadCriterion();
    this.passwordInput = new UiAtom('input.password').tagAsLoadCriterion();
    this.logInButton = new UiAtom('input[value="Log In"]');
    this.toast_signedOutSuccessfully = toast.withMessage('Signed out successfully.');
    this.toast_invalidEmailOrPwd = toast.withMessage('Invalid Email or password.');
    this.headerLogoLink = new UiAtom('.header__logo').tagAsLoadCriterion();
    this.header = new UiAtom('.header').tagAsLoadCriterion();
    super.nameElements();
  }

  attemptLogIn(email, password, url) {
    loadPage(url);
    this.emailInput.setValue(email);
    this.passwordInput.setValue(password);
    this.logInButton.click();
  }

  /** Logs in and waits for Dashboard page to load. */
  logIn(email, password, url) {
    this.attemptLogIn(email, password, url)
    dashboardPage.waitForLoad();
  }
}();
