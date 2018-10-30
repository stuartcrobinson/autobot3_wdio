
// @ts-check
import { Autobot } from '../../../autobot_framework/autobot';
import { data } from '../../../autobot_framework/support/hooks';

console.log("in requests.tes.js")

// /**
//  * 
//  * @param {Object} body 
//  */
// function httpRequestBegin(body) {

//   const axiosConfig = {
//     headers: {
//       'Authorization': 'Bearer aba82e1a30db642b781bc99e23eb38c23929741ccdec16cacc196d1dcddc0ecc',
//       'User-Agent': 'Autobot',
//       'Content-Type': 'application/json'
//     },
//   };

//   console.log('posting')
//   return axios.post('https://api.automatedinsights.com/v1.8/projects', body, axiosConfig)
// }


// /**
//  * 
//  * @param {AxiosPromise} axiosPromise 
//  */
// function httpRequestComplete(axiosPromise) {

//   //does wait and does print
//   browser.call(function () {
//     return axiosPromise
//       .then(function (response) {
//         console.log('response status: ' + response.status);
//       })
//       .catch(function (error) {
//         throw new Error(error);   //trace is useful this way
//       });
//   });

// }


describe('requests describe', () => {

  it('requests it 1', () => {
    console.log('in requests it 1');

    const axiosBody = {
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
    let httpRequestPromise = Autobot.httpRequestCreateProject_begin(name, data);
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
