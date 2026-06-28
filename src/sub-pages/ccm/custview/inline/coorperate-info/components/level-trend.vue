<template>
  <div class="info-header">
    <span class="left">客户升降级趋势</span>
  </div>
  <dadp-card is-body-padding>
    <div class="chart-box">
      <echarts-line :options="options" :x-data="xData" :series="series"></echarts-line>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import echartsLine from '@/components/charts/echarts-line.vue';
import { getCustLevelTrend } from '@/apis/cust';
import { autoRem } from '@/components/charts/charts-hook';
import { codeTranslate } from '@/hook/code-hook';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});

const dataMap = reactive({
  options: {
    tooltip: {
      trigger: 'axis',
      confine: true, // 是否将 tooltip 框限制在图表的区域内
      textStyle: {
        fontSize: autoRem(22),
      },
      formatter: (params: any) => {
        let tmp = params[0];
        return `${tmp.name}<br/>${tmp.marker} <span style="float:right">${tmp.data.custLevel}</span><div style="clear:both"></div>`;
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 5,
      axisLabel: {
        fontSize: autoRem(22),
        //需要格式化展示客户等级
        formatter: (value: any) => {
          return value != 0 ? codeTranslate('ccmCustBaseLevel', `L${value.toString()}`) : '';
        },
      },
    },
  },

  series: [{ data: [], type: 'line' }],
  xData: [],
});
const { series, options, xData } = toRefs(dataMap);

// 获取客户等级升降趋势数据
const initData = async () => {
  const { code, data } = await getCustLevelTrend({ custId: props.custInfo.custId });
  if (code === 200) {
    dataMap.xData = data.map((e: any) => e.dateCycle);
    dataMap.series[0].data = data.map((e: any) => ({ custLevel: e.custLevelName, value: e.custLevel.replace('L', '') }));
  }
};

watchEffect(() => {
  if (props.custInfo.custId) initData();
});
</script>

<style lang="less" scoped>
.chart-box {
  width: 100%;
  height: 400px;
}
</style>
