import axios from '../http';
export const _recommend = () => {
  return axios.get('/api/consult/recommend');
};
export const _getList = (params = {}) => {
  return axios.get(`/api/consult/list/${params.id}`);
};
export const _getDetail = (params = {}) => {
  return axios.get(`/api/consult/detail/${params.id}`);
};
export const _getBooks = () => {
  return axios.get('/api/consult/books');
};
