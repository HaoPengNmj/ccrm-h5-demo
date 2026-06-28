/*
 * @desc: 我的模块路由
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-09-25 17:02:36
 */
import { RouteRecordRaw } from 'vue-router';

export const userRouters: Array<RouteRecordRaw> = [
  {
    path: '/updatePassword',
    name: 'updatePassword',
    component: () => import('@/sub-pages/user/user-password/v-index.vue'),
    meta: {
      title: '密码修改',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
];
