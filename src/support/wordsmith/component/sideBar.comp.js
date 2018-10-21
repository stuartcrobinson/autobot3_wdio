// @ts-check
import { AbElement } from '../../../../autobot_framework/autobot';
import { loginPage } from '../page/login.page';


class SettingsDropdownComp extends AbElement {
  constructor() {
    super('//div[contains(@class, "ws-sidebar__account-menu--open")]');

    this.signOutLink = this.getChild('//span[text()="Sign Out"]');
    super.nameElements();
  }

  // get accountLink() { return this.get('//span[text()="Account"]'); }
  // get billingLink() { return this.get('//span[text()="Billing and Usage"]'); }
  // get teamLink() { return this.get('//span[text()="Team"]'); }
  // get legalLink() { return this.get('//span[text()="Legal"]'); }
  // get customerAdminLink() { return this.get('//span[text()="Customer Admin"]'); }
  // get SignOutLink() { return this.get('//span[text()="Sign Out"]'); }
}


export const sidebar = new class SideBarComp extends AbElement {
  constructor() {
    super('//div[@class="ws-sidebar"]');
    // this is where we make sure the sidebar is open. if not, click the header hamburger aka sidebar trigger button

    this.settingsLink = this.getChild('//div[text()="Settings"]');

    this.settingsMenu = new SettingsDropdownComp();
    super.nameElements();
  }

  signOut() {
    this.settingsLink.hover();
    this.settingsMenu.signOutLink.click();
    loginPage.toaster_signedOutSuccessfully.close();
  }

  // get dashboardLink() { return this.get('//span[text()="Dashboard"]'); }
  // get galleryLink() { return this.get('//span[text()="Gallery"]'); }
  // get integrationsLink() { return this.get('//span[text()="Integrations"]'); }
  // get apiAccessLink() { return this.get('//span[text()="API Access"]'); }

  // get helpLink() { return this.get('//div[text()="Live Chat"]'); }
  // get liveChatLink() { return this.get('//div[text()="Live Chat"]'); }
  // get settingsLink() { return this.get('//div[text()="Settings"]'); }

  // get settingsMenu() { return new SettingsDropdownComp(); }
}();

// export default new SideBarComp();
