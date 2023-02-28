/* eslint-disable */
import axios from 'axios';
import apiConfig from './config/api';

const env = import.meta.env.VITE_NODE_ENV;

const getBaseUrl = () => {
  if (env === 'testing') {
    return apiConfig.testing.API_APP;
  }
  if (env === 'production') {
    return apiConfig.production.API_APP;
  }
  return apiConfig.development.API_APP;
};

const Axios = axios.create({
  baseURL: getBaseUrl(),
  timeout: 20 * 60 * 1000,
  // mode: 'no-cors',
  maxBodyLength: 10000000000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
  },
});

Axios.interceptors.request.use(
  settings => {
    const token = window.localStorage.getItem('token');
    if (token) {
      settings.headers.Authorization = `Bearer ${token}`;
    }
    return settings;
  },
  error => {
    Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response) {
      if (
        error.response?.status === 401 &&
        originalRequest.url === '/auth/changetoken'
      ) {
        window.localStorage.clear();
        window.location.replace('/');
      }
      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/auth/login' &&
        window.localStorage.getItem('rememberSession')
      ) {
        originalRequest._retry = true;
        try {
          const res = await Axios.post('/auth/changetoken', {
            refreshToken: window.localStorage.getItem('refreshToken'),
          });
          if (res.status === 200) {
            window.localStorage.setItem('token', res.data.accessToken);
            window.localStorage.setItem('refreshToken', res.data.refreshToken);
            Axios.defaults.headers.common.Authorization = res.data.accessToken;
            return Axios(originalRequest);
          }
        } catch (err) {
          if (err.response.status === 400) {
            window.localStorage.clear();
            window.location.replace('/');
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

Axios.defaults.headers.common['Content-Type'] = 'application/json';

export default Axios;
