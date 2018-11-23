// @ts-check
import assert from 'assert';
import { options } from '../../autobot_framework/autobot';
import { sidebar } from '../support/wordsmith/misc/component/sideBar.comp';
import { loginPage } from '../support/wordsmith/misc/page/login.page';
// import { dashboardPage } from '../support/wordsmith/misc/page/dashboard.page';

// Simple login and logout tests for Rye to use while implementing into jenkins process

describe('Login for Rye', () => {
  it('with valid creds', () => {
    loginPage.attemptLogIn(options.email, options.password, options.wordsmithUrl);
    assert(sidebar.settingsLink.isExisting(), 'Settings link should be visible after logging in successfully.');
  });
});
