import axios from '../http';
export const _getList = (params = {}) => {
  return axios.post('/simpleSearch/list', { ...params });
};
