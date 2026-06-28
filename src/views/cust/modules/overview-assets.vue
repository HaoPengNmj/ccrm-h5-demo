<!--
 * @desc: 资产概况
 * @Date: 2024-10-16 14:35:58
 * @LastEditTime: 2025-01-15 17:04:29
-->
<template>
  <van-swipe class="my-swipe" :autoplay="0" indicator-color="#FF8812" :loop="false">
    <van-swipe-item>
      <div class="chart-contianer">
        <div class="contianer-body">
          <echarts-pie
            text="总AUM余额 (万元)"
            :subtext="fmtMaskData(fmtThousands(amountUnitConvert(total), 2), maskStatus)"
            :data="pieData"
          ></echarts-pie>
        </div>
        <div class="contianer-text">
          <span>
            &nbsp;&nbsp;&nbsp;存款 合计 {{ fmtMaskData(fmtThousands(amountUnitConvert(depObj.indexBal), 2), maskStatus) }}万元，占比
            {{ fmtMaskData(fmtPercent(depObj.indexRate), maskStatus) }}&nbsp;&nbsp;&nbsp;
          </span>
        </div>
        <div class="contianer-footer">
          <div class="legend-item" v-for="(item, index) in pieData" :key="index">
            <div class="item-left">
              <div class="dot" :style="{ backgroundColor: customTheme.color[index] }"></div>
            </div>
            <div class="item-right">
              <div class="title">{{ item.name }}</div>
              <div class="sub-title">
                {{ fmtMaskData(fmtPercent(item.indexRate), maskStatus) }} &nbsp;&nbsp;&nbsp;
                {{ fmtMaskData(fmtThousands(amountUnitConvert(item.indexBal), 2), maskStatus) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-swipe-item>
    <van-swipe-item>
      <div class="chart-contianer">
        <div class="contianer-header">
          <div class="header-left">
            <span class="title">AUM变化趋势图</span>
            <span class="sub-title">单位：万元</span>
          </div>
          <div class="header-right"></div>
        </div>
        <div class="contianer-body"><echarts-line :x-data="xData" :series="series"></echarts-line></div>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts" setup>
import echartsLine from '@/components/charts/echarts-line.vue';
import echartsPie from '@/components/charts/echarts-pie.vue';
import { customTheme } from '@/components/charts/charts-hook';
import { fmtThousands, fmtMaskData, fmtPercent } from '@/utils/format';
import { getStorage } from '@/storage/storage';
import { custAssetBrok, custAum } from '@/apis/cust';
import { amountUnitConvert } from '@/utils/global';

// 用户信息
const userInfo = getStorage('userInfo') || {};

const props = defineProps({
  // 条线
  businessLine: {
    type: String,
    default: '',
  },
  // 客户类型
  custType: {
    type: String,
    default: '',
  },
  // 管户类型
  custMgrType: {
    type: String,
    default: '',
  },
  // 普惠客户管户类型
  incluCustMgrType: {
    type: String,
    default: '',
  },
  // 是否脱敏
  maskStatus: {
    type: Boolean,
    default: false,
  },
});

const responseData = ref([] as any);

const total = ref(0);
const depObj = ref({ indexRate: null } as any);
const pieData = ref([]);

const series = ref([
  {
    name: 'AUM余额',
    type: 'line',
    data: [],
  },
  {
    name: 'AUM年日均',
    type: 'line',
    data: [],
  },
  {
    name: 'AUM月日均',
    type: 'line',
    data: [],
  },
]);
const xData = ref();

// 加载饼图数据
const getDataPie = async () => {
  const { code, data } = await custAum({
    orgId: userInfo.orgId,
    businessLine: props.businessLine,
    custType: props.custType, // 普惠条线-管理员：客户类型
    incluCustMgrType: props.incluCustMgrType, // 普惠条线-非管理员（管户人等）：普惠客户管户类型
    custMgrType: props.custMgrType, // 非普惠条线-非管理员（管户人等）：管户类型
  });
  if (code === 200) {
    total.value = 0;
    data.forEach((x: any) => {
      total.value += x.indexBal;
      if (x.indexName === '存款') {
        depObj.value = { ...x };
        pieData.value = pieData.value.concat(
          x.hpCustAumVOList?.map((e: any, index: number) => {
            return {
              value: amountUnitConvert(e.indexBal),
              name: e.indexName,
              color: customTheme.color[index],
              ...e,
            };
          })
        );
      } else {
        pieData.value.push({ value: amountUnitConvert(x.indexBal), name: x.indexName, ...x });
      }
    });
  }
};
// 加载趋势图数据
const getDataLine = async () => {
  const { code, data } = await custAssetBrok({
    businessLine: props.businessLine,
    orgId: userInfo.orgId,
    custType: props.custType, // 普惠条线-管理员：客户类型
    incluCustMgrType: props.incluCustMgrType, // 普惠条线-非管理员（管户人等）：普惠客户管户类型
    custMgrType: props.custMgrType, // 非普惠条线-非管理员（管户人等）：管户类型
  });
  if (code === 200) {
    responseData.value = data;
  }
};

watchEffect(() => {
  xData.value = responseData.value.map((e: any) => e.sumDate);
  series.value[0].data = responseData.value.map((e: any) => fmtMaskData(amountUnitConvert(e.assetBal), props.maskStatus));
  series.value[1].data = responseData.value.map((e: any) => fmtMaskData(amountUnitConvert(e.yearAvg), props.maskStatus));
  series.value[2].data = responseData.value.map((e: any) => fmtMaskData(amountUnitConvert(e.monAvg), props.maskStatus));
});

watchEffect(() => {
  getDataLine();
  getDataPie();
});
</script>

<style lang="less" scoped>
.my-swipe {
  .chart-contianer {
    box-sizing: border-box;
    height: 700px;
    padding: 0 20px 30px;
    display: flex;
    flex-direction: column;

    .contianer-header {
      height: 70px;
      flex: none;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header-left {
        .title {
          font-family: PingFangSC-Regular;
          font-size: @font-size-28;
          color: @text;
          letter-spacing: 0;
          line-height: 28px;
          font-weight: 400;
        }

        .sub-title {
          font-family: PingFangSC-Regular;
          font-size: @font-size-22;
          color: @gray;
          letter-spacing: 0;
          line-height: 28px;
          font-weight: 400;
          margin-left: 16px;
        }
      }

      .header-right {
        display: flex;
        align-items: center;
        justify-content: center;

        :deep(.van-popover__wrapper) {
          height: 30px;
        }

        .filter-icon {
          height: 30px;
          width: 30px;
        }
      }
    }

    .contianer-body {
      height: 0px;
      flex: auto;
    }

    .contianer-text {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;

      span {
        padding: 10px;
        border-radius: 20px;
        text-align: center;
        background-color: @gray-1;
        color: @gray-5;
        font-size: @font-size-24;
      }
    }

    .contianer-footer {
      height: 250px;
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      .legend-item {
        width: 50%;
        display: flex;

        .item-left {
          padding: 6px 12px 6px 24px;

          .dot {
            width: 22px;
            height: 12px;
            border-radius: 6px;
          }
        }

        .item-right {
          padding-bottom: 20px;

          .title {
            font-family: PingFangSC-Regular;
            font-size: @font-size-24;
            color: @text;
            letter-spacing: 0;
            line-height: 24px;
            font-weight: 400;
            padding-bottom: 16px;
          }

          .sub-title {
            font-family: PingFangSC-Regular;
            font-size: @font-size-22;
            color: @gray;
            letter-spacing: 0;
            line-height: 22px;
            font-weight: 400;
          }
        }
      }
    }
  }

  :deep(.van-swipe__indicators) {
    bottom: 0px;
  }
}
</style>
