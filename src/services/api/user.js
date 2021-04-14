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

export const _editMyInfo = (params = {}) => {
  return axios.post('/user/editMyInfo', { ...params });
};

export const _sendUserMsg = (params = {}) => {
  return axios.post('/user/sendUserMsg', { ...params });
};
export const _getMsgList = (params = {}) => {
  return axios.post('/user/getMsgList', { params });
};
