// @ts-check
import { AquaAssert } from '../../aquifer/support/AquaAssert';
import { Load } from '../hooks';
import { editorPage } from '../ui-model/wordsmith/editor/editor.page';


describe('Gallery', () => {
  before(() => { Load.cityGuideTemplateFromGallery(); });

  it('test', () => {
    // galleryCityGuideNarrative.load();
    // galleryCityGuideNarrative.getProjectButton.click_waitForNotExisting();
    // projectPage.getNthTemplateLink(1).click_waitForNotExisting();
    editorPage.editor.checkVisual();
    // editorPage.sidebar.reviewLink.click_waitForChange();
    // reviewPage.checkVisual(editorPage.sidebar.liveChatLink);
    AquaAssert.visualTestsPassed();
  });
});
