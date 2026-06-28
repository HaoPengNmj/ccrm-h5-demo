<!--
 * @desc: 客户概况
 * @Date: 2024-10-16 14:35:58
 * @LastEditTime: 2024-10-16 16:13:39
-->
<template>
  <van-swipe class="my-swipe" :autoplay="0" indicator-color="#FF8812" :loop="false">
    <van-swipe-item>
      <div class="chart-contianer">
        <div class="contianer-body">
          <echarts-pie
            text="总客户数 (户)"
            :subtext="fmtMaskData(fmtThousands(total, 0), maskStatus)"
            :data="pieData"
            :question="toastTip"
          ></echarts-pie>
        </div>
        <div class="contianer-footer">
          <div class="legend-item" v-for="(item, index) in pieData" :key="index">
            <div class="item-left">
              <div class="dot" :style="{ backgroundColor: item.color }"></div>
            </div>
            <div class="item-right">
              <div class="title">{{ item.name }}</div>
              <div class="sub-title">
                {{ fmtMaskData(item.custNumRate || '--', maskStatus) }} &nbsp;&nbsp;&nbsp;
                {{ fmtMaskData(fmtThousands(item.value, 0), maskStatus) }}
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
            <span class="sub-title">单位：户</span>
          </div>
          <div class="header-right">
            <van-space>
              <!-- 客户等级 -->
              <van-popover :actions="custLvOptions" placement="left" @select="(val) => ((custLvText = val.text), (custLv = val.value))">
                <template #reference>
                  {{ custLvText }}
                  <van-icon name="arrow-down"></van-icon>
                </template>
              </van-popover>
            </van-space>
          </div>
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
import { codeTranslate, getCombo } from '@/hook/code-hook';
import { fmtMaskData, fmtThousands } from '@/utils/format';
import { getStorage } from '@/storage/storage';
import { ccmListCustFocus, devMigrate, devMigrateHis } from '@/apis/cust';

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

// 口径说明
const toastTip = computed(() => {
  // 条线
  let _businessLine = props.businessLine === '2' ? '公司' : props.businessLine === '3' ? '个人' : '普惠';

  // 管户类型
  let _custMgrType = props.custMgrType === '0' ? '主管' : '共管';

  // 客户类型
  let _custType = props.custType === '2' ? '公司' : '个人';

  // 普惠客户管户类型
  let array = [
    { content: '个人主管', value: 'P0' },
    { content: '个人共管', value: 'P1' },
    { content: '公司主管', value: 'E0' },
    { content: '公司共管', value: 'E1' },
  ];
  let incluCustMgrType = array.find((e) => e.value === props.incluCustMgrType)?.content;

  if (!userInfo.isManager) {
    return props.businessLine !== '4' ? `${_businessLine}客户的${_custMgrType}客户数` : `${_businessLine}客户的${incluCustMgrType}客户数`;
  } else {
    return props.businessLine !== '4' ? `${_businessLine}客户的客户数` : `${_businessLine}客户的${_custType}客户数`;
  }
});

const getComboStr = () => {
  if (props.businessLine === '3') {
    return 'pcmCustBaseLevel';
  } else if (props.businessLine === '2') {
    return 'ccmCustBaseLevel';
  } else if (props.custType) {
    return props.custType === '2' ? 'ccmCustBaseLevel' : 'pcmCustBaseLevel';
  } else {
    return props.incluCustMgrType.includes('P') ? 'pcmCustBaseLevel' : 'ccmCustBaseLevel';
  }
};

// 客户等级：趋势图专用
const custLv = ref('0');
const custLvText = ref('全部');
const custLvOptions = (getCombo('pcust_lvl') || [])
  .map((item: any) => {
    return { text: item.content, value: item.value };
  })
  .concat([{ text: '全部', value: '0' }]);

const responseData = ref([] as any);
const total = ref(0);
const pieData = ref();
const series = ref([
  {
    name: '客户数',
    type: 'line',
    data: [],
  },
]);
const xData = ref();

// 加载饼图数据
const getDataPie = async () => {
  const { code, data } = await devMigrate({
    orgId: userInfo.orgId,
    businessLine: props.businessLine,
    custType: props.custType, // 普惠条线-管理员：客户类型
    incluCustMgrType: props.incluCustMgrType, // 普惠条线-非管理员（管户人等）：普惠客户管户类型
    custMgrType: props.custMgrType, // 非普惠条线-非管理员（管户人等）：管户类型
  });
  if (code === 200) {
    total.value = 0;

    // 排序
    let ans = data.sort((a: any, b: any) => b.custLv.replace('L', '') - a.custLv.replace('L', ''));

    // 去重
    // const seen = new Set();
    // ans = ans.filter((e: any) => {
    //   return seen.has(e.custLv) ? false : seen.add(e.custLv);
    // });
    pieData.value = ans.map((e: any, index: number) => {
      total.value += e.custNum;
      return {
        value: e.custNum,
        name: codeTranslate(getComboStr(), e.custLv),
        color: customTheme.color[index],
        custNumRate: e.custNumRate + '%',
      };
    });
  }
};
// 加载趋势图数据
const getDataLine = async () => {
  const { data } = await devMigrateHis({
    orgId: userInfo.orgId,
    businessLine: props.businessLine,
    custLv: custLv.value,
    custType: props.custType, // 普惠条线-管理员：客户类型
    incluCustMgrType: props.incluCustMgrType, // 普惠条线-非管理员（管户人等）：普惠客户管户类型
    custMgrType: props.custMgrType, // 非普惠条线-非管理员（管户人等）：管户类型
  });
  responseData.value = data || [];
};

watchEffect(() => {
  xData.value = responseData.value.map((e: any) => e.ymDate);
  series.value[0].data = responseData.value.map((e: any) => fmtMaskData(e.custNum, props.maskStatus));
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
