import { livy } from '../autobot';

export class AbElement {
    /**
     * 
     * @param {Page} that - to write parent class in logs
     * @param {String} name - to describe element in logs bc we shouldn't use readable selectors cos future multi language testing
     * @param {String} selector - xpath or css selector
     */
    constructor(selector) {
        this.selector = selector;
        try {
            this.parentString = this.getParentFromStack(new Error().stack);
        } catch (err) {
            this.parentString = "ERROR_GETTING_PARENT"
        }
        this.isLoadCriterion = false;
    }
    nameElements() {
        for (var propName in this) {
            let propValue = this[propName]
            if (propValue instanceof AbElement) {
                propValue.stuartname = propName
            }
        }
    }
    getParentFromStack(stack) {
        // console.log("stack");
        // console.log(stack);
        let line = stack.split(' at ')[2];

        // console.log("line");
        // console.log(line);
        let endPart = line.split('src/support/')[1];
        let result = endPart.split('.js')[0];
        return result;
    }
    tagAsLoadCriterion() {
        this.isLoadCriterion = true;
        return this;
    }


    getWebElement() {
        return browser.element(this.selector);
    }
    // get element() { return browser.element(this.selector); }


    getChild(selector) {

        if ((this.selector.startsWith("//") && !selector.startsWith("//")) || (!this.selector.startsWith("//") && selector.startsWith("//"))) {
            throw new Error(`Parent and child elements must have selectors of the same time. Parent: <${this.selector}>, Child: <${selector}>.`)
        }
        return new AbElement(this.selector + selector);
    }


    logAndWait(message, waiteeSelector) {

        var screenshotId = livy.logAction(message);
        if (waiteeSelector) {
            browser.waitForExist(waiteeSelector);
        }
        livy.setMouseoverEventScreenshotFunction(screenshotId)
    }
    click() {
        // livy.logAction('Click: ' + this.selector);
        // browser.waitForExist(this.selector);

        this.logAndWait('Click: ' + this.selector,
            this.selector);
        browser.click(this.selector)
    }

    hover() {
        // livy.logAction('Hover: ' + this.selector);
        // browser.waitForExist(this.selector);

        this.logAndWait('Hover: ' + this.selector,
            this.selector);
        browser.moveToObject(this.selector)
    }

    click_waitForChange(indicatorSelector) {

        const initialIndicatorElementHtml = browser.element(indicatorSelector).getHTML();

        // livy.logAction('click: ' + this.selector + ', then wait for change in: ' + indicatorSelector);
        // browser.waitForExist(this.selector);


        this.logAndWait('Click: ' + this.selector + ', then wait for change in: ' + indicatorSelector,
            this.selector);

        browser.click(this.selector)

        const init = new Date().getTime();

        const timeout = 2000;

        while (browser.element(indicatorSelector).getHTML() === initialIndicatorElementHtml) {
            browser.pause(200);

            if (new Date().getTime() - init > timeout) {
                throw new Error("timeout waiting for " + indicatorSelector + ' to change after clicking ' + this.selector);
            }
        }
    }

    click_waitForExisting(indicatorSelector) {
        if (browser.isExisting(indicatorSelector)) {
            throw new Error("Element already exists: " + indicatorSelector);
        }

        // livy.logAction('Click: ' + this.selector + ', then wait for element to exist: ' + indicatorSelector);
        // browser.waitForExist(this.selector);
        this.logAndWait('Click: ' + this.selector + ', then wait for element to exist: ' + indicatorSelector,
            this.selector);

        browser.click(this.selector)

        const init = new Date().getTime();

        const timeout = 2000;

        while (!browser.isExisting(indicatorSelector)) {
            browser.pause(200);

            if (new Date().getTime() - init > timeout) {
                throw new Error("timeout waiting for " + indicatorSelector + ' to exist after clicking ' + this.selector);
            }
        }
    }

    click_waitForNotExisting(indicatorSelector) {
        if (!browser.isExisting(indicatorSelector)) {
            throw new Error("Element [" + indicatorSelector + '] should exist prior to clicking [' + this.selector + ']');
        }

        // livy.logAction('Click: ' + this.selector + ', then wait for element to disappear: ' + indicatorSelector);
        // browser.waitForExist(this.selector);

        this.logAndWait('Click: ' + this.selector + ', then wait for element to disappear: ' + indicatorSelector,
            this.selector);
        browser.click(this.selector)

        const init = new Date().getTime();

        const timeout = 2000;

        while (browser.isExisting(indicatorSelector)) {
            browser.pause(200);

            if (new Date().getTime() - init > timeout) {
                throw new Error("Timeout waiting for " + indicatorSelector + ' to no longer exist after clicking ' + this.selector);
            }
        }
    }


    setValue(value) {
        // livy.logAction('Set value of [' + this.selector + '] to [' + value + ']');
        // browser.waitForExist(this.selector);

        this.logAndWait('Set value of [' + this.selector + '] to [' + value + ']',
            this.selector);

        browser.setValue(this.selector, value);

    }

    waitForNotExist() {
        // livy.logAction('waitForNotExist: ' + this.selector)
        // this.logAndWait('waitForNotExist: ' + this.selector) //don't log waits at all.  if never found, it will give useful error.  waiting should be implied.
        browser.waitUntil(() => (!browser.isExisting(this.selector)));
    }

    waitForExist() {
        // livy.logAction('waitForExist: ' + this.selector)
        // this.logAndWait('waitForExist: ' + this.selector)
        browser.waitUntil(() => (browser.isExisting(this.selector)));
    }

    isExisting() {
        return browser.isExisting(this.selector);
    }
}
