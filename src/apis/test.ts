// 通用测试接口模块
import $axios from '@/http/axios';

export const testPage = (params: Http.RequestParams) => {
  return $axios.post('/test/page', params);
};
export const testList = (params: Http.RequestParams) => {
  return $axios.post('/test/list', params);
};
export const testChart = (params: Http.RequestParams) => {
  return $axios.post('/test/chart', params);
};
export const testGet = (params: Http.RequestParams) => {
  return $axios.post('/test/get', params);
};
