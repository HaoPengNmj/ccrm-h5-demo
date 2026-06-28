import { defineAsyncComponent, shallowRef } from 'vue';
import { hasPermission } from '@/hook/use-common-hook';

// 组件模块构造类型
export type CompModuleType = {
  title: string;
  id: string;
  permission: Function;
  comp: any;
  moreUrl?: string;
  type?: string;
};

/**
 * 首页模块权限组件
 */
const homeWork = defineAsyncComponent(() => import('@/views/home/modules/home-work.vue')); // 首页-工作台
const homeApp = defineAsyncComponent(() => import('@/views/home/modules/home-app.vue')); // 首页-快捷应用
const homeSchedule = defineAsyncComponent(() => import('@/views/home/modules/home-schedule.vue')); // 首页-今日日程
const homePerfMy = defineAsyncComponent(() => import('@/views/home/modules/home-perf-my.vue')); // 首页-我的业绩
const homePerfMkt = defineAsyncComponent(() => import('@/views/home/modules/home-perf-mkt.vue')); // 首页-我的业绩（营销岗）
const homePerf = defineAsyncComponent(() => import('@/views/home/modules/home-perf.vue')); // 首页-业绩完成情况
const homeHotRecom = defineAsyncComponent(() => import('@/views/home/modules/home-hot-recom.vue')); // 首页-热销推荐
const homePerfIndex = defineAsyncComponent(() => import('@/views/home/modules/home-perf-index.vue')); // 首页-业绩指标分析
export const homeModuleComp: CompModuleType[] = [
  {
    title: '工作台',
    id: 'homeWorkRef',
    permission: () => true,
    comp: shallowRef(homeWork),
  },
  {
    title: '快捷应用',
    id: 'homeAppRef',
    permission: () => true,
    comp: shallowRef(homeApp),
  },
  {
    title: '今日日程',
    id: 'homeScheduleRef',
    permission: () => hasPermission('home-schedule_app-query_app'),
    comp: shallowRef(homeSchedule),
  },
  {
    title: '我的业绩',
    id: 'homePerfMyRef',
    permission: () => hasPermission('home-perf-my_app-query_app'),
    comp: shallowRef(homePerfMy),
  },
  {
    title: '我的业绩',
    id: 'homePerfMktRef',
    permission: () => hasPermission('home-perf-mkt_app-query_app'),
    comp: shallowRef(homePerfMkt),
  },
  {
    title: '业绩指标分析',
    id: 'homePerfIndexRef',
    permission: () => hasPermission('home-perf-index_app-query_app'),
    comp: shallowRef(homePerfIndex),
  },
  {
    title: '业绩完成情况',
    id: 'homePerfRef',
    permission: () => hasPermission('home-perf_app-query_app'),
    comp: shallowRef(homePerf),
  },
  {
    title: '热销推荐',
    id: 'homeHotRecomRef',
    permission: () => hasPermission('home-hot-recom_app-query_app'),
    comp: shallowRef(homeHotRecom),
  },
];

/**
 * 业绩模块权限组件
 */
const perfIndex = defineAsyncComponent(() => import('@/views/perf/modules/perf-index.vue')); // 业绩-业绩指标
const perfProgress = defineAsyncComponent(() => import('@/views/perf/modules/perf-progress.vue')); // 业绩-进度分析
const perfExam = defineAsyncComponent(() => import('@/views/perf/modules/perf-exam.vue')); // 业绩-业绩计价
const perfStaff = defineAsyncComponent(() => import('@/views/perf/modules/perf-staff.vue')); // 业绩-业绩认领
export const perfModuleComp: CompModuleType[] = [
  {
    title: '业绩指标',
    id: 'perfIndexRef',
    permission: () => hasPermission('perf_app-index_app'),
    comp: shallowRef(perfIndex),
  },
  {
    title: '进度分析',
    id: 'perfProgressRef',
    permission: () => hasPermission('perf_app-progress_app'),
    comp: shallowRef(perfProgress),
  },
  {
    title: '业绩计价',
    id: 'perfExamRef',
    permission: () => hasPermission('perf_app-exam_app'),
    comp: shallowRef(perfExam),
  },
  {
    title: '业绩认领',
    id: 'perfStaffRef',
    permission: () => hasPermission('perf_app-staff_app'),
    comp: shallowRef(perfStaff),
  },
];

/**
 * 客户模块权限组件
 */
const retailListComp = defineAsyncComponent(() => import('@/views/cust/modules/list-retail.vue')); // 客户-个人存量客户
const corporationListComp = defineAsyncComponent(() => import('@/views/cust/modules/list-corporation.vue')); // 客户-公司存量客户
const outbankListComp = defineAsyncComponent(() => import('@/views/cust/modules/list-outbank.vue')); // 客户-外部客户

const overviewClientComp = defineAsyncComponent(() => import('@/views/cust/modules/overview-client.vue')); // 客户-客户概况
const overviewAssetsComp = defineAsyncComponent(() => import('@/views/cust/modules/overview-assets.vue')); // 客户-资产概况
const overviewLoanComp = defineAsyncComponent(() => import('@/views/cust/modules/overview-loan.vue')); // 客户-贷款概况

export const custModuleComp: CompModuleType[] = [
  {
    title: '个人存量客户',
    id: 'retailListComp',
    permission: () => hasPermission('cust-list_app-plist_app'),
    comp: shallowRef(retailListComp),
    type: 'LIST',
  },
  {
    title: '公司存量客户',
    id: 'corporationListComp',
    permission: () => hasPermission('cust-list_app-clist_app'),
    comp: shallowRef(corporationListComp),
    type: 'LIST',
  },
  {
    title: '外部客户',
    id: 'outbankListComp',
    permission: () => hasPermission('cust-list_app-clist_app'),
    comp: shallowRef(outbankListComp),
    type: 'LIST',
  },
  {
    title: '客户概况',
    id: 'overviewClientComp',
    permission: () => hasPermission('perf-progress_app'),
    comp: shallowRef(overviewClientComp),
    type: 'OVERVIEW',
  },
  {
    title: '资产概况',
    id: 'overviewAssetsComp',
    permission: () => hasPermission('perf-progress_app'),
    comp: shallowRef(overviewAssetsComp),
    type: 'OVERVIEW',
  },
  {
    title: '贷款概况',
    id: 'overviewLoanComp',
    permission: () => hasPermission('perf-progress_app'),
    comp: shallowRef(overviewLoanComp),
    type: 'OVERVIEW',
  },
];
