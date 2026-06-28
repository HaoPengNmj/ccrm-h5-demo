<template>
  <dadp-card class="pcm-view-card" title="贷款分析" is-body-padding>
    <template #header-right>
      <van-image class="icon" :src="isLoanMark ? eyesClose : eyesOpen" @click="isLoanMark = !isLoanMark"></van-image>
    </template>
    <div class="top-card">
      <div class="top-card-items">
        <div class="top-card-items-label">授信额度合计（元）</div>
        <div class="top-card-items-value">{{ fmtMaskData(fmtThousands(creditInfo.creditLimit), isLoanMark) }}</div>
      </div>
      <div class="top-card-items">
        <div class="top-card-items-label">可用额度合计（元）</div>
        <div class="top-card-items-value">{{ fmtMaskData(fmtThousands(creditInfo.creditAvailableLimit), isLoanMark) }}</div>
      </div>
    </div>
    <van-tabs v-model:active="loanActive" type="card" :ellipsis="false" @change="getLoanPieCharts">
      <van-tab title="贷款结构" name="1"></van-tab>
      <van-tab title="贷款变动" name="2"></van-tab>
    </van-tabs>
    <dadp-tabs class="my-dadp-tabs" v-model="loanTypeActive" :options="loanTypeOptions" @change="getLoanPieCharts"></dadp-tabs>
    <div style="text-align: right">
      <van-popover v-if="loanActive === '2'" :actions="rangeOptions" placement="bottom" @select="rangeSelect">
        <template #reference>
          {{ rangeText }}
          <van-icon name="arrow-down"></van-icon>
        </template>
      </van-popover>
    </div>
    <div class="charts" v-if="loanActive === '1'">
      <echarts-pie text="总金额" :subtext="fmtMaskData(subtext, isLoanMark)" :data="pieData" :tooltip="pieFormatter" show-legend></echarts-pie>
    </div>
    <div class="charts" v-if="loanActive === '2'">
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
import { getmAlTrendChart, getCreditInfo, getDebtStruct } from '@/apis/cust';
import { fmtMaskData, fmtThousands } from '@/utils/format';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});
const dataMap = reactive({
  isLoanMark: false,

  //授信额度信息
  creditInfo: Object(),

  // 资产结构、资产变动
  loanActive: '1',
  // 贷款类型
  loanTypeOptions: [
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
  loanTypeActive: '1',

  // 周期
  rangeText: '近30天',
  rangeValue: '1',
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

  pieFormatter: (params: any) => {
    let _ans = params?.[0] || params;
    return `${_ans.marker}<span style="color:#666;font-weight:400;margin-left:2px">${
      _ans.name
    }</span><span style="float:right;margin-left:20px;color:#666;font-weight:900">${fmtMaskData(
      fmtThousands(_ans.data.balValue, 2),
      dataMap.isLoanMark
    )}</span><span style="float:right;margin-left:20px;color:#666;font-weight:900">${fmtMaskData(
      fmtThousands(_ans.value, 2) + '%',
      dataMap.isLoanMark
    )}</span>`;
  },
  lineFormatter: (params: any) => {
    let _ans = params?.[0] || params;
    return `${_ans.marker}<span style="color:#666;font-weight:400;margin-left:2px">${
      _ans.name
    }</span><span style="float:right;margin-left:20px;color:#666;font-weight:900">${fmtMaskData(
      fmtThousands(_ans.value),
      dataMap.isLoanMark
    )}</span>`;
  },
  subtext: '',
  pieData: Array<any>(),
  xData: [],
  series: [
    {
      data: [],
      type: 'line',
      name: '',
    },
  ],
});

const {
  isLoanMark,
  creditInfo,
  loanActive,
  loanTypeOptions,
  loanTypeActive,
  rangeText,
  rangeOptions,
  pieFormatter,
  lineFormatter,
  subtext,
  pieData,
  xData,
  series,
} = toRefs(dataMap);

// 切换贷款周期
const rangeSelect = (val: any) => {
  dataMap.rangeText = val.text;
  dataMap.rangeValue = val.label;
  getLoanPieCharts();
};

// 获取授信额度getCreditInfo
const getCredit = async () => {
  let fd = new FormData();
  fd.append('custId', props.custInfo.custId);
  const { data } = await getCreditInfo(fd);
  if (data) dataMap.creditInfo = data;
};

// 获取贷款信息
const getLoanPieCharts = async () => {
  if (dataMap.loanActive === '1') {
    const { code, data } = await getDebtStruct({ custId: props.custInfo.custId, structType: dataMap.loanTypeActive });
    if (code === 200) {
      let _total = 0;
      data.forEach((item: any) => {
        _total += item.balValue;
      });
      dataMap.pieData = data;
      dataMap.subtext = fmtMaskData(fmtThousands(_total, 2), dataMap.isLoanMark);
    }
  } else {
    const { code, data } = await getmAlTrendChart({
      custId: props.custInfo.custId,
      structType: dataMap.loanTypeActive,
      dataRange: dataMap.rangeValue,
      adBigType: 'L',
    });
    if (code === 200) {
      dataMap.series[0].data = data.map((item: any) => item.bal);
      dataMap.xData = data.map((item: any) => item.dataDate);
    }
  }
};

onMounted(() => {
  getCredit();
  getLoanPieCharts();
});
</script>

<style lang="less" scoped>
.top-card {
  background-image: linear-gradient(180deg, #fdf6ea 0%, #ffffff 100%);
  border-radius: 20px;
  padding: 32px 30px;
  display: flex;
  justify-content: space-between;

  &-items {
    width: 50%;
    text-align: center;

    &-label {
      font-size: 22px;
      color: @sub-text;
      letter-spacing: 0;
      text-align: center;
      line-height: 22px;
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
