<template>
  <div>
    <div class="title">资金累计交易（同行）</div>
    <dadp-card is-body-padding>
      <van-tabs v-model:active="active" type="card" :ellipsis="false">
        <van-tab v-for="item in getCombo('custViewCycleType')" :key="item.value" :title="item.content" :name="item.value"></van-tab>
      </van-tabs>
      <div class="chart-title">资金流入</div>
      <dadp-table :tableColumns="inTableColumns" :tableData="tableData"></dadp-table>
      <div class="chart-title">资金流出</div>
      <dadp-table :tableColumns="outTableColumns" :tableData="outTableData"></dadp-table>
    </dadp-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, reactive, toRefs } from 'vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpTable from '@/components/dadp-ui/dadp-table.vue';
import { inTableColumns, outTableColumns } from './hook';
import { getInComeFinancialList, getOutFinancialList } from '@/apis/cust';
import { getCombo } from '@/hook/code-hook';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});
const dataMap = reactive({
  active: getCombo('custViewCycleType')[0].value,
  tableData: Array<any>(),
  outTableData: Array<any>(),
});
const { active, outTableData, tableData } = toRefs(dataMap);
// 获取资金流入列表
const getTableData = async () => {
  const { data } = await getOutFinancialList({
    custId: props.custInfo.custId,
    statPeriod: dataMap.active,
    pageNo: 1,
    pageSize: 99,
    isDelSameName: '1',
  });
  if (data) {
    dataMap.tableData = data;
  }
};
// 获取资金流出列表
const getOutTableData = async () => {
  const { data } = await getInComeFinancialList({
    custId: props.custInfo.custId,
    statPeriod: dataMap.active,
    pageNo: 1,
    pageSize: 99,
    isDelSameName: '1',
  });
  if (data) {
    dataMap.outTableData = data;
  }
};
watchEffect(() => {
  if (props.custInfo.custId) {
    getTableData();
    getOutTableData();
  }
});
</script>

<style lang="less" scoped>
.title {
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #333333;
  letter-spacing: 0;
  line-height: 36px;
  font-weight: 600;
  padding: 24px 0;
}

.chart-title {
  font-family: PingFangSC-Medium;
  font-size: @font-size-32;
  color: @text;
  letter-spacing: 0;
  line-height: 32px;
  font-weight: 500;
  padding: 32px 0;
}
</style>
