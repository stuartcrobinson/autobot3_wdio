module.exports = {
  // "extends": "prettier",

  "parserOptions": {
    "ecmaVersion": 2018
  },

  // "env": {
  //   "node": true,
  //   "es6": true
  // },

  // "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "extends": "airbnb-base",
  "env": {
    // "node": true,
    "browser": true,
    "mocha": true,
    "webdriverio/wdio": true,
    "es6": true
  },
  "plugins": ["webdriverio"
    , "autobot"
  ],

  "rules": {

    "no-console": "off",
    "class-methods-use-this": "off",

    "max-len": "off",
    "no-plusplus": [2, { "allowForLoopAfterthoughts": true }],
    "import/prefer-default-export": "off",
    "camelcase": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle": "off",
    "func-names": "off",
    "no-unused-vars": "off",
    "no-unused-expressions": "off",
    // "starts-with-ts-check": 2,
    "autobot/starts-with-ts-check": 2,
    "autobot/visual-test-contains-assert": 2,
    "autobot/uiContainer-child-constructor-ends-with-nameElements": 2
    // "eqeqeq": "off",
    // "curly": "error",
    // "quotes": ["error", "double"]
  }

};
