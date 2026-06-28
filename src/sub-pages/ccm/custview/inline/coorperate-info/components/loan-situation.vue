<template>
  <div class="info-header">
    <span class="left">贷款情况</span>
    <span class="right">单位：万元</span>
  </div>
  <dadp-card is-body-padding>
    <van-tabs v-model:active="active" type="card" :ellipsis="false">
      <van-tab v-for="item in getCombo('loanWay')" :key="item.value" :title="item.content" :name="item.value"></van-tab>
    </van-tabs>
    <div class="chart-title">贷款变化趋势</div>
    <div class="chart-box">
      <echarts-line :x-data="xData" :series="series"></echarts-line>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import echartsLine from '@/components/charts/echarts-line.vue';
import { getLoanTrendList } from '@/apis/cust';
import { getCombo } from '@/hook/code-hook';
import { amountUnitConvert } from '@/utils/global';
const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});

const dataMap = reactive({
  xData: Array<any>(),
  series: [
    {
      data: Array<any>(),
      type: 'line',
      name: '月末时点余额',
    },
    {
      data: Array<any>(),
      type: 'line',
      name: '年日均余额',
    },
  ],
  active: getCombo('custViewCycleType')[0].value,
});
const { xData, series, active } = toRefs(dataMap);

const initData = async () => {
  const { code, data } = await getLoanTrendList({ custId: props.custInfo.custId, loanWay: dataMap.active });
  if (code === 200) {
    // X轴数据
    dataMap.xData = data.map((e: any) => {
      return e.dateCycle ? (dataMap.active == '1' ? e.dateCycle : e.dateCycle.substring(0, 7)) : '';
    });
    // 折线数据
    dataMap.series[0].data = data.map((e: any) => amountUnitConvert(e.pointBal));
    dataMap.series[1].data = data.map((e: any) => amountUnitConvert(e.averageDBal));
  }
};

watchEffect(() => {
  if (props.custInfo.custId) initData();
});
</script>

<style lang="less" scoped>
.chart-title {
  font-family: PingFangSC-Medium;
  font-size: @font-size-32;
  color: @text;
  letter-spacing: 0;
  line-height: 32px;
  font-weight: 500;
  padding: 32px 0;
}
.chart-box {
  width: 100%;
  height: 400px;
}
</style>
