// @ts-check
import assert from 'assert';
import { options } from '../../aquifer/aqua';
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';
import { sidebar } from '../ui-model/wordsmith/misc/component/sideBar.cont';

// Simple login and logout tests for Rye to use while implementing into jenkins process

describe('Login for Rye', () => {
  it('with valid creds', () => {
    loginPage.attemptLogIn(options.wsLogin, options.wsPassword, options.wsUrl);
    assert(sidebar.settingsLink.isExisting(), 'Settings link should be visible after logging in successfully.');
  });
});
