<template>
  <div class="enterprise-info">
    <component v-for="item in comps" :key="item.refName" :is="item.com" :ref="item.refName" :custInfo="custInfo"></component>
  </div>
</template>
<script lang="ts" setup>
import enterpriseInfo from './components/enterprise-stics.vue';
import { CustBaseTwInfo } from '@/apis/cust';
defineOptions({ name: 'enterprise-info' });

const route = useRoute();
const dataMap = reactive({
  comps: [
    {
      // 企业特征
      refName: 'enterpriseRef',
      com: shallowRef(enterpriseInfo),
    },
  ],
  custInfo: {
    custId: route.params.custId,
    custName: route.params.custName,
  },
});
const { comps, custInfo } = toRefs(dataMap);
// 获取企业特征信息
const getBaseInfo = async () => {
  const { data } = await CustBaseTwInfo({ custId: route.params.custId });
  if (data) {
    dataMap.custInfo = data;
  }
};
onMounted(() => {
  getBaseInfo();
});
</script>

<style lang="less" scoped>
.enterprise-info {
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
