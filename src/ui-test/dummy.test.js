// @ts-check
import { fastWebpage } from '../ui-model/misc/fastWebpage.page';
import { editBranchComp } from '../ui-model/wordsmith/editor/segmentEditors/editBranch.comp';
import { key } from '../../autobot_framework/support/Key';
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';
import { options } from '../../autobot_framework/autobot';

describe('DummyParent', () => {
  describe('Dummy', () => {
    before(() => {
      // fastWebpage.load();
      // fastWebpage.keys('here', 3, 'go', 2, false);
      // fastWebpage.keys('here', 3, 'go', 2);
      // throw new Error('my error');
    });
    it('go home', () => {
      loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);

      // browser.url('https://wordsmith.automatedinsights.com/projects/autobot-add-data20181127-03-58-57pm/templates/autobot-add-data20181127-03-58-57pm-template/edit/editor?segment=fe306362-de1b-44ed-8659-852a1edf6639');
      // browser.url('https://wordsmith.automatedinsights.com/projects/autobot-add-data20181127-05-02-44pm/templates/autobot-add-data20181127-05-02-44pm-template/edit/editor?segment=5bde3492-1ab7-4f8a-a9f0-c94b5760a303');
      browser.url('https://wordsmith.automatedinsights.com/projects/autobot-add-data20181127-04-50-14pm/templates/autobot-add-data20181127-04-50-14pm-template/edit/editor?segment=c8ea9eef-9fda-4903-b99a-f50705006c24');
      // fastWebpage.load();
      // throw new Error('my error');

      editBranchComp.getNthBranchBox(1).conditionLabel.click_waitForChange();

      editBranchComp.getNthBranchBox(1).editorInput.click();
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);

      editBranchComp.getNthBranchBox(1).editorInput.keys('hello there');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      // editBranchComp.getNthBranchBox(1).editorInput.keys('i');
      // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);

      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);

      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      // editBranchComp.getNthBranchBox(1).editorInput.setValue('');
      editBranchComp.getNthBranchBox(1).editorInput.keys('p');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys('o');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys('c');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys('k');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys('y');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(' ');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys('is');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(' ');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys('delicious');
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);


      editBranchComp.getNthBranchBox(1).editorInput.keys([key.SHIFT, key.LEFT, key.LEFT]);
      editBranchComp.getNthBranchBox(1).editorInput.keys([key.LEFT, key.LEFT]);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.keys('what');
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.SHIFT);
      editBranchComp.getNthBranchBox(1).editorInput.keys('now');


      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
      editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
      editBranchComp.getNthBranchBox(1).editorInput.sleep(100);


      editBranchComp.getNthBranchBox(1).editorInput.clear();
      editBranchComp.getNthBranchBox(1).editorInput.keys('hello');
      editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE]);

      editBranchComp.getNthBranchBox(1).editorInput.keys('hi');

      editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE]);
      editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE]);
      editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE]);
      editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE]);

      // loginPage.load();
      // //trigger fail
      // dashboardPage.newProjectButton.click();
      // // loginPage.checkVisual(loginPage.emailInput);
    });
  });
});
