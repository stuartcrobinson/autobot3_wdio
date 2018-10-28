// @ts-check
import { AutobotAssert, autobotBrowser, Before } from '../../../autobot_framework/autobot';
import { editorPage } from '../../support/wordsmith/editor/editor.page';
import { editDataNumberComp } from '../../support/wordsmith/editor/segmentEditors/dataEditors/editDataNumber.comp';
import { editSynonymComp } from '../../support/wordsmith/editor/segmentEditors/editSynonym.comp';
import { header } from '../../support/wordsmith/misc/component/header.comp';

describe('Add', () => {
  before(() => { Before.load.newTemplateEditor(); });

  // done
  it('synonym', () => {

    const content = "moar pancakes please";

    editorPage.editor.setValue(content);

    editorPage.segmentWithText(content).doubleClick();

    editorPage.toolbar.addSynonymButton.click();

    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes', 2000);

    //change primary synonym
    editSynonymComp.getNthSynonymBox(1).textInput.setValue('slapjacks');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'slapjacks', 2000);

    editSynonymComp.addAnotherSynonymLink.click();
    editSynonymComp.getNthSynonymBox(2).textInput.setValue('flapjacks');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'flapjacks', 2000);

    editSynonymComp.addAnotherSynonymLink.click();
    editSynonymComp.getNthSynonymBox(3).textInput.setValue('oladyi');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'oladyi', 2000);

    editSynonymComp.addAnotherSynonymLink.click();
    editSynonymComp.getNthSynonymBox(3).textInput.setValue('pancakes');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'pancakes', 2000);

    editSynonymComp.addAnotherSynonymLink.click();
    editSynonymComp.getNthSynonymBox(3).textInput.setValue('griddle cakes');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'griddle cakes', 2000);

    AutobotAssert.elementExists(header.savedDiv, 10000);

    editDataNumberComp.doneButton.click_waitForNotExisting();


    //now make sure synonym is clickable-to-edit, and that primary synonym changed

    editorPage.segmentWithText("slapjacks").click_waitForChange();

    editSynonymComp.getNthSynonymBox(3).textInput.setValue('hotcakes');
    AutobotAssert.elementText(editSynonymComp.highlightedPreviewSpan, 'hotcakes', 2000);

    AutobotAssert.elementExists(header.savedDiv, 10000);

    editDataNumberComp.doneButton.click_waitForNotExisting();

    //now check the Review distribution

    AutobotAssert.valueEquals(() => editorPage.getLastSegmentText(), 'pancakes', 'last segment text');

    //TODO
    /*

    make Review page
    



    */
  });




});



/*

TODO 

enter text, select text, insert branch.  

1.  create lots of rules and verify output in Review page.
2.  create deepy nested branches and verify output.
3.  create a branch with a synonym and verify.

*/