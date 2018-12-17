// @ts-check
import axios from 'axios';
import fs from 'fs';
import { apiAccessPage } from './ui-model/wordsmith/misc/page/apiAccess';

function base64_encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

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

export function httpRequestCreateProjectFromDataObject(name, data) {
  const body = getAxiosBodyWithDataObject(name, data);

  const url = 'https://api.automatedinsights.com/v1.8/projects';

  if (!global.aquiferOptions.wsApiKey) {
    global.aquiferOptions.wsApiKey = apiAccessPage.load().apiKeyInput.getText();
  }

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${global.aquiferOptions.wsApiKey}`,
      'User-Agent': 'Autobot',
      'Content-Type': 'application/json',
    },
  };
  axios.post(url, body, axiosConfig).then((response) => {
    // do nothing
  })
    .catch((error) => {
      throw new Error(error); // trace is useful this way
    });
}


export function httpRequestCreateProjectFromDataFile(name, file) {
  const httpRequestPromise = httpRequestCreateProjectFromDataFile_begin(name, file);
  httpRequestComplete(httpRequestPromise);
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
  if (!global.aquiferOptions.wsApiKey) {
    global.aquiferOptions.wsApiKey = apiAccessPage.load().apiKeyInput.getWebElement().getValue();
  }

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${global.aquiferOptions.wsApiKey}`,
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
  browser.call(() => axiosPromise
    .then((response) => {
      // do nothing
    })
    .catch((error) => {
      throw new Error(error); // trace is useful this way
    }));
}
