// @ts-check
import { options } from '../autobot';
import { Page } from './Page';

// TODO https://autoin.atlassian.net/browse/QS-396 add url paths to existing static-path-page page objects

export class WordsmithPage extends Page {
  /** @param {string} urlPath   */
  constructor(urlPath) {
    super(options.wsUrl, urlPath);
  }
}
