// @ts-check
import { Page } from './Page';
import { options } from '../aqua';

export class TableauPage extends Page {
  constructor(urlPath) {
    super(options.tableauUrl, urlPath);
  }
}
