import axios from '../http';

export const _checkUsername = (params = {}) => {
  return axios.get('/user/checkUsername', { params });
};
export const _checkPhone = (params = {}) => {
  return axios.get('/user/checkPhone', { params });
};
export const _checkEmail = (params = {}) => {
  return axios.get('/user/checkEmail', { params });
};

export const _register = (params = {}) => {
  return axios.post('/user/register', { ...params });
};
export const _login = (params = {}) => {
  return axios.post('/user/login', { ...params });
};
export const _logout = (params = {}) => {
  return axios.get('/user/logout', { params });
};
