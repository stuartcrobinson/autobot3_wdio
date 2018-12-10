// @ts-check
import { UiElement } from '../../../../../aquifer/support/UiElement';
import { WordsmithPage } from '../../WordsmithPage';
import { toast } from '../component/toast.cont';
import { dashboardPage } from './dashboard.page';

export const loginPage = new class Login extends WordsmithPage {
  constructor() {
    super();
    this.emailInput = new UiElement('input.email').tagAsLoadCriterion();
    this.passwordInput = new UiElement('input.password').tagAsLoadCriterion();
    this.logInButton = new UiElement('input[value="Log In"]');
    this.toast_signedOutSuccessfully = toast.withMessage('Signed out successfully.');
    this.toast_invalidEmailOrPwd = toast.withMessage('Invalid Email or password.');
    this.headerLogoLink = new UiElement('.header__logo').tagAsLoadCriterion();
    this.header = new UiElement('.header').tagAsLoadCriterion();
    super.nameElements();
  }

  // super.nameElements();
  attemptLogIn(email, password, url) {
    this.load();
    this.emailInput.setValue(email);
    this.passwordInput.setValue(password, global.aquiferOptions.hidePassword);
    this.logInButton.click();
  }

  // /** Logs in and waits for Dashboard page to load. */
  // logIn(email, password, url) {
  //   this.attemptLogIn(email, password, url);
  //   dashboardPage.waitForLoad();
  // }

  /** Logs in and waits for Dashboard page to load. */
  logIn() {
    this.attemptLogIn(global.aquiferOptions.wsLogin, global.aquiferOptions.wsPassword, global.aquiferOptions.wsUrl);
    dashboardPage.waitForLoad();
  }
}();
