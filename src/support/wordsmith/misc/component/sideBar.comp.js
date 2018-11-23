// @ts-check
import { loginPage } from '../page/login.page';
import { UiAtom } from '../../../../../autobot_framework/support/UiAtom';
import { UiElement } from '../../../../../autobot_framework/support/UiElement';

class SettingsDropdownComp extends UiElement {
  constructor() {
    super('//div[contains(@class, "ws-sidebar__account-menu--open")]');
    this.accountLink = this.getChild("//*[*='account_circle']");
    this.billingLink = this.getChild("//*[*='credit_car']");
    this.teamLink = this.getChild("//*[*='group']");
    this.legalLink = this.getChild("//*[*='gavel']");
    this.customerAdminLink = this.getChild("//*[*='lock_outline']");
    this.signOutLink = this.getChild("//*[*='exit_to_app']");
    this.greetingSpan = this.getChild("//*[@class='account_menu__greeting']");
    super.nameElements();
  }
}

export const sidebar = new class SideBarComp extends UiElement {
  constructor() {
    super('//div[@class="ws-sidebar"]');
    // this is where we make sure the sidebar is open. if not, click the header hamburger aka sidebar trigger button

    this.dashboardLink = this.getChild("//*[*='web']");
    this.galleryLink = this.getChild("//*[*='view_module']");
    this.integrationsLink = this.getChild("//*[*='device_hub']");
    this.apiAccessLink = this.getChild("//*[*='code']");
    this.helpLink = this.getChild("//*[*='help']");
    this.liveChatLink = this.getChild("//*[*='chat']");
    this.settingsLink = this.getChild("//*[*='settings']");

    /** only in Editor sidebar.  clean up sidebars organization? */
    // this.review = this.getChild('//a[@data-for="Review"]');

    this.dataLink = this.getChild("//*[*='grid_on']");
    this.writeLinke = this.getChild("//*[*='mode_edit']");
    this.reviewLink = this.getChild("//*[*='done']");
    this.downloadLink = this.getChild("//*[*='file_download']");

    this.settingsMenu = new SettingsDropdownComp();
    super.nameElements();
  }

  signOut() {
    this.settingsLink.hover();
    this.settingsMenu.signOutLink.click();
    loginPage.toast_signedOutSuccessfully.close();
  }
}();
