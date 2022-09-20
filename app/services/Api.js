import axios from 'axios';

export const requestGET = async (URL) => {
  return await axios({
    method: 'GET',
    url: URL,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPOST = async (URL, data) => {
  return await axios({
    method: 'POST',
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
};

export const requestPATCH = async (URL, data) => {
  return await axios({
    method: 'PATCH',
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: []};
    });
};
