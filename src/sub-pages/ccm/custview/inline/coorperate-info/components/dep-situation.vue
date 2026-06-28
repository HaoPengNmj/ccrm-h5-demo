<template>
  <div class="info-header">
    <span class="left">存款情况</span>
    <span class="right">单位：万元</span>
  </div>
  <dadp-card is-body-padding>
    <van-tabs v-model:active="active" type="card" :ellipsis="false">
      <van-tab v-for="item in getCombo('custViewCycleType')" :key="item.value" :title="item.content" :name="item.value"></van-tab>
    </van-tabs>
    <div class="chart-title">存款变化趋势</div>
    <div class="chart-box">
      <echarts-line :x-data="xData" :series="series"></echarts-line>
    </div>
    <div class="chart-title">存款分布</div>
    <div class="chart-box">
      <echarts-pie :data="pieData" :tooltip="true" show-legend></echarts-pie>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import echartsLine from '@/components/charts/echarts-line.vue';
import echartsPie from '@/components/charts/echarts-pie.vue';
import { getDepTrendList } from '@/apis/cust';
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
      name: '时点余额',
    },
    {
      data: Array<any>(),
      type: 'line',
      name: '日均余额',
    },
  ],

  pieData: Array<any>(),
});
const { active, xData, series, pieData } = toRefs(dataMap);

// 获取图表信息
const initData = async () => {
  const { code, data } = await getDepTrendList({ custId: props.custInfo.custId, cycleType: dataMap.active });
  if (code === 200) {
    dataMap.xData = data.map((e: any) => {
      return e.dateCycle ? (dataMap.active == '1' ? e.dateCycle : e.dateCycle.substring(0, 7)) : '';
    });
    // 折线1数据
    dataMap.series[0].data = data.map((e: any) => amountUnitConvert(e.pointBal));
    // 折线2数据
    dataMap.series[1].data = data.map((e: any) => amountUnitConvert(e.averageDBal));

    // 饼图数据
    dataMap.pieData = [
      {
        name: '活期金额',
        value: amountUnitConvert(data?.[data.length - 1]?.currentAmount || 0),
      },
      {
        name: '定期金额',
        value: amountUnitConvert(data?.[data.length - 1]?.regularAmount || 0),
      },
    ];
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
