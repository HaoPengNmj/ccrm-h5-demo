<template>
  <div class="coorperate-info">
    <component v-for="item in comps" :key="item.refName" :is="item.com" :ref="item.refName" :custInfo="custInfo"></component>
  </div>
</template>
<script lang="ts" setup>
import valueInfo from './components/value-info.vue';
import levelTrend from './components/level-trend.vue';
import depSituation from './components/dep-situation.vue';
import loanStituation from './components/loan-situation.vue';
import midIncomeTrend from './components/midIncome-trend.vue';
import midIncomeStructure from './components/midIncome-structure.vue';

defineOptions({ name: 'ccm-view-coorperate-info' });

const route = useRoute();
const dataMap = reactive({
  comps: [
    {
      // 价值信息
      refName: 'valueInfoRef',
      com: shallowRef(valueInfo),
    },
    {
      // 客户升降级趋势
      refName: 'levelTrendRef',
      com: shallowRef(levelTrend),
    },
    {
      // 存款情况
      refName: 'depSituationRef',
      com: shallowRef(depSituation),
    },
    {
      // 贷款情况
      refName: 'loanSituationRef',
      com: shallowRef(loanStituation),
    },
    {
      // 中收业务趋势
      refName: 'midIncomeTrendRef',
      com: shallowRef(midIncomeTrend),
    },
    {
      // 中收业务结构
      refName: 'midIncomeStructureRef',
      com: shallowRef(midIncomeStructure),
    },
  ],
  custInfo: {
    custId: route.params.custId,
  },
});
const { comps, custInfo } = toRefs(dataMap);
</script>

<style lang="less" scoped>
.coorperate-info {
  padding: 0 32px 32px;
  :deep(.info-header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 5px 24px;
    .left {
      font-family: PingFangSC-Semibold;
      font-size: @font-size-36;
      color: @text;
      letter-spacing: 0;
      line-height: 36px;
      font-weight: 600;
    }
    .right {
      font-family: PingFangSC-Regular;
      font-size: @font-size-28;
      color: @text;
      letter-spacing: 0;
      text-align: right;
      line-height: 28px;
      font-weight: 400;
    }
  }
}
</style>
