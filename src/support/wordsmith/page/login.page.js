// @ts-check
import { AbElement, Page, loadPage } from '../../../../autobot_framework/autobot';
import { toaster } from '../component/toaster.comp';
import { dashboardPage } from './dashboard.page';

export const loginPage = new class Login extends Page {
  constructor() {
    super();
    this.emailInput = new AbElement('input.email').tagAsLoadCriterion();
    this.passwordInput = new AbElement('input.password').tagAsLoadCriterion();
    this.logInButton = new AbElement('input[value="Log In"]');
    this.toaster_signedOutSuccessfully = toaster.withMessage('Signed out successfully.');
    this.toaster_invalidEmailOrPwd = toaster.withMessage('Invalid Email or password.');
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
