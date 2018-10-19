// @ts-check
import { AbElement, Page, loadPage } from '../../../../autobot_framework/autobot';

export const tableauViewPage = new class View extends Page {
  constructor() {
    super();
    this.shareButton = new AbElement('.tabToolbarButton.share').tagAsLoadCriterion();
    this.shareLinkField = new AbElement('//span[text()="Link"]/../input');

    //TODO no this is stupid.  just start with the share url.  no reason to use tableau website for testing 
    //tab integration into WS.

   //make this test - integrate tableau then visualize the project and then select N and S carolina and confirm that those states are listed in the story.
   
  //  https://tableau-server.automatedinsights.com/views/BusinessLoans2/BusinessLoans?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no
    //  //span[text()="Link"]/../input
    super.nameElements();
  }

}();
