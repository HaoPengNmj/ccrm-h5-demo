import $axios from '@/http/axios';

// 码值加载
export const getCodeCombo = () => {
  return $axios.post('/sys/cache/listCombo', {}, false);
};
// 码值加载
export const codeInfoList = (params: Http.RequestParams) => {
  return $axios.post('/sys/codeInfo/list4All', params, false);
};

// 机构树选择 - 客户机构
export const listOrg = (params: Http.RequestParams) => {
  return $axios.post('sys/org/list', params, false);
};
// 机构树选择 - 业绩机构
export const listOrgBm = (params: Http.RequestParams) => {
  return $axios.post('/sys/orgBm/list', params, false);
};
// 用户选择
export const listUser = (params: Http.RequestParams) => {
  return $axios.post('/sys/user/list', params, false);
};
// 团队选择
export const listTeam = (params: Http.RequestParams) => {
  return $axios.post('/pmm/team/listTree', params, false);
};
// 产品选择
export const listProdKindTree = (params: Http.RequestParams) => {
  return $axios.post('/cpm/kind/list', params, false);
};
// 计价方案选择
export const listRule = (params: Http.RequestParams) => {
  return $axios.post('/pbm/rule/list', params, false);
};

//获取新增时附件关联的业务ID
export const getFileBizId = () => {
  return $axios.post('/sys/file/getId', {}, false);
};
// 附件列表
export const listFiles = (params: Http.RequestParams) => {
  return $axios.post('/sys/file/listByModuleIdAndBizId', params);
};
// 附件上传
export const doUploadFile = (params: Http.RequestParams, onUploadProgress) => {
  return $axios.upload('/sys/file/uploadFileAndSave', onUploadProgress, params);
};
// 附件删除
export const doDeleteFile = (params: Http.RequestParams) => {
  return $axios.post('/sys/file/delByName', params);
};
// 附件下载
export const doDownloadFile = (params: Http.RequestParams) => {
  return $axios.download('/sys/file/download', params);
};
