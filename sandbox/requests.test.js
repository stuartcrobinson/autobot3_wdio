
//@ts-check
import axios from 'axios';

console.log("in requests.tes.js")

describe('requests describe', () => {

  it('requests it 1', () => {
    console.log('in requests it 1');



    console.log('before m');
    let m = axios
      .get('https://yesno.wtf/api/')

    console.log('before p');
    axios
      .get('https://yesno.wtf/api/')
      .then(function (response) {
        console.log('then p: '+ response.data.answer);
        return response.data.answer;
      })

    console.log('before q');
    axios
      .get('https://yesno.wtf/api/')
      .then(function (response) {
        console.log('then q: '+ response.data.answer);
        return response.data.answer;
      })

    let x = browser.call(function () {
      console.log('in x');
      return axios.get('https://yesno.wtf/api/')
        .then(function (response) {
          console.log('then x: '+ response.data.answer);
          return response.data.answer;
        })
        .catch(function (error) {
          console.log(error);
        });
    });

    let y = browser.call(function () {
      console.log('in y');
      return axios.get('https://yesno.wtf/api/')
        .then(function (response) {
          console.log('then y: '+ response.data.answer);
          return response.data.answer;
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    console.log('x: ' + x);
    console.log('y: ' + y);

    m.then(function (response) {
      console.log('then m: '+ response.data.answer);
      return response.data.answer;
    })

  });

  it('itHooks2_3', () => {
    console.log('in itHooks2_3');
  });
});
