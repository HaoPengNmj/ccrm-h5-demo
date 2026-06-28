<!--
 * @desc: 营销地图
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-12-20 16:21:16
-->
<template>
  <div class="container">
    <div class="container-tabs">
      <van-tabs v-model:active="activeTab" type="card">
        <van-tab v-for="(item, index) in showComponents" :key="index" :title="item.title"></van-tab>
      </van-tabs>
    </div>
    <component :is="showComponents[activeTab]?.comp"></component>
  </div>
</template>

<script lang="ts" setup>
import mapVisit from '@/sub-pages/map/visit/v-index.vue';
import mapMark from '@/sub-pages/map/mark/v-index.vue';
import mapEnt from '@/sub-pages/map/ent/v-index.vue';
import mapTrack from '@/sub-pages/map/track/v-index.vue';
import { hasPermission } from '@/hook/use-common-hook';

defineOptions({ name: 'mkt-map' });

// 生成一个component的数组
const components = [
  { title: '客户拜访', comp: mapVisit, show: hasPermission('mkt-map_app-custvist_app') },
  { title: '客户标注', comp: mapMark, show: hasPermission('mkt-map_app-custtag_app') },
  { title: '企业查询', comp: mapEnt, show: hasPermission('mkt-map_app-enterprise_app') },
  { title: '营销轨迹', comp: mapTrack, show: hasPermission('mkt-map_app-mkttrajectory_app') },
];
const showComponents = computed(() => {
  return components.filter((e) => e.show);
});

/**
 * Tab组件
 *
 * 功能菜单切换
 */
const activeTab = ref(0);
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  &-tabs {
    padding-top: 16px;
  }
}
</style>
