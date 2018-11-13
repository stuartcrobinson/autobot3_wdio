

describe('simple github test', function () {
  it('should test github', function () {
    browser.url('https://github.com/zinserjan/wdio-screenshot'); // for base url see wdio.conf.js
    browser.pause(500);


    const report = browser.checkViewport(
      // [{misMatchTolerance:0.0}]
      );
    console.log("report: ");
    console.log(report);
    // assertDiff(report);


    // browser.saveViewportScreenshot(screenshotName('screenshots/github-viewport.png'));

    // browser.saveElementScreenshot(screenshotName('screenshots/github-files.png'), '.file-wrap');

    // browser.saveElementScreenshot(screenshotName('screenshots/github-repo.png'), '.repository-content', {
    //   hide: ['.repository-meta', '.overall-summary']
    // });

    // browser.saveDocumentScreenshot(screenshotName('screenshots/github-whole-page.png'));
  });

});