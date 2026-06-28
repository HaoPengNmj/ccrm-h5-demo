<!--
 * @desc: 我的公告（普通、重要）
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-08 15:35:40
-->
<template>
  <van-tabs v-model:active="activeTab" sticky>
    <van-tab v-for="item in moduleComp" :title="item.title">
      <component :is="item.comp.value" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import normalCom from './modules/normal.vue';
import importanceCom from './modules/importance.vue';

defineOptions({ name: 'notice' });

const moduleComp = [
  {
    title: '普通',
    id: 'normalCom',
    comp: shallowRef(normalCom),
  },
  {
    title: '重要',
    id: 'importanceCom',
    comp: shallowRef(importanceCom),
  },
];
const activeTab = ref('normalCom');
</script>
