import axios from '../http';

export const _getList = (params = {}) => {
  return axios.get('/api/interaction/list', { params });
};
