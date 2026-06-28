/*
 * @desc: 首页模块路由
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-09 11:31:10
 */
import { RouteRecordRaw } from 'vue-router';

export const homeRouters: Array<RouteRecordRaw> = [
  // 工作台
  {
    path: '/work',
    name: 'work',
    component: () => import('@/sub-pages/home/work/v-index.vue'),
    meta: {
      title: '工作台',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  // 应用管理
  {
    path: '/app',
    name: 'app',
    component: () => import('@/sub-pages/home/app/v-index.vue'),
    meta: {
      title: '应用管理',
      isKeepAlive: false,
      hasType: 'none',
    },
  },

  // 待办
  {
    path: '/todo',
    name: 'todo',
    component: () => import('@/sub-pages/home/todo/v-index.vue'),
    meta: {
      title: '我的待办',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/todo-dtl/:instanceId',
    name: 'todo-dtl',
    component: () => import('@/sub-pages/home/todo/details/v-index.vue'),
    meta: {
      title: '待办详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  // 提醒
  {
    path: '/remind',
    name: 'remind',
    component: () => import('@/sub-pages/home/remind/v-index.vue'),
    meta: {
      title: '',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/remind-dtl',
    name: 'remind-dtl',
    component: () => import('@/sub-pages/home/remind/details/v-index.vue'),
    meta: {
      title: '',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  // 任务
  {
    path: '/task',
    name: 'task',
    component: () => import('@/sub-pages/home/task/v-index.vue'),
    meta: {
      title: '我的任务',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/task-dtl/:taskId',
    name: 'task-dtl',
    component: () => import('@/sub-pages/home/task/details/v-index.vue'),
    meta: {
      title: '任务详情',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/task-fb-save/:taskId/:taskExeId',
    name: 'task-fb-save',
    component: () => import('@/sub-pages/home/task/feedback/operation.vue'),
    meta: {
      title: '日常任务反馈',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/task-fb/:taskId/:taskExeId',
    name: 'task-fb',
    component: () => import('@/sub-pages/home/task/feedback/v-index.vue'),
    meta: {
      title: '日常任务反馈历史',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  // 公告
  {
    path: '/notice',
    name: 'notice',
    component: () => import('@/sub-pages/home/notice/v-index.vue'),
    meta: {
      title: '公告管理',
      isKeepAlive: true,
      hasType: 'header',
    },
  },
  {
    path: '/notice-dtl/:noticeId',
    name: 'notice-dtl',
    component: () => import('@/sub-pages/home/notice/details/v-index.vue'),
    meta: {
      title: '公告详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  // 日程
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import('@/sub-pages/home/schedule/v-index.vue'),
    meta: {
      title: '我的日程',
      isKeepAlive: false,
      hasType: 'none',
    },
  },
  {
    path: '/schedule-dtl/:scheduleId/:scheduleType',
    name: 'schedule-dtl',
    component: () => import('@/sub-pages/home/schedule/details/v-index.vue'),
    meta: {
      title: '日程详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  // 金融计算器
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('@/sub-pages/home/calculator/v-index.vue'),
    meta: {
      title: '金融计算器',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/calculator/deposit',
    name: 'calculator-deposit',
    component: () => import('@/sub-pages/home/calculator/deposit/v-index.vue'),
    meta: {
      title: '存款利息计算器',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/calculator/financial',
    name: 'calculator-financial',
    component: () => import('@/sub-pages/home/calculator/financial/v-index.vue'),
    meta: {
      title: '理财收益计算器',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/calculator/redemption',
    name: 'calculator-redemption',
    component: () => import('@/sub-pages/home/calculator/redemption/v-index.vue'),
    meta: {
      title: '基金申购/认购计算器',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  {
    path: '/calculator/subscription',
    name: 'calculator-subscription',
    component: () => import('@/sub-pages/home/calculator/subscription/v-index.vue'),
    meta: {
      title: '基金赎回计算器',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  // 签到打卡
  {
    path: '/clock',
    name: 'clock',
    component: () => import('@/sub-pages/home/clock/v-index.vue'),
    meta: {
      title: '签到打卡',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  // 签到记录统计详情
  {
    path: '/statisticsDetail',
    name: 'statisticsDetail',
    component: () => import('@/sub-pages/home/clock/details/statisticsDetail.vue'),
    meta: {
      title: '签到详情',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
  // 签到记录统计
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('@/sub-pages/home/clock/modules/statistics.vue'),
    meta: {
      title: '我的统计',
      isKeepAlive: false,
      hasType: 'header',
    },
  },
];
