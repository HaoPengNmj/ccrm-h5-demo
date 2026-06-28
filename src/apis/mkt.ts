// 营销接口模块
import $axios from '@/http/axios';

/**
 * 营销团队模块
 */

//团队列表查询
export const listTeam = (params: Http.RequestParams) => {
  return $axios.post('/pmm/team/listTeam', params);
};
//团队指标查询
export const listTeamIndex = (params: Http.RequestParams) => {
  return $axios.post('/pmm/team/listTeamIndex', params);
};
//营销任务选择框
export const getPlanList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/team/getPlanList', params);
};
//营销指标选择框
export const getIndexList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/team/getIndexList', params);
};
//营销指标
export const pmmTaskIndexRank = (params: Http.RequestParams) => {
  return $axios.post('/pmm/teamView/pmmTaskIndexRank', params);
};
//基本信息
export const getTeamInfo = (params: Http.RequestParams) => {
  return $axios.post('/pmm/teamView/getTeamInfo', params);
};
//进度分析
export const listPmmTaskSche = (params: Http.RequestParams) => {
  return $axios.post('/pmm/teamView/listPmmTaskSche', params);
};

/**
 * 营销任务模块(管理人员)
 */

//管理人员-营销任务列表
export const listMktTaskByManger = (params: Http.RequestParams) => {
  return $axios.post('/pmm/task/listByMonitorApp', params);
};
//营销任务-意向反馈
export const saveTaskFb = (params: Http.RequestParams) => {
  return $axios.post('/pmm/taskCustAllocRel/saveTaskFb', params);
};
export const getTaskFb = (params: Http.RequestParams) => {
  return $axios.post('/pmm/taskCustAllocRel/getTaskFb', params);
};
//管理人员-营销任务-基本信息详情
export const getMktTask = (params: Http.RequestParams) => {
  return $axios.post('/pmm/task/get', params);
};
//管理人员-客户转化分析-图表
export const getFunnelData = (params: Http.RequestParams) => {
  return $axios.post('/pmm/taskRsDist/funnelData', params);
};
//管理人员-营销任务-客户转化分析详情
export const histogramData = (params: Http.RequestParams) => {
  return $axios.post('/pmm/taskRsDist/histogramData', params);
};
//管理人员-营销任务-执行排名-转化概况
export const taskRsSummary = (params: Http.RequestParams) => {
  return $axios.post('/pmm/taskRsSum/summary', params);
};
export const taskRsSumGetIndexList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/taskRsSum/getIndexList', params);
};
/**
 * 营销任务模块(营销人员)
 */
//营销人员-营销任务列表
export const listMktTask = (params: Http.RequestParams) => {
  return $axios.post('/pmm/taskCustAllocRel/listTaskCustAllocRel', params);
};
//营销人员-营销任务详情-客户名单
export const queryPmmTaskCustList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/taskCust/queryPmmTaskCustList', params);
};

/**
 * 营销商机模块
 */
//营销商机客户列表
export const listChangeCust = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changeCust/appList', params);
};

//获取搜索框数据权限
export const getDataAuthParam = (params: Http.RequestParams) => {
  return $axios.post('/sys/roleData/getNewDataAuthParam', params);
};
//营销商机分析-商机客户执行情况统计图
export const getChanceAnal = (params: Http.RequestParams) => {
  return $axios.post('/pmm/chanceAnal/board', params);
};
//营销商机详情-商机基本信息
export const getChance = (params: Http.RequestParams) => {
  return $axios.post('/pmm/chance/get', params);
};
export const getChangeCust = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changeCust/get', params);
};

// 获取推荐产品类别
export const getProdBizType = (params: Http.RequestParams) => {
  return $axios.post('/cpm/prod/getProdBizType', params);
};
//营销商机详情-推荐产品信息(零售)
export const getPpmProd = (params: Http.RequestParams) => {
  return $axios.post('/cpm/ppmprod/selectByIds', params);
};
//营销商机详情-推荐产品信息(对公/普惠)
export const getCpmProd = (params: Http.RequestParams) => {
  return $axios.post('/cpm/prod/selectByIds', params);
};
//营销商机保存意向反馈
export const saveChanceFeed = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changeCustIntention/save', params);
};
//营销商机获取意向反馈历史
export const getChanceFeed = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changeCustIntention/get', params);
};
//营销商机新增保存生成ID
export const getChanceFeedId = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changeCustIntention/getChangeCustIntentionId', params);
};

// 获取渠道资源
export const listBannerInfo = (params: Http.RequestParams) => {
  return $axios.post('/content/bannerInfo/list', params);
};
// 营销活动列表
export const listMktActive = (params: Http.RequestParams) => {
  return $axios.post('/dmp-visit/app/crm/homepage/crmActList', params);
};
// 营销活动详情
export const getMktActive = (params: Http.RequestParams) => {
  return $axios.post('/dmp-visit/app/crm/homepage/getCrmAct', params);
};
// 发送短信验证码
export const sendSMS = (params: Http.RequestParams) => {
  return $axios.post('/contentapi/sms/sendSms', params);
};
// 校验短信验证码
export const checkSmsSendCode = (params: Http.RequestParams) => {
  return $axios.post('/contentapi/sms/checkSmsSendCode', params);
};

// 权益查询
export const queryPhy = (params: Http.RequestParams) => {
  return $axios.post('/contentapi/luckMyPrize/queryPhy', params);
};
// 权益领取
export const receivePrize = (params: Http.RequestParams) => {
  return $axios.post('/contentapi/luckMyPrize/receivePrize', params);
};
