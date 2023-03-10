//@components
import Axios from '../Axios';
import { toast } from 'react-toastify';

const showToastAlert = ({ type = 'success', message = '' }) => {
  toast(message, { type });
};

export const validUser = (dispatch, credentials) =>
  new Promise((resolve, reject) => {
    Axios.post('/auth/login', credentials)
      .then(response => {
        const { data } = response;
        dispatch({ type: 'VALIDATION_SUCCESS', payload: data.user });
        dispatch({
          type: 'LOGIN_ERROR',
          payload: '',
        });
        resolve({
          user: data.user,
          token: data.accessToken,
          refreshToken: data.refreshToken,
        });
      })
      .catch(error => {
        showToastAlert({
          type: 'error',
          message: err.response.data.detail || 'Error al iniciar sesión',
        });
        dispatch({
          type: 'LOGIN_ERROR',
          payload: error.response.data.message,
        });
        reject();
      });
  });

export const loginUser = (dispatch, { user, token }) =>
  new Promise((resolve, reject) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    window.localStorage.setItem('token', token);
    resolve(user);
  });

export const getAuthenticatedUser = dispatch =>
  new Promise((resolve, reject) => {
    dispatch({ type: 'REQUEST_LOADING' });
    Axios.get('/auth/me')
      .then(response => {
        const { data } = response;
        dispatch({ type: 'GET_LOGGED_USER', payload: data });
        resolve(data);
        dispatch({ type: 'END_LOADING' });
      })
      .catch(e => {
        window.localStorage.clear();
        dispatch({ type: 'END_LOADING' });
        reject(e);
      });
  });

export const updateUserPassword = (dispatch, values) =>
  new Promise((resolve, reject) => {
    Axios.put('/auth/change-password', values)
      .then(response => {
        const { data } = response;
        dispatch({ type: 'UPDATE_LOGGED_USER_PASSWORD', payload: data });
        resolve(data);
      })
      .catch(err => {
        showToastAlert({
          type: 'error',
          message: err.response.data.detail || 'Error al cambiar contraseña',
        });
        reject();
      });
  });

export const requestRecoveryPassword = (__, values) =>
  new Promise((resolve, reject) => {
    Axios.post('/auth/forgot-password', values)
      .then(response => {
        const { data } = response;
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  });

export const confirmRecoveryPassword = (__, values) =>
  new Promise((resolve, reject) => {
    Axios.post('/auth/recover-password', values)
      .then(response => {
        const { data } = response;
        showToastAlert({ message: 'Cambio de contraseña exitoso' });
        resolve(data);
      })
      .catch(err => {
        showToastAlert({
          type: 'error',
          message: err.response.data.detail || 'Error al cambiar contraseña',
        });
        reject(err);
      });
  });

export const logout = dispatch => {
  window.localStorage.clear();
  dispatch({ type: 'LOGOUT' });
};
export const changeNavbarStatus = (dispatch, status) => {
  localStorage.setItem('sidebarCollapse', JSON.stringify(status));
  dispatch({ type: 'CHANGE_NAVBAR_COLLAPSABLE', payload: status });
};
