<!--
 * @desc: 我的待办（我的审批、我的申请）
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-01 02:02:33
-->
<template>
  <van-tabs v-model:active="activeTab" sticky>
    <van-tab v-for="item in moduleComp" :title="item.title">
      <component :is="item.comp.value" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import applyCom from './modules/apply.vue';
import approveCom from './modules/approve.vue';
defineOptions({ name: 'todo' });
const moduleComp = [
  {
    title: '我的审批',
    id: 'approveRef',
    comp: shallowRef(approveCom),
  },
  {
    title: '我的申请',
    id: 'applyRef',
    comp: shallowRef(applyCom),
  },
];
const activeTab = ref('approveRef');
</script>
<style lang="less" scoped></style>
