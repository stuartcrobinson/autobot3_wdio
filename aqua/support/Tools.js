// @ts-check


/** ****************************** tools *********************************** */

/*
This file contains tools that I'm not sure where else to put.  Maybe should be split into browser-related tools like "waitForStableDom" and "getFullDom", vs utility functions like fxName
*/

const currTime = () => new Date().getTime();


export function fxName(stack) {
  // let stack = error.stack

  // console.log("getFunctionName stack");
  // console.log(stack);
  const arr = stack.split(' at ');
  const line = arr[arr.length - 1];
  let [, name] = line.split('.')[1];
  [name] = name.split('(');
  name = name.trim();
  return name;
}

/* eslint no-unused-vars: "off" */
export function waitForStableDom(timeoutInMillis = 10000) {
  const initTime = currTime();

  let currDom;
  let prevDom = this.getFullDom();

  while (currTime() - initTime < timeoutInMillis) {
    browser.pause(200);

    currDom = this.getFullDom();

    if (currDom === prevDom) {
      return;
    }
    if (currTime() - initTime > timeoutInMillis) {
      throw new Error('Timed out waiting for stable DOM.');
    }
    prevDom = currDom;
  }
}

/* eslint no-unused-vars: "off", no-param-reassign: "off", func-names: "off" */
export function getFullDom() {
  return browser.execute(
    () => {
      // @ts-ignore
      Element.prototype.serializeWithStyles = (function () {
        // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.
        const defaultStylesByTagName = {};

        // Styles inherited from style sheets will not be rendered for elements with these tag names
        const noStyleTags = {
          BASE: true, HEAD: true, HTML: true, META: true, NOFRAME: true, NOSCRIPT: true, PARAM: true, SCRIPT: true, STYLE: true, TITLE: true,
        };

        // This list determines which css default values lookup tables are precomputed at load time
        // Lookup tables for other tag names will be automatically built at runtime if needed
        const tagNames = ['A', 'ABBR', 'ADDRESS', 'AREA', 'ARTICLE', 'ASIDE', 'AUDIO', 'B', 'BASE', 'BDI', 'BDO', 'BLOCKQUOTE', 'BODY', 'BR', 'BUTTON', 'CANVAS', 'CAPTION', 'CENTER', 'CITE', 'CODE', 'COL', 'COLGROUP', 'COMMAND', 'DATALIST', 'DD', 'DEL', 'DETAILS', 'DFN', 'DIV', 'DL', 'DT', 'EM', 'EMBED', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FONT', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEAD', 'HEADER', 'HGROUP', 'HR', 'HTML', 'I', 'IFRAME', 'IMG', 'INPUT', 'INS', 'KBD', 'KEYGEN', 'LABEL', 'LEGEND', 'LI', 'LINK', 'MAP', 'MARK', 'MATH', 'MENU', 'META', 'METER', 'NAV', 'NOBR', 'NOSCRIPT', 'OBJECT', 'OL', 'OPTION', 'OPTGROUP', 'OUTPUT', 'P', 'PARAM', 'PRE', 'PROGRESS', 'Q', 'RP', 'RT', 'RUBY', 'S', 'SAMP', 'SCRIPT', 'SECTION', 'SELECT', 'SMALL', 'SOURCE', 'SPAN', 'STRONG', 'STYLE', 'SUB', 'SUMMARY', 'SUP', 'SVG', 'TABLE', 'TBODY', 'TD', 'TEXTAREA', 'TFOOT', 'TH', 'THEAD', 'TIME', 'TITLE', 'TR', 'TRACK', 'U', 'UL', 'VAR', 'VIDEO', 'WBR'];

        // Precompute the lookup tables.
        for (let i = 0; i < tagNames.length; i++) {
          if (!noStyleTags[tagNames[i]]) {
            defaultStylesByTagName[tagNames[i]] = computeDefaultStyleByTagName(tagNames[i]);
          }
        }

        function computeDefaultStyleByTagName(tagName) {
          const defaultStyle = {};
          const element = document.body.appendChild(document.createElement(tagName));
          const computedStyle = getComputedStyle(element);
          for (let i = 0; i < computedStyle.length; i++) {
            defaultStyle[computedStyle[i]] = computedStyle[computedStyle[i]];
          }
          document.body.removeChild(element);
          return defaultStyle;
        }

        function getDefaultStyleByTagName(tagName) {
          tagName = tagName.toUpperCase();
          if (!defaultStylesByTagName[tagName]) {
            defaultStylesByTagName[tagName] = computeDefaultStyleByTagName(tagName);
          }
          return defaultStylesByTagName[tagName];
        }

        return function serializeWithStyles() {
          if (this.nodeType !== Node.ELEMENT_NODE) { throw new TypeError(); }
          const cssTexts = [];
          const elements = this.querySelectorAll('*');
          for (let i = 0; i < elements.length; i++) {
            const e = elements[i];
            if (!noStyleTags[e.tagName]) {
              const computedStyle = getComputedStyle(e);
              const defaultStyle = getDefaultStyleByTagName(e.tagName);
              cssTexts[i] = e.style.cssText;
              for (let ii = 0; ii < computedStyle.length; ii++) {
                const cssPropName = computedStyle[ii];
                if (computedStyle[cssPropName] !== defaultStyle[cssPropName]) {
                  e.style[cssPropName] = computedStyle[cssPropName];
                }
              }
            }
          }
          const result = this.outerHTML;
          for (let i = 0; i < elements.length; i++) {
            elements[i].style.cssText = cssTexts[i];
          }
          return result;
        };
      }());

      // @ts-ignore
      let domStr = document.body.serializeWithStyles();

      // now remove all whitespace and remove all 'style=""'

      // whitespace: https://stackoverflow.com/a/6623263/3124680

      domStr = domStr.replace(/[^\S ]/g, '');
      domStr = domStr.replace(/  +/g, ' ');
      domStr = domStr.replace(/\\n/g, '');
      // domStr = domStr.replace(/\s/g, "");
      domStr = domStr.replace(/style=""/g, '');

      return domStr;
    },
  ).value;
}


// module.exports = {getFunctionName}
