import $axios from '@/http/axios';

// 热销新发售-数量
export const getCountHotNew = (params: Http.RequestParams) => {
  return $axios.post('/cpm/prod/getCount', params);
};
// 零售产品列表
export const listPProd = (params: Http.RequestParams) => {
  return $axios.post('/cpm/ppmprod/listProd', params);
};
// 公司、普惠产品列表
export const listCProd = (params: Http.RequestParams) => {
  return $axios.post('/cpm/prod/listProd', params);
};


// 产品详情-零售
export const pgetProd = (params: Http.RequestParams) => {
  return $axios.post('/cpm/ppmprod/getProd', params);
};
// 产品详情-公司、普惠
export const cgetProd = (params: Http.RequestParams) => {
  return $axios.post('/cpm/prod/getProd', params);
};
