// @ts-check
import { Page } from '../../../aquifer/support/Page';

export class TableauPage extends Page {
  constructor(urlPath) {
    super(global.aquiferOptions.tableauUrl, urlPath);
  }
}
