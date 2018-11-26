// @ts-check
import assert from 'assert';
import { options } from '../../autobot_framework/autobot';
import { sidebar } from '../ui-model/wordsmith/misc/component/sideBar.comp';
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';

// Simple login and logout tests for Rye to use while implementing into jenkins process

describe('Login for Rye', () => {
  it('with valid creds', () => {
    loginPage.attemptLogIn(options.wsLogin, options.wsPassword, options.wsUrl);
    assert(sidebar.settingsLink.isExisting(), 'Settings link should be visible after logging in successfully.');
  });
});
