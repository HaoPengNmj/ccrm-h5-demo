<template>
  <van-tabs v-model:active="activeTab" sticky>
    <van-tab v-for="item in marketComp" :title="item.title" :name="item.id">
      <component :is="item.comp.value" :custInfo="custInfo" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs } from 'vue';
import { marketComp } from './hook';

defineOptions({ name: 'ccm-view-market-info' });

const route = useRoute();

const activeTab = ref('perfPerformanceRef');
const dataMap = reactive({
  custInfo: {
    custId: route.params.custId,
  },
});
const { custInfo } = toRefs(dataMap);
onMounted(() => {
  activeTab.value = route.params.active as any;
});
</script>
<style lang="less" scoped></style>
