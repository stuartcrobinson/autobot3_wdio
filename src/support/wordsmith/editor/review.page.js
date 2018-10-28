// @ts-check
import { AbElement, Page } from '../../../../autobot_framework/autobot';
import { editorPageToolbar } from './toolbar.comp';

export const reviewPage = new class Review extends Page {
  constructor() {
    super();
    this.pageCountToggleLink = editorPageToolbar.tagAsLoadCriterion();


    /*






TODO start here-- model the "Show All" vs "10 per page" link somehow.  think of best name for this toggling link












    */



    // this.insertDataButton = new AbElement('.btn-insert-data').tagAsLoadCriterion();
    // this.addSynonymButtom = new AbElement('.btn-synonym').tagAsLoadCriterion();
    // this.addBranchButton = new AbElement('.btn-branch').tagAsLoadCriterion();
    // this.moreDropdownButton = new AbElement('.btn-more').tagAsLoadCriterion();

    this.editor = new AbElement('.editor-textarea').tagAsLoadCriterion();

    /** For waiting for editor to load after closing segment editors. */
    this.editorOnlyElement = new AbElement('.narrative:not(.narrative--is-segment-selected)').tagAsLoadCriterion();



    // this.toaster_signedOutSuccessfully = toaster.withMessage('Signed out successfully.');
    // this.toaster_invalidEmailOrPwd = toaster.withMessage('Invalid Email or password.');
    super.nameElements();
  }

  segmentWithText(text) {
    return new AbElement(`//span[@data-text='true' and text()='${text}']`).setName('text: "' + text + '"')
  }

  // this.dataInputTable
  // .getChildren('.ws-input')
  // .forEach((we, index) => {

  //   const id = we.getAttribute("id")

  //   new AbElement('//*[@id="' + id + '"]').click(false);

  //   autobotBrowser.keys(we.getAttribute("placeholder"), false)
  //   // browser.click('//*[@id="' + id + '"]')
  //   // browser.keys(we.getAttribute("placeholder"))
  // })


  getLastSegmentText() {
    // console.log("in getLastSegmentText");

    const segmentsSpans = this.findWebElements('span[data-text="true"]');

    // segmentsSpans.forEach((we, index) => {
    //   console.log("segment span text: " + we.getText());
    // })


    return segmentsSpans[segmentsSpans.length - 1].getText();

    // segmentsSpans.forEach((we, index) => {

    // })

    /*


    find all these:
    span[data-text='true']
    and return the last one

    note - can't pass an abelement cos we do'nt have precise selector for this.  have to get all WebElements and check the last one on the page

    */
    // return new AbElement(`//span[@data-text='true' and text()='${text}']`).setName('text: "' + text + '"')
  }

}();
