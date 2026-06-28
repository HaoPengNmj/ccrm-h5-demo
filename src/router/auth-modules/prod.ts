/*
 * @desc: 产品模块路由
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-09 19:13:13
 */
import { RouteRecordRaw } from 'vue-router';

export const prodRouters: Array<RouteRecordRaw> = [
  {
    path: '/prod',
    name: 'prod',
    component: () => import('@/sub-pages/prod/v-index.vue'),
    meta: {
      title: '产品管理',
      isKeepAlive: true,
      hasType: 'none',
    },
  },
  // 零售产品
  {
    path: '/retail/deposit',
    name: 'retail-deposit',
    component: () => import('@/sub-pages/prod/retail/deposit/v-index.vue'),
    meta: {
      title: '零售存款',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/retail/loan',
    name: 'retail-loan',
    component: () => import('@/sub-pages/prod/retail/loan/v-index.vue'),
    meta: {
      title: '零售贷款',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/retail/finance',
    name: 'retail-finance',
    component: () => import('@/sub-pages/prod/retail/finance/v-index.vue'),
    meta: {
      title: '零售理财',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/retail/fund',
    name: 'retail-fund',
    component: () => import('@/sub-pages/prod/retail/fund/v-index.vue'),
    meta: {
      title: '零售基金',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/retail/insure',
    name: 'retail-insure',
    component: () => import('@/sub-pages/prod/retail/insure/v-index.vue'),
    meta: {
      title: '零售保险',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/retail/gold',
    name: 'retail-gold',
    component: () => import('@/sub-pages/prod/retail/gold/v-index.vue'),
    meta: {
      title: '零售贵金属',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/retail/card',
    name: 'retail-card',
    component: () => import('@/sub-pages/prod/retail/card/v-index.vue'),
    meta: {
      title: '零售卡产品',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/retail/other',
    name: 'retail-other',
    component: () => import('@/sub-pages/prod/retail/other/v-index.vue'),
    meta: {
      title: '零售其他产品',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  // 公司产品
  {
    path: '/corporation/deposit',
    name: 'corporation-deposit',
    component: () => import('@/sub-pages/prod/corporation/deposit/v-index.vue'),
    meta: {
      title: '公司存款',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/corporation/loan',
    name: 'corporation-loan',
    component: () => import('@/sub-pages/prod/corporation/loan/v-index.vue'),
    meta: {
      title: '公司贷款',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/corporation/finance',
    name: 'corporation-finance',
    component: () => import('@/sub-pages/prod/corporation/finance/v-index.vue'),
    meta: {
      title: '公司理财',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/corporation/backletter',
    name: 'corporation-backletter',
    component: () => import('@/sub-pages/prod/corporation/backletter/v-index.vue'),
    meta: {
      title: '公司保函',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/corporation/silver',
    name: 'corporation-silver',
    component: () => import('@/sub-pages/prod/corporation/silver/v-index.vue'),
    meta: {
      title: '公司银承',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/corporation/trade',
    name: 'corporation-trade',
    component: () => import('@/sub-pages/prod/corporation/trade/v-index.vue'),
    meta: {
      title: '公司贸易融资',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/corporation/other',
    name: 'corporation-other',
    component: () => import('@/sub-pages/prod/corporation/other/v-index.vue'),
    meta: {
      title: '公司其他产品',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  // 普惠产品
  {
    path: '/inclusive/loan',
    name: 'inclusive-loan',
    component: () => import('@/sub-pages/prod/inclusive/loan/v-index.vue'),
    meta: {
      title: '普惠贷款',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/inclusive/other',
    name: 'inclusive-other',
    component: () => import('@/sub-pages/prod/inclusive/other/v-index.vue'),
    meta: {
      title: '普惠其他产品',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/prod-dtl/:line/:type/:prodId',
    name: 'prod-dtl',
    component: () => import('@/sub-pages/prod/details/v-index.vue'),
    meta: {
      title: '产品详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
];
