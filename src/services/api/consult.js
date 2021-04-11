import axios from '../http';
export const _getList = (params = {}) => {
  return axios.post('/consult/list', { ...params });
};
export const _getOne = (params = {}) => {
  return axios.get('/consult/one', { params });
};
export const _getConsultCount = () => {
  return axios.get('/consult/count');
};

export const _getBooks = () => {
  return axios.get('/consult/books');
};
