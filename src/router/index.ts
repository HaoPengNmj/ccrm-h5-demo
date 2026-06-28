import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { constRouters } from './constant-modules';
import { homeRouters } from './auth-modules/home';
import { perfRouters } from './auth-modules/perf';
import { pcmRouters } from './auth-modules/pcm';
import { ccmRouters } from './auth-modules/ccm';
import { mktRouters } from './auth-modules/mkt';
import { userRouters } from './auth-modules/user';
import { prodRouters } from './auth-modules/prod';

import { getToken } from '@/http/auth';
import { updateCacheViews, setPositions, getPositions } from '@/hook/cached-view-hook';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/v-index.vue'),
    meta: {
      title: '登录',
      icon: 'gem-o',
    },
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/layout/layout-box.vue'),
    meta: {
      title: '首页',
    },
    children: [
      ...constRouters,
      ...homeRouters,
      ...perfRouters,
      ...pcmRouters,
      ...ccmRouters,
      ...mktRouters,
      ...userRouters,
      ...prodRouters,
    ],
  },
  // 其他路由...
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/not-found/v-index.vue') },
];

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
});

// 不重定向白名单
const whiteList = ['/login', '/qwlogin'];

router.beforeEach(async (to, from, next) => {
  // 存储滚动位置
  setPositions(from.name as string, from.fullPath);
  let token = getToken();
  if (whiteList.indexOf(to.path) !== -1) {
    token ? next({ name: 'home' }) : next();
    return;
  }
  token
    ? next()
    : next({
        name: 'login',
        query: {
          redirect: to.fullPath as string,
        },
      });
});

router.afterEach((to, from) => {
  // nextTick(() => {
  //   let layout = document.getElementById('layout-box-main');
  //   if (layout) layout.scrollTop = 0;
  // });
  // 更新keep-alive 缓存
  nextTick(() => {
    getPositions(to.name as string, to.fullPath);
    updateCacheViews(to.name as string, to.fullPath, to.meta.isKeepAlive as boolean);
  });
});

export default router;
