import axios from '../http';

export const _getList = (params = {}) => {
  return axios.get('/api/drug/list', { params });
};
export const _getDetail = (params = {}) => {
  return axios.get(`/api/consult/detail/${params.id}`);
};
