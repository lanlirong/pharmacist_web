import axios from '../http';
export const _getList = (params = {}) => {
  return axios.post('/api/consult/list', { ...params });
};
export const _getOne = (params = {}) => {
  return axios.get('/api/consult/one', { params });
};
export const _getConsultCount = () => {
  return axios.get('/api/consult/count');
};

export const _getBooks = () => {
  return axios.get('/api/consult/books');
};
