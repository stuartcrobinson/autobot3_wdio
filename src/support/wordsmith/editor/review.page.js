// @ts-check
import { editorPageToolbar } from './toolbar.comp';
import { Page } from '../../../../autobot_framework/support/Page';

export const reviewPage = new class Review extends Page {
  constructor() {
    super();
    this.pageCountToggleLink = editorPageToolbar.tagAsLoadCriterion();


    /*






TODO start here-- model the "Show All" vs "10 per page" link somehow.  think of best name for this toggling link

this is for the synonym test -- checking syn distribution












    */

    super.nameElements();
  }

}();
