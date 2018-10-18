
// @ts-check
import { options } from '../../../autobot_framework/autobot';
import { loginPage } from '../../support/wordsmith/pages';


describe('Login', () => {
  it('with valid creds should load the dashboard faildemo', () => {
    loginPage.logIn(options.email, options.password, options.url);
    throw new Error('sample error');
  });
});
