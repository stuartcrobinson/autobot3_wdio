
// @ts-check
import { Autobot } from '../../../autobot_framework/autobot';
import { data } from '../../../autobot_framework/support/hooks';

console.log("in requests.tes.js")


// import * as base64 from 'file-base64'

// //   base64.encode('text.txt', function (err, base64String) {
// //     console.log(base64String);
// //   });
var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}
describe('requests describe', () => {

  it('requests it 1', () => {
    console.log('in requests it 1');

    //   return {
    //     "data": {
    //       "name": projectName,
    //       "dataset": {
    //         "format": "csv",
    //         "filename": "file.csv",
    //         "content": base64js.toByteArray()
    //       }
    //     }
    //   }
    // }


    const axiosBodyFile = {
      "data": {
        "name": "Cities8",
        "dataset": {
          "format": "csv",
          "filename": "resources/eachDataType_date2.csv",
          "content": base64_encode("resources/eachDataType_date2.csv"),
        }
      }
    }



    const axiosBodyData = {
      "data": {
        "name": "Cities6",
        "dataset": {
          "format": "json",
          "data": [
            {
              "city": "Portland",
              "avg_salary": 34052,
              "population": 432427
            },
            {
              "city": "Atlanta",
              "avg_salary": 31322,
              "population": 432427
            },
            {
              "city": "Seattle",
              "avg_salary": 32876,
              "population": 620778
            },
          ]
        }
      }
    }

    let name = Autobot.makeSlugSafeName("ONE two! three...    fOur:fivE");
    // let data = [
    //   {
    //     "city": "Portland",
    //     "avg_salary": 34052,
    //     "population": 432427
    //   },
    //   {
    //     "city": "Atlanta",
    //     "avg_salary": 31322,
    //     "population": 432427
    //   },
    //   {
    //     "city": "Seattle",
    //     "avg_salary": 32876,
    //     "population": 620778
    //   },
    // ];

    console.log('b4 send');
    let httpRequestPromise = Autobot.httpRequestCreateProjectFromDataFile_begin(name, "resources/eachDataType_date2.csv");
    // let httpRequestPromise = Autobot.httpRequestCreateProjectFromDataObject_begin(name, data);
    console.log('after send');
    Autobot.httpRequestComplete(httpRequestPromise);
    console.log('afer wait');

    // console.log('before w');
    // let w = browser.call(function () {
    //   console.log('in w');
    //   return axios
    //     .post('https://api.automatedinsights.com/v1.8/projects', axiosBody, axiosConfig)
    //     .then(function (response) {
    //       console.log('then w: ' + response.status);
    //       return response.status;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // });
    // console.log('after w');



    // console.log('before m');
    // let myAxiosPromise = axios
    //   .get('http://slowwly.robertomurray.co.uk/delay/4000/url/https://en.wikipedia.org/wiki/Spoon')


    // console.log('before m');
    // let myAxiosPromise2 = axios
    //   .get('http://slowwly.robertomurray.co.uk/delay/3000/url/https://en.wikipedia.org/wiki/Spoon')

    // console.log('before p');
    // axios
    //   .get('https://yesno.wtf/api/')
    //   .then(function (response) {
    //     console.log('then p: ' + response.data.answer);
    //     return response.data.answer;
    //   })

    // console.log('before q');
    // axios
    //   .get('https://yesno.wtf/api/')
    //   .then(function (response) {
    //     console.log('then q: ' + response.data.answer);
    //     return response.data.answer;
    //   })

    // let x = browser.call(function () {
    //   console.log('in x');
    //   return axios.get('https://yesno.wtf/api/')
    //     .then(function (response) {
    //       console.log('then x: ' + response.data.answer);
    //       return response.data.answer;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // });



    // //doesn't wait and doesn't print - BY ITSELF.  DOES PRINT even when browser.call comes later.  oh that's cos program's still running when .then() happens?
    // myAxiosPromise2.then(function (response) {
    //   console.log('then m2: ' + response.status);
    //   // return response.data.answer;
    // })


    // let y = browser.call(function () {
    //   console.log('in y');
    //   return axios.get('https://yesno.wtf/api/')
    //     .then(function (response) {
    //       console.log('then y: ' + response.data.answer);
    //       return response.data.answer;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // });
    // console.log('x: ' + x);
    // console.log('y: ' + y);


    // //does wait and does print
    // browser.call(function () {

    //   let myPromise = myAxiosPromise.then(function (response) {
    //     console.log('then m: ' + response.status);
    //     // return response.data.answer;
    //   })
    //   return myPromise;
    // });



    // console.log('finished');
  });

});
