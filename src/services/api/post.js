import axios from '../http';
export const _publish = (params = {}) => {
  return axios.post('/post/publish', { ...params });
};
export const _getList = (params = {}) => {
  return axios.post('/post/list', { ...params });
};

export const _getComment = (params = {}) => {
  return axios.post('/post/getComment', { ...params });
};
export const _changeLike = (params = {}) => {
  return axios.post('/post/changeLike', { ...params });
};
export const _addComment = (params = {}) => {
  return axios.post('/post/addComment', { ...params });
};
export const _deleteComment = (params = {}) => {
  return axios.post('/post/deleteComment', { ...params });
};
export const _getDetail = (params = {}) => {
  return axios.get('/post/getDetail', { params });
};
