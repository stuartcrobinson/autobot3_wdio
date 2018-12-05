// @ts-check
import countBy from 'lodash';
import { UiElement } from '../../../../aqua/support/UiElement';
import { WordsmithPage } from '../../../../aqua/support/WordsmithPage';


class NarrativeDiv extends UiElement {
  constructor(selector) {
    super(selector);
    this.rowNumber = this.get('.row-number');
    super.nameElements();
  }

  getNthSegmentSpan(n) { return new UiElement(`.editor-textarea-segment:nth-of-type(${n})`).setName(`Segment ${n}`); }
}
const getNthRunStatValueDiv = n => (new UiElement(`.run-stat-list.flex.flex-wrap.center > div:nth-of-type(${n}) .run-stat__value`));

const getNthToggle = n => (new UiElement(`.toggle-switch__horizontal-group > .margin-bottom-small:nth-of-type(${n}) .switch`));

const textSpan = variability => (
  str => new UiElement(`//*[@*='segment editor-textarea-segment ${variability}' and text()='${str}']`)
    .setName(`Span with text "${str}" and ${variability} variability`)
);

// TODO send csv file over api project creation

export const reviewPage = new class Review extends WordsmithPage {
  constructor() {
    super();
    this.showAllLink = new UiElement('.pagination + span .page-item.show-all');
    this.show10PerPageLink = new UiElement('.pagination-container .label + span .page-item.show-all');
    this.avgWordsValueDiv = getNthRunStatValueDiv(1).tagAsLoadCriterion();
    this.maxWordsValueDiv = getNthRunStatValueDiv(2).tagAsLoadCriterion();
    this.minWordsValueDiv = getNthRunStatValueDiv(3).tagAsLoadCriterion();
    this.maxCharsValueDiv = getNthRunStatValueDiv(4).tagAsLoadCriterion();
    this.readingTimesValueDiv = getNthRunStatValueDiv(5).tagAsLoadCriterion();
    this.gradeLevelReadabilityValueDiv = getNthRunStatValueDiv(6).tagAsLoadCriterion();
    this.variabilityScoreValueDiv = getNthRunStatValueDiv(7).tagAsLoadCriterion();

    this.renderHtmlToggle = getNthToggle(1).tagAsLoadCriterion();
    this.randomizeRowsToggle = getNthToggle(2).tagAsLoadCriterion();
    this.variabilityHeatmapToggle = getNthToggle(3);

    this.generate50NewRowsLink = new UiElement('h2 a');

    super.nameElements();
  }

  getNthSegmentSpan(n) { return new UiElement(`.editor-textarea-segment:nth-of-type(${n})`).setName(`Segment ${n}`); }

  poorVariabilitySpanWithText = str => textSpan('poor')(str);

  excellentVariabilitySpanWithText = str => textSpan('excellent')(str);

  randomizeRows_isOn() {
    return this.generate50NewRowsLink.isExisting();
  }

  randomizeRows_turnOn() {
    if (this.randomizeRows_isOn()) {
      throw new Error('Rows are already randomized');
    }
    this.randomizeRowsToggle.click_waitForChange();
  }

  randomizeRows_turnOff() {
    if (!this.randomizeRows_isOn()) {
      throw new Error("Rows aren't currently randomized");
    }
    this.randomizeRowsToggle.click_waitForChange();
  }

  getCountsOfSecondSegmentTexts() {
    const secondSegmentWEs = this.getNthSegmentSpan(2).getWebElements();

    const synonyms = [];

    secondSegmentWEs.forEach((we) => {
      synonyms.push(we.getText());
    });

    const countsObject = countBy(synonyms);

    return countsObject;
  }
}();


/*
TODO - allow grabbing input parameters from file AND console.  combine them.  give precedence to command line
    */
