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
      description: "the constructor for each child class of UiContainer must end with super.nameElements to ensure that uiElements get logged appropriately",
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

      ClassExpression: node => {


        if (!node.superClass) { return; }

        const superClass = node.superClass.name;

        if (
          superClass === 'UiContainer' ||
          superClass === 'Page' ||
          superClass === 'UiElement' ||
          superClass === 'WordsmithPage' ||
          superClass === 'TableauPage') {

          let methods = node.body.body


          // console.log('methods asdfasgr8uerodf')

          // console.log(methods)

          let constructor = methods.find(m => m.kind === 'constructor');



          // console.log('constructor asduerodf')

          // console.log(JSON.stringify(constructor))

          let statements = constructor.value.body.body

          let lastStatement = statements[statements.length - 1];
          let looksGood = false;

          try {
            looksGood = lastStatement.expression.callee.object.type === 'Super' && lastStatement.expression.callee.property.name === 'nameElements';
          } catch (err) { }
          finally {

            if (!looksGood) {
              context.report({
                message: "UiContainer child class constructor must end with 'super.nameElements();'",
                // node: Program,
                loc: {
                  start: lastStatement.start,
                  end: lastStatement.end,
                },
                fix: fixer => fixer.replaceTextRange([lastStatement.end, lastStatement.end], os.EOL + 'super.nameElements();' + os.EOL),
              });
            }
          }
        }
      }
    }
  }
}



        // // console.log("node ofisudfoisdf")
        // // console.log(node)
        // let expressionStatements = node.body.body;

        // if (expressionStatements) {
        //   const statementsContainsCheckVisualStatement = expressionStatements.find(es => {
        //     try {
        //       return es.expression.callee.property.name === 'checkVisual'
        //     } catch (err) {
        //       return false;
        //     }
        //   });
        //   // console.log("statementsContainsCheckVisualStatement")
        //   // console.log(statementsContainsCheckVisualStatement)

        //   if (statementsContainsCheckVisualStatement) {

        //     let statementsEndsWithVisualTestAssert;
        //     let lastStatement
        //     try {
        //       lastStatement = expressionStatements[expressionStatements.length - 1]

        //       // console.log("JSON.stringify(lastStatement)")
        //       // console.log(JSON.stringify(lastStatement, null, 4))

        //       statementsEndsWithVisualTestAssert = lastStatement.expression.callee.property.name === 'visualTestsPassed';
        //     } catch (err) {
        //       statementsEndsWithVisualTestAssert = false;
        //     }

        //     // console.log("statementsEndsWithVisualTestAssert if8sdyf78d")
        //     // console.log(statementsEndsWithVisualTestAssert)

        //     if (statementsContainsCheckVisualStatement && !statementsEndsWithVisualTestAssert) {

        //       context.report({
        //         message: "test with visual test must end with AquaAssert.visualTestsPassed()",
        //         // node: Program,
        //         loc: {
        //           start: lastStatement.start,
        //           end: lastStatement.end,
        //         },
        //         fix: fixer => fixer.replaceTextRange([lastStatement.end, lastStatement.end], os.EOL + 'AquaAssert.visualTestsPassed();' + os.EOL),
        //       });

        //     }
        //   }

        // if (!text.startsWith('//@ts-check') && !text.startsWith('// @ts-check')) {
        //   context.report({
        //     message: "files gotta start with //@ts-check",
        //     // node: Program,
        //     loc: {
        //       start: 0,
        //       end: 1,
        //     },
        //     fix: fixer => fixer.replaceTextRange([0, 0], '//@ts-check' + os.EOL),
        //   });
        // }
//       }
//     }
//   };
// }
// };
