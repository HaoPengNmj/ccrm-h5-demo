// 零售产品
import depositRetail from '@/sub-pages/prod/retail/deposit/item.vue';
import loanRetail from '@/sub-pages/prod/retail/loan/item.vue';
import financeRetail from '@/sub-pages/prod/retail/finance/item.vue';
import fundRetail from '@/sub-pages/prod/retail/fund/item.vue';
import insureRetail from '@/sub-pages/prod/retail/insure/item.vue';
import goldRetail from '@/sub-pages/prod/retail/gold/item.vue';
import cardRetail from '@/sub-pages/prod/retail/card/item.vue';
import otherRetail from '@/sub-pages/prod/retail/other/item.vue';
// 公司产品
import depositCorporation from '@/sub-pages/prod/corporation/deposit/item.vue';
import loanCorporation from '@/sub-pages/prod/corporation/loan/item.vue';
import financeCorporation from '@/sub-pages/prod/corporation/finance/item.vue';
import backletterCorporation from '@/sub-pages/prod/corporation/backletter/item.vue';
import tradeCorporation from '@/sub-pages/prod/corporation/trade/item.vue';
import silverCorporation from '@/sub-pages/prod/corporation/silver/item.vue';
import otherCorporation from '@/sub-pages/prod/corporation/other/item.vue';
// 普惠产品
import depositInclusive from '@/sub-pages/prod/inclusive/loan/item.vue';
import otherInclusive from '@/sub-pages/prod/inclusive/other/item.vue';
import { codeTranslate } from '@/hook/code-hook';
import { convertFontSizeToRem, splitFn } from '@/utils/global';

export const moduleComp = {
  retail: {
    title: '零售产品',
    deposit: {
      title: '存款',
      id: 'deposit',
      comp: shallowRef(depositRetail),
      kindProdType: '9',
      codeCombo: 'ppmDepProdType',
      modeId: 'T_PPM_PROD_DEP_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodType', label: '产品类型', formatter: (val: any) => codeTranslate('ppmDepProdType', val) },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'currency', label: '币种', formatter: (val: any) => codeTranslate('currency', val) },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    loan: {
      title: '贷款',
      id: 'loan',
      comp: shallowRef(loanRetail),
      kindProdType: '10',
      codeCombo: 'ppmLoanProdType',
      modeId: 'T_PPM_PROD_LOAN_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodType', label: '产品类型', formatter: (val: any) => codeTranslate('ppmLoanProdType', val) },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'currency', label: '币种', formatter: (val: any) => codeTranslate('currency', val) },
        {
          props: 'gnteeType',
          label: '担保方式',
          formatter: (val: any) => {
            let ans = splitFn(val);
            return ans.map((e) => codeTranslate('gnteeType', e)).join(',');
          },
        },
        { props: 'prodEndDate', label: '产品到期时间' },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    finance: {
      title: '理财',
      id: 'finance',
      comp: shallowRef(financeRetail),
      kindProdType: '11',
      codeCombo: 'wealthProdType',
      modeId: 'T_PPM_PROD_WEALTH_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'runWay', label: '运作方式', formatter: (val: any) => codeTranslate('runWay', val) },
        { props: 'invest', label: '投资期限' },
        { props: 'perfCompareBase', label: '业绩比较基准' },
        { props: 'subBeginDate', label: '认购起始日期' },
        { props: 'subEndDate', label: '认购结束日期' },
        { props: 'minBuyAmount', label: '个人最低购买金额' },
        { props: 'isProxy', label: '是否代销', formatter: (val: any) => codeTranslate('isProxy', val) },
        { props: 'netAsset', label: '单位净值' },
        { props: 'calAsset', label: '累计净值' },
        { props: 'annualYieldType', label: '年化收益率类型', formatter: (val: any) => codeTranslate('annualYieldType', val) },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    fund: {
      title: '基金',
      id: 'fund',
      comp: shallowRef(fundRetail),
      kindProdType: '12',
      codeCombo: 'ppmFundProdType',
      modeId: 'T_PPM_PROD_FUND_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'fundCode', label: '基金代码' },
        { props: 'collectScale', label: '产品募集规模' },
        { props: 'prodSetDate', label: '产品成立日期' },
        /*         { props: 'maxApplyRate', label: '（最高）申购费率' },
        { props: 'maxRedemRate', label: '（最高）赎回费率' }, */
        { props: 'netAsset', label: '单位净值' },
        { props: 'publicOrg', label: '发行机构' },
        /*         { props: 'calAsset', label: '累计净值' }, */
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    insure: {
      title: '保险',
      id: 'insure',
      comp: shallowRef(insureRetail),
      kindProdType: '13',
      codeCombo: 'ppmInsureProdType',
      modeId: 'T_PPM_PROD_INSURE_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'cooperationOrg', label: '合作机构' },
        { props: 'serviceRate', label: '手续费率' },
        { props: 'insureAge', label: '投保年龄' },
        { props: 'prodEndDate', label: '产品到期时间' },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    gold: {
      title: '贵金属',
      id: 'gold',
      comp: shallowRef(goldRetail),
      kindProdType: '14',
      codeCombo: 'ppmGoldProdType',
      modeId: 'T_PPM_PROD_GOLD_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'cooperationOrg', label: '合作机构' },
        { props: 'serviceRate', label: '手续费率' },
        { props: 'prodEndDate', label: '产品到期时间' },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    card: {
      title: '卡产品',
      id: 'card',
      comp: shallowRef(cardRetail),
      kindProdType: '15',
      codeCombo: 'ppmCardProdType',
      modeId: 'T_PPM_PROD_CARD_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'useCust', label: '使用对象' },
        { props: 'chargeStandard', label: '收费标准' },
        { props: 'optimizeWay', label: '优惠措施' },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    other: {
      title: '其他',
      id: 'other',
      comp: shallowRef(otherRetail),
      kindProdType: '17',
      codeCombo: 'ppmOrtherProdType',
      modeId: 'T_PPM_PROD_ORTHER_IMG',
      showItems: [
        { props: 'prodType', label: '产品类型', formatter: (val: any) => codeTranslate('ppmOrtherProdType', val) },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
  },
  corporation: {
    title: '公司产品',
    deposit: {
      title: '存款',
      id: 'deposit',
      comp: shallowRef(depositCorporation),
      kindProdType: '1',
      codeCombo: 'cpmDepProdType',
      modeId: 'T_CPM_PROD_DEP_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodType', label: '产品类型', formatter: (val: any) => codeTranslate('cpmDepProdType', val) },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'currency', label: '币种', formatter: (val: any) => codeTranslate('currency', val) },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    loan: {
      title: '贷款',
      id: 'loan',
      comp: shallowRef(loanCorporation),
      kindProdType: '2',
      codeCombo: 'cpmLoanProdType',
      modeId: 'T_CPM_PROD_LOAN_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodType', label: '产品类型', formatter: (val: any) => codeTranslate('cpmLoanProdType', val) },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'currency', label: '币种', formatter: (val: any) => codeTranslate('currency', val) },
        {
          props: 'gnteeType',
          label: '担保方式',
          formatter: (val: any) => {
            let ans = splitFn(val);
            return ans.map((e) => codeTranslate('gnteeType', e)).join(',');
          },
        },
        { props: 'enterCond', label: '准入条件' },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    finance: {
      title: '理财',
      id: 'finance',
      comp: shallowRef(financeCorporation),
      kindProdType: '3',
      codeCombo: 'wealthProdType',
      modeId: 'T_CPM_PROD_WEALTH_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'runWay', label: '运作方式' },
        { props: 'invest', label: '投资期限' },
        { props: 'perfCompareBase', label: '业绩比较基准' },
        { props: 'subBeginDate', label: '认购起始日期' },
        { props: 'subEndDate', label: '认购结束日期' },
        { props: 'isProxy', label: '是否代销', formatter: (val: any) => codeTranslate('isProxy', val) },
        { props: 'netAsset', label: '单位净值' },
        { props: 'calAsset', label: '累计净值' },
        { props: 'annualYieldType', label: '年化收益率类型' },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    backletter: {
      title: '保函',
      id: 'backletter',
      comp: shallowRef(backletterCorporation),
      kindProdType: '4',
      codeCombo: 'cpmGuaranteeProdType',
      modeId: 'T_CPM_PROD_GUARANTEE_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodType', label: '产品类型', formatter: (val: any) => codeTranslate('cpmGuaranteeProdType', val) },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        {
          props: 'gnteeType',
          label: '担保方式',
          formatter: (val: any) => {
            let ans = splitFn(val);
            return ans.map((e) => codeTranslate('gnteeType', e)).join(',');
          },
        },
        { props: 'handlingFee', label: '手续费金额' },
        { props: 'marginAmount', label: '保证金' },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    silver: {
      title: '银承',
      id: 'silver',
      comp: shallowRef(silverCorporation),
      kindProdType: '5',
      codeCombo: 'cpmSilverProdType',
      modeId: 'T_CPM_PROD_SILVER_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        {
          props: 'payType',
          label: '收费方式',
          formatter: (val: any) => {
            if (!!val) {
              let ans = splitFn(val);
              return ans.map((e) => codeTranslate('cpmSilverPayWay', e)).join(',');
            }
            return val;
          },
        },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    trade: {
      title: '贸易融资',
      id: 'trade',
      comp: shallowRef(tradeCorporation),
      kindProdType: '6',
      codeCombo: 'cpmTradeProdType',
      modeId: 'T_CPM_PROD_TRADE_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        { props: 'serviceAmount', label: '费用' },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    other: {
      title: '其他',
      id: 'other',
      comp: shallowRef(otherCorporation),
      kindProdType: '8',
      codeCombo: 'cpmOrtherProdType',
      modeId: 'T_CPM_PROD_ORTHER',
      showItems: [{ props: 'prodType', label: '产品类型', formatter: (val: any) => codeTranslate('cpmOrtherProdType', val) }],
    },
  },
  inclusive: {
    title: '普惠产品',
    loan: {
      title: '普惠贷款',
      id: 'loan',
      comp: shallowRef(depositInclusive),
      kindProdType: '18',
      codeCombo: 'incLoanProdType',
      modeId: 'T_CPM_PROD_INCLUSIVE_LOAN_IMG',
      showItems: [
        { props: 'prodId', label: '产品编号' },
        { props: 'prodType', label: '产品类型', formatter: (val: any) => codeTranslate('incLoanProdType', val) },
        { props: 'prodStatus', label: '产品状态', formatter: (val: any) => codeTranslate('productStatus', val) },
        {
          props: 'gnteeType',
          label: '担保方式',
          formatter: (val: any) => {
            let ans = splitFn(val);
            return ans.map((e) => codeTranslate('gnteeType', e)).join(',');
          },
        },
        { props: 'prodEndDate', label: '产品到期时间' },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
    other: {
      title: '其他',
      id: 'other',
      comp: shallowRef(otherInclusive),
      kindProdType: '19',
      codeCombo: 'incOrtherProdType',
      modeId: 'T_CPM_PROD_ORTHER_IMG',
      showItems: [
        { props: 'prodType', label: '产品类型', formatter: (val: any) => codeTranslate('incOrtherProdType', val) },
        { props: 'proDescribe', label: '产品介绍' },
        { props: 'needMat', label: '办理流程及所需材料' },
        { props: 'marketDiscourse', label: '营销话术', convertFontSizeToRem: (html: any) => convertFontSizeToRem(html) },
      ],
    },
  },
} as any;

const convertToObjectArray = (obj: any[]) => {
  return Object.entries(obj).map(([key, value]) => {
    const bigTypes = Object.entries(value)
      .filter(([k, _]) => k !== 'title')
      .map(([_, val]) => val);
    return {
      title: value.title,
      id: key,
      bigTypes,
    };
  });
};

export const moduleCompArray = convertToObjectArray(moduleComp) as any[];
