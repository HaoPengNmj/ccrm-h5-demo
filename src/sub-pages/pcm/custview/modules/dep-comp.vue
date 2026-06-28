<template>
  <dadp-card title="资产分析" class="pcm-view-card" is-body-padding>
    <template #header-right>
      <van-image class="icon" :src="isDepMark ? eyesClose : eyesOpen" @click="isDepMark = !isDepMark"></van-image>
    </template>
    <van-tabs v-model:active="depActive" type="card" :ellipsis="false" @change="getDepPieCharts">
      <van-tab title="资产结构" name="1"></van-tab>
      <van-tab title="资产变动" name="2"></van-tab>
    </van-tabs>
    <dadp-tabs class="my-dadp-tabs" v-model="depTypeActive" :options="depTypeOptions" @change="getDepPieCharts"></dadp-tabs>
    <div style="text-align: right">
      <van-popover v-if="depActive === '2'" :actions="rangeOptions" placement="bottom" @select="rangeSelect">
        <template #reference>
          {{ rangeText }}
          <van-icon name="arrow-down"></van-icon>
        </template>
      </van-popover>
    </div>
    <div class="charts" v-if="depActive === '1'">
      <echarts-pie
        text="总金额"
        :subtext="fmtMaskData(subtext, isDepMark)"
        :data="pieData"
        :tooltip="pieFormatter"
        show-legend
      ></echarts-pie>
    </div>
    <div class="charts" v-if="depActive === '2'">
      <echarts-line :xData="xData" :series="series" :tooltip="lineFormatter"></echarts-line>
    </div>
  </dadp-card>
</template>
<script lang="ts" setup>
import eyesOpen from '@/assets/images/common/eyes-open.png';
import eyesClose from '@/assets/images/common/eyes-close.png';

import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpTabs from '@/components/dadp-ui/dadp-tabs.vue';
import echartsLine from '@/components/charts/echarts-line.vue';
import echartsPie from '@/components/charts/echarts-pie.vue';
import { getAssetStruct, getmAlTrendChart } from '@/apis/cust';
import { fmtMaskData, fmtThousands } from '@/utils/format';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});

const dataMap = reactive({
  //存款是否脱敏
  isDepMark: false,

  depActive: '1',
  depTypeActive: '1',
  depTypeOptions: [
    {
      value: '1',
      content: '余额',
    },
    {
      value: '2',
      content: '年日均',
    },
    {
      value: '3',
      content: '季日均',
    },
    {
      value: '4',
      content: '月日均',
    },
  ],

  // 存款周期切换
  rangeOptions: [
    {
      text: '近30天',
      label: '1',
    },
    {
      text: '近12个月',
      label: '3',
    },
    {
      text: '月',
      label: '2',
    },
    {
      text: '季',
      label: '4',
    },
    {
      text: '年',
      label: '5',
    },
  ],
  rangeText: '近30天',
  rangeValue: '1',

  pieFormatter: (params: any) => {
    let _ans = params?.[0] || params;
    return `${_ans.marker}<span style="color:#666;font-weight:400;margin-left:2px">${
      _ans.name
    }</span><span style="float:right;margin-left:20px;color:#666;font-weight:900">${fmtMaskData(
      fmtThousands(_ans.data.balValue, 2),
      dataMap.isDepMark
    )}</span><span style="float:right;margin-left:20px;color:#666;font-weight:900">${fmtMaskData(
      fmtThousands(_ans.value, 2) + '%',
      dataMap.isDepMark
    )}</span>`;
  },
  lineFormatter: (params: any) => {
    let _ans = params?.[0] || params;
    return `${_ans.marker}<span style="color:#666;font-weight:400;margin-left:2px">${
      _ans.name
    }</span><span style="float:right;margin-left:20px;color:#666;font-weight:900">${fmtMaskData(
      fmtThousands(_ans.value, 2),
      dataMap.isDepMark
    )}</span>`;
  },
  subtext: '',
  pieData: Array<any>(),
  xData: [],
  series: [
    {
      showSymbol: true,
      symbol: 'circle',
      data: [],
      type: 'line',
      name: '',
    },
  ],
});

const {
  isDepMark,
  depActive,
  depTypeActive,
  depTypeOptions,
  rangeText,
  rangeOptions,
  pieFormatter,
  lineFormatter,
  subtext,
  pieData,
  xData,
  series,
} = toRefs(dataMap);

// 切换存款周期
const rangeSelect = (val: any) => {
  dataMap.rangeText = val.text;
  dataMap.rangeValue = val.label;
  getDepPieCharts();
};
// 获取存款图表信息
const getDepPieCharts = async () => {
  if (dataMap.depActive === '1') {
    const { code, data } = await getAssetStruct({ custId: props.custInfo.custId, structType: dataMap.depTypeActive });
    if (code === 200) {
      let _total = 0;
      data.forEach((item: any) => {
        _total += item.balValue;
      });
      dataMap.pieData = data;
      dataMap.subtext = fmtMaskData(fmtThousands(_total, 2), dataMap.isDepMark);
    }
  } else {
    const { code, data } = await getmAlTrendChart({
      custId: props.custInfo.custId,
      structType: dataMap.depTypeActive,
      dataRange: dataMap.rangeValue,
      adBigType: 'A',
    });
    if (code === 200) {
      dataMap.series[0].data = data.map((item: any) => item.bal);
      dataMap.xData = data.map((item: any) => item.dataDate);
    }
  }
};

onMounted(() => {
  getDepPieCharts();
});
</script>
<style lang="less" scoped>
.icon {
  width: 40px;
  height: 26px;
}
.my-dadp-tabs {
  padding: 32px 0;
}
.charts {
  height: 400px;
  width: 100%;
}
</style>
