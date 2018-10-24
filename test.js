// console.log('^[]8;;https://example.com/^GLink to example website^[]8;;^G');


// var cssToXPath = require('css-to-xpath');

// console.log(cssToXPath('.myclass'))
// console.log(cssToXPath('.scroll-wrapper .segment__header.padding-top span'))



class ThousandsSeparatorDropdown {
  constructor(asdf) {

    for (const propName in this) {
      const propValue = this[propName];
      // @ts-ignore
      // propValue.stuartname = propName;
      // propValue.setName(propName);
      console.log("herree " + propName + ", " + propValue)
    }

    for (const propName in this.constructor) {
      const propValue = this.constructor[propName];
      // @ts-ignore
      // propValue.stuartname = propName;
      // propValue.setName(propName);
      console.log("this.constructor ---- " + propName + ", " + propValue)
    }

    console.log("1")
    console.log(this.constructor)
    console.log(this.constructor.name)
    console.log(this)
    console.log(this)
    console.log(JSON.stringify(this))
    console.log(typeof this)
    console.log(this[0])
    console.log(this.function)
    console.log(this.Function)
    console.log(Object.getOwnPropertyNames(this))
    console.log(Object.keys(this));

  }

}

let awefawef = new ThousandsSeparatorDropdown('hello');
