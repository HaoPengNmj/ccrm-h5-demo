<template>
  <div class="title">流水信息</div>
  <dadp-card is-body-padding>
    <van-tabs v-model:active="active" type="card" :ellipsis="false">
      <van-tab v-for="item in getCombo('custViewCycleType')" :key="item.value" :title="item.content" :name="item.value"></van-tab>
    </van-tabs>
    <div class="chart-title">活期交易笔数 {{ flowData?.currentTradeNum || '--' }}</div>
    <div class="top-card">
      <div class="top-card-items">
        <div class="top-card-items-label">
          贷方发生总额
          <br />
          （万元）
        </div>
        <div class="top-card-items-value">{{ fmtThousands(flowData?.creditOccurAmount, 2) }}</div>
      </div>
      <div class="top-card-items">
        <div class="top-card-items-label">贷方总笔数</div>
        <div class="top-card-items-value">{{ flowData?.creditNum || '--' }}</div>
      </div>
      <div class="top-card-items">
        <div class="top-card-items-label">
          贷方单笔平均
          <br />
          交易额（万元）
        </div>
        <div class="top-card-items-value">{{ fmtThousands(flowData?.creditAvgTransactMoney, 2) }}</div>
      </div>
    </div>
    <div class="top-card">
      <div class="top-card-items">
        <div class="top-card-items-label">借方发生总额（万元）</div>
        <div class="top-card-items-value">{{ fmtThousands(flowData?.debitOccurAmount, 2) }}</div>
      </div>
      <div class="top-card-items">
        <div class="top-card-items-label">借方总笔数</div>
        <div class="top-card-items-value">{{ flowData?.debitNum || '--' }}</div>
      </div>
      <div class="top-card-items">
        <div class="top-card-items-label">借方单笔平均交易额（万元）</div>
        <div class="top-card-items-value">{{ fmtThousands(flowData?.debitAvgTransactMoney, 2) }}</div>
      </div>
    </div>
    <div class="chart-title">周期内变化趋势</div>
    <div class="chart">
      <echarts-line ref="flowLineChartRef" :x-data="xData" :series="series" :options="options"></echarts-line>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import echartsLine from '@/components/charts/echarts-line.vue';
import { getFlowLineChartList, getFlowDataList } from '@/apis/cust';
import { getCombo } from '@/hook/code-hook';
import { fmtThousands } from '@/utils/format';
import { resetFields } from '@/utils/global';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});
type FundTrendType = {
  tradeDate: string;
  value: number;
};
const flowLineChartRef = ref();
const dataMap = reactive({
  active: getCombo('custViewCycleType')[0].value,
  xData: [],
  series: [
    {
      data: Array<any>(),
      type: 'line',
      name: '收入',
    },
    {
      data: Array<any>(),
      type: 'line',
      name: '支出',
    },
  ],
  options: {},
  flowData: Object(),
});
const { active, xData, series, options, flowData } = toRefs(dataMap);
// 获取流水信息
const getFlowData = async () => {
  const { data } = await getFlowDataList({ custId: props.custInfo.custId, statPeriod: dataMap.active, isDelSameName: '1' });
  if (data) {
    dataMap.flowData = data;
  } else {
    resetFields(dataMap.flowData);
  }
};
// 获取折线图数据
const getList = async () => {
  // 清空折线图数据
  const { code, data } = await getFlowLineChartList({ custId: props.custInfo.custId, statPeriod: dataMap.active, isDelSameName: '1' });
  if (code === 200) {
    let lineData = Object();
    // 通过便利返回的流入流出的日期数据并设为lineData对象的里的子对象并将值放到对象里
    if (data.inList.length > 0) {
      data.inList.forEach((item: FundTrendType) => {
        lineData[item.tradeDate] = { income: item.value, outcome: 0 };
      });
    }
    if (data.outList.length > 0) {
      data.outList.forEach((item: FundTrendType) => {
        lineData[item.tradeDate] = { income: 0, outcome: item.value };
      });
    }
    let xData = Array<any>(),
      series1 = Array<any>(),
      series2 = Array<any>();
    // 对lineData的Key便利生成折线图所需数据
    Object.keys(lineData).forEach((item) => {
      series1.push(lineData[item].income);
      series2.push(lineData[item].outcome);
      xData.push(item);
    });
    dataMap.xData = xData as any;
    dataMap.series[0].data = series1 as any;
    dataMap.series[1].data = series2;
  }
};
watchEffect(() => {
  if (props.custInfo.custId) {
    getFlowData();
    getList();
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
.items {
  display: flex;
  margin-bottom: 24px;
  .label {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #999999;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
    width: 264px;
  }
  .value {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #222222;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
  }
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
.top-card + .top-card {
  margin-top: 32px;
}
.top-card {
  background-image: linear-gradient(180deg, #fdf6ea 0%, #ffffff 100%);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  padding: 32px 10px;
  &-items {
    width: 100%;
    text-align: center;
    &-label {
      height: 50px;
      font-size: 22px;
      color: @sub-text;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
    }
    &-value {
      font-family: PingFangSC-Semibold;
      font-size: 30px;
      line-height: 30px;
      font-weight: 600;
      margin-top: 24px;
    }
  }
}
.chart {
  height: 400px;
  width: 100%;
}
</style>
