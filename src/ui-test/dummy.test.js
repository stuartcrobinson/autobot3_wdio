// @ts-check
import { fastWebpage } from '../ui-model/misc/fastWebpage.page';

describe('DummyParent', () => {
  describe('Dummy', () => {
    before(() => {
      fastWebpage.load();
      // throw new Error('my error');
    });
    it('go home', () => {
      fastWebpage.load();
      // throw new Error('my error');

      // loginPage.load();
      // //trigger fail
      // dashboardPage.newProjectButton.click();
      // // loginPage.checkVisual(loginPage.emailInput);
    });
  });
});
