// @ts-check
import { assert } from 'chai';
import * as autobot from '../../../autobot_framework/autobot';
import { googlePage } from '../../support/wordsmith/pages';

describe('GoogleTest', () => {
  it('should click on About link', () => {
    autobot.loadPage('https://www.google.com');

    googlePage.aboutLink.click();
    googlePage.storeLink.waitForNotExist();
    // throw new Error('WHERE IS MY ERROR WTF');
    assert(!googlePage.storeLink.isExisting(), 'googlePage.storeLink should not exist - should be on About page');
  });
});
