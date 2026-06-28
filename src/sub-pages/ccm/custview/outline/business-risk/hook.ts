import bsListCom from '@/sub-pages/ccm/custview/outline/business-risk/components/bs-list.vue';
import { codeTranslate } from '@/hook/code-hook';
import { fmtThousands } from '@/utils/format';

import {
  AbnormalInInfo,
  AbnormalOutInfo,
  riskAdminPunishInfo,
  seriousIlleInList,
  seriousIlleOutList,
  riskOwnTaxList,
  taxPunishList,
  environPunishList,
} from '@/apis/cust';

export const bsList = [
  {
    bsName: '经营异常列入',
    apiUrl: AbnormalInInfo,
    comp: shallowRef(bsListCom),
    fields: [
      { label: '列入原因', prop: 'putReason' },
      { label: '列入日期', prop: 'putDate' },
      { label: '列入做出决定机构', prop: 'putDepartment' },
    ],
  },
  {
    bsName: '经营异常列出',
    apiUrl: AbnormalOutInfo,
    comp: shallowRef(bsListCom),
    fields: [
      { label: '列出原因', prop: 'removeReason' },
      { label: '列出日期', prop: 'removeDate' },
      { label: '列出做出决定机构', prop: 'removeDepartment' },
    ],
  },
  {
    bsName: '行政处罚',
    apiUrl: riskAdminPunishInfo,
    comp: shallowRef(bsListCom),
    dtl: true,
    fields: [
      { label: '决定文书号', prop: 'punishNumber' },
      { label: '违法行为类型', prop: 'illegalType' },
      { label: '决定机关', prop: 'departmentName' },
      { label: '处罚决定日期', prop: 'decisionDate' },
      { label: '公示日期', prop: 'publishDate' },
      { label: '处罚内容', prop: 'content' },
    ],
  },
  {
    bsName: '严重违法列入',
    apiUrl: seriousIlleInList,
    comp: shallowRef(bsListCom),
    fields: [
      { label: '类别', prop: 'punishType' },
      { label: '列入原因', prop: 'putReason' },
      { label: '列入日期', prop: 'putDate' },
      { label: '列入做出决定机关', prop: 'putDepartment' },
    ],
  },
  {
    bsName: '严重违法列出',
    apiUrl: seriousIlleOutList,
    comp: shallowRef(bsListCom),
    fields: [
      { label: '类别', prop: 'punishType' },
      { label: '移出原因', prop: 'removeReason' },
      { label: '移出日期', prop: 'removeDate' },
      { label: '移出做出决定机关', prop: 'removeDepartment' },
    ],
  },
  {
    bsName: '欠税信息',
    apiUrl: riskOwnTaxList,
    comp: shallowRef(bsListCom),
    dtl: true,
    totalMoney: true,

    fields: [
      { label: '发布日期', prop: 'publishDate' },
      { label: '纳税人识别号', prop: 'taxIdNumber' },
      { label: '欠税类别', prop: 'taxCategory' },
      { label: '当前新发生的欠税余额', prop: 'newOwnTaxBalance', formatter: (row: any) => fmtThousands(row.newOwnTaxBalance, 2) },
      { label: '欠税余额', prop: 'ownTaxAmount', formatter: (row: any) => fmtThousands(row.ownTaxAmount, 2) },
      { label: '税务机关', prop: 'department' },
    ],
  },
  {
    bsName: '税收违法',
    apiUrl: taxPunishList,
    comp: shallowRef(bsListCom),
    dtl: true,
    fields: [
      { label: '纳税人识别号', prop: 'taxIdNumber' },
      { label: '案件性质', prop: 'caseNature' },
      { label: '主要违法事实', prop: 'illegalFacts' },
      { label: '税务机关', prop: 'taxAuthority' },
      { label: '注册地址', prop: 'companyAddress' },
      { label: '公布日期', prop: 'publishDate' },
    ],
  },
  {
    bsName: '环保处罚',
    apiUrl: environPunishList,
    comp: shallowRef(bsListCom),
    dtl: true,
    fields: [
      { label: '决定书文号', prop: 'punishNumber' },
      { label: '处罚名称', prop: 'punishName' },
      { label: '处罚事由', prop: 'punishReason' },
      { label: '处罚结果', prop: 'punishResult' },
      { label: '处罚机关', prop: 'departmentName' },
      { label: '处罚方式', prop: 'punishMethod' },
      { label: '处罚金额', prop: 'punishAum', formatter: (row: any) => fmtThousands(row.punishAum, 2) },
      { label: '处罚日期', prop: 'decisionDate' },
    ],
  },
];
