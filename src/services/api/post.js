import axios from '../http';
export const _publish = (params = {}) => {
  return axios.post('/post/publish', { ...params });
};
export const _getList = (params = {}) => {
  return axios.post('/post/list', { ...params });
};
