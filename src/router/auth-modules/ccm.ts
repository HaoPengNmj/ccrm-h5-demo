/*
 * @desc: 公司客户模块路由
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2025-01-16 17:58:36
 */
import { RouteRecordRaw } from 'vue-router';

export const ccmRouters: Array<RouteRecordRaw> = [
  // 客户视图
  {
    path: '/ccm-view/:custId',
    name: 'ccm-view',
    component: () => import('@/sub-pages/ccm/custview/v-index.vue'),
    meta: {
      title: '公司客户视图',
      isKeepAlive: true,
      hasType: 'none',
    },
  },
  {
    path: '/ccm-view/base-info/:custId',
    name: 'ccm-view-base-info',
    component: () => import('@/sub-pages/ccm/custview/inline/base-info/v-index.vue'),
    meta: {
      title: '基本信息',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/kyc',
    name: 'ccm-view-kyc',
    component: () => import('@/sub-pages/ccm/custview/inline/kyc/v-index.vue'),
    meta: {
      title: 'KYC信息',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/contacts-add',
    name: '/ccm-view-contacts-add',
    component: () => import('@/sub-pages/ccm/custview/inline/base-info/components/contacts-edit.vue'),
    meta: {
      title: '新增联系人',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/contacts-edit/:custContactsId',
    name: 'ccm-view-contacts-edit',
    component: () => import('@/sub-pages/ccm/custview/inline/base-info/components/contacts-edit.vue'),
    meta: {
      title: '修改联系人',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/coorperate-info/:custId',
    name: 'ccm-view-coorperate-info',
    component: () => import('@/sub-pages/ccm/custview/inline/coorperate-info/v-index.vue'),
    meta: {
      title: '合作信息',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/hold-prod/:custId',
    name: 'ccm-view-hold-prod',
    component: () => import('@/sub-pages/ccm/custview/inline/hold-prod/v-index.vue'),
    meta: {
      title: '产品持有',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/funds-relationship/:custId/:custName',
    name: 'ccm-view-funds-relationship',
    component: () => import('@/sub-pages/ccm/custview/inline/funds-relationship/v-index.vue'),
    meta: {
      title: '资金关系',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/relation-chart/:custId',
    name: 'ccm-view-relation-chart',
    component: () => import('@/sub-pages/ccm/custview/inline/relation-chart/v-index.vue'),
    meta: {
      title: '关系图谱',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/market-info/:custId/:active',
    name: 'ccm-view-market-info',
    component: () => import('@/sub-pages/ccm/custview/inline/market-info/v-index.vue'),
    meta: {
      title: '营销视图',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/risk-matter/:custId',
    name: 'ccm-view-risk-matter',
    component: () => import('@/sub-pages/ccm/custview/inline/risk-matter/v-index.vue'),
    meta: {
      title: '风险事项',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-view/service-info',
    name: 'ccm-view-service-info',
    component: () => import('@/sub-pages/ccm/custview/inline/service-info/v-index.vue'),
    meta: {
      title: '服务信息',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-concat-tel',
    name: 'ccm-concat-tel',
    component: () => import('@/sub-pages/ccm/custview/inline/service-info/components/tel-register.vue'),
    meta: {
      title: '电访补录',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-concat-tel-dtl/:exeRegId',
    name: 'ccm-concat-tel-dtl',
    component: () => import('@/sub-pages/ccm/custview/inline/service-info/components/tel-register.vue'),
    meta: {
      title: '电访详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-concat-face',
    name: 'ccm-concat-face',
    component: () => import('@/sub-pages/ccm/custview/inline/service-info/components/face-register.vue'),
    meta: {
      title: '面访补录',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/ccm-concat-face-dtl/:exeRegId',
    name: 'ccm-concat-face-dtl',
    component: () => import('@/sub-pages/ccm/custview/inline/service-info/components/face-register.vue'),
    meta: {
      title: '面访详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },

  // 行外信息
  /* 公司客户视图行外客户视图 */
  /* 行外视图基本信息 */
  {
    path: '/ccm-view/outbase-info/:custId',
    name: 'outbase-info',
    component: () => import('@/sub-pages/ccm/custview/outline/outbase-info/v-index.vue'),
    meta: {
      title: '基本信息',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /* 行外视图股东信息 */
  {
    path: '/ccm-view/share-holder/:custId',
    name: 'share-holder',
    component: () => import('@/sub-pages/ccm/custview/outline/share-holder/v-index.vue'),
    meta: {
      title: '股东信息',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /* 行外视图企业特征 */
  {
    path: '/ccm-view/enterprise-stics/:custId',
    name: 'enterprise-stics',
    component: () => import('@/sub-pages/ccm/custview/outline/enterprise-stics/v-index.vue'),
    meta: {
      title: '企业特征',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /* 行外视图经营信息 */
  {
    path: '/ccm-view/business-info/:custId',
    name: 'business-info',
    component: () => import('@/sub-pages/ccm/custview/outline/business-info/v-index.vue'),
    meta: {
      title: '经营信息',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /* 行外视图经营风险 */
  {
    path: '/ccm-view/business-risk/:custId',
    name: 'business-risk',
    component: () => import('@/sub-pages/ccm/custview/outline/business-risk/v-index.vue'),
    meta: {
      title: '经营风险',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /* 行外视图法律诉讼 */
  {
    path: '/ccm-view/legal-proceed/:custId',
    name: 'legal-proceed',
    component: () => import('@/sub-pages/ccm/custview/outline/legal-proceed/v-index.vue'),
    meta: {
      title: '法律诉讼',
      isKeepAlive: false,
      hasType: 'header',
    },
  },

  //行外信息经营风险详情页
  /* 行外信息经营风险详情页 */
  {
    path: '/ccm-view/details',
    name: 'details',
    component: () => import('@/sub-pages/ccm/custview/outline/business-risk/details/detail-list.vue'),
    meta: {
      title: '',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /* 行外信息法律诉讼详情页 */
  {
    path: '/ccm-view/legal-proceed/details',
    name: 'legal-proceed-dtl',
    component: () => import('@/sub-pages/ccm/custview/outline/legal-proceed/details/detail-list.vue'),
    meta: {
      title: '',
      isKeepAlive: false,
      hasType: 'header',
    },
  },

  /**
   * 新增潜客
   */
  {
    path: '/ccm-epq/add',
    name: 'ccm-epq-add',
    component: () => import('@/sub-pages/ccm/epq/v-index.vue'),
    meta: {
      title: '新增公司潜客',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
];
