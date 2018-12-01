// @ts-check
/* eslint guard-for-in: "off", no-restricted-syntax: "off", prefer-destructuring: "off" */

import { fastWebpage } from '../ui-model/misc/fastWebpage.page';
import { editBranchPage } from '../ui-model/wordsmith/editor/segmentEditors/editBranch.page';
import { key } from '../../autobot_framework/support/Key';
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';
import { options } from '../../autobot_framework/autobot';
import { livy } from '../../autobot_framework/support/Livy';
import { UiElement } from '../../autobot_framework/support/UiElement';
import { dashboardPage } from '../ui-model/wordsmith/misc/page/dashboard.page';
import { AutobotAssert } from '../../autobot_framework/support/AutobotAssert';


const appendFunctionToTestsRecursively = (newFunction, suites) => {
  // console.log('suites fos98dfu9s8df');
  // console.log(suites);

  // if (suites.suites) {
  //   appendFunctionToTestsRecursively(newFunction, suites.suites);
  // }

  //   // this._runnable.parent.suites[0].suites[0].tests[0].fn = () => { myf(); myf2(); myf3(); };


  for (let i = 0; i < suites.length; i++) {
    const suite = suites[i];

    if (suite.suites) {
      appendFunctionToTestsRecursively(newFunction, suite.suites);
    }

    const tests = suite.tests;
    if (tests) {
      // console.log('tests fos98dfu9s8df');
      // console.log(tests);
      for (let k = 0; k < tests.length; k++) {
        const test = tests[k];
        console.log('test fos98dfu9s8df');
        // console.log(test);
        // test.fn = () => { test.fn(); newFunction(); };
        test.fn = () => { test.fn(); console.log('11111111111111111111111111111111'); };
      }
    }
  }
};

before(function () {
  // beforeEach(function () {
  const visualFailureChecker = () => {
    // @ts-ignore
    if (global.aVisualTestFailed) {
      // @ts-ignore
      global.aVisualTestFailed = false;
      throw new Error('A visual test failed!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
  };

  // @ts-ignore
  const suites = this._runnable.parent.suites;

  appendFunctionToTestsRecursively(visualFailureChecker, suites);
});


describe('DummyParent', () => {
  describe('Dummy', () => {
    it('go home', () => {
      console.log('test 1');
    });

    it('go home2', () => {
      console.log('test 2');

    });

    it('go home3', () => {
      console.log('test 3');
    });


    // loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl);

    // const c = 9;

    // // browser.url('https://wordsmith.automatedinsights.com/projects/autobot-add-data20181127-03-58-57pm/templates/autobot-add-data20181127-03-58-57pm-template/edit/editor?segment=fe306362-de1b-44ed-8659-852a1edf6639');
    // browser.url('https://wordsmith.automatedinsights.com/projects/autobot-add-data20181127-04-32-29pm/templates/autobot-add-data20181127-04-32-29pm-template/edit/editor?segment=c6361730-01a0-4670-b39e-0616d672aa9f');
    // // browser.url('https://wordsmith.automatedinsights.com/projects/autobot-add-data20181127-04-50-14pm/templates/autobot-add-data20181127-04-50-14pm-template/edit/editor?segment=c8ea9eef-9fda-4903-b99a-f50705006c24');
    // // fastWebpage.load();
    // // throw new Error('my error');

    // editBranchPage.addAnotherRuleLink.hover();
    // editBranchPage.getNthBranchBox(1).hover();
    // editBranchPage.addAnotherRuleLink.hover();

    // new UiElement('div.conditions').setName('.').hover();

    // editBranchPage.addAnotherRuleLink.hover();

    // browser.moveToObject('h3', 86, 86);
    // livy.logScreenshottedMessage("moveToObject 'h3', 86,86");

    // editBranchPage.addAnotherRuleLink.hover();

    // browser.moveToObject('h3', 0, 0);
    // livy.logScreenshottedMessage("moveToObject 'h3', 0,0");


    // editBranchPage.addAnotherRuleLink.hover();

    // browser.scroll('h3', 86, 86);
    // livy.logScreenshottedMessage("scroll 'h3', 86,86");

    // editBranchPage.addAnotherRuleLink.hover();

    // browser.scroll('h3', 0, 0);
    // livy.logScreenshottedMessage("scroll 'h3', 0,0");


    // editBranchPage.addAnotherRuleLink.hover();

    // browser.scroll('h3');
    // livy.logScreenshottedMessage("scroll 'h3', 0,0");


    // editBranchPage.addAnotherRuleLink.hover();


    // editBranchPage.h3.hover();
    // editBranchPage.addAnotherRuleLink.hover();

    // new UiElement('.segment__container .row.container .columns').setName('.').hover();

    // editBranchPage.addAnotherRuleLink.hover();


    // editBranchPage.addAnotherRuleLink.hover();

    // browser.moveToObject('.segment__container .row.container .columns', 86, 86);
    // livy.logScreenshottedMessage("moveToObject '.segment__container .row.container .columns', 86,86");

    // editBranchPage.addAnotherRuleLink.hover();

    // browser.moveToObject('.segment__container .row.container .columns', 0, 0);
    // livy.logScreenshottedMessage("moveToObject '.segment__container .row.container .columns', 0,0");

    // editBranchPage.addAnotherRuleLink.hover();

    // browser.moveToObject('.segment__header');
    // livy.logScreenshottedMessage("moveToObject '.segment__header'");


    // browser.moveToObject('.segment__container .row.container .columns', 10, 1000);
    // livy.logScreenshottedMessage("moveToObject '.segment__container .row.container .columns', 10,1000");

    // editBranchPage.addAnotherRuleLink.hover();

    // browser.scroll('.segment__container .row.container .columns', 86, 86);
    // livy.logScreenshottedMessage("scroll '.segment__container .row.container .columns', 86,86");

    // editBranchPage.addAnotherRuleLink.hover();

    // browser.scroll('.segment__container .row.container .columns', 0, 0);
    // livy.logScreenshottedMessage("scroll '.segment__container .row.container .columns', 0,0");


    // editBranchPage.addAnotherRuleLink.hover();

    // browser.scroll('.segment__container .row.container .columns');
    // livy.logScreenshottedMessage("scroll '.segment__container .row.container .columns', 0,0");


    // editBranchPage.addAnotherRuleLink.hover();


    // new UiElement('.segment__container').setName('.').hover();

    // editBranchPage.addAnotherRuleLink.hover();


    // livy.logScreenshottedMessage('.conditions:nth-of-type(1)');
    // browser.moveToObject('.conditions:nth-of-type(1)');

    // editBranchPage.addAnotherRuleLink.hover();

    // livy.logScreenshottedMessage(".conditions:nth-of-type(1)', 0, 0)");
    // browser.moveToObject('.conditions:nth-of-type(1)', 0, 0);

    // editBranchPage.addAnotherRuleLink.hover();


    // editBranchPage.getNthBranchBox(1).conditionTextarea.keys([key.DOWN, key.ENTER], 3, [key.TAB, 'cheeto'], 1);

    // editBranchPage.getNthBranchBox(1).conditionLabel.click_waitForChange();

    // editBranchPage.getNthBranchBox(1).conditionTextarea.clear();
    // editBranchPage.getNthBranchBox(1).conditionTextarea.keys(key.DOWN, 4, key.DOWN, 2);
    // editBranchPage.getNthBranchBox(1).conditionTextarea.keys([key.DOWN, key.DOWN, key.DOWN, key.DOWN]);
    // editBranchPage.getNthBranchBox(1).conditionTextarea.keys(key.DOWN);
    // editBranchPage.getNthBranchBox(1).conditionTextarea.keys(key.DOWN);
    // editBranchPage.getNthBranchBox(1).conditionTextarea.keys(key.DOWN);

    // editBranchComp.getNthBranchBox(1).editorInput.click();
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);

    // editBranchComp.getNthBranchBox(1).editorInput.keys('hello there');
    // editBranchComp.getNthBranchBox(1).editorInput.clear();

    // editBranchComp.getNthBranchBox(1).editorInput.keys('oh hi');


    // editBranchComp.getNthBranchBox(1).editorInput.setValue('sup');

    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).conditionLabel.click();
    // editBranchComp.getNthBranchBox(1).editorInput.click();

    // editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE]);

    // // editBranchComp.getNthBranchBox(1).editorInput.keys('i');
    // // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);

    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);

    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // // editBranchComp.getNthBranchBox(1).editorInput.setValue('');
    // editBranchComp.getNthBranchBox(1).editorInput.keys('p');
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys('o');
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys('c');
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys('k');
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys('y');
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(' ');
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys('is');
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(' ');
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys('delicious');
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);


    // editBranchComp.getNthBranchBox(1).editorInput.keys([key.SHIFT, key.LEFT, key.LEFT]);
    // editBranchComp.getNthBranchBox(1).editorInput.keys([key.LEFT, key.LEFT]);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.keys('what');
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.SHIFT);
    // editBranchComp.getNthBranchBox(1).editorInput.keys('now');


    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);
    // editBranchComp.getNthBranchBox(1).editorInput.keys(key.BACKSPACE);
    // editBranchComp.getNthBranchBox(1).editorInput.sleep(100);


    // editBranchComp.getNthBranchBox(1).editorInput.clear();
    // editBranchComp.getNthBranchBox(1).editorInput.keys('hello');
    // editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE, key.BACKSPACE]);

    // editBranchComp.getNthBranchBox(1).editorInput.keys('hi');

    // editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE]);
    // editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE]);
    // editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE]);
    // editBranchComp.getNthBranchBox(1).editorInput.keys([key.BACKSPACE]);

    // loginPage.load();
    // //trigger fail
    // dashboardPage.newProjectButton.click();
    // // loginPage.checkVisual(loginPage.emailInput);
  });
});
