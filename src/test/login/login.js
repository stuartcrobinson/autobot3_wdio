
// @ts-check
import { assert } from 'chai';
import { options } from '../../../autobot_framework/autobot';
import { dashboardPage, loginPage } from '../../support/wordsmith/pages';


describe('Login', () => {
  it('with valid creds should load the dashboard', () => {
    loginPage.logIn(options.email, options.password, options.url);
    loginPage.logInButton.waitForNotExist();

    dashboardPage.waitForLoad();
    assert(dashboardPage.isLoaded(), 'Dashboard page should be loaded.');
  });
});
