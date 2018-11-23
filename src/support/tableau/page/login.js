// @ts-check
import { Page } from "../../../../autobot_framework/support/Page";

export const tableauLoginPage = new class Login extends Page {
  constructor() {
    super("https://tableau-server.automatedinsights.com/#/signin");
    this.usernameInput = this.getChild('input[name="username"]').tagAsLoadCriterion();
    this.passwordInput = this.getChild('input[name="password"]').tagAsLoadCriterion();
    this.signInButton = this.getChild('.tb-button-login').tagAsLoadCriterion();
    super.nameElements();
  }

  logIn(username, password) {
    this.load();

    this.usernameInput.setValue(username);
    this.passwordInput.setValue(password);
    this.signInButton.click();
  }
}();
