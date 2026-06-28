// 用户模块
import $axios from '@/http/axios';

// 登录
export const postLogin = (params: Http.RequestParams) => {
  return $axios.post('/sys/appLogin', params);
};
// 退出
export const postLogout = () => {
  return $axios.post('/sys/appLogout', {});
};
// 切换角色
export const changeRole = (params: Http.RequestParams) => {
  return $axios.post('/sys/appChangeRole', params);
};
// 更新密码
export const updatePassword = (params: Http.RequestParams) => {
  return $axios.post('/sys/updatePassword', params);
};

// 企业微信登录
export const qywxLogin = (params: Http.RequestParams) => {
  return $axios.get('/sys/singleLoginApp', params);
};
// 更新密码
export const getJsapiTickit = () => {
  return $axios.post('/sys/returnTicket');
};
