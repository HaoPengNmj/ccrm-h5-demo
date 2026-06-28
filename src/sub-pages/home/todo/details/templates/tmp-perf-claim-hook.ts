import { codeTranslate } from '@/hook/code-hook';

export const perfCliamData = [
  {
    label: '贷款业绩',
    name: '00001',
    data: [
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'custName',
        label: '客户名称',
      },
      {
        prop: 'loanAcct',
        label: '贷款账号',
      },
      {
        prop: 'loanAcctType',
        label: '贷款账户类型',
        formatter: (row: any) => codeTranslate('pbm_loanAcctType', row.loanAcctType),
      },
      {
        prop: 'loanDate',
        label: '贷款发放日期',
      },
      {
        prop: 'prodType',
        label: '产品类型',
        formatter: (row: any) => codeTranslate('prodNo', row.prodType),
      },
    ],
  },
  {
    label: '存款业绩',
    name: '00002',
    data: [
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'custName',
        label: '客户名称',
      },
      {
        prop: 'depAcct',
        label: '存款账号',
      },
      {
        prop: 'openDate',
        label: '开户日期',
      },
    ],
  },
  {
    label: '代销理财业绩',
    name: '00003',
    data: [
      {
        prop: 'serialNo',
        label: '流水编号',
      },
      {
        prop: 'custName',
        label: '客户姓名',
      },
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'buyAcct',
        label: '购买账号',
      },
      {
        prop: 'firstOrgName',
        label: '账号归属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '账号归属二级支行',
      },
      {
        prop: 'buyDate',
        label: '购买日期',
      },
      {
        prop: 'confDate',
        label: '确认日期',
      },
      {
        prop: 'prodName',
        label: '购买产品',
      },
      {
        prop: 'saleMoney',
        label: '销售额',
      },
      {
        prop: 'termUnit',
        label: '产品期限分类',
      },
    ],
  },
  {
    label: '代销基金业绩',
    name: '00004',
    data: [
      {
        prop: 'serialNo',
        label: '流水编号',
      },
      {
        prop: 'custName',
        label: '客户姓名',
      },
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'buyAcct',
        label: '购买账号',
      },
      {
        prop: 'firstOrgName',
        label: '账号归属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '账号归属二级支行',
      },
      {
        prop: 'buyDate',
        label: '购买日期',
      },
      {
        prop: 'prodName',
        label: '购买产品',
      },
      {
        prop: 'saleMoney',
        label: '销售额',
      },
    ],
  },
  {
    label: '代销贵金属业绩',
    name: '00005',
    data: [
      {
        prop: 'serialNo',
        label: '流水编号',
      },
      {
        prop: 'custName',
        label: '客户姓名',
      },
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'acctNo',
        label: '购买账号',
      },
      {
        prop: 'firstOrgName',
        label: '提货网点归属一级支行',
      },
      {
        prop: 'firstOrgName',
        label: '提货网点',
      },
      {
        prop: 'buyDate',
        label: '购买日期',
      },
      {
        prop: 'prodName',
        label: '购买产品',
      },
      {
        prop: 'prodPrice',
        label: '销售额',
      },
    ],
  },
  {
    label: '代销保险业绩',
    name: '00006',
    data: [
      {
        prop: 'policyNo',
        label: '保单号',
      },
      {
        prop: 'custName',
        label: '客户姓名',
      },
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'acctNo',
        label: '购买账号',
      },
      {
        prop: 'firstOrgName',
        label: '购买账号所属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '购买账号所属二级支行',
      },
      {
        prop: 'buyDate',
        label: '投保日期',
      },
      {
        prop: 'insureStartDate',
        label: '生效日期',
      },
      {
        prop: 'prodName',
        label: '购买产品',
      },
      {
        prop: 'prodPrice',
        label: '销售额',
      },
    ],
  },
  {
    label: '户户通业绩',
    name: '00007',
    data: [
      {
        prop: 'custName',
        label: '客户名称',
      },
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'firstOrgName',
        label: '业绩所属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '业绩所属二级支行',
      },
      {
        prop: 'createDate',
        label: '建档日期',
      },
    ],
  },
  {
    label: '社保卡业绩',
    name: '00008',
    data: [
      {
        prop: 'custName',
        label: '客户姓名',
      },
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'isAdult',
        label: '是否成年',
        formatter: (row: any) => codeTranslate('isAdult', row.isAdult),
      },
      {
        prop: 'sscAcctNo',
        label: '社保卡号',
      },
      {
        prop: 'openFirstOrgName',
        label: '开卡一级支行',
      },
      {
        prop: 'openSecondOrgName',
        label: '开卡二级支行',
      },
      {
        prop: 'cardType',
        label: '发卡类型',
        formatter: (row: any) => codeTranslate('cardProductType', row.cardType),
      },
      {
        prop: 'isElecSsc',
        label: '是否签发电子社保卡',
        formatter: (row: any) => codeTranslate('yesOrNo', row.isElecSsc),
      },
      {
        prop: 'firstOrgName',
        label: '业绩所属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '业绩所属二级支行',
      },

      {
        prop: 'dependUserName',
        label: '业绩归属人',
      },
      {
        prop: 'createDate',
        label: '开卡日期',
      },
    ],
  },
  {
    label: '代收业务业绩',
    name: '00009',
    data: [
      {
        prop: 'holdAcctName',
        label: '扣款户名',
      },
      {
        prop: 'holdAcctNo',
        label: '扣款账号',
      },
      {
        prop: 'signNo',
        label: '业务登记编号',
      },
      {
        prop: 'openFirstOrgName',
        label: '开立编号的一级支行',
      },
      {
        prop: 'openSecondOrgName',
        label: '开立编号的二级支行',
      },
      {
        prop: 'cnlName',
        label: '业务渠道',
      },
      {
        prop: 'propertyPay',
        label: '代收物业费',
      },
      {
        prop: 'waterPay',
        label: '代收水费',
      },
      {
        prop: 'featurPay',
        label: '代收电费',
      },
      {
        prop: 'gasPay',
        label: '代收燃气费',
      },
      {
        prop: 'tvPay',
        label: '代收电视费',
      },
      {
        prop: 'networkPay',
        label: '代收电信费',
      },
      {
        prop: 'awardCount',
        label: '奖励户数',
      },
    ],
  },
  {
    label: '代付业务业绩',
    name: '00010',
    data: [
      {
        prop: 'entrustName',
        label: '代付委托单位/个人',
      },
      {
        prop: 'entrustAcct',
        label: '委托单位/个人开户账号',
      },
      {
        prop: 'paymentMonth',
        label: '代付月份',
      },
      {
        prop: 'firstOrgName',
        label: '业绩归属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '业绩归属二级支行',
      },
      {
        prop: 'dependUserName',
        label: '业绩归属人',
      },
      {
        prop: 'totalNum',
        label: '当月代付总笔数',
      },
      {
        prop: 'totalAmount',
        label: '当月代付总金额',
      },
      {
        prop: 'firstSignDate',
        label: '第一次签约日期',
      },
      {
        prop: 'chargeFlag',
        label: '手续费收取标识',
        formatter: (row: any) => codeTranslate('yesOrNo', row.chargeFlag),
      },
      {
        prop: 'awardMonth',
        label: '奖励月份',
      },
      {
        prop: 'awardCount',
        label: '奖励笔数',
      },
    ],
  },
  {
    label: '短信签约业绩',
    name: '00011',
    data: [
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'custName',
        label: '客户姓名',
      },
      {
        prop: 'phone',
        label: '手机号码',
      },
      {
        prop: 'businessType',
        label: '业务类别',
      },
      {
        prop: 'signAcct',
        label: '签约账号',
      },
      {
        prop: 'signStatus',
        label: '签约状态',
      },
      {
        prop: 'firstOrgName',
        label: '业绩归属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '业绩归属二级支行',
      },
      {
        prop: 'signDate',
        label: '签约日期',
      },
    ],
  },
  {
    label: '手机银行业绩',
    name: '00012',
    data: [
      {
        prop: 'custName',
        label: '客户姓名',
      },
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'phone',
        label: '手机号码',
      },
      {
        prop: 'firstOrgName',
        label: '业绩所属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '业绩所属二级支行',
      },
      {
        prop: 'signDate',
        label: '签约日期',
      },
      {
        prop: 'signStatus',
        label: '签约状态',
      },
    ],
  },
  {
    label: '个人网银业绩',
    name: '00013',
    data: [
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'custName',
        label: '客户姓名',
      },
      {
        prop: 'firstOrgName',
        label: '业绩归属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '业绩归属二级支行',
      },
      {
        prop: 'signDate',
        label: '签约日期',
      },
      {
        prop: 'signStatus',
        label: '签约状态',
      },
    ],
  },
  {
    label: '企业网银业绩',
    name: '00014',
    data: [
      {
        prop: 'custName',
        label: '客户名称',
      },
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'firstOrgName',
        label: '业绩归属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '业绩归属二级支行',
      },
      {
        prop: 'signDate',
        label: '签约日期',
      },
      {
        prop: 'signStatus',
        label: '签约状态',
      },
    ],
  },
  {
    label: 'POS收单业绩',
    name: '00015',
    data: [
      {
        prop: 'merchantName',
        label: '商户名称',
      },
      {
        prop: 'merchantId',
        label: '商户编号',
      },
      {
        prop: 'businessNo',
        label: '业务编号',
      },
      {
        prop: 'acqmrchOrgName',
        label: '收单一级支行',
      },
      {
        prop: 'expandPoitOrgName',
        label: '收单网点',
      },
      {
        prop: 'expandPoitOrgName',
        label: '拓展网点',
      },
      {
        prop: 'perfOrgName',
        label: '业绩归属机构',
      },
      {
        prop: 'merchantSignDate',
        label: '商户建立日期',
      },
      {
        prop: 'signDate',
        label: '业务添加日期/签约日期',
      },
      {
        prop: 'merchantStatus',
        label: '商户状态',
        formatter: (row: any) => codeTranslate('merch_stat', row.merchantStatus),
      },
      {
        prop: 'openedService',
        label: '开通业务',
      },
      {
        prop: 'businessAppName',
        label: '行业应用名称',
      },
    ],
  },
  {
    label: '悦农e付收银台业绩',
    name: '00016',
    data: [
      {
        prop: 'merchantName',
        label: '商户名称',
      },
      {
        prop: 'merchantId',
        label: '商户编号',
      },
      {
        prop: 'businessNo',
        label: '业务编号',
      },
      {
        prop: 'acqmrchFirstOrgName',
        label: '收单一级支行',
      },
      {
        prop: 'acqmrchOrgName',
        label: '收单网点',
      },
      {
        prop: 'expandPoitOrgName',
        label: '拓展网点',
      },
      {
        prop: 'perfOrgName',
        label: '业绩归属机构',
      },
      {
        prop: 'merchantSignDate',
        label: '商户建立日期',
      },
      {
        prop: 'signDate',
        label: '业务添加日期/签约日期',
      },
      {
        prop: 'merchantStatus',
        label: '商户状态',
        formatter: (row: any) => codeTranslate('merch_stat', row.merchantStatus),
      },
      {
        prop: 'openedService',
        label: '开通业务',
      },
      {
        prop: 'businessAppName',
        label: '行业应用名称',
      },
    ],
  },
  {
    label: '移动缴费业绩',
    name: '00017',
    data: [
      {
        prop: 'merchantName',
        label: '商户名称',
      },
      {
        prop: 'merchantId',
        label: '商户编号',
      },
      {
        prop: 'businessNo',
        label: '业务编号',
      },
      {
        prop: 'acqmrchFirstOrgName',
        label: '收单一级支行',
      },
      {
        prop: 'acqmrchOrgName',
        label: '收单网点',
      },
      {
        prop: 'expandPoitOrgName',
        label: '拓展网点',
      },
      {
        prop: 'perfOrgName',
        label: '业绩归属机构',
      },
      {
        prop: 'merchantSignDate',
        label: '商户建立日期',
      },
      {
        prop: 'signDate',
        label: '业务添加日期/签约日期',
      },
      {
        prop: 'merchantStatus',
        label: '商户状态',
        formatter: (row: any) => codeTranslate('merch_stat', row.merchantStatus),
      },
      {
        prop: 'openedService',
        label: '开通业务',
      },
      {
        prop: 'businessAppName',
        label: '行业应用名称',
      },
    ],
  },
  {
    label: '线上收银台业绩',
    name: '00018',
    data: [
      {
        prop: 'merchantName',
        label: '商户名称',
      },
      {
        prop: 'merchantId',
        label: '商户编号',
      },
      {
        prop: 'businessNo',
        label: '业务编号',
      },
      {
        prop: 'acqmrchFirstOrgName',
        label: '收单一级支行',
      },
      {
        prop: 'acqmrchOrgName',
        label: '收单网点',
      },
      {
        prop: 'expandPoitOrgName',
        label: '拓展网点',
      },
      {
        prop: 'perfOrgName',
        label: '业绩归属机构',
      },
      {
        prop: 'merchantSignDate',
        label: '商户建立日期',
      },
      {
        prop: 'signDate',
        label: '业务添加日期/签约日期',
      },
      {
        prop: 'merchantStatus',
        label: '商户状态',
        formatter: (row: any) => codeTranslate('merch_stat', row.merchantStatus),
      },
      {
        prop: 'openedService',
        label: '开通业务',
      },
      {
        prop: 'businessAppName',
        label: '行业应用名称',
      },
    ],
  },
  {
    label: '第三方支付绑卡业绩',
    name: '00019',
    data: [
      {
        prop: 'custName',
        label: '客户姓名',
      },
      {
        prop: 'custId',
        label: '客户号',
      },
      {
        prop: 'cardno',
        label: '卡号',
      },
      {
        prop: 'firstOrgName',
        label: '业绩归属一级支行',
      },
      {
        prop: 'secondOrgName',
        label: '业绩归属二级支行',
      },
      {
        prop: 'expandUserId',
        label: '拓展人工号',
      },
      {
        prop: 'expandUserName',
        label: '拓展人姓名',
      },
      {
        prop: 'signDate',
        label: '签约日期',
      },
      {
        prop: 'signStatus',
        label: '签约状态',
      },
    ],
  },
  {
    label: '悦农e薪',
    name: '00020',
    data: [
      {
        prop: 'custNo',
        label: '客户号',
      },
      {
        prop: 'companyName',
        label: '企业名称',
      },
      {
        prop: 'companyId',
        label: '签约账号',
      },
      {
        prop: 'acqmrchFirstOrgName',
        label: '拓展一级支行',
      },
      {
        prop: 'acqmrchSecondOrgName',
        label: '拓展二级支行',
      },
      {
        prop: 'secondOrgName',
        label: '业绩归属机构',
      },
      {
        prop: 'signDate',
        label: '签约日期',
      },
    ],
  },
];
