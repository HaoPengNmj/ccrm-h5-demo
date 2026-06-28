<!--
 * @desc: 业绩-业绩指标
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-09-27 14:35:41
-->
<template>
  <div class="perf-index">
    <dadp-card is-body-padding :style="isHome ? 'box-shadow: none' : ''">
      <div class="container">
        <div class="container-header">
          <div class="container-header-left">
            <span>业绩指标</span>
            <van-image class="eyes-icon" :src="isMask ? eyesClose : eyesOpen" @click="maskData" />
          </div>
          <busi-index v-model="KPI" label="" input-align="right" placeholder="请选择" @do-select="selectIndex"></busi-index>
        </div>
        <div class="container-content">
          <div class="content-header">
            <div class="col">
              <div class="col-value1">{{ fmtMaskData(fmtThousands(fmtNumber(responseData?.indexVal).value, 2), isMask) }}</div>
              <div class="col-label1">当前值({{ fmtNumber(responseData?.indexVal).unit }})</div>
            </div>
            <div class="row">
              <div class="col">
                <dadp-num
                  :value="fmtMaskData(amountUnitConvert(responseData?.lastDay), isMask)"
                  show-icon
                  show-plus-sign
                  :toFixedNum="2"
                ></dadp-num>
                <div class="col-label2">比上日（万元）</div>
              </div>
              <div class="col">
                <dadp-num
                  :value="fmtMaskData(amountUnitConvert(responseData?.lastMonth), isMask)"
                  show-icon
                  show-plus-sign
                  :toFixedNum="2"
                ></dadp-num>
                <div class="col-label2">比上月（万元）</div>
              </div>
              <div class="col">
                <dadp-num
                  :value="fmtMaskData(amountUnitConvert(responseData?.lastYear), isMask)"
                  show-icon
                  show-plus-sign
                  :toFixedNum="2"
                ></dadp-num>
                <div class="col-label2">比上年（万元）</div>
              </div>
            </div>
          </div>
          <div class="content-body">
            <echarts-line :x-data="xData" :series="series" :tooltip="tooltipFunc"></echarts-line>
          </div>
          <div>数据日期：{{ dataDate }}</div>
        </div>
      </div>
    </dadp-card>
  </div>
</template>
<script setup lang="ts">
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpNum from '@/components/dadp-ui/dadp-num.vue';
import echartsLine from '@/components/charts/echarts-line.vue';
import { getPerfIndexList } from '@/apis/perf';
import { fmtMaskData, fmtNumber, fmtThousands } from '@/utils/format';
import busiIndex from '@/components/business/busi-index.vue';
import eyesOpen from '@/assets/images/common/eyes-open.png';
import eyesClose from '@/assets/images/common/eyes-close.png';
import { amountUnitConvert } from '@/utils/global';
const props = defineProps({
  // 是否首页引用
  isHome: {
    type: Boolean,
    defult: false,
  },
  // 首页条件
  query: {
    type: String,
    default: '',
  },
});

const responseData = ref();
const xData = ref();
const series = ref([
  {
    name: '当年',
    type: 'line',
    data: [],
    showSymbol: true,
    symbol: 'circle',
  },
  {
    name: '去年',
    type: 'line',
    data: [],
    showSymbol: true,
    symbol: 'circle',
  },
]);
const dataDate = ref('--');

// 默认各项存款（绩效）
const KPI = ref(['BGM0000274']);
const isMask = ref(false);
const tooltipFunc = (params: any) => {
  let _ans = params?.[0] || params;
  return `${_ans.marker}<span style="color:#666;font-weight:400;margin-left:2px">${
    _ans.name
  }</span><span style="float:right;margin-left:20px;color:#666;font-weight:900">${fmtMaskData(
    fmtThousands(_ans.value, 2),
    isMask.value
  )}</span>`;
};
// 获取汇总数
const getData = async () => {
  const { data } = await getPerfIndexList({ indexId: KPI.value[0] });
  if (data) {
    let _data = data.indexChartNodeList?.reverse() || [];
    xData.value = _data?.map((e: any, index: number) => (index === _data?.length - 1 ? e.dataDate : e.dataDate.substring(0, 6))) || [];
    series.value[0].data = data.indexChartNodeList?.map((e: any) => amountUnitConvert(e?.indexValMon)) || [];
    series.value[1].data = data.indexChartNodeList?.map((e: any) => amountUnitConvert(e?.lastYearIndexVal)) || [];
    if (data.indexChartNodeList.length > 0) {
      dataDate.value = data.indexChartNodeList[data.indexChartNodeList.length - 1].dataDate;
    } else {
      dataDate.value = '--';
    }
    responseData.value = data;
  } else {
    xData.value = [];
    series.value[0].data = [];
    series.value[1].data = [];
    responseData.value = {};
  }
};
// 选择指标回调方法
const selectIndex = (val: any, checkData: any) => {
  getData();
};
// 脱敏点击事件
const maskData = () => {
  isMask.value = !isMask.value;
};
onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped>
.perf-index {
  padding: 24px;
  .container {
    &-header {
      position: relative;
      top: -15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-left {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: @font-size-32;
        letter-spacing: 0;
        line-height: 32px;
        font-weight: 500;
        white-space: nowrap;
      }
      .eyes-icon {
        height: 26px;
        width: 40px;
        margin-left: 16px;
      }
    }
    &-content {
      border-radius: 20px;
      .content-header {
        padding: 30px 0;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        background-image: linear-gradient(180deg, #fdf6ea 0%, #ffffff 50%);
        .row {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          letter-spacing: 0;
          margin-top: 40px;
        }
        .col {
          flex: 1;
          text-align: center;
          letter-spacing: 0;
          &-value1 {
            font-family: DINAlternate-Bold;
            font-size: @font-size-36;
            line-height: 36px;
            font-weight: 700;
          }
          &-value2 {
            font-family: DINAlternate-Bold;
            font-size: @font-size-34;
            line-height: 34px;
            font-weight: 700;
          }
          &-label1 {
            font-family: PingFangSC-Regular;
            font-size: @font-size-28;
            line-height: 28px;
            font-weight: 400;
            margin-top: 16px;
          }
          &-label2 {
            font-family: PingFangSC-Regular;
            font-size: @font-size-22;
            color: @gray;
            line-height: 22px;
            font-weight: 400;
            margin-top: 13px;
          }
        }
      }
      .content-body {
        height: 500px;
      }
    }
  }
}
</style>
