/*
 * @desc: 营销模块路由
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2025-01-17 14:22:29
 */
import { RouteRecordRaw } from 'vue-router';

export const mktRouters: Array<RouteRecordRaw> = [
  /**
   * 营销团队
   */
  {
    path: '/mkt-team',
    name: 'mkt-team',
    component: () => import('@/sub-pages/mkt/mkt-team/v-index.vue'),
    meta: {
      title: '营销团队',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/mkt-team-dtl/:teamId',
    name: 'mkt-team-dtl',
    component: () => import('@/sub-pages/mkt/mkt-team/details/v-index.vue'),
    meta: {
      title: '团队视图',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /**
   * 营销任务
   */
  {
    path: '/mkt-task',
    name: 'mkt-task',
    component: () => import('@/sub-pages/mkt/mkt-task/v-index.vue'),
    meta: {
      title: '营销任务',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/mkt-task-list',
    name: 'mkt-task-list',
    component: () => import('@/sub-pages/mkt/mkt-task/v-list.vue'),
    meta: {
      title: '营销任务列表',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/mkt-task-dtl/:taskId',
    name: 'mkt-task-dtl',
    component: () => import('@/sub-pages/mkt/mkt-task/details/v-index.vue'),
    meta: {
      title: '营销任务详情',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/mkt-task-fb',
    name: 'mkt-task-fb',
    component: () => import('@/sub-pages/mkt/mkt-task/feedback/v-index.vue'),
    meta: {
      title: '反馈记录',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /**
   * 营销商机
   */
  {
    path: '/mkt-chance',
    name: 'mkt-chance',
    component: () => import('@/sub-pages/mkt/mkt-chance/v-index.vue'),
    meta: {
      title: '营销商机',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/mkt-chance-dtl/:chanceId/:changeCustId',
    name: 'mkt-chance-dtl',
    component: () => import('@/sub-pages/mkt/mkt-chance/details/v-index.vue'),
    meta: {
      title: '商机详情',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/mkt-chance-fb',
    name: 'mkt-chance-fb',
    component: () => import('@/sub-pages/mkt/mkt-chance/feedback/v-index.vue'),
    meta: {
      title: '反馈记录',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /**
   * 网格营销
   */
  {
    path: '/mkt-map',
    name: 'mkt-map',
    component: () => import('@/sub-pages/mkt/mkt-map/v-index.vue'),
    meta: {
      title: '网格营销',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /**
   * 营销活动
   */
  {
    path: '/mkt-active',
    name: 'mkt-active',
    component: () => import('@/sub-pages/mkt/mkt-active/v-index.vue'),
    meta: {
      title: '营销活动',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/mkt-active-dtl',
    name: 'mkt-active-dtl',
    component: () => import('@/sub-pages/mkt/mkt-active/detail/v-index.vue'),
    meta: {
      title: '活动详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/mkt-active-poster/:actNodeNo',
    name: 'mkt-active-poster',
    component: () => import('@/sub-pages/mkt/mkt-active/poster/v-index.vue'),
    meta: {
      title: '海报生成',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  /**
   * 权益领取
   */
  {
    path: '/mkt-qy',
    name: 'mkt-qy',
    component: () => import('@/sub-pages/mkt/mkt-qy/v-index.vue'),
    meta: {
      title: '权益领取',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
];
