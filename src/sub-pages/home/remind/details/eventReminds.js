/**
 * 事件提醒细类
 * api映射关系js
 */
import {
  getInterBankOut,
  getInterBankIn,
  getSingleOut,
  getSingleIn,
  changeAmtInRemindList,
  changeAmtOutRemindList,
  changePropInRemindList,
  changePropOutRemindList,
  getReguDep,
  getChmtpdEnd,
  getFeaturBigDep,
  getLoanRemindPh,
  getLoanRemindXj,
  getLoanRemindGs,
  unloanRemindList,
  getCustAllocRemind,
  getCustApplyRemind,
  getCustRecycleRemind,
  getCustTrustRemind,
  getCustCallRemind,
  getCustAdjustRemind,
  getCustChangeRemind,
  getCustUnassignRemind,
  getBirthRemind,
  getLossRemind,
  getCustLevelDownRemind,
  getCustLevelUpRemind,
  getCustNetLossRemind,
  getDepRemind,
  getLoanRemind,
  listEdm
} from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';

export default [
  /**
   * 资金变动类
   */
  { type: '1110101', apiUrl: getInterBankOut, title: codeTranslate('eventSmallType', '1110101') }, // 单笔大额资金跨行转出 --- 个人
  { type: '1110102', apiUrl: getInterBankIn, title: codeTranslate('eventSmallType', '1110102') }, // 单笔大额资金跨行转入 --- 个人
  { type: '1110103', apiUrl: getSingleOut, title: codeTranslate('eventSmallType', '1110103') }, // 单笔大额资金本行转出 --- 个人
  { type: '1110104', apiUrl: getSingleIn, title: codeTranslate('eventSmallType', '1110104') }, // 单笔大额资金本行转入 --- 个人
  { type: '1110105', apiUrl: changeAmtInRemindList, title: codeTranslate('eventSmallType', '1110105') }, // 客户资产变动 （转入） --- 个人，公司
  { type: '1110106', apiUrl: changeAmtOutRemindList, title: codeTranslate('eventSmallType', '1110106') }, // 客户资产变动 （转出） --- 个人，公司
  { type: '1110107', apiUrl: changePropInRemindList, title: codeTranslate('eventSmallType', '1110107') }, // 资产比重变动（转入） --- 个人，公司
  { type: '1110108', apiUrl: changePropOutRemindList, title: codeTranslate('eventSmallType', '1110108') }, // 资产比重变动（转出） --- 个人，公司
  /**
   * 产品到期类
   */
  { type: '1110201', apiUrl: getReguDep, title: codeTranslate('eventSmallType', '1110201') }, // 定期存款到期提醒 --- 个人，公司
  { type: '1110202', apiUrl: getChmtpdEnd, title: codeTranslate('eventSmallType', '1110202') }, // 理财产品到期提醒 --- 个人，公司
  { type: '1110203', apiUrl: getFeaturBigDep, title: codeTranslate('eventSmallType', '1110203') }, // 大额存单到期提醒 --- 个人
  { type: '1110204', apiUrl: getLoanRemindPh, title: codeTranslate('eventSmallType', '1110204') }, // 贷款到期提醒（普惠） --- 个人
  { type: '1110205', apiUrl: getLoanRemindXj, title: codeTranslate('eventSmallType', '1110205') }, // 贷款到期提醒（消金） --- 个人
  { type: '1110206', apiUrl: getLoanRemindGs, title: codeTranslate('eventSmallType', '1110206') }, // 贷款到期提醒（公司） --- 公司
  { type: '1110207', apiUrl: unloanRemindList, title: codeTranslate('eventSmallType', '1110207') }, // 结清未续贷(消费贷) --- 个人
  /**
   * 客户管理类
   */
  { type: '1110301', apiUrl: getCustAllocRemind, title: codeTranslate('eventSmallType', '1110301') }, // 客户分配提醒 --- 个人，公司
  { type: '1110302', apiUrl: getCustApplyRemind, title: codeTranslate('eventSmallType', '1110302') }, // 客户认领提醒 --- 个人，公司
  { type: '1110303', apiUrl: getCustRecycleRemind, title: codeTranslate('eventSmallType', '1110303') }, // 客户回收提醒 --- 个人，公司
  { type: '1110304', apiUrl: getCustTrustRemind, title: codeTranslate('eventSmallType', '1110304') }, // 客户托管提醒 --- 个人，公司
  { type: '1110305', apiUrl: getCustCallRemind, title: codeTranslate('eventSmallType', '1110305') }, // 客户移交提醒 --- 个人，公司
  { type: '1110306', apiUrl: getCustAdjustRemind, title: codeTranslate('eventSmallType', '1110306') }, // 客户归属机构调整 --- 个人，公司
  { type: '1110307', apiUrl: getCustChangeRemind, title: codeTranslate('eventSmallType', '1110307') }, // 客户管户变更提醒 --- 个人，公司
  { type: '1110308', apiUrl: getCustUnassignRemind, title: codeTranslate('eventSmallType', '1110308') }, // 未分配客户提醒 --- 个人，公司
  /**
   * 客户服务类
   */
  { type: '1110401', apiUrl: getBirthRemind, title: codeTranslate('eventSmallType', '1110401') }, // 客户生日提醒 --- 个人
  { type: '1110402', apiUrl: getCustLevelUpRemind, title: codeTranslate('eventSmallType', '1110402') }, // 客户综合等级升级提醒 --- 个人，公司
  { type: '1110403', apiUrl: getCustLevelDownRemind, title: codeTranslate('eventSmallType', '1110403') }, // 客户综合等级降级提醒 --- 个人，公司
  { type: '1110404', apiUrl: getCustNetLossRemind, title: codeTranslate('eventSmallType', '1110404') }, // 网银客户流失预警提醒 --- 公司
  { type: '1110405', apiUrl: getLossRemind, title: codeTranslate('eventSmallType', '1110405') }, // 国际结算流失预警 --- 公司
  { type: '1110406', apiUrl: listEdm, title: codeTranslate('eventSmallType', '1110406') }, // 客户临界提升提醒 --- 个人
  /**
   * 业务预警类
   */
  { type: '1110501', apiUrl: getDepRemind, title: codeTranslate('eventSmallType', '1110501') }, // 定期存款提前支取 --- 个人
  { type: '1110502', apiUrl: getLoanRemind, title: codeTranslate('eventSmallType', '1110502') }, // 贷款提前结清 --- 个人
  { type: '1110503', apiUrl: listEdm, title: codeTranslate('eventSmallType', '1110503') }, // 代发分红提醒 --- 个人
  { type: '1110504', apiUrl: listEdm, title: codeTranslate('eventSmallType', '1110504') }, // 基金盈亏提醒 ---
  { type: '1110505', apiUrl: listEdm, title: codeTranslate('eventSmallType', '1110505') }, // 理财业绩不达标预警 --- 个人
  { type: '1110506', apiUrl: listEdm, title: codeTranslate('eventSmallType', '1110506') }, // 商户证件到期提醒 --- 个人，公司
  { type: '1110507', apiUrl: listEdm, title: codeTranslate('eventSmallType', '1110507') }, // 商户总店长证件到期提醒 --- 个人，公司
  { type: '1110508', apiUrl: listEdm, title: codeTranslate('eventSmallType', '1110508') }, // 理财到期无续买情况 --- 个人
  /**
   * 权益预警类
   */
  { type: '1110601', apiUrl: listEdm, title: codeTranslate('eventSmallType', '1110601') }, // 单日权益派送预警（在活动监控预警处配置单日上限） --- 个人
  { type: '1110602', apiUrl: listEdm, title: codeTranslate('eventSmallType', '1110602') }, // 权益总量派送预警（在活动监控预警处配置单日上限） --- 个人
];
