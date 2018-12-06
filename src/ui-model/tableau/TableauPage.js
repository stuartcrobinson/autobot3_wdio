// @ts-check
import { Page } from '../../../aqua/support/Page';
import { options } from '../../../aqua/aqua';

export class TableauPage extends Page {
  constructor(urlPath) {
    super(options.tableauUrl, urlPath);
  }
}
