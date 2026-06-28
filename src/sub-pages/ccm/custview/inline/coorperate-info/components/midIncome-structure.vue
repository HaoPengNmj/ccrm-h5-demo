<template>
  <div class="info-header">
    <span class="left">中收业务结构</span>
    <span class="right">单位：万元</span>
  </div>
  <dadp-card title="中收业务分布" is-body-padding>
    <div class="chart-box">
      <echarts-pie :options="options" :tooltip="true"></echarts-pie>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import echartsPie from '@/components/charts/echarts-pie.vue';
import { getMidIncomeStructureList } from '@/apis/cust';
import { autoRem } from '@/components/charts/charts-hook';
import { amountUnitConvert } from '@/utils/global';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});

const dataMap = reactive({
  pieData: Array<any>(),

  options: {
    legend: {
      top: 'bottom',
      left: 'center',

      icon: 'roundRect',
      itemWidth: autoRem(22),
      itemHeight: autoRem(12),
      itemGap: autoRem(30),

      textStyle: {
        fontSize: autoRem(22),
      },
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '30%'], // 圆心坐标,设置成相对的百分比
        radius: ['50%', '60%'],
        startAngle: 90, // 起始角度
        endendAngle: 'auto', // 结束角度

        itemStyle: {
          borderColor: '#fff',
          borderWidth: autoRem(4),
        },

        // 文本标签
        label: {
          show: false,
        },
        // 视觉引导线
        labelLine: {
          show: false,
        },
        // 移动端禁用选中效果，不与图例联动
        emphasis: {
          disabled: false,
          scale: false,
        },

        // 数据
        data: [],
      },
    ],
  },
});
const { options } = toRefs(dataMap);

const initData = async () => {
  const { code, data } = await getMidIncomeStructureList({ custId: props.custInfo.custId, cycleType: '1' });
  if (code === 200) {
    // 饼图数据
    dataMap.pieData = [
      { name: '保函担保费', value: amountUnitConvert(data?.guaranteeMethodFee || 0) },
      { name: '保函开立手续费', value: amountUnitConvert(data?.guaranteeOpenHandingFee || 0) },
      { name: '单位资信证明', value: amountUnitConvert(data?.unitCreditProve || 0) },
      { name: '结算资信证明业务手续费', value: amountUnitConvert(data?.settleCreditFee || 0) },
      { name: '验资证明手续费', value: amountUnitConvert(data?.capitalHandingFee || 0) },
      { name: '银行询证函', value: amountUnitConvert(data?.bankInquiry || 0) },
      { name: '资金托管业务手续费', value: amountUnitConvert(data?.assertTrustHandingFee || 0) },
    ];
    dataMap.options.series[0].data = dataMap.pieData;
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
