// add.js
// adds two integers received as command line arguments
function add(a, b) {
  return parseInt(a) + parseInt(b);
}
if (!process.argv[2] || !process.argv[3]) {
  console.log('Insufficient number of arguments! Give two numbers please!');
}
else {
  console.log('The sum of', process.argv[2], 'and', process.argv[3], 'is', add(process.argv[2], process.argv[3]));
}

//npm run wdio -- --suite many --manySpec src/ui-test/dummy1.js --nRuns 3

var shell = require('shelljs');

// shell.exec('npm run wdio -- --suite many --manySpec src/ui-test/dummy1.js --nRuns 3')

var glob = require("glob")
var path = require("path")


// console.log(glob.sync('./src/ui-test/**/*.js'));
// console.log(glob.sync('**/*createProject*'));
// console.log(glob.sync('**/*createProject*'));
console.log(glob.sync('src/ui-test/**/*create*'), { root: path.resolve('./src/ui-test') });
// console.log(glob.sync('**/*create*'), { root: './src/ui-test/' });
// console.log(glob.sync('**/*create*'));


// let globResults = glob.sync(specPattern, {
//   root: path.resolve('src/ui-test')
// });