/*
 * @desc: 零售客户模块路由
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2025-01-16 17:58:27
 */
import { RouteRecordRaw } from 'vue-router';

export const pcmRouters: Array<RouteRecordRaw> = [
  // 客户视图
  {
    path: '/pcm-view/:custId',
    name: 'pcm-view',
    component: () => import('@/sub-pages/pcm/custview/v-index.vue'),
    meta: {
      title: '概况信息',
      isKeepAlive: false,
      hasType: 'none',
    },
  },
  {
    path: '/pcm-view/kyc',
    name: 'pcm-view-kyc',
    component: () => import('@/sub-pages/pcm/custview/kyc/v-index.vue'),
    meta: {
      title: 'KYC信息',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/pcm-view/remind',
    name: 'pcm-view-remind',
    component: () => import('@/sub-pages/pcm/custview/remind/v-index.vue'),
    meta: {
      title: '客户提醒',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/pcm-view/remind-dtl',
    name: 'pcm-view-remind-dtl',
    component: () => import('@/sub-pages/pcm/custview/remind/details/v-index.vue'),
    meta: {
      title: '客户提醒详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/pcm-view/task',
    name: 'pcm-view-task',
    component: () => import('@/sub-pages/pcm/custview/task/v-index.vue'),
    meta: {
      title: '客户营销任务',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/pcm-view/chance',
    name: 'pcm-view-chance',
    component: () => import('@/sub-pages/pcm/custview/chance/v-index.vue'),
    meta: {
      title: '营销商机客户列表',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/pcm-view/contact',
    name: 'pcm-view-contact',
    component: () => import('@/sub-pages/pcm/custview/contact/v-index.vue'),
    meta: {
      title: '接触信息',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/pcm-contact-tel',
    name: 'pcm-contact-tel',
    component: () => import('@/sub-pages/pcm/custview/contact/tel/v-index.vue'),
    meta: {
      title: '电访补录',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/pcm-contact-tel-dtl/:touchTelId',
    name: 'pcm-contact-tel-dtl',
    component: () => import('@/sub-pages/pcm/custview/contact/tel/v-index.vue'),
    meta: {
      title: '电访详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/pcm-contact-face',
    name: 'pcm-contact-face',
    component: () => import('@/sub-pages/pcm/custview/contact/face/v-index.vue'),
    meta: {
      title: '面访补录',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/pcm-contact-face-dtl/:touchFaceId',
    name: 'pcm-contact-face-dtl',
    component: () => import('@/sub-pages/pcm/custview/contact/face/v-index.vue'),
    meta: {
      title: '面访详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },

  /**
   * 新增潜客
   */
  {
    path: '/pcm-epq/add',
    name: 'pcm-epq-add',
    component: () => import('@/sub-pages/pcm/epq/v-index.vue'),
    meta: {
      title: '新增个人潜客',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
];
