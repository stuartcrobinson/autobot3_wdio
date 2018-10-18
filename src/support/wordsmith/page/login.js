// @ts-check
import { AbElement, Page, loadPage } from '../../../../autobot_framework/autobot';
import { toaster } from '../component/toaster';

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

  logIn(email, password, url) {
    loadPage(url);

    this.emailInput.setValue(email);
    this.passwordInput.setValue(password);
    this.logInButton.click();
  }
}();
