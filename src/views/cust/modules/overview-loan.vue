<!--
 * @desc: 贷款概况
 * @Date: 2024-10-16 14:36:00
 * @LastEditTime: 2024-10-16 14:45:56
-->
<template>
  <div class="chart-contianer">
    <div class="contianer-header">
      <div class="header-left">
        <span class="sub-title">单位：万元</span>
      </div>
      <div class="header-right">
        <van-popover :actions="loanTypeOptions" placement="left" @select="(val) => ((loanType = val.value), (loanTypeText = val.text))">
          <template #reference>
            <span class="title">{{ loanTypeText }}</span>
            <van-icon name="arrow-down"></van-icon>
          </template>
        </van-popover>
      </div>
    </div>
    <div class="contianer-body"><echarts-line :x-data="xData" :series="series" :options="options"></echarts-line></div>
  </div>
</template>

<script lang="ts" setup>
import echartsLine from '@/components/charts/echarts-line.vue';
import { autoRem } from '@/components/charts/charts-hook';
import { getStorage } from '@/storage/storage';
import { getCombo } from '@/hook/code-hook';
import { custLoanBrok } from '@/apis/cust';
import { fmtMaskData } from '@/utils/format';
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

/**
 * 贷款条线
 *  1、管户类型选中个人主管或个人共管时，可选项包括：消费条线贷款、普惠条线贷款、公司条线贷款
 *  2、管户类型选中公司主管或公司共管时，可选项包括：公司条线贷款、普惠条线贷款
 */
const loanTypeOptions = computed(() => {
  return (getCombo('loanType') || [])
    .filter((item: any) => {
      if (props.businessLine === '3') {
        /**
         * 个人条线 3
         *
         * 消费条线个人贷款 1
         */
        return item.value === '1' || (item.value === '7' && !!props.custMgrType) || (item.value === '8' && !!props.custMgrType);
      } else if (props.businessLine === '2') {
        /**
         * 公司条线 2
         *
         * 全部公司条线贷款 13
         * 公司条线公司贷款 2
         * 公司条线个人贷款 7
         * 贸易融资余额 15
         * 贴现余额 16
         */
        return (
          (item.value === '13' && !props.incluCustMgrType && !props.custMgrType) ||
          item.value === '2' ||
          (item.value === '7' && !props.custMgrType) ||
          (item.value === '15' && !props.incluCustMgrType && !props.custMgrType) ||
          (item.value === '16' && !props.incluCustMgrType && !props.custMgrType) ||
          (item.value === '10' && !!props.custMgrType)
        );
      } else {
        /**
         * 普惠条线 4
         *
         * 全部普惠条线贷款 14
         * 普惠条线个人贷款 8
         * 普惠条线公司贷款 10
         */
        return (
          (item.value === '14' && !props.incluCustMgrType && !props.custMgrType) ||
          (item.value === '8' &&
            ((!props.incluCustMgrType && !props.custMgrType) || props.incluCustMgrType === 'P0' || props.incluCustMgrType === 'P1')) ||
          (item.value === '10' &&
            ((!props.incluCustMgrType && !props.custMgrType) || props.incluCustMgrType === 'E0' || props.incluCustMgrType === 'E1'))
        );
      }
    })
    .map((item: any) => {
      return { text: item.content, value: item.value };
    });
});
const loanType = ref();
const loanTypeText = ref();
watchEffect(() => {
  loanType.value = loanTypeOptions.value[0]?.value;
  loanTypeText.value = loanTypeOptions.value[0]?.text;
});

// 图表配置
const responseData = ref([] as any);
const options = {
  yAxis: [
    {
      type: 'value',
      name: '贷款余额',
      axisLabel: {
        fontSize: autoRem(22),
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#eee',
        },
      },
    },
    {
      type: 'value',
      name: '加权利率',
      // min: function (value) {
      //   return value.min - 1;
      // },
      // max: function (value) {
      //   return value.max + 1;
      // },
      // interval: 20,
      axisLabel: {
        fontSize: autoRem(22),
        formatter: '{value} %',
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#eee',
        },
      },
    },
  ],
};
const series = ref([
  {
    name: '贷款余额',
    type: 'bar',
    data: [],
  },
  {
    name: '年日均',
    type: 'bar',
    data: [],
  },
  {
    name: '加权利率',
    type: 'line',
    yAxisIndex: 1,
    data: [],
  },
]);
const xData = ref();

const getData = async () => {
  const { code, data } = await custLoanBrok({
    orgId: userInfo.orgId,
    businessLine: props.businessLine,
    loanType: loanType.value,
    // custType: props.custType, // 普惠条线-管理员：客户类型
    incluCustMgrType: props.incluCustMgrType, // 普惠条线-非管理员（管户人等）：普惠客户管户类型
    custMgrType: props.custMgrType, // 非普惠条线-非管理员（管户人等）：管户类型
  });
  if (code === 200) {
    responseData.value = data;
  }
};

watchEffect(() => {
  series.value[0].data = responseData.value.map((k: any) => fmtMaskData(amountUnitConvert(k.loanBal), props.maskStatus));
  series.value[1].data = responseData.value.map((k: any) => fmtMaskData(amountUnitConvert(k.yearAvg), props.maskStatus));
  series.value[2].data = responseData.value.map((k: any) => fmtMaskData((k.weightRate * 100).toFixed(2), props.maskStatus));
  xData.value = responseData.value.map((k: any) => k.sumDate);
});

watchEffect(() => {
  getData();
});
</script>

<style lang="less" scoped>
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
</style>
