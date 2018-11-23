import { Page } from "../../../../autobot_framework/support/Page";

// @ts-check

export const tableauLoginPage = new class Login extends Page {
  constructor() {
    super();
    this.usernameInput = this.get('input[name="username"]').tagAsLoadCriterion();
    this.passwordInput = this.get('input[name="password"]').tagAsLoadCriterion();
    this.signInButton = this.get('.tb-button-login').tagAsLoadCriterion();
    super.nameElements();
  }

  logIn(username, password) {
    loadPage("https://tableau-server.automatedinsights.com/#/signin");

    this.usernameInput.setValue(username);
    this.passwordInput.setValue(password);
    this.signInButton.click();
  }
}();
