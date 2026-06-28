<!--
 * @desc: 营销任务详情
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2024-10-09 10：38：00
-->
<template>
  <van-tabs v-model:active="activeTab" sticky>
    <van-tab v-for="item in mktTaskDetailsComp" :title="item.label">
      <component :is="item.component" :task-id="taskId" :task-info="mktTaskInfo" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import baseInfo from '@/sub-pages/mkt/mkt-task/details/modules/base-info.vue';
import custList from '@/sub-pages/mkt/mkt-task/details/modules/cust-list.vue';
import custAnalysis from '@/sub-pages/mkt/mkt-task/details/modules/cust-analysis.vue';
import { getStorage } from '@/storage/storage';
import { getMktTask } from '@/apis/mkt';
defineOptions({ name: 'mkt-task-dtl' });
const userInfo = getStorage('userInfo') || {}; // 用户信息
const route = useRoute();
const dataMap = reactive({
  activeTab: 'baseInfo',
  mktTaskDetailsComp: [
    {
      label: '基本信息',
      name: 'baseInfo',
      component: shallowRef(baseInfo),
    },
    {
      label: '客户名单',
      name: 'custList',
      component: shallowRef(custList),
    },
    {
      label: '客户转化分析', // 管理员特有页面
      name: 'custAnalysis',
      component: shallowRef(custAnalysis),
    },
  ],
});
const { activeTab, mktTaskDetailsComp } = toRefs(dataMap);
const taskId = ref(route.params.taskId as string);

const mktTaskInfo = ref({
  taskName: '',
  taskShip: '',
  taskBigType: '', //任务大类
  taskType: '',
  mktProdNames: '', //营销产品
  taskStartDate: '', //任务开始时间(任务有效期)
  taskEndDate: '', //任务结束时间
  taskCoop: '', //任务合作方
  loveWay: '', //任务形式
  loveGift: '', //关怀礼品
  taskAddr: '', //任务地点
  custListType: '', //1=动态名单；2=静态名单
  createDate: '',
  createOrgName: '',
  createUserName: '',
  taskReq: '', //任务要求
} as any);

//获取营销任务详情-基本信息
const initData = async () => {
  const { code, data } = await getMktTask({ taskId: taskId.value });
  if (code === 200) {
    mktTaskInfo.value = data;
  }
};
onMounted(() => {
  initData();
  if (!userInfo.isManager) dataMap.mktTaskDetailsComp.splice(2, 1);
});
</script>
<style lang="less" scoped></style>
