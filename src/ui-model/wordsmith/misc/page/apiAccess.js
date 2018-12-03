// @ts-check
import { WordsmithPage } from '../../../../../autobot_framework/support/WordsmithPage';

export const apiAccessPage = new class ApiAccess extends WordsmithPage {
  constructor() {
    super('/api_access');
    this.apiKeyInput = this.get('.api-key-field').tagAsLoadCriterion();
    super.nameElements();
  }
}();

// @ts-ignore
// global.getApiKeyFromUi = apiAccessPage.apiKeyInput.getText();
