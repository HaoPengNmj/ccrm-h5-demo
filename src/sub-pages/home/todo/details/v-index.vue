<!--
 * @desc: 待办（申请、审批）详情
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-10-06 18:38:38
-->
<template>
  <van-tabs v-model:active="activeTab" sticky>
    <van-tab v-for="item in moduleComp" :title="item.title">
      <component :is="item.comp" :instanceInfo="instanceInfo" :templateType="templateType" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import baseInfoCom from './modules/basic-info.vue';
import processInfoCom from './modules/process-info.vue';
import operationCom from './modules/operation.vue';
import { getInstance } from '@/apis/home';

defineOptions({ name: 'todo-dtl' });

const currentRoute = useRoute();
const instanceInfo = ref({} as any); //流程信息
const templateType = currentRoute.query.templateType as string;

const moduleComp = ref([
  {
    title: '基础信息',
    id: 'baseInfoCom',
    comp: shallowRef(baseInfoCom),
  },
  {
    title: '流程信息',
    id: 'processInfoCom',
    comp: shallowRef(processInfoCom),
  },
]);

const operComp = {
  title: '处理',
  id: 'operationCom',
  comp: shallowRef(operationCom),
} as any;

const activeTab = ref('baseInfoCom');

const initData = async () => {
  const { code, data } = await getInstance({
    instanceId: currentRoute.params.instanceId || '',
  });
  if (code === 200) {
    instanceInfo.value = data;
  }
};

onMounted(() => {
  let isOper = currentRoute.query.isOper === 'true';
  if (isOper) {
    moduleComp.value.push(operComp);
  }
  initData();
});
</script>
<style lang="less" scoped></style>
