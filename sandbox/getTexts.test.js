// // @ts-check

console.log("here GoogleTest afewefef")


var _ = require('lodash');

import { countBy } from 'lodash';
import { UiElement } from '../autobot_framework/support/UiElement';


// var ar = [6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 2, 2, 2, 2];

describe('GoogleTest', () => {
  it('should click on About link', () => {
    // autobot.loadPage('https://www.google.com');

    console.log(" in aGoogleTest awoeifjoeijf")


    // browser.url('https://wordsmith-staging.autoi.co');
    browser.url('https://www.google.com/search?q=html+list+example');

    console.log("here after browser url load")

    let el = new UiElement('h3.LC20lb');

    const ar = el.getTexts();

    let arar = []

    arar = arar.concat(ar);
    arar = arar.concat(el.getTexts());
    arar = arar.concat(el.getTexts());
    arar = arar.concat(el.getTexts());

    console.log(arar);

    console.log("_.countBy(arar)");
    console.log(countBy(arar));


  });
});
