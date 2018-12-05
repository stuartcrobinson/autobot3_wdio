// @ts-check
import { options } from '../../aqua/aqua';
import { AquaAssert } from '../../aqua/support/AquaAssert';
import { editorPage } from '../ui-model/wordsmith/editor/editor.page';
import { reviewPage } from '../ui-model/wordsmith/editor/review.page';
import { galleryCityGuideNarrative } from '../ui-model/wordsmith/misc/page/galleryCityGuideNarrative.page';
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';
import { projectPage } from '../ui-model/wordsmith/misc/page/project.page';


describe('Gallery', () => {
  before(() => { loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl); });

  it('test', () => {
    galleryCityGuideNarrative.load();
    galleryCityGuideNarrative.getProjectButton.click_waitForNotExisting();
    projectPage.getNthTemplateLink(1).click_waitForNotExisting();
    editorPage.editor.checkVisual();
    // editorPage.sidebar.reviewLink.click_waitForChange();
    // reviewPage.checkVisual(editorPage.sidebar.liveChatLink);
    AquaAssert.visualTestsPassed();
  });
});
