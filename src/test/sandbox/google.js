// @ts-check
import { assert } from 'chai';
import * as autobot from '../../../autobot_framework/autobot';
import { googlePage } from '../../support/wordsmith/misc/page/google.page';

console.log("here GoogleTest afewefef")


describe('GoogleTest', () => {
  it('should click on About link', () => {
    // autobot.loadPage('https://www.google.com');

    console.log(" in aGoogleTest awoeifjoeijf")


    browser.url('https://wordsmith-staging.autoi.co');

    console.log("here after browser url load")


    browser.pause(3000000);

    console.log("here!!!!!!!!!!!!")

    // let alert = browser.alertText();
    // console.log("here!!!!!!!!!!!!222222222222222222222222")

    // console.log("alert")
    // console.log(alert)
    // // expect(alert).toEqual('There are unsaved changes on the page.');

    // browser.pause(10000000);
    // googlePage.aboutLink.click();
    // googlePage.storeLink.waitForNotExist();
    // // throw new Error('WHERE IS MY ERROR WTF');
    // assert(!googlePage.storeLink.isExisting(), 'googlePage.storeLink should not exist - should be on About page');
  });
});
