/**
 * @fileoverview ensure that each javascript file starts with &#39;//@ts-check&#39;
 * @author Stuart C. Robinson
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/eslint-plugin-starts-with-ts-check"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("eslint-plugin-starts-with-ts-check", rule, {

  valid: [
    {
      code: `//@ts-check
      var asdf = 123;`
    }
  ],

  invalid: [
    {
      code: `//not right
      var x = 9;`,  //\nlet c = 'file should have started with //@ts-check'
      errors: 1
    }
  ]
});
