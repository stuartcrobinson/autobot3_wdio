// @ts-check
import { loginPage } from '../page/login.page';
import { UiElement } from '../../../../../aquifer/support/UiElement';

class SettingsDropdownComp extends UiElement {
  constructor() {
    super('//div[contains(@class, "ws-sidebar__account-menu--open")]');
    this.accountLink = this.get("//*[*='account_circle']");
    this.billingLink = this.get("//*[*='credit_car']");
    this.teamLink = this.get("//*[*='group']");
    this.legalLink = this.get("//*[*='gavel']");
    this.customerAdminLink = this.get("//*[*='lock_outline']");
    this.signOutLink = this.get("//*[*='exit_to_app']");
    this.greetingSpan = this.get("//*[contains(@class, 'account_menu__greeting')]");
    super.nameElements();
  }
}

export const sidebar = new class SideBarComp extends UiElement {
  constructor() {
    super('//div[@class="ws-sidebar"]');
    // this is where we make sure the sidebar is open. if not, click the header hamburger aka sidebar trigger button

    this.dashboardLink = this.get("//*[*='web']");
    this.galleryLink = this.get("//*[*='view_module']");
    this.integrationsLink = this.get("//*[*='device_hub']");
    this.apiAccessLink = this.get("//*[*='code']");
    this.helpLink = this.get("//*[*='help']");
    this.liveChatLink = this.get("//*[*='chat']");
    this.settingsLink = this.get("//*[*='settings']");

    /** only in Editor sidebar.  clean up sidebars organization? */
    // this.review = this.get('//a[@data-for="Review"]');

    this.dataLink = this.get("//*[*='grid_on']");
    this.writeLinke = this.get("//*[*='mode_edit']");
    this.reviewLink = this.get("//*[*='done']");
    this.downloadLink = this.get("//*[*='file_download']");

    this.settingsMenu = new SettingsDropdownComp();
    super.nameElements();
  }

  signOut() {
    this.settingsLink.hover();
    this.settingsMenu.signOutLink.click();
    loginPage.toast_signedOutSuccessfully.close();
  }
}();
