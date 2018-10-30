// @ts-check
/* eslint import/no-cycle: "off" */
import { Component } from './Component';
/* eslint import/no-cycle: "off" */
import { options } from '../autobot';

/**
 * Parent class for a Page Object.
 */
export class Page extends Component {
  // maybe this should have url sometimes?  what's the difference in a page and a component ...

  // page: url

  /**
   *
   * @param {String} urlPath starts with "/" https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL
   */
  constructor(urlPath = undefined) {
    if (urlPath && !urlPath.startsWith('/')) {
      throw new Error('urlPath should start with forward slash (/)');
    }
    super();
    this.urlPath = urlPath;
  }


  /**
   * TODO -- first check to see if it's already loaded.  don't load if so.
   */
  load() {
    browser.url(options.url + this.urlPath);
    super.waitForLoad();
  }
}
