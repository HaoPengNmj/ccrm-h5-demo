<template>
  <div class="risk-matter">
    <div class="title">风险信息</div>
    <dadp-card>
      <van-cell title="是否反洗钱或反恐融资黑名单" :value="codeTranslate('yesOrNo', riskInfo.isFxqFkrzBlackCust) || '--'"></van-cell>
      <van-cell title="是否被查、冻、扣" :value="codeTranslate('yesOrNo', riskInfo.isCdkCust) || '--'"></van-cell>
      <van-cell title="是否空头支票客户" :value="codeTranslate('yesOrNo', riskInfo.isBlankFeaturCust) || '--'"></van-cell>
    </dadp-card>
    <div class="title">黑名单信息</div>
    <dadp-card is-body-padding>
      <dadp-table :tableColumns="tableColumns" :tableData="tableData"></dadp-table>
    </dadp-card>
  </div>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpTable from '@/components/dadp-ui/dadp-table.vue';
import { getRiskInfoList, getBlackInfoList } from '@/apis/cust';
import { codeTranslate } from '@/hook/code-hook';

defineOptions({ name: 'ccm-view-risk-matter' });

const route = useRoute();

const dataMap = reactive({
  riskInfo: {} as any,

  tableColumns: [
    {
      prop: 'enterDate',
      title: '进入名单日期',
    },
    {
      prop: 'blackReason',
      title: '黑名单原因',
    },
  ],
  tableData: [] as any,
});
const { riskInfo, tableColumns, tableData } = toRefs(dataMap);

// 获取风险信息
const getRiskInfo = async () => {
  const { data } = await getRiskInfoList({ custId: route.params.custId });
  if (data) {
    riskInfo.value = { ...data };
  }
};
// 获取黑名单信息
const getBlackInfo = async () => {
  const { data } = await getBlackInfoList({ custId: route.params.custId, pageNo: 1, pageSize: 99 });
  tableData.value = data.rows || [];
};

onMounted(() => {
  getRiskInfo();
  getBlackInfo();
});
</script>

<style lang="less" scoped>
.risk-matter {
  padding: 0 32px 32px;
  .title {
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
