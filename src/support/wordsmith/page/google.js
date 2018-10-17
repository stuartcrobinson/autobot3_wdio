import { AbElement, Page } from "../../../../autobot_framework/autobot";

export const googlePage = new class Google extends Page {
    constructor() {
        super();
        this.aboutLink = new AbElement('//*[text()="About"]');
        this.storeLink = new AbElement('//*[text()="Store"]');
        super.nameElements();
    }
}();
