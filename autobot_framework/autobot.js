// @ts-check
import axios, { AxiosPromise } from 'axios';
import { livy } from './support/Livy';

/* ******************************* wrapped *************************************/

function getAxiosBodyWithDataObject(projectName, projectData) {
  return {
    "data": {
      "name": projectName,
      "dataset": {
        "format": "json",
        "data": projectData
      }
    }
  }
}

//eachDataType_date2
function getAxiosBodyWithFileData64(projectName, file, data64) {

  return {
    "data": {
      "name": projectName,
      "dataset": {
        "format": "csv",
        "filename": file,
        "content": data64
      }
    }
  }
}



var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

export class Autobot {

  static getProjectUrlFromName(name) {
    return `https://wordsmith.automatedinsights.com/projects/` + name;
  }
  /**
   * 
   * @param {String} x 
   */
  static makeSlugSafeName(x) {
    let slugSafe = x;
    slugSafe = slugSafe.replace(/[^\w-]/g, ' ');
    slugSafe = slugSafe.replace(/\s\s+/g, ' ');
    slugSafe = slugSafe.replace(/ /g, '-');
    slugSafe = slugSafe.toLowerCase();
    return slugSafe;
  }

  static httpRequestCreateProjectFromDataObject_begin(name, dataObject1) {

    const body = getAxiosBodyWithDataObject(name, dataObject1);

    return this.httpRequestBegin('https://api.automatedinsights.com/v1.8/projects', body);
  }


  static httpRequestCreateProjectFromDataFile_begin(name, file) {

    const data64 = base64_encode(file)

    const body = getAxiosBodyWithFileData64(name, file, data64);

    return this.httpRequestBegin('https://api.automatedinsights.com/v1.8/projects', body);
  }

  /**
   * 
   * @param {Object} body 
   */
  static httpRequestBegin(url, body) {
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer aba82e1a30db642b781bc99e23eb38c23929741ccdec16cacc196d1dcddc0ecc',
        'User-Agent': 'Autobot',
        'Content-Type': 'application/json'
      },
    };
    return axios.post(url, body, axiosConfig)
  }

  /**
   * 
   * @param {AxiosPromise} axiosPromise 
   */
  static httpRequestComplete(axiosPromise) {

    //does wait and does print
    browser.call(function () {
      return axiosPromise
        .then(function (response) {
          // console.log('response status: ' + response.status);
          // do nothing
        })
        .catch(function (error) {
          throw new Error(error);   //trace is useful this way
        });
    });

  }


};

/******************************** config *************************************/

//@ts-ignore
export const options = global.autobotOptions;


/******** tools *******/

// export const livy.style = new class AutobotSyles {
//   constructor() {
//     this.verb = colors.italic;
//     this.object = colors.bold;
//     this.filler = colors.reset;
//     this.selector = colors.gray;
//   }
// }();


// /******************************** browser ************************************/
/**
 * Should this method be in the Page parent class, so that we always make sure all the critical elements have finished loaded first?
 * 
 * Yeah probably.  You might want to check to see if something exists or not on a fully-loaded page.  Can't always rely on waiting for a given target.
 * 
 * TODO - move this to Page
 * 
 * @param {String} url 
 */
export function loadPage(url) {
  browser.url(url);
}
