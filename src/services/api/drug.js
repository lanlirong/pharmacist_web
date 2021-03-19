import axios from '../http';

export const _getList = (params = {}) => {
  return axios.post('/api/drug/list', { ...params });
};
export const _getFilterList = (params = {}) => {
  return axios.post('/api/drug/filterList', { ...params });
};
export const _getDetail = (params = {}) => {
  return axios.get('/api/drug/one', { params });
};
