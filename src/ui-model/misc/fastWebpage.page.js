// @ts-check
import { Page } from "../../../autobot_framework/support/Page";

export const fastWebpage = new class FastWebpage extends Page {
  constructor() {
    super('https://varvy.com/pagespeed/wicked-fast.html');
    this.feedTheBotImage = this.get('.head a').tagAsLoadCriterion();
    this.h2 = this.get('//h2[text()="Gaze at my beauty, humans, but gaze not long"]').tagAsLoadCriterion();
    super.nameElements();
  }
}();
