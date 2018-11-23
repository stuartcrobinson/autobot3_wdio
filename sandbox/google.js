// // @ts-check

// console.log("here GoogleTest afewefef")


describe('GoogleTest', () => {
  it('should click on About link', () => {
    // autobot.loadPage('https://www.google.com');

    console.log(" in aGoogleTest awoeifjoeijf")


    // browser.url('https://wordsmith-staging.autoi.co');
    browser.url('http://webdriver.io/api/protocol/actions.html');

    console.log("here after browser url load")

    const selector = 'h1 + p'

    let we = browser.element(selector)

    we.click();

    browser.doDoubleClick()
    browser.pause(1000)
    we.click();
    browser.pause(1000)

    // browser.click(selector);
    //// browser.doubleClick(selector);
    browser.buttonDown(0);
    browser.moveTo(null, 20, 0);

    browser.pause(2000)
    browser.buttonUp(0);
    browser
      .keys("Shift")
      .keys("ArrowRight")
      .keys("ArrowRight")
      .keys("ArrowRight")
      .keys("ArrowRight")
      .keys("ArrowRight")
      .keys("ArrowRight")
    // browser.pause(300);
    // browser.doubleClick(selector);

    //   browser.actions([{
    //     "type": "pointer",
    //     "id": "finger1",
    //     "parameters": {"pointerType": "touch"},
    //     "actions": [
    //         {"type": "pointerMove", "duration": 0, "x": 100, "y": 100},
    //         {"type": "pointerDown", "button": 0},
    //         {"type": "pause", "duration": 500},
    //         {"type": "pointerMove", "duration": 1000, "origin": "pointer", "x": -50, "y": 0},
    //         {"type": "pointerUp", "button": 0}
    //     ]
    // }, {
    //     "type": "pointer",
    //     "id": "finger2",
    //     "parameters": {"pointerType": "touch"},
    //     "actions": [
    //         {"type": "pointerMove", "duration": 0, "x": 100, "y": 100},
    //         {"type": "pointerDown", "button": 0},
    //         {"type": "pause", "duration": 500},
    //         {"type": "pointerMove", "duration": 1000, "origin": "pointer", "x": 50, "y": 0},
    //         {"type": "pointerUp", "button": 0}
    //     ]
    // }]);

    // release an action
    // browser.actions();


    browser.pause(3000000);

    console.log("here!!!!!!!!!!!!")

    // let alert = browser.alertText();
    // console.log("here!!!!!!!!!!!!222222222222222222222222")

    // console.log("alert")
    // console.log(alert)
    // // expect(alert).toEqual('There are unsaved changes on the page.');

    // browser.pause(10000000);
    // googlePage.aboutLink.click();
    // googlePage.storeLink.waitForNotExist();
    // // throw new Error('WHERE IS MY ERROR WTF');
    // assert(!googlePage.storeLink.isExisting(), 'googlePage.storeLink should not exist - should be on About page');
  });
});
