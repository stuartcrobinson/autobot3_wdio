import { AbElement, Tools } from '../autobot';

export class Page {
    waitForStableDom(timeoutInMillis = 10000) {
        Tools.waitForStableDom(timeoutInMillis);
    }

    nameElements() {
        for (var propName in this) {
            let propValue = this[propName]
            if (propValue instanceof AbElement) {
                propValue.stuartname = propName
            }
        }
    }

    get loadCriteriaElements() {
        let abElements = [];

        for (var propName in this) {
            let propValue = this[propName]
            if (propValue instanceof AbElement && propValue.isLoadCriterion) {
                abElements.push(propValue);
            }
        }
        return abElements;
    }

    waitForLoad() {

        for (let i = 0; i < this.loadCriteriaElements.length; i++) {
            let element = this.loadCriteriaElements[i];
            element.waitForExist(12000);
        }
    }

    isLoaded() {

        for (let i = 0; i < this.loadCriteriaElements.length; i++) {
            let element = this.loadCriteriaElements[i];
            element.getWebElement();
        }
        return true;
    }
}