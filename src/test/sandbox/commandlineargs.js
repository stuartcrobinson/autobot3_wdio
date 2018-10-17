var assert = require('assert');
// var autobot = require('../../autobot.js');
// const asdf = require('../../../src/demo/class')

// import { Triangle } from '../../../autobot_framework/autobot';

var fs = require('fs');

var stringArgv = require('string-argv');
var yargsParse = require('yargs-parser');


async function asdf() {
    const contents =  fs.readFileSync('file.txt');

    console.log("file contents!!!! " + contents);
}


console.log("file contents!!!! " + fs.readFileSync('file.txt'));



let argv = stringArgv(fs.readFileSync('file.txt'));

// for (let i = 0; i < argv.length; i++) {
//     argv[i] = '--' + argv[i]
// }

const options = yargsParse(argv);
console.log(options);



// asdf();

describe('cli args describe', function () {

    describe('cli args  describedescribe', function () {

        it('cliags_it', function () {
            console.log('in cliags_it')
            // const circle = new autobot.Circle(10);
            // console.log('height: ' + new Triangle(123).height);


            for (let j = 0; j < process.argv.length; j++) {
                console.log("cliags_it " + j + ' -> ' + (process.argv[j]));
            }

        });

    });

});