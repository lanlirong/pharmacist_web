import axios from '../http';
export const _recommend = () => {
  return axios.get('/api/consult/recommend');
};
export const _getDetail = (params = {}) => {
  return axios.get(`/api/consult/detail/${params.id}`);
};
