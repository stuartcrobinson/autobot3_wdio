// @ts-check
import { UiElement } from '../../../../../aquifer/UiElement';
import { WordsmithPage } from '../../WordsmithPage';
import { toast } from '../component/toast.cont';
import { dashboardPage } from './dashboard.page';

export const loginPage = new class Login extends WordsmithPage {
  constructor() {
    super();
    this.emailInput = this.get('input.email').tagAsLoadCriterion();
    this.passwordInput = this.get('input.password').tagAsLoadCriterion();
    this.logInButton = this.get('input[value="Log In"]');
    this.toast_signedOutSuccessfully = toast.withMessage('Signed out successfully.');
    this.toast_invalidEmailOrPwd = toast.withMessage('Invalid Email or password.');
    this.headerLogoLink = this.get('.header__logo').tagAsLoadCriterion();
    this.header = this.get('.header').tagAsLoadCriterion();
    super.nameElements();
  }

  attemptLogIn(email, password, url) {
    this.load();
    this.emailInput.setValue(email);
    this.passwordInput.setValue(password, global.aquiferOptions.hidePassword);
    this.logInButton.click();
  }

  /** Logs in and waits for Dashboard page to load. */
  logIn() {
    this.attemptLogIn(global.aquiferOptions.wsLogin, global.aquiferOptions.wsPassword, global.aquiferOptions.wsUrl);
    dashboardPage.waitForLoad();
  }
}();
