// @ts-check
const fs = require('fs');

const stringArgv = require('string-argv');
const yargsParse = require('yargs-parser');

// console.log(`file contents!!!! ${fs.readFileSync('file.txt')}`);

// const argv = stringArgv(fs.readFileSync('file.txt'));

// const options = yargsParse(argv);
// console.log(options);


describe('cli args describe', () => {
  describe('cli args  describedescribe', () => {
    it('cliags_it', () => {
      console.log('in cliags_it');
      // const circle = new autobot.Circle(10);
      // console.log('height: ' + new Triangle(123).height);


      for (let j = 0; j < process.argv.length; j++) {
        console.log(`cliags_it ${j} -> ${process.argv[j]}`);
      }
    });
  });
});
