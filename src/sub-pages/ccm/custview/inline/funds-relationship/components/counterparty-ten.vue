<template>
  <div>
    <div class="title">前十大交易对手</div>
    <dadp-card is-body-padding>
      <van-tabs v-model:active="active" type="card" :ellipsis="false">
        <van-tab v-for="item in getCombo('custViewCycleType')" :key="item.value" :title="item.content" :name="item.value"></van-tab>
      </van-tabs>
      <div class="total">
        <div class="total-left">
          <div class="total-left-item">
            <div class="label">上游客户数</div>
            <div class="value">{{ totalData?.upstreamCustNum || '--' }}</div>
          </div>
          <div class="total-left-item">
            <div class="label">下游客户数</div>
            <div class="value">{{ totalData?.downstreamCustNum || '--' }}</div>
          </div>
        </div>
        <div class="total-right">
          <div class="total-right-item">
            <div class="label">已开户客户数</div>
            <div class="value">{{ totalData?.alreadyInOpenNum || '--' }}</div>
          </div>
          <div class="total-right-item">
            <div class="label">未开户客户数</div>
            <div class="value">{{ totalData?.notInOpenNum || '--' }}</div>
          </div>
        </div>
      </div>

      <van-tabs class="oppRan" v-model:active="oppRan" type="card" :ellipsis="false">
        <van-tab title="前五对手" name="5"></van-tab>
        <van-tab title="前十对手" name="10"></van-tab>
      </van-tabs>
      <div class="chart">
        <div class="center-header">
          <div class="center-header-title" style="margin: auto; display: flex">
            <van-image :src="radioBlue" />
            <span style="margin: 0px">我行授信客户</span>
            <van-image :src="radioOrange" />
            <span style="margin: 0px">我行非授信客户</span>
            <van-image :src="radioGrey" />
            <span style="margin: 0px">非我行客户</span>
          </div>
        </div>
        <div class="chart-in">
          <div
            v-for="item in tradeInData"
            class="chart-in-item"
            :class="item.myBankType == '1' ? 'chart-in-item1' : item.myBankType == '2' ? 'chart-in-item2' : 'chart-in-item3'"
          >
            {{ item.inflowUserName }}
          </div>
        </div>
        <dadp-empty v-if="tradeInData?.length == 0"></dadp-empty>
        <div class="chart-arrows">
          <div class="chart-arrow">
            <div class="chart-arrow-text">资金流入</div>
            <van-image class="chart-arrow-top" :src="arrow"></van-image>
          </div>
        </div>
        <div class="chart-mid">
          <div class="chart-mid-item">{{ custInfo.custName }}</div>
        </div>
        <div class="chart-arrows">
          <div class="chart-arrow">
            <div class="chart-arrow-text">资金流出</div>
            <van-image class="chart-arrow-top" :src="arrow"></van-image>
          </div>
        </div>
        <dadp-empty v-if="tradeOutData.length == 0"></dadp-empty>
        <div class="chart-in">
          <div
            v-for="item in tradeOutData"
            class="chart-in-item"
            :class="item.myBankType == '1' ? 'chart-in-item1' : item.myBankType == '2' ? 'chart-in-item2' : 'chart-in-item3'"
          >
            {{ item.outflowUserName }}
          </div>
        </div>
      </div>
    </dadp-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getCombo } from '@/hook/code-hook';
import { getTradeRivalList, getInTradeRivalList, getOutTradeRivalList } from '@/apis/cust';
import { series } from './hook';
import arrow from '@/assets/images/cust/view/youjiantou.png';
import radioBlue from '@/assets/images/cust/view/radio-blue.png';
import radioOrange from '@/assets/images/cust/view/radio-orange.png';
import radioGrey from '@/assets/images/cust/view/radio-grey.png';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const tradeChartRef = ref();
const dataMap = reactive({
  totalData: Object(),
  active: getCombo('custViewCycleType')[0].value,
  oppRan: '5',
  tradeSeries: series,
  tradeInData: Array<any>(),
  tradeOutData: Array<any>(),
});
const { active, totalData, oppRan, tradeInData, tradeOutData } = toRefs(dataMap);
// 获取流入交易对手信息
const getInTradeRivalLists = async () => {
  const { data } = await getInTradeRivalList({ custId: props.custInfo.custId, statPeriod: dataMap.active, oppRan: dataMap.oppRan });
  dataMap.tradeInData = data;
};
// 获取流出交易对手信息
const getOutTradeRivalLists = async () => {
  const { data } = await getOutTradeRivalList({ custId: props.custInfo.custId, statPeriod: dataMap.active, oppRan: dataMap.oppRan });
  dataMap.tradeOutData = data;
};
// 获取客户数数据
const getTotalData = async () => {
  const { data } = await getTradeRivalList({ custId: props.custInfo.custId, statPeriod: dataMap.active, oppRan: dataMap.oppRan });
  if (data) {
    dataMap.totalData = data;
  } else {
    dataMap.totalData = {};
  }
};
watchEffect(() => {
  if (props.custInfo.custId) {
    getTotalData();
    getInTradeRivalLists();
    getOutTradeRivalLists();
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

.total {
  display: flex;
  justify-content: space-between;

  &-left {
    width: 46%;

    &-item {
      padding: 24px;
      height: 120px;
      background: rgba(255, 194, 140, 0.1);
      color: #ff6c31;
      border-radius: 20px;
      margin-top: 32px;
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      letter-spacing: 0;
      line-height: 72px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
  }

  &-right {
    width: 46%;

    &-item {
      padding: 24px;
      height: 120px;
      background: rgba(40, 224, 255, 0.1);
      color: #1d70f5;
      border-radius: 20px;
      margin-top: 32px;
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      letter-spacing: 0;
      line-height: 72px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
  }
}

.oppRan {
  margin-top: 32px;
}

.center-header {
  width: 100%;
  text-align: center;
  // font-size: 14px;
  margin: auto;
  &-title {
    text-align: center;
    justify-content: center;
    line-height: 28px;
    .van-image {
      width: 28px;
      height: 28px;
    }
  }
}

.chart {
  // height: 400px;
  width: 100%;
  margin: 24px 0;
  &-in {
    padding-top: 16px;
    display: flex;
    text-align: center;
    margin: auto;
    justify-content: space-around;
    &-item {
      height: 300px;
      width: 2em;
      padding: 10px;
      border-radius: 10px;
      writing-mode: vertical-rl;
      // 纵向排列
      white-space: nowrap;
      /* 防止换行 */
      overflow: hidden;
      /* 隐藏溢出部分 */
      text-overflow: ellipsis;
      /* 显示省略号 */
    }
    &-item1 {
      // background-color: ;
      border: 2px solid #8ac7ed;
    }
    &-item2 {
      // background-color: ;
      border: 2px solid #f3b38c;
    }
    &-item3 {
      // background-color: ;
      border: 2px solid #999999;
    }
  }
  &-arrows {
    text-align: center;
    height: 180px;
    padding-top: 55px;
  }
  &-arrow {
    height: 72px;
    text-align: center;
    transform: rotate(90deg);
    display: inline-block;
    &-top {
      height: 36px;
      width: 180px;
    }
  }
  &-mid {
    text-align: center;
    &-item {
      display: inline-block;
      margin: 16px 0;
      text-align: center;
      padding: 10px;
      // width: 50%;
      max-width: 100%;
      background-color: rgba(204, 175, 8, 0.2);
      border-radius: 10px;
      border: 1px solid #02a7f0;
      white-space: nowrap;
      /* 防止换行 */
      overflow: hidden;
      /* 隐藏溢出部分 */
      text-overflow: ellipsis;
    }
  }
}
</style>
