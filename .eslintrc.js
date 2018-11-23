module.exports = {
    // "extends": "prettier",
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "mocha": true,
        "webdriverio/wdio": true,

    },
    "plugins": ["webdriverio"],

    "rules": {

        "no-console": "off",


        "max-len": "off",
        "no-plusplus": [2, { "allowForLoopAfterthoughts": true }],
        "import/prefer-default-export": "off",
        "camelcase": "off",
        "no-use-before-define": "off",
        "no-underscore-dangle": "off",
        "func-names": "off",
        "no-unused-vars": "off",
        // "eqeqeq": "off",
        // "curly": "error",
        // "quotes": ["error", "double"]
    }

};