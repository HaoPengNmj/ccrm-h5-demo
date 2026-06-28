<!--
 * @desc: 业绩
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-08 15:36:02
-->
<template>
  <van-tabs v-model:active="activeTab" sticky>
    <van-tab v-for="item in perfModuleComps" :title="item.title" :name="item.id">
      <component :is="item.comp.value" :query="route.query.queryParam" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { perfModuleComp } from '@/hook/auth-comp-hook';
import { getStorage } from '@/storage/storage';

defineOptions({ name: 'perf' });

const userInfo = getStorage('userInfo') || {}; // 用户信息
const route = useRoute();
const perfModuleComps = [...perfModuleComp].filter((e) => e.permission());
const activeTab = ref('perfPerformanceRef');

onMounted(() => {
  if (route.query) {
    activeTab.value = route.query.active as any;
  } else if (userInfo.isMarketers) {
    activeTab.value = 'perfProgressRef';
  }
});
</script>
<style lang="less" scoped></style>
