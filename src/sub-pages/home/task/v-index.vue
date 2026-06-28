<!--
 * @desc: 我的任务（日常任务、营销任务）
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-01 02:04:00
-->
<template>
  <van-tabs v-model:active="activeTab" sticky>
    <van-tab v-for="item in moduleComp" :title="item.title">
      <div>
        <component :is="item.comp.value" />
      </div>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import daliyCom from './modules/daliy.vue';
import marketCom from './modules/market.vue';
defineOptions({ name: 'task' });
const moduleComp = [
  {
    title: '日常任务',
    id: 'daliyRef',
    comp: shallowRef(daliyCom),
  },
  {
    title: '营销任务',
    id: 'marketRef',
    comp: shallowRef(marketCom),
  },
];
const activeTab = ref('daliyRef');
</script>
<style lang="less" scoped></style>
