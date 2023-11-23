import axios from 'axios';

const AUTH_TOKEN = process.env.REACT_APP_API_KEY;
const API_HOST = process.env.REACT_APP_API_HOST;
axios.defaults.baseURL = 'https://radio-world-75-000-worldwide-fm-radio-stations.p.rapidapi.com';
axios.defaults.headers.common['X-RapidAPI-Key'] = AUTH_TOKEN;
axios.defaults.headers.common['X-RapidAPI-Host'] = API_HOST;
axios.defaults.timeout = 6000;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axios;
