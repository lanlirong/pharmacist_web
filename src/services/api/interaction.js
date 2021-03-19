import axios from '../http';

export const _getList = (params = {}) => {
  return axios.get('/api/interaction/list', { params });
};
export const _getOne = (params = {}) => {
  return axios.get('/api/interaction/one', { params });
};
