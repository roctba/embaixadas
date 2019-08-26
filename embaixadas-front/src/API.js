import axios from 'axios';
require('dotenv/config');
const URL = process.env.REACT_APP_API_PATH;

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");
  if ( token != null ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});

export const register = payload => {
  return axios(`${URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: payload,
  }).then(response => response.data);
};

export const signin = payload => {
  return axios(`${URL}/signin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: payload,
  }).then(response => response.data);
};

export const getEmbassies = payload => {
  return axios(`${URL}/embassies`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    data: payload,
  }).then(response => response.data);
};