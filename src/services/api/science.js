import axios from '../http';

export const _getList = (params = {}) => {
  return axios.get('/science/list', { params });
};
export const _getOne = (params = {}) => {
  return axios.get('/science/one', { params });
};
export const _getScienceCount = () => {
  return axios.get('/science/count');
};
