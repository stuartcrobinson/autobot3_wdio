// @ts-check
import { loadPage } from '../../../../../autobot_framework/autobot';
import { toast } from '../component/toast.comp';
import { dashboardPage } from './dashboard.page';
import { WordsmithPage } from '../../../../../autobot_framework/support/WordsmithPage';
import { UiElement } from '../../../../../autobot_framework/support/UiElement';

export const loginPage = new class Login extends WordsmithPage {
  constructor(urlPath) {
    super(urlPath);
    this.emailInput = new UiElement('input.email').tagAsLoadCriterion();
    this.passwordInput = new UiElement('input.password').tagAsLoadCriterion();
    this.logInButton = new UiElement('input[value="Log In"]');
    this.toast_signedOutSuccessfully = toast.withMessage('Signed out successfully.');
    this.toast_invalidEmailOrPwd = toast.withMessage('Invalid Email or password.');
    this.headerLogoLink = new UiElement('.header__logo').tagAsLoadCriterion();
    this.header = new UiElement('.header').tagAsLoadCriterion();
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