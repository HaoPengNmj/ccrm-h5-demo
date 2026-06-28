<template>
  <van-tabs v-model:active="activeTab" sticky>
    <van-tab v-for="item in moduleComp" :title="item.title">
      <component :is="item.comp.value" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import statisticsCom from '../modules/statistics.vue';

const moduleComp = [
  {
    title: '我的统计',
    id: 'statisticsRef',
    comp: shallowRef(statisticsCom),
  }
];
const activeTab = ref('statisticsRef');
</script>
<style lang="less" scoped></style>
