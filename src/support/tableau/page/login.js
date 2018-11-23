// @ts-check
import { UiElement, Page, loadPage } from '../../../../autobot_framework/autobot';

export const tableauLoginPage = new class Login extends Page {
  constructor() {
    super();
    this.usernameInput = new UiElement('input[name="username"]').tagAsLoadCriterion();
    this.passwordInput = new UiElement('input[name="password"]').tagAsLoadCriterion();
    this.signInButton = new UiElement('.tb-button-login').tagAsLoadCriterion();
    super.nameElements();
  }

  logIn(username, password) {
    loadPage("https://tableau-server.automatedinsights.com/#/signin");

    this.usernameInput.setValue(username);
    this.passwordInput.setValue(password);
    this.signInButton.click();
  }
}();
