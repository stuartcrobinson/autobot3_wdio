// @ts-check
import { loadPage } from  '../../../../../autobot_framework/autobot';
import { toast } from '../component/toast.comp';
import { dashboardPage } from './dashboard.page';
import { Page } from '../../../../../autobot_framework/support/Page';
import { AbElement } from '../../../../../autobot_framework/support/AbElement';

export const loginPage = new class Login extends Page {
  constructor() {
    super();
    this.emailInput = new AbElement('input.email').tagAsLoadCriterion();
    this.passwordInput = new AbElement('input.password').tagAsLoadCriterion();
    this.logInButton = new AbElement('input[value="Log In"]');
    this.toast_signedOutSuccessfully = toast.withMessage('Signed out successfully.');
    this.toast_invalidEmailOrPwd = toast.withMessage('Invalid Email or password.');
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
