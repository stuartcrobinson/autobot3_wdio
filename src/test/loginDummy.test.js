// @ts-check
import { loginPage } from '../support/wordsmith/misc/page/login.page';

describe('Dummy', () => {
  it('go home', () => {
    loginPage.load();
    loginPage.checkVisual(loginPage.emailInput);
  });
});
