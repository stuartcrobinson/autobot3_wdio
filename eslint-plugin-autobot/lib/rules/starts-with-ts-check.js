/**
 * @fileoverview ensure that each javascript file starts with '//@ts-check'
 * @author Stuart C. Robinson
 */
"use strict";

var os = require('os')
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "ensure that each javascript file starts with '//@ts-check'",
      category: "Fill me in",
      recommended: false
    },
    fixable: "code",  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function (context) {

    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    //https://eslint.org/docs/developer-guide/working-with-rules
    //https://eslint.org/docs/developer-guide/working-with-rules#runtime-rules - Program vs IfStatement etc
    //simple example:
    //https://github.com/lydell/eslint-plugin-simple-import-sort/blob/master/src/sort.js
    // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/master/test/sort.test.js
    //https://flexport.engineering/writing-custom-lint-rules-for-your-picky-developers-67732afa1803
    var sourceCode = context.getSourceCode();
    const text = sourceCode.getText();

    // console.log('here!!!!!!!here!!!!!!!here!!!!!!!here!!!!!!!')
    // console.log(text)
    return {

      Program: node => {

        if (!text.startsWith('//@ts-check') && !text.startsWith('// @ts-check')) {
          context.report({
            message: "files gotta start with //@ts-check",
            // node: Program,
            loc: {
              start: 0,
              end: 1,
            },
            fix: fixer => fixer.replaceTextRange([0, 0], '//@ts-check' + os.EOL),
          });
        }
      }
    };
  }
};
