// @ts-check
import { options } from '../autobot';
import { Page } from './Page';

export class WordsmithPage extends Page {
  constructor(urlPath) {
    super(options.wsUrl, urlPath);
  }
}
