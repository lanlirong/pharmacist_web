import axios from 'axios';
import { message } from 'ant-design-vue';
import VueThis from '@/main.js';
const instance = axios.create({
  // baseURL: 'http://49.235.220.14:7689',
  baseURL: 'http://localhost:80',
  timeout: 20000, // 请求超时时间，3000ms未响应则停止请求
  withCredentials: true // 允许携带cookie
  // headers: { 'Content-Type': 'application/json' }
});
// 请求拦截
instance.interceptors.request.use(config => {
  let params = Object.assign(config.params || {}, {
    _: Date.now()
  });

  // post转换成form类型
  if (config.method.toLowerCase() === 'post') {
    if (!config.headers['content-type']) {
      config.headers['content-type'] = 'application/json;charset=UTF-8';
      // config.headers['content-type'] = 'application/x-www-form-urlencoded';
    } else {
      if (
        config.headers['content-type'].indexOf('x-www-form-urlencoded') > -1
      ) {
        let data = config.data;
        let ret = '';
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        config.data = ret;
      }
    }
  }

  if (!config.params) {
    // post 时强行给url上加上参数
    config.params = params;
  }
  return config;
});

// 响应拦截
instance.interceptors.response.use(
  response => {
    let { status, data } = response;
    if (!status || status !== 200) {
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
      } else if (data.code === 4) {
        // 轻提示错误
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

// 97479
