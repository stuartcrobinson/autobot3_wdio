// @ts-check
import { Page } from '../../../aquifer/Page';

export class TableauPage extends Page {
  constructor(urlPath) {
    super(global.aquiferOptions.tableauUrl, urlPath);
  }
}
