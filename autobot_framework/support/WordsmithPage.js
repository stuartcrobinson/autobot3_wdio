// @ts-check
import { options } from '../autobot';
import { Page } from './Page';

// TODO https://autoin.atlassian.net/browse/QS-396 add url paths to existing static-path-page page objects

/** Abstract class */
export class WordsmithPage extends Page {
  /** @param {string} urlPath   */
  constructor(urlPath = undefined) {
    super(options.wsUrl, urlPath);
    if (this.constructor === WordsmithPage) {
      throw new TypeError('Abstract class cannot be instantiated directly.');
    }
  }
}
