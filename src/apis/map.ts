import $axios from '@/http/axios';

// 客户标注查询
export const listMark = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/listMark', params);
};
// 定点客户标注查询
export const listCustMark = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/list', params);
};
// 零售客户标注查询
export const listMarkPcm = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/listMarkPcmCust', params);
};
// 对公客户标注查询
export const listMarkCcm = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/listMarkCcmCust', params);
};
// 支行
export const getBranchList = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/subbr/list', params);
};
// 片区
export const getAreaList = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/area/list', params);
};
// 网格
export const getGridList = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/gorg/list', params);
};
// 网点
export const getOutletList = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/netMark/loadList', params);
};
// 业态
export const getFormatList = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/gbusi/list', params);
};
// 单元
export const getUnitList = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/unit/list', params);
};
// 地点
export const getPlaceList = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/place/list', params);
};

// 个人客户标注(存客)
export const pcmCustMark = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/pcCustMark', params);
};
// 个人客户标注(潜客)
export const potentailCustMark = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/potentailCustMark', params);
};
// 对公客户标注(存客)
export const ccmCustMark = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/ccCustMark', params);
};
// 对公客户标注(潜客)
export const epqCustMark = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/epqCustMark', params);
};

// 注销标注
export const saveMarkCancel = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/markCancel/save', params);
};
export const getMarkCancel = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/markCancel/get', params);
};
// 企业查询
export const queryCompany = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/queryCompany', params);
};
// 新增公司潜客
export const addEpqCust = (params: Http.RequestParams) => {
  return $axios.post('/ccm/epqcust/save', params);
};
// 新增个人潜客
export const addPotentialCust = (params: Http.RequestParams) => {
  return $axios.post('/pcm/potentialCust/save', params);
};
// 营销轨迹
export const listPosition4User = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/mileage/listPosition4User', params);
};
