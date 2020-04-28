/**
 * API Single Source File
 *
 * Example Usage:
 *  import api from '[path_to_this_file]/api',
 *  const result = await api.function(xx);
 *  console.log(result);
 */
import axios from 'axios';

const apiHostInternal = 'https://restcountries.eu';
const apiUrl = {
  directAPI: `${apiHostInternal}`,
};

async function apiRequest(url, method, path, data, params, headers = {}) {
  return axios
    .request({
      method,
      url: `${url}/${path}`,
      data,
      params,
      headers,
    });
  // TODO add catch here if neeeded
}

function getReq(type, path, params) {
  const headers = {
    'Access-Control-Allow-Origin': '*',

  };
  return apiRequest(apiUrl[type], 'get', path, undefined, params, headers);
}

export default {
  // demo
  // api: (requestBody) => postReq('directAPI', path/to/`, requestBody),

  getCountries: () => getReq('directAPI', 'rest/v2/all'),
};
