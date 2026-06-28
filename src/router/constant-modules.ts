/*
 * @desc: 底部菜单栏路由
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-09-26 09:13:34
 */
import homeImg from '@/assets/images/tabbar/home.png';
import homeImgActive from '@/assets/images/tabbar/home-active.png';
import custImg from '@/assets/images/tabbar/cust.png';
import custImgActive from '@/assets/images/tabbar/cust-active.png';
import mktImg from '@/assets/images/tabbar/mkt.png';
import mktImgActive from '@/assets/images/tabbar/mkt-active.png';
import perfImg from '@/assets/images/tabbar/perf.png';
import perfImgActive from '@/assets/images/tabbar/perf-active.png';
import mineImg from '@/assets/images/tabbar/mine.png';
import mineImgActive from '@/assets/images/tabbar/mine-active.png';

import { RouteRecordRaw } from 'vue-router';
import { hasMenu } from '@/hook/use-common-hook';

export const constRouters: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/v-index.vue'),
    meta: {
      title: '首页',
      // icon: 'home-o',
      icon: homeImg,
      iconActive: homeImgActive,
      isKeepAlive: false,
      hasType: 'footer',
      isShow: () => true,
    },
  },
  {
    path: '/perf',
    name: 'perf',
    component: () => import('@/views/perf/v-index.vue'),
    meta: {
      title: '业绩',
      // icon: 'friends-o',
      icon: perfImg,
      iconActive: perfImgActive,
      isKeepAlive: true,
      hasType: 'footer',
      isShow: () => hasMenu('perf_app'),
    },
  },
  {
    path: '/cust',
    name: 'cust',
    component: () => import('@/views/cust/v-index.vue'),
    meta: {
      title: '客户',
      // icon: 'friends-o',
      icon: custImg,
      iconActive: custImgActive,
      isKeepAlive: true,
      hasType: 'footer',
      isShow: () => hasMenu('cust_app'),
    },
  },
  {
    path: '/mkt',
    name: 'mkt',
    component: () => import('@/views/mkt/v-index.vue'),
    meta: {
      title: '营销',
      // icon: 'gift-o',
      icon: mktImg,
      iconActive: mktImgActive,
      isKeepAlive: true,
      hasType: 'footer',
      isShow: () => hasMenu('mkt_app'),
    },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/v-index.vue'),
    meta: {
      title: '我的',
      // icon: 'user-circle-o',
      icon: mineImg,
      iconActive: mineImgActive,
      isKeepAlive: false,
      hasType: 'footer',
      isShow: () => true,
    },
  },
];
