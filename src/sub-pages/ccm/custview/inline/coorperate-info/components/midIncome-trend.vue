<template>
  <div class="info-header">
    <span class="left">中收业务趋势</span>
    <span class="right">单位：万元</span>
  </div>
  <dadp-card is-body-padding>
    <van-tabs v-model:active="active" type="card" :ellipsis="false">
      <van-tab v-for="item in getCombo('custViewCycleType')" :key="item.value" :title="item.content" :name="item.value"></van-tab>
    </van-tabs>
    <div class="chart-box">
      <echarts-line :x-data="xData" :series="series"></echarts-line>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import echartsLine from '@/components/charts/echarts-line.vue';
import { getMidIncomeTrendList } from '@/apis/cust';
import { getCombo } from '@/hook/code-hook';
import { amountUnitConvert } from '@/utils/global';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});

const dataMap = reactive({
  active: getCombo('custViewCycleType')[0].value,
  xData: Array<any>(),
  series: [
    {
      data: Array<any>(),
      type: 'line',
    },
  ],
});
const { active, xData, series } = toRefs(dataMap);

const initData = async () => {
  const { code, data } = await getMidIncomeTrendList({ custId: props.custInfo.custId, cycleType: dataMap.active });
  if (code === 200) {
    // X轴数据
    dataMap.xData = data.map((item: any) => {
      return item.dateCycle ? (dataMap.active == '1' ? item.dateCycle : item.dateCycle.substring(0, 7)) : '';
    });
    // 折线数据
    dataMap.series[0].data = data.map((e: any) => amountUnitConvert(e.midIncomeAmount));
  }
};

watchEffect(() => {
  if (props.custInfo.custId) initData();
});
</script>

<style lang="less" scoped>
.chart-box {
  margin-top: 24px;
  width: 100%;
  height: 400px;
}
</style>
