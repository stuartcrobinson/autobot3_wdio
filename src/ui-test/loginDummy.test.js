// @ts-check
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';

describe('Dummy', () => {
  it('go home', () => {
    loginPage.load();
    loginPage.checkVisual(loginPage.emailInput);
  });
});
