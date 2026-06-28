<template>
  <div class="main-page">
    <signCom v-if="active == 'sign'"></signCom>
    <statisticsCom v-if="active == 'statistics'"></statisticsCom>
    <trajectoryCom v-if="active == 'trajectory'"></trajectoryCom>
  </div>

  <!-- 底部 -->
  <div class="bottom-bar">
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="location-o" name="sign">签到</van-tabbar-item>
      <van-tabbar-item icon="notes-o" name="statistics">统计</van-tabbar-item>
      <van-tabbar-item icon="gem" name="trajectory">轨迹</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts" setup>
import signCom from './sign/v-index.vue';
import statisticsCom from './statistics/v-index.vue';
import trajectoryCom from './strajectory/v-index.vue';
const active = ref('sign');
const onChange = (val: any) => {};
</script>
<style lang="less">
.main-page {
  height: 100%;
}
.bottom-bar {
  position: absolute;
  bottom: 0;
}
</style>
