import $axios from '@/http/axios';

// 客户概况-客户分布
export const devMigrate = (params: Http.RequestParams) => {
  return $axios.post('/hp/devMigrate/list', params);
};
// 客户概况-变化趋势
export const devMigrateHis = (params: Http.RequestParams) => {
  return $axios.post('/hp/devMigrateHis/list', params);
};
// 资产概况-按AUM分类
export const custAssetBrok = (params: Http.RequestParams) => {
  return $axios.post('/hp/custAssetBrok/list', params);
};
// 资产概况-AUM变化趋势（余额、年日均、月日均）
export const custAum = (params: Http.RequestParams) => {
  return $axios.post('hp/custAum/list', params);
};
// 贷款概况
export const custLoanBrok = (params: Http.RequestParams) => {
  return $axios.post('/hp/custLoanBrok/list', params);
};

/********************************* 零售 *********************************/

// 零售客户列表
export const pcmListCust = (params: Http.RequestParams) => {
  return $axios.post('/pcm/cust/getCustSimple', params);
};
export const pcmListCustForApp = (params: Http.RequestParams) => {
  return $axios.post('/pcm/cust/getCustSimpleForApp', params);
};
export const pcmListCustFocus = (params: Http.RequestParams) => {
  return $axios.post('/pcm/custFocusOn/queryMyFocusCust', params);
};
export const pcmListCustOwn = (params: Http.RequestParams) => {
  return $axios.post('/pcm/cust/listCustOwn', params);
};
export const listMyPotentialCust = (params: Http.RequestParams) => {
  return $axios.post('/pcm/potentialCust/cgmmPotentialCustList', params);
};

// -------------零售客户视图------------------
// 获取KYC信息
export const getPcmKyc = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycBase/get', params);
};
// 保存KYC信息
export const updatePcmKyc = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycBase/update', params);
};
// 客户联系信息查询
export const kycContactList = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycContact/list', params);
};
// 客户联系信息新增
export const kycContactSave = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycContact/save', params);
};
// 客户联系信息修改
export const kycContactUpdate = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycContact/update', params);
};
// 客户联系信息删除
export const kycContactDel = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycContact/delete', params);
};
// 客户联系信息查看
export const kycContactGet = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycContact/get', params);
};
// 客户联系地址查询
export const kycAddressList = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycAddress/list', params);
};
// 客户联系地址新增
export const kycAddressSave = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycAddress/save', params);
};
// 客户联系地址修改
export const kycAddressUpdate = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycAddress/update', params);
};
// 客户联系地址删除
export const kycAddressDel = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycAddress/delete', params);
};
// 客户联系地址查看
export const kycAddressGet = (params: Http.RequestParams) => {
  return $axios.post('/pcm/kycAddress/get', params);
};
// 获取标注定位
export const getMark = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/getMark', params);
};
// 设置标注定位
export const pcCustMark = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/pcCustMark', params);
};
export const delCustMark = (params: Http.RequestParams) => {
  return $axios.post('/cgmm/custMark/delete', params);
};

// 判断可见权限
export const authRoleIsViewFunc = (params: Http.RequestParams) => {
  return $axios.post('pcm/cust/isViewFunc', { ...params });
};
// 基本信息
export const getPerCustBaseInfo = (params: Http.RequestParams) => {
  return $axios.post('/pcm/cust/getCustViewBasicInfo', params);
};
// 设置关注客户
export const setFocusCust = (params: Http.RequestParams) => {
  return $axios.post('/pcm/custFocusOn/focus', params);
};
// 设置关注客户
export const cancleFocusCust = (params: Http.RequestParams) => {
  return $axios.post('/pcm/custFocusOn/unFocus', params);
};
// 获取客户关注信息
export const getCustFocusInfo = (params: Http.RequestParams) => {
  return $axios.post('/pcm/custFocusOn/isFocus', params);
};
// 获取客户标签
export const getCustTagInfo = (params: Http.RequestParams) => {
  return $axios.post('/pcm/tagOut/getTagNameByCustId', params);
};
// 获取自定义客户标签
export const getDiyCustTagInfo = (params: Http.RequestParams) => {
  return $axios.post('/pcm/tagHand/getTagNameByCustId', params);
};
// 获取条数
export const getCustViewCount = (params: Http.RequestParams) => {
  return $axios.post('/pcm/cust/getCustViewCount', params);
};
// 获取存款资产结构
export const getAssetStruct = (params: Http.RequestParams) => {
  return $axios.post('/pcm/alStruct/getAssetStruct', params);
};
// 获取资产变动
export const getmAlTrendChart = (params: Http.RequestParams) => {
  return $axios.post('/pcm/alTrend/getPcmAlTrendChart', params);
};
// 获取授信额度
export const getCreditInfo = (params: Http.RequestParams) => {
  return $axios.post('/pcm/alStruct/getCreditInfoByCustId', params);
};
// 获取贷款资产结构
export const getDebtStruct = (params: Http.RequestParams) => {
  return $axios.post('/pcm/alStruct/getDebtStruct', params);
};
// 获取关系图谱
export const listPcmRelate = (params: Http.RequestParams) => {
  return $axios.post('/pcm/relate/list', params);
};
// 获取联系人信息（存量）
export const getPerContactsList = (params: Http.RequestParams) => {
  return $axios.post('/pcm/contact/list', params);
};
// 获取联系人信息（潜客）
export const getPotentialCust = (params: Http.RequestParams) => {
  return $axios.get('/pcm/potentialCust/get', params);
};
// 电访列表查询
export const getTouchTelList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/touchTel/listForView', params);
};
// 面访列表查询
export const getTouchFaceList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/touchFace/list', params);
};
// 电访保存
export const saveTouchTel = (params: Http.RequestParams) => {
  return $axios.post('/pmm/touchTel/save', params);
};
// 获取电访详情
export const getTouchTel = (params: Http.RequestParams) => {
  return $axios.post('/pmm/touchTel/get', params);
};
// 面访保存
export const saveTouchFace = (params: Http.RequestParams) => {
  return $axios.post('/pmm/touchFace/save', params);
};
// 获取面访详情
export const getTouchFace = (params: Http.RequestParams) => {
  return $axios.post('/pmm/touchFace/get', params);
};
// 客户限额查询
export const listCustLimit = (params: Http.RequestParams) => {
  return $axios.post('/pcm/custLimit/list', params);
};

/********************************* 公司 *********************************/

// 公司客户列表
export const ccmListCust = (params: Http.RequestParams) => {
  return $axios.post('/ccm/cust/listCustMgr', params);
};
export const listMyEpqcust = (params: Http.RequestParams) => {
  return $axios.post('/ccm/epqcust/cgmmEpqcustList', params);
};
export const ccmListCustFocus = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custFocusOn/list', params);
};
export const ccmSimpleCustList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/cust/list', params);
};
export const ccmSimpleCustListForApp = (params: Http.RequestParams) => {
  return $axios.post('/ccm/cust/listForApp', params);
};
// -------------公司客户视图------------------
// 判断公司客户视图-访问权限
export const authRoleComIsViewFunc = (params: Http.RequestParams) => {
  return $axios.post('/ccm/cust/isViewFunc', params);
};
// 获取客户基础信息
export const getCustBaseInfo = (params: Http.RequestParams) => {
  return $axios.get('/ccm/custView/baseInfo/getCust', params);
};
// 获取KYC信息
export const getCcmKyc = (params: Http.RequestParams) => {
  return $axios.post('/ccm/kycBase/get', params);
};
// 保存KYC信息
export const updateCcmKyc = (params: Http.RequestParams) => {
  return $axios.post('/ccm/kycBase/update', params);
};
// 关注/取关客户
export const focusOrCancleCust = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/baseInfo/isFocusOnCust', params);
};
// 获取客户系统标签
export const getCustTags = (params: Http.RequestParams) => {
  return $axios.post('/ccm/tagOut/getTagNameByCustId', params);
};
// 获取提醒跟营销任务条数
export const getCustReminAndMarketCount = (params: Http.RequestParams) => {
  return $axios.post('/pcm/cust/getCustViewCount', params);
};
// -------------公司客户视图基本信息------------------
// 获取客户核心信息
export const getCustCoreInfo = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/baseInfo/getBasics', params);
};
// 获取客户管户信息
export const getCustManageInfo = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/baseInfo/getBasics4Main', params);
};
// 获取客户授权信息
export const getCustAuthorizeInfo = (params: Http.RequestParams) => {
  return $axios.post('/ccm/relAuthApply/getRelAuthApplyMxByCustId4View', params);
};
// 获取联系人信息（存量）
export const getContactsList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/baseInfo/listContacts', params);
};
// 获取联系人信息（潜客）
export const getEpqContactsList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/epqcustContacts/list', params);
};
// 删除联系人信息
export const deleteContactsList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/baseInfo/deleteContacts', params);
};
// 保存联系人信息
export const saveContactList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/baseInfo/saveContacts', params);
};
// 修改联系人信息
export const updateContactList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/baseInfo/updateContacts', params);
};

// -------------公司客户视图合作信息------------------
// 获取价值信息
export const getValueInfoList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/cooperation/getValueInformat', params);
};
// 获取客户等级升降趋势
export const getCustLevelTrend = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/cooperation/getCustLift', params);
};
// 获取存款状况
export const getDepTrendList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/cooperation/listDepTrend', params);
};
// 获取贷款变化趋势
export const getLoanTrendList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/cooperation/listLoanInformationTrend', params);
};
// 获取中收变化趋势
export const getMidIncomeTrendList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/cooperation/listMidIncomeTrend', params);
};
// 获取中收结构
export const getMidIncomeStructureList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/cooperation/listMidIncomeChart', params);
};
// -------------公司客户视图持有产品------------------
// 获取持有产品信息
export const getHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/getHoldProd', params);
};
// 获取持有活期存款
export const getCurrentDepHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listCurrentDep', params);
};
// 获取持有定期存款
export const getFixedDepHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listFixedDep', params);
};
// 获取持有公司授信额度
export const getCreditLineHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listCpnCreditLine', params);
};
// 获取持有公司普惠授信额度
export const getInclusiveCreditLineHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listIncCreditLine', params);
};
// 获取持有贷款
export const getLoanHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listHoldLoan', params);
};
// 获取持有贴现
export const getDiscountHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listHoldDiscount', params);
};
// 获取持有保函
export const getGuaranteeHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listHoldGuarantee', params);
};
// 获取持有银承
export const getBankAcceptHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listBankAcceptance', params);
};
// 获取持有信用证
export const getLetterCreditHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listLetterOfCredit', params);
};
// 获取持有理财
export const getFinanHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listHoldFinan', params);
};
// 获取持有电子渠道
export const getEBankHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listHoldElect', params);
};
// 获取持有代收付业务
export const getCollectPayHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listCollectionPayment', params);
};
// 获取持有收单业务
export const getMobileBankHoldProdList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/holdProd/listHoldAcquir', params);
};
// -------------公司客户视图资金关系------------------
// 获取流水信息
export const getFlowDataList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/funds/getTurnover', params);
};
// 获取流水信息
export const getFlowLineChartList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/funds/getLine', params);
};
// 获取资金流入列表
export const getInComeFinancialList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/funds/listGrandTotalIn', params);
};
// 获取资金流出列表
export const getOutFinancialList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/funds/listGrandTotalOut', params);
};
// 获取前十大交易对手统计数据
export const getTradeRivalList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/funds/getTradeRival', params);
};
//  获取流入交易对手信息
export const getInTradeRivalList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/funds/getTradeRivalInAll', params);
};
// 获取流出交易对手信息
export const getOutTradeRivalList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/funds/getTradeRivalOutAll', params);
};
// -------------公司客户视图关系图谱------------------

// 获取关系图谱信息
export const listCcmRelate = (params: Http.RequestParams) => {
  return $axios.post('/ccm/relate/list', params);
};

// -------------公司客户视图营销视图------------------
// 获取产品推荐信息
export const getRecommendProdList = (params: Http.RequestParams) => {
  return $axios.post('ccm/prodRec/list', params);
};
// 获取营销活动信息
export const getMarketActiveList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/task/listByMonitorApp', params);
};
// 获取事件提醒信息
export const getRemindList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/remindTotal/queryRemindList', params);
};
// 获取商机信息
export const getBusinessClueList = (params: Http.RequestParams) => {
  return $axios.post('/pmm/changeCust/list', params);
};

// -------------公司客户视图服务信息------------------
// 获取电访记录
export const getTelServiceList = (params: Http.RequestParams) => {
  return $axios.post('/cmm/exeReg/list', params);
};
// 获取面访
export const getFaceServiceList = (params: Http.RequestParams) => {
  return $axios.post('/cmm/exeReg/list', params);
};
// 电访保存
export const saveTelRegister = (params: Http.RequestParams) => {
  return $axios.post('/cmm/exeReg/save', params);
};
// 面访保存
export const saveFaceRegister = (params: Http.RequestParams) => {
  return $axios.post('/cmm/exeReg/save', params);
};
// 获取面访详情
export const getFaceRegisterDetail = (params: Http.RequestParams) => {
  return $axios.post('/cmm/exeReg/get', params);
};
// 获取电访详情
export const getTelRegisterDetail = (params: Http.RequestParams) => {
  return $axios.post('/cmm/exeReg/get', params);
};

// -------------公司客户视图风险信息------------------
// 获取风险信息
export const getRiskInfoList = (params: Http.RequestParams) => {
  return $axios.post('/ccm/custView/app/getCcmRiskInfo', params);
};
// 获取黑名单信息
export const getBlackInfoList = (params: Http.RequestParams) => {
  return $axios.post('ccm/custView/app/getCcmRiskBlackList', params);
};

//-------------行外视图基本信息------------------
//对公视图-外部数据-获取客户基本信息/客户特征信息
export const CustBaseTwInfo = (params: Http.RequestParams) => {
  return $axios.post('/tw/custInfo/get', params);
};
//对公视图-外部数据-广东省佛山市地址树
export const addressGbTreeList = (params: Http.RequestParams) => {
  return $axios.post('/tw/addressGb/addressGbTree', {});
};
//对公视图-外部数据-所属国标行业
export const industryTree = (params: Http.RequestParams) => {
  return $axios.post('/tw/industryGb/industryTree', {});
};
//-------------行外视图外部客户查询------------------
//对公视图-外部数据-行外视图外部客户查询
export const CustBaseTwInfoList = (params: Http.RequestParams) => {
  return $axios.post('/tw/custInfo/list', params);
};

//-------------行外视图股东信息/主要人员------------------
//客户视图-外部数据-股东信息查询和分页
export const ShareholderInfo = (params: Http.RequestParams) => {
  return $axios.post('/tw/shareholderInfo/list', params);
};
//客户视图-外部数据-企业高管(主要人员)信息查询和分页
export const SeniorManagement = (params: Http.RequestParams) => {
  return $axios.post('/tw/seniorManagement/list', params);
};

//-------------行外视图经营信息------------------
//对公视图-外部数据-经营信息列表查询
export const BusiInfoInfo = (params: Http.RequestParams) => {
  return $axios.post('/tw/busiInfo/list', params);
};

//-------------行外视图企业资质信息------------------
//对公视图-外部数据-企业资质信息
export const EnterQualifyInfo = (params: Http.RequestParams) => {
  return $axios.post('/tw/enterQualify/get', params);
};

//-------------行外视图经营风险------------------
//对公视图-外部数据-经营风险-经营异常列入
export const AbnormalInInfo = (params: Http.RequestParams) => {
  return $axios.post('/tw/abnormalIn/list', params);
};
//对公视图-外部数据-经营风险-经营异常移出
export const AbnormalOutInfo = (params: Http.RequestParams) => {
  return $axios.post('/tw/abnormalOut/list', params);
};
//对公视图-外部数据-经营风险-行政处罚
export const riskAdminPunishInfo = (params: Http.RequestParams) => {
  return $axios.post('/tw/riskAdminPunish/list', params);
};
//对公视图-外部数据-经营风险-行政处罚详情页
export const getAbnormalOutList = (params: Http.RequestParams) => {
  return $axios.post('/tw/riskAdminPunish/get', params);
};
//对公视图-外部数据-经营风险-严重违法-列入
export const seriousIlleInList = (params: Http.RequestParams) => {
  return $axios.post('/tw/seriousIlleIn/list', params);
};
//对公视图-外部数据-经营风险-严重违法-移出
export const seriousIlleOutList = (params: Http.RequestParams) => {
  return $axios.post('/tw/seriousIlleOut/list', params);
};
//对公视图-外部数据-经营风险-欠税信息
export const riskOwnTaxList = (params: Http.RequestParams) => {
  return $axios.post('/tw/riskOwnTax/list', params);
};
//对公视图-外部数据-经营风险-欠税信息详情页
export const getRiskOwnTaxList = (params: Http.RequestParams) => {
  return $axios.post('/tw/riskOwnTax/get', params);
};
//对公视图-外部数据-经营风险-税收违法
export const taxPunishList = (params: Http.RequestParams) => {
  return $axios.post('/tw/taxPunish/list', params);
};
//对公视图-外部数据-经营风险-税收违法详情页
export const getTaxPunishList = (params: Http.RequestParams) => {
  return $axios.post('/tw/taxPunish/get', params);
};
//对公视图-外部数据-经营风险-环保处罚
export const environPunishList = (params: Http.RequestParams) => {
  return $axios.post('/tw/environPunish/list', params);
};
//对公视图-外部数据-经营风险-环保处罚详情页
export const getEnvironPunishList = (params: Http.RequestParams) => {
  return $axios.post('/tw/environPunish/get', params);
};

//-------------行外视图法律诉讼------------------
//对公视图-外部数据-法律诉讼-法院公告
export const courtDeclaredList = (params: Http.RequestParams) => {
  return $axios.post('/tw/courtDeclared/list', params);
};
//对公视图-外部数据-法律诉讼-法院公告详情
export const getCourtDeclaredList = (params: Http.RequestParams) => {
  return $axios.post('/tw/courtDeclared/get', params);
};
//对公视图-外部数据-法律诉讼-立案信息
export const filingInfoList = (params: Http.RequestParams) => {
  return $axios.post('/tw/filingInfo/list', params);
};
//对公视图-外部数据-法律诉讼-立案信息详情
export const getFilingInfoList = (params: Http.RequestParams) => {
  return $axios.post('/tw/filingInfo/get', params);
};
//对公视图-外部数据-法律诉讼-开庭公告
export const courtBulletinList = (params: Http.RequestParams) => {
  return $axios.post('/tw/courtBulletin/list', params);
};
//对公视图-外部数据-法律诉讼-开庭公告详情
export const getCourtBulletin = (params: Http.RequestParams) => {
  return $axios.post('/tw/courtBulletin/get', params);
};
//对公视图-外部数据-法律诉讼-裁判文书
export const riskLawsuitList = (params: Http.RequestParams) => {
  return $axios.post('/tw/riskLawsuit/list', params);
};
//对公视图-外部数据-法律诉讼-裁判文书详情
export const getRiskLawsuitList = (params: Http.RequestParams) => {
  return $axios.post('/tw/riskLawsuit/get', params);
};
//对公视图-外部数据-法律诉讼-被执行企业
export const executionList = (params: Http.RequestParams) => {
  return $axios.post('/tw/execution/list', params);
};
//对公视图-外部数据-法律诉讼-被执行企业详情
export const getExecutionList = (params: Http.RequestParams) => {
  return $axios.post('/tw/execution/get', params);
};
//对公视图-外部数据-法律诉讼-失信被执行企业
export const execillegalList = (params: Http.RequestParams) => {
  return $axios.post('/tw/execillegal/list', params);
};
//对公视图-外部数据-法律诉讼-失信被执行企业详情
export const getExecillegalList = (params: Http.RequestParams) => {
  return $axios.post('/tw/execillegal/get', params);
};
//对公视图-外部数据-法律诉讼-限制高消费
export const limitHighConsumList = (params: Http.RequestParams) => {
  return $axios.post('/tw/limitHighConsum/list', params);
};
//对公视图-外部数据-法律诉讼-限制高消费详情
export const getLimitHighConsumList = (params: Http.RequestParams) => {
  return $axios.post('/tw/limitHighConsum/get', params);
};
//对公视图-外部数据-法律诉讼-终本信息
export const finalInfoList = (params: Http.RequestParams) => {
  return $axios.post('/tw/finalInfo/list', params);
};
//对公视图-外部数据-法律诉讼-终本信息详情
export const getFinalInfoList = (params: Http.RequestParams) => {
  return $axios.post('/tw/finalInfo/get', params);
};
//对公视图-外部数据-法律诉讼-司法拍卖
export const judicialAuctionList = (params: Http.RequestParams) => {
  return $axios.post('/tw/judicialAuction/list', params);
};
//对公视图-外部数据-法律诉讼-司法拍卖详情
export const getJudicialAuction = (params: Http.RequestParams) => {
  return $axios.post('/tw/judicialAuction/get', params);
};
//对公视图-外部数据-法律诉讼-财产保全
export const properiyPreservationList = (params: Http.RequestParams) => {
  return $axios.post('/tw/properiyPreservation/list', params);
};
//对公视图-外部数据-法律诉讼-财产保全详情
export const getProperiyPreservation = (params: Http.RequestParams) => {
  return $axios.post('/tw/properiyPreservation/get', params);
};
