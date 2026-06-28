// 首页接口模块
import $axios from '@/http/axios';
/**
 * 激励语
 */
export const getSysConfig = (params: Http.RequestParams) => {
  return $axios.post('/sys/config/get', params);
};
// 营销任务执行次数统计
export const touchNumAdd = (params: Http.RequestParams) => {
  return $axios.post('/pmm/taskCustAllocRel/touchNumAdd', params);
};

/**
 * 实时提醒
 */
// 获取实时提醒
export const queryAppRealTimeRemindList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/remindTotal/queryAppRealTimeRemindList', params);
};
// 获取准实时提醒
export const queryAppCurrentRemindList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/remindTotal/queryAppCurrentRemindList', params);
};
/**
 * 自定义工作台
 */
// 获取工作台提醒数
export const getWorkNoticeNumList = (params: Http.RequestParams) => {
  return $axios.post('/hp/myWork/listForApp', params);
};
// 保存配置首页应用
export const saveHomeWorkMenuList = (params: Http.RequestParams) => {
  return $axios.post('/sys/shortMenuConfig/save', params);
};
// 保存配置首页应用
export const deleteHomeWorkMenuList = (params: Http.RequestParams) => {
  return $axios.post('/sys/shortMenuConfig/deleteByShortMenuIds', params);
};
/**
 * 自定义首页应用
 */
// 查询已配置工作台
export const getHomeShortMenuList = (params: Http.RequestParams) => {
  return $axios.post('/sys/shortMenuConfig/myListForApp', params);
};
// 查询已配置首页应用--
export const getShortMenuList = (params: Http.RequestParams) => {
  return $axios.post('/sys/shortMenuConfig/queryConfigMenuApp', params);
};
// 查询所有首页应用
export const getAllHomeShortMenuList = (params: Http.RequestParams) => {
  return $axios.post('/sys/shortMenuRoleAuth/hpList', params);
};
// 保存配置首页应用
export const saveHomeShortMenuList = (params: Http.RequestParams) => {
  return $axios.post('/sys/shortMenuConfig/saveConfigBatch', params);
};
// 获取最近使用首页应用
export const getLastUseHomeShortMenuList = (params: Http.RequestParams) => {
  return $axios.post('/sys/shortMenuLog/queryLastUselist', params);
};
// 保存首页应用访问记录
export const saveShortMenuLog = (params: Http.RequestParams) => {
  return $axios.post('/sys/shortMenuLog/save', params);
};
/**
 * 我的日程
 */
export const getScheduleList = (params: Http.RequestParams) => {
  return $axios.post('wp/schedule/list', params, false);
};
export const scheduleSave = (params: Http.RequestParams) => {
  return $axios.post('/wp/schedule/save', params); //新增日程
};
export const scheduleUpdate = (params: Http.RequestParams) => {
  return $axios.post('/wp/schedule/update', params); //修改日程
};
export const scheduleDelete = (params: Http.RequestParams) => {
  return $axios.post('/wp/schedule/delete', params); //删除日程
};
export const getScheduleDt = (params: Http.RequestParams) => {
  return $axios.post('/wp/schedule/get', params); //查看日程
};
/**
 * 首页热销推荐
 */
//零售存款
export const listHotShow = (params: Http.RequestParams) => {
  return $axios.post('/cpm/ppmprod/listHotShow', params);
};

/**
 * 首页我的业绩业绩计价结果-主界面
 */
export const getAssValList = (params: Http.RequestParams) => {
  return $axios.post('/pbm/assVal/list', params);
};
/**
 * 首页我的业绩--完成情况
 */
export const getPlanScheList = (params: Http.RequestParams) => {
  return $axios.post('/pbm/planSche/mainList', params);
};
/**
 * 首页业绩指标分析
 */
export const getIndexList = (params: Http.RequestParams) => {
  return $axios.post('/hp/indexResult/hpList', params);
};
/**
 * 首页今日日程
 */
export const getTodayList = (params: Http.RequestParams) => {
  return $axios.post('/wp/schedule/getTodayList', params);
};

/**
 * 待办
 */
export const listInstance = (params: Http.RequestParams) => {
  return $axios.post('/wf/instance/list', params); // 我的申请分页查询
};
export const listAppInstance = (params: Http.RequestParams) => {
  return $axios.post('/wf/instance/listApp', params); // 我的审批分页查询
};
export const getInstance = (params: Http.RequestParams) => {
  return $axios.get('/wf/instance/get', params);
};
// 获取业绩信息
export const getClaimInstance = (params: Http.RequestParams) => {
  return $axios.post('/pbm/claim/getInfo', params);
};
// 获取待办步骤
export const listStepInstance = (params: Http.RequestParams) => {
  return $axios.post('wf/instance/listStep', params); // 流程信息
};
// 审批
export const approveInstance = (params: Http.RequestParams) => {
  return $axios.post('wf/instance/approve', params); // 处理审批
};

/**
 * 任务
 */
export const listMyTask = (params: Http.RequestParams) => {
  return $axios.post('pdt/taskExe/myTask', params); // 日常任务分页查询
};
export const getTask = (params: Http.RequestParams) => {
  return $axios.post('pdt/task/get', params); // 日常任务详情
};
export const saveTaskExeFb = (params: Http.RequestParams) => {
  return $axios.post('pdt/taskExeFb/save', params); // 日常任务反馈
};
export const listTaskExeFb = (params: Http.RequestParams) => {
  return $axios.post('pdt/taskExeFb/list', params); // 日常任务反馈历史分页查询
};

/**
 * 公告
 */
export const listNotice = (params: Http.RequestParams) => {
  return $axios.post('/wp/notice/myNotice', params);
};
export const getNotice = (params: Http.RequestParams) => {
  return $axios.post('/wp/notice/get', params);
};
export const readNotice = (params: Http.RequestParams) => {
  return $axios.post('/wp/notice/read', params);
};

/**
 * 我的业绩
 */
export const listPerf = (params: Http.RequestParams) => {
  return $axios.post('/home/perf/list', params);
};

/**
 * 金融计算器
 */
export const getDepcal = (params: Http.RequestParams) => {
  return $axios.post('/sys/calculator/depCal/cal', params); // 存款利息计算器
};
export const getWealthCal = (params: Http.RequestParams) => {
  return $axios.post('/sys/calculator/wealthCal/wealthCal', params); // 理财收益计算器
};
export const getFundApplyCal = (params: Http.RequestParams) => {
  return $axios.post('/sys/calculator/fundApplyCal/fundApplyCal', params); // 基金申购/认购计算器
};
export const getFundRedeemCal = (params: Http.RequestParams) => {
  return $axios.post('/sys/calculator/fundRedeemCal/cal', params); // 基金赎回计算器
};

/**
 * 事件提醒
 */
export const listEventRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/remindTotal/myList', params); // 事件提醒
};
export const listMyNotify = (params: Http.RequestParams) => {
  return $axios.post('/wp/notify/listMyNotify', params); // 其他提醒
};
export const readNotify = (params: Http.RequestParams) => {
  return $axios.post('/wp/notify/read', params); //其他一键阅读
};
export const markAsRead = (params: Http.RequestParams) => {
  return $axios.post('/pmm/remindTotal/markAsRead', params); //事件阅读
};
export const listMyForBigTotal = (params: Http.RequestParams) => {
  return $axios.post('/pmm/remindTotal/myListForBigTotal', params); //事件大类统计数量
};
/**
 * 个人对公事件提醒详情界面
 */
// 资金变动类
export const getInterBankOut = (params: Http.RequestParams) => {
  return $axios.post('/pmm/interBankTranOut/list', params); // 单笔大额资金跨行转出
};
export const getInterBankIn = (params: Http.RequestParams) => {
  return $axios.post('/pmm/interBankTranIn/list', params); // 单笔大额资金跨行转入
};
export const getSingleOut = (params: Http.RequestParams) => {
  return $axios.post('/pmm/singleTranOut/list', params); // 单笔大额资金本行转出
};
export const getSingleIn = (params: Http.RequestParams) => {
  return $axios.post('/pmm/singleTranIn/list', params); // 单笔大额资金本行转入
};
export const changeAmtInRemindList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changeAmtInRemind/list', params); // 客户资产变动 （转入）
};
export const changeAmtOutRemindList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changeAmtOutRemind/list', params); // 客户资产变动 （转出）
};
export const changePropInRemindList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changePropInRemind/list', params); // 资产比重变动（转入）
};
export const changePropOutRemindList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changePropOutRemind/list', params); // 资产比重变动（转出）
};

// 产品到期类
export const getReguDep = (params: Http.RequestParams) => {
  return $axios.post('/pmm/reguDep/list', params); // 定期存款到期
};
export const getChmtpdEnd = (params: Http.RequestParams) => {
  return $axios.post('/pmm/chmtpdEnd/list', params); // 理财产品到期
};
export const getFeaturBigDep = (params: Http.RequestParams) => {
  return $axios.post('/pmm/featurBigDep/list', params); // 大额存单到期
};
export const getLoanRemindPh = (params: Http.RequestParams) => {
  return $axios.post('/pmm/loanRemindPh/list', params); // 贷款到期提醒(普惠)
};
export const getLoanRemindXj = (params: Http.RequestParams) => {
  return $axios.post('/pmm/loanRemindXj/list', params); // 贷款到期提醒(消金)
};
export const getLoanRemindGs = (params: Http.RequestParams) => {
  return $axios.post('/pmm/loanRemindGs/list', params); // 贷款到期提醒(公司)
};
export const unloanRemindList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/unloanRemind/list', params); // 结清未续贷(消费贷)
};

// 客户管理类
export const getCustAllocRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custAllocRemind/list', params); // 客户分配提醒
};
export const getCustApplyRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custApplyRemind/list', params); // 客户认领提醒
};
export const getCustRecycleRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custRecycleRemind/list', params); // 客户回收提醒
};
export const getCustTrustRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custTrustRemind/list', params); // 客户托管提醒
};
export const getCustCallRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custCallRemind/list', params); // 客户移交提醒
};
export const getCustAdjustRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custAdjustRemind/list', params); // 客户归属机构调整提醒
};
export const getCustChangeRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custChangeRemind/list', params); // 客户管户变更提醒
};
export const getCustUnassignRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custUnassignRemind/list', params); // 未分配客户提醒
};

// 客户服务类
export const getBirthRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custBirthRemind/list', params); // 客户生日提醒
};
export const getCustLevelUpRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custLevelUpRemind/list', params); // 客户综合等级升级
};
export const getCustLevelDownRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custLevelDownRemind/list', params); // 客户综合等级降级
};
export const getCustNetLossRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custNetLossRemind/list', params); // 网银客户流失预警
};
export const getLossRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custIntaLossRemind/list', params); // 国际结算流失预警
};
export const custLevelRemindList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/custLevelRemind/list', params); // 客户临界提升提醒
};

// 业务预警类
export const getDepRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/busiDepDrawRemind/list', params); // 定期存款提前支取
};
export const getLoanRemind = (params: Http.RequestParams) => {
  return $axios.post('/pmm/busiLoanClrRemind/list', params); // 贷款提前结清
};
export const listEdm = (params: Http.RequestParams) => {
  return $axios.post('/pmm/remindTotal/listEdm', params); // 代发分红提醒
};
// export const getLoanRemind = (params: Http.RequestParams) => {
//   return $axios.post('/pmm/busiLoanClrRemind/list', params); // 基金盈亏提醒
// };
// export const getDepRemind = (params: Http.RequestParams) => {
//   return $axios.post('/pmm/busiDepDrawRemind/list', params); // 理财业绩不达标预警
// };
// export const getLoanRemind = (params: Http.RequestParams) => {
//   return $axios.post('/pmm/busiLoanClrRemind/list', params); // 商户证件到期提醒
// };
// export const getDepRemind = (params: Http.RequestParams) => {
//   return $axios.post('/pmm/busiDepDrawRemind/list', params); // 商户总店长证件到期提醒
// };
// export const getLoanRemind = (params: Http.RequestParams) => {
//   return $axios.post('/pmm/busiLoanClrRemind/list', params); // 理财到期无续买情况
// };

// 权益预警类
// export const getDepRemind = (params: Http.RequestParams) => {
//   return $axios.post('/pmm/busiDepDrawRemind/list', params); // 单日权益派送预警（在活动监控预警处配置单日上限）
// };
// export const getLoanRemind = (params: Http.RequestParams) => {
//   return $axios.post('/pmm/busiLoanClrRemind/list', params); // 权益总量派送预警（在活动监控预警处配置单日上限）
// };

// 员工签到
export const userSign = (params: Http.RequestParams) => {
  return $axios.post('/pcm/userSign/userSignSave', params); 
};
// 获取员工签到次数
export const getUserSignList = (params: Http.RequestParams) => {
  return $axios.post('/pcm/userSign/list', params); 
};
// 获取签到轨迹
export const getUserSignTrack = (params: Http.RequestParams) => {
  return $axios.post('/pcm/userSign/userSignTrack', params); 
};
// 获取签到记录
export const getUserSignData = (params: Http.RequestParams) => {
  return $axios.post('/pcm/userSign/allSignList1', params); 
};