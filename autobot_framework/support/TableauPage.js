// @ts-check
import { options } from '../autobot';
import { Page } from './Page';

export class TableauPage extends Page {
  constructor(urlPath) {
    super(options.tableauUrl, urlPath);
  }
}
