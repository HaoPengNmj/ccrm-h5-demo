<template>
  <div class="business-info">
    <component v-for="item in comps" :key="item.refName" :is="item.com" :ref="item.refName" :custInfo="custInfo"></component>
  </div>
</template>
<script lang="ts" setup>
import businessInfo from './components/business-info.vue';
defineOptions({ name: 'business-info' });

const route = useRoute();
const dataMap = reactive({
  comps: [
    {
      // 基本信息
      refName: 'businessInfoRef',
      com: shallowRef(businessInfo),
    },
  ],
  custInfo: {
    custId: route.params.custId,
    custName: route.params.custName,
  },
});
const { comps, custInfo } = toRefs(dataMap);
</script>

<style lang="less" scoped>
.business-info {
  padding: 0 32px 32px;
  :deep(.hedtitle) {
    font-family: PingFangSC-Semibold;
    font-size: @font-size-36;
    color: @text;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 600;
    padding: 32px 5px;
  }
}
</style>
