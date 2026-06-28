<!--
 * @desc: 营销团队视图
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2024-10-09 10：38：00
-->
<template>
  <van-tabs v-model:active="activeTab" sticky>
    <van-tab v-for="item in mktTeamViewComp" :title="item.label" :name="item.name">
      <component :is="item.component" :team-id="teamId" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import baseInfoCom from '@/sub-pages/mkt/mkt-team/modules/base-info.vue';
import mktIndexCom from '@/sub-pages/mkt/mkt-team/modules/mkt-index.vue';
import analysisCom from '@/sub-pages/mkt/mkt-team/modules/analysis.vue';

defineOptions({ name: 'mkt-team-dtl' });

const activeTab = ref('baseInfoCom');
const mktTeamViewComp = ref([
  {
    label: '基本信息',
    name: 'baseInfoCom',
    component: shallowRef(baseInfoCom),
  },
  {
    label: '营销指标',
    name: 'mktIndexCom',
    component: shallowRef(mktIndexCom),
  },
  {
    label: '进度分析',
    name: 'analysisCom',
    component: shallowRef(analysisCom),
  },
]);

const route = useRoute();
const teamId = ref(route.params.teamId as string);
</script>
<style lang="less" scoped></style>
