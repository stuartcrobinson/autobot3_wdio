import { assert } from 'chai';
import { options } from '../../../autobot_framework/autobot';
import { loginPage } from '../../support/wordsmith/pages';

describe('Login', function () {

    it('with invalid creds should display warning', function () {
        loginPage.logIn(options.email, options.password + 'invalid', options.url);
        loginPage.toaster_invalidEmailOrPwd.waitForExist();
        loginPage.toaster_invalidEmailOrPwd.close();
        loginPage.toaster_invalidEmailOrPwd.waitForNotExist();
        assert(loginPage.isLoaded(), "Login page should be loaded.");
    });

});
