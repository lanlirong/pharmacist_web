import axios from 'axios';
import { message } from 'ant-design-vue';
import VueThis from '@/main.js';
const instance = axios.create({
  timeout: 20000, // 请求超时时间，3000ms未响应则停止请求
  withCredentials: true, // 允许携带cookie
  headers: { 'Content-Type': 'application/json' }
});
// 请求拦截
instance.interceptors.request.use(config => {
  return config;
});

// 响应拦截
instance.interceptors.response.use(
  response => {
    let { status, data } = response;
    if (status !== 200) {
      message.error('status:' + status);
      return Promise.reject(data);
    } else {
      if (data.code === 2) {
        // 404
        VueThis.$router.push('/404');
        return;
      } else if (data.code === 3) {
        // 错误
        VueThis.$router.push('/error');
        message.error(data.msg);
      }
      return data;
    }
  },
  error => {
    // 错误提醒
    message.error('status:' + error.response.status + ' 服务器出错');
    return Promise.reject(error);
  }
);

export default instance;
