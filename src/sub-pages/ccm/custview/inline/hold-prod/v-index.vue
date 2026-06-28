<template>
  <div class="holdProd-index">
    <van-tabs v-model:active="active" sticky :line-width="active === '0' ? 0 : undefined">
      <van-tab name="0" title-style="display: none"></van-tab>
      <van-tab v-for="(item, index) in prodTypes" :key="index" :title="item.prodName" :name="item.prodType" :disabled="item.isHold == '0'">
        <component v-if="active === item.prodType" :is="item.comp" :queryParams="queryParams" :prod="item"></component>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { prodTypeList } from '@/sub-pages/ccm/custview/inline/hold-prod/hook';
import { getHoldProdList } from '@/apis/cust';

defineOptions({ name: 'ccm-view-hold-prod' });

const route = useRoute();
const dataMap = reactive({
  active: '0',
  queryParams: {
    custId: route.params.custId,
  },
  prodTypes: prodTypeList,
});
const { active, queryParams, prodTypes } = toRefs(dataMap);

// 获取产品持有信息
const getHoldProd = async () => {
  const { data } = await getHoldProdList({ custId: dataMap.queryParams.custId });
  if (data) {
    dataMap.prodTypes.forEach((item: any) => {
      item.isHold = data[item.isHoldField];
    });
    let holdIndex = dataMap.prodTypes.map((item: any) => item.isHold).indexOf('1');
    dataMap.active = holdIndex > -1 ? dataMap.prodTypes[holdIndex].prodType : '0';
  }
};

onMounted(() => {
  getHoldProd();
});
</script>

<style lang="less" scoped>
:deep(.van-list) {
  padding: 32px 30px;
  .items {
    display: inline-block;
    width: 50%;
    .label {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
      line-height: 24px;
      font-weight: 400;
    }
    .value {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #222222;
      letter-spacing: 0;
      line-height: 44px;
      font-weight: 400;
      margin-top: 12px;
      margin-bottom: 30px;
      width: 100%;
    }
  }
}
</style>
