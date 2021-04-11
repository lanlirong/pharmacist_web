import axios from '../http';

export const _getList = (params = {}) => {
  return axios.post('/drug/list', { ...params });
};
export const _getFilterList = (params = {}) => {
  return axios.post('/drug/filterList', { ...params });
};
export const _getDetail = (params = {}) => {
  return axios.get('/drug/one', { params });
};
export const _getDrugCount = () => {
  return axios.get('/drug/count');
};
