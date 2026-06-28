import prodListCom from '@/sub-pages/ccm/custview/inline/hold-prod/components/prod-list.vue';
import creditProd from '@/sub-pages/ccm/custview/inline/hold-prod/components/credit-prod.vue';
import emptyProd from '@/sub-pages/ccm/custview/inline/hold-prod/components/empty-prod.vue';

import { codeTranslate } from '@/hook/code-hook';
import { fmtPercent, fmtThousands } from '@/utils/format';

import {
  getCurrentDepHoldProdList,
  getFixedDepHoldProdList,
  getCreditLineHoldProdList,
  getLoanHoldProdList,
  getDiscountHoldProdList,
  getGuaranteeHoldProdList,
  getBankAcceptHoldProdList,
  getLetterCreditHoldProdList,
  getFinanHoldProdList,
  getEBankHoldProdList,
  getCollectPayHoldProdList,
  getMobileBankHoldProdList,
} from '@/apis/cust';

export const prodTypeList = [
  {
    prodType: '0101',
    prodName: '活期存款',
    isHold: '1',
    isHoldField: 'isHoldCurrentDep',

    apiUrl: getCurrentDepHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: '',
    fields: [
      { label: '账户余额', prop: 'nowBal', formatter: (row: any) => fmtThousands(row.nowBal, 2) },
      { label: '存款年日均', prop: 'depBalAverageY', formatter: (row: any) => fmtThousands(row.depBalAverageY, 2) },
      { label: '开户日期', prop: 'openDate' },
      { label: '账户状态', prop: 'state', formatter: (row: any) => codeTranslate('acctStat', row.state) },
      { label: '账户性质', prop: 'accountNature', formatter: (row: any) => codeTranslate('acctType', row.accountNature) },
    ],
  },
  {
    prodType: '0102',
    prodName: '定期存款',
    isHold: '1',
    isHoldField: 'isHoldFixedDep',

    apiUrl: getFixedDepHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: 'holdProdName', //产品名称
    fields: [
      { label: '余额', prop: 'amount', formatter: (row: any) => fmtThousands(row.amount, 2) },
      { label: '利率', prop: 'rate', formatter: (row: any) => fmtPercent(row.rate) },
      { label: '转存到期日', prop: 'unloadEndDate' },
      { label: '是否自动转存', prop: 'isAutoUnload', formatter: (row: any) => codeTranslate('yesOrNo', row.isAutoUnload) },
      { label: '开户二级机构', prop: 'openSecondOrgName' },
    ],
  },
  {
    prodType: '0201',
    prodName: '授信额度',
    isHold: '1',
    isHoldField: 'isHoldCreditLine',

    apiUrl: getCreditLineHoldProdList,
    comp: shallowRef(creditProd),
    fields: [],
  },
  {
    prodType: '0202',
    prodName: '贷款',
    isHold: '1',
    isHoldField: 'isHoldLoan',

    apiUrl: getLoanHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: '', // 产品名称
    fields: [
      { label: '产品名称', prop: 'marketingProduct' },
      { label: '上日余额', prop: 'lastDayBal', formatter: (row: any) => fmtThousands(row.lastDayBal, 2) },
      { label: '贷款金额', prop: 'loanAmount', formatter: (row: any) => fmtThousands(row.loanAmount, 2) },
      { label: '到期日期', prop: 'loanEndDate' },
      { label: '七级分类', prop: 'levelSevenType', formatter: (row: any) => codeTranslate('sevenClass', row.levelSevenType) },
      { label: '业务条线', prop: 'businessLine', formatter: (row: any) => codeTranslate('ccmLoadBusinessType', row.businessLine) },
    ],
  },
  {
    prodType: '0203',
    prodName: '贴现',
    isHold: '1',
    isHoldField: 'isHoldDiscount',

    apiUrl: getDiscountHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: 'holdProdName',
    fields: [
      { label: '贷款金额', prop: 'loanLine', formatter: (row: any) => fmtThousands(row.loanLine, 2) },
      { label: '贷款余额', prop: 'loanBalance', formatter: (row: any) => fmtThousands(row.loanBalance, 2) },
      { label: '借款日期', prop: 'loanDate' },
      { label: '到期日期', prop: 'endDate' },
    ],
  },
  {
    prodType: '0204',
    prodName: '保函',
    isHold: '1',
    isHoldField: 'isHoldGuarantee',

    apiUrl: getGuaranteeHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: '',
    fields: [
      { label: '保证金金额', prop: 'marginAmount', formatter: (row: any) => fmtThousands(row.marginAmount, 2) },
      { label: '保证金比例', prop: 'marginRatio', formatter: (row: any) => fmtPercent(row.marginRatio) },
      { label: '币种', prop: 'ccy', formatter: (row: any) => codeTranslate('currency', row.ccy) },
      { label: '起始日期', prop: 'contractStartDate' },
      { label: '到期日期', prop: 'contractEndDate' },
    ],
  },
  {
    prodType: '0205',
    prodName: '银承',
    isHold: '1',
    isHoldField: 'isHoldBankAccept',

    apiUrl: getBankAcceptHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: '',
    fields: [
      { label: '银承金额', prop: 'bankAcceptanceAmount', formatter: (row: any) => fmtThousands(row.bankAcceptanceAmount, 2) },
      { label: '出票日', prop: 'ticketingDate' },
      { label: '到期日期', prop: 'maturityDate' },
    ],
  },
  {
    prodType: '0206',
    prodName: '信用证',
    isHold: '1',
    isHoldField: 'isHoldLetterCredit',

    apiUrl: getLetterCreditHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: 'holdProdName', // 贷款产品
    fields: [
      { label: '开证金额', prop: 'lssuingAmount', formatter: (row: any) => fmtThousands(row.lssuingAmount, 2) },
      { label: '借款日期', prop: 'loanDate' },
      { label: '到期日期', prop: 'maturityDate' },
    ],
  },
  {
    prodType: '0301',
    prodName: '理财',
    isHold: '1',
    isHoldField: 'isHoldFinan',

    apiUrl: getFinanHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: 'holdProdName', // 产品名称
    fields: [
      { label: '持有金额', prop: 'holdMon', formatter: (row: any) => fmtThousands(row.holdMon, 2) },
      { label: '持有份额', prop: 'holdNum', formatter: (row: any) => fmtThousands(row.holdNum) },
      { label: '到期日期', prop: 'expireDate' },
    ],
  },
  {
    prodType: '0404',
    prodName: '电子渠道',
    isHold: '1',
    isHoldField: 'isHoldElect',

    apiUrl: getEBankHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: '',
    fields: [
      { label: '渠道类型', prop: 'channelType' },
      { label: '签约机构', prop: 'signOrgName' },
      { label: '签约时间', prop: 'signDate' },
      { label: '当前状态', prop: 'currentStatus', formatter: (row: any) => codeTranslate('stat', row.currentStatus) },
    ],
  },
  {
    prodType: '0403',
    prodName: '代收付业务',
    isHold: '1',
    isHoldField: 'isHoldCollectPay',

    apiUrl: getCollectPayHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: 'prodName',
    fields: [
      { label: '产品种类', prop: 'prodName' },
      { label: '签约时间', prop: 'contactDate' },
      { label: '签约机构', prop: 'contractOrgName' },
    ],
  },
  {
    prodType: '0406',
    prodName: '银企直联',
    isHold: '1',
    isHoldField: 'isHoldEpic',

    // 银企直联无详情
    comp: shallowRef(emptyProd),

    fields: [
      { label: '业务名称', prop: 'tenantName' },
      { label: '签约机构', prop: 'openedService' },
      { label: '签约日期', prop: 'signDate' },
      { label: '签约状态', prop: 'businessStatus' },
    ],
  },
  {
    prodType: '0405',
    prodName: '收单业务',
    isHold: '1',
    isHoldField: 'isHoldAcquir',

    apiUrl: getMobileBankHoldProdList,
    comp: shallowRef(prodListCom),

    titleField: '',
    fields: [
      { label: '商户名称', prop: 'tenantName' },
      { label: '开通业务', prop: 'openedService' },
      { label: '签约日期', prop: 'signDate' },
      { label: '签约状态', prop: 'businessStatus', formatter: (row: any) => codeTranslate('busiStat', row.businessStatus) },
    ],
  },
];
