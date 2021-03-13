import axios from "axios";
import { message } from "ant-design-vue";
const instance = axios.create({
  timeout: 3000, // 请求超时时间，3000ms未响应则停止请求
  withCredentials: true, // 允许携带cookie
  headers: { "Content-Type": "application/json" }
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
      message.error("status:" + status);
      return Promise.reject(data);
    } else {
      return data;
    }
  },
  error => {
    // 错误提醒
    message.error("status:" + error.response.status + " 服务器出错");
    return Promise.reject(error);
  }
);

export default instance;
