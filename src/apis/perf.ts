import $axios from '@/http/axios';

// 获取业绩指标总数
export const getPerfIndexList = (params: Http.RequestParams) => {
  return $axios.post('/pbm/indexResult/getIndexResult', params);
};
// 获取所有指标目录
export const getAllIndexKind = (params: Http.RequestParams) => {
  return $axios.post('/ip/kind/list', params);
};
// 获取所有指标
export const getAllIndex = (params: Http.RequestParams) => {
  return $axios.post('/ip/index/list', params);
};
// 获取任务
export const listPlan = (params: Http.RequestParams) => {
  return $axios.post('/pbm/plan/getPbmPlanListForSche', params);
};
// 获取任务指标
export const getTaskIndexList = (params: Http.RequestParams) => {
  return $axios.post('/pbm/plan/indexInfo', params);
};
// 获取指标完成进度
export const pbmPlanScheindexList = (params: Http.RequestParams) => {
  return $axios.post('/hp/pbmPlanSche/indexList', params);
};
// 获取指标完成进度
export const getIndexProgressList = (params: Http.RequestParams) => {
  return $axios.post('/pbm/planSche/pbmPlanScheList', params);
};
// 业绩计价查询
export const getExamList = (params: Http.RequestParams) => {
  return $axios.post('/pbm/assVal/pbmAssValList', params);
};
// 获取存款账号信息
export const getDepAccount = (params: Http.RequestParams) => {
  return $axios.post('/pbm/dep/list', params);
};
// 获取贷款账号信息
export const getLoanAccount = (params: Http.RequestParams) => {
  return $axios.post('/pbm/loan/list', params);
};
// 原业绩分配信息
export const listByPerfIdAndPerfType = (params: Http.RequestParams) => {
  return $axios.post('/pbm/alloc/listByPerfIdAndPerfType', params);
};
// 认领业绩
export const claimPerfList = (params: Http.RequestParams) => {
  return $axios.post('/pbm/claim/commit', params);
};
