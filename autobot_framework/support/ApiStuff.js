// @ts-check
import axios from 'axios';
import fs from 'fs';
import { options } from '../autobot';
import { apiAccessPage } from '../../src/ui-model/wordsmith/misc/page/apiAccess';


function base64_encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

// eachDataType_date2
function getAxiosBodyWithFileData64(projectName, file, data64) {
  return {
    data: {
      name: projectName,
      dataset: {
        format: 'csv',
        filename: file,
        content: data64,
      },
    },
  };
}

export function httpRequestCreateProjectFromDataFile_begin_and_complete(name, file) {
  const data64 = base64_encode(file);

  const body = getAxiosBodyWithFileData64(name, file, data64);

  const url = 'https://api.automatedinsights.com/v1.8/projects';

  if (!options.wsApiKey) {
    // @ts-ignore
    options.wsApiKey = apiAccessPage.load().apiKeyInput.getText();
    // options.wsApiKey = global.getApiKeyFromUi(); // apiAccessPage.apiKeyInput.getText();
  }

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${options.wsApiKey}`,
      // Authorization: 'Bearer aba82e1a30db642b781bc99e23eb38c23929741ccdec16cacc196d1dcddc0ecc',
      'User-Agent': 'Autobot',
      'Content-Type': 'application/json',
    },
  };
  axios.post(url, body, axiosConfig).then((response) => {
    // console.log('response status: ' + response.status);
    // do nothing
  })
    .catch((error) => {
      throw new Error(error); // trace is useful this way
    });
}


function getAxiosBodyWithDataObject(projectName, projectData) {
  return {
    data: {
      name: projectName,
      dataset: {
        format: 'json',
        data: projectData,
      },
    },
  };
}

export function httpRequestCreateProjectFromDataObject_begin_and_complete(name, data) {
  // const data64 = base64_encode(file);

  const body = getAxiosBodyWithDataObject(name, data);

  // return this.httpRequestBegin('https://api.automatedinsights.com/v1.8/projects', body);

  // const body = getAxiosBodyWithFileData64(name, file, data64);

  const url = 'https://api.automatedinsights.com/v1.8/projects';

  if (!options.wsApiKey) {
    // @ts-ignore
    options.wsApiKey = apiAccessPage.load().apiKeyInput.getText();
    // options.wsApiKey = global.getApiKeyFromUi(); // apiAccessPage.apiKeyInput.getText();
  }

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${options.wsApiKey}`,
      // Authorization: 'Bearer aba82e1a30db642b781bc99e23eb38c23929741ccdec16cacc196d1dcddc0ecc',
      'User-Agent': 'Autobot',
      'Content-Type': 'application/json',
    },
  };
  axios.post(url, body, axiosConfig).then((response) => {
    // console.log('response status: ' + response.status);
    // do nothing
  })
    .catch((error) => {
      throw new Error(error); // trace is useful this way
    });
}


export function httpRequestCreateProjectFromDataFile_begin(name, file) {
  const data64 = base64_encode(file);

  const body = getAxiosBodyWithFileData64(name, file, data64);

  return httpRequestBegin('https://api.automatedinsights.com/v1.8/projects', body);
}

/**
 *
 * @param {Object} body
 */
export function httpRequestBegin(url, body) {
  if (!options.wsApiKey) {
    // @ts-ignore
    options.wsApiKey = apiAccessPage.load().apiKeyInput.getWebElement().getValue();
    // options.wsApiKey = global.getApiKeyFromUi(); // apiAccessPage.apiKeyInput.getText();
  }

  // console.log('options.wsApiKey');
  // console.log(options.wsApiKey);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${options.wsApiKey}`,
      // Authorization: 'Bearer aba82e1a30db642b781bc99e23eb38c23929741ccdec16cacc196d1dcddc0ecc',
      'User-Agent': 'Autobot',
      'Content-Type': 'application/json',
    },
  };
  return axios.post(url, body, axiosConfig);
}


/**
   *
   * @param {import('axios').AxiosPromise} axiosPromise
   */
export function httpRequestComplete(axiosPromise) {
  // does wait and does print
  browser.call(() => axiosPromise
    .then((response) => {
      // console.log('response status: ' + response.status);
      // do nothing
    })
    .catch((error) => {
      throw new Error(error); // trace is useful this way
    }));
}
