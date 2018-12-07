// @ts-check
import { Page } from '../../../aquifer/support/Page';
import { options } from '../../../aquifer/aqua';

export class TableauPage extends Page {
  constructor(urlPath) {
    super(options.tableauUrl, urlPath);
  }
}
