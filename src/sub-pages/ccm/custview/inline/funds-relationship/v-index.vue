<template>
  <div class="funds-relationship">
    <component v-for="item in comps" :key="item.refName" :is="item.com" :ref="item.refName" :custInfo="custInfo"></component>
  </div>
</template>
<script lang="ts" setup>
import flowInfo from './components/flow-info.vue';
import financialTransactions from './components/financial-transactions.vue';
import counterpartyTen from './components/counterparty-ten.vue';

defineOptions({ name: 'ccm-view-funds-relationship' });

const route = useRoute();

const dataMap = reactive({
  comps: [
    // 流水信息
    {
      refName: 'flowInfoRef',
      com: shallowRef(flowInfo),
    },
    // 资金累积交易
    {
      refName: 'financialTransactionsRef',
      com: shallowRef(financialTransactions),
    },
    // 前10大交易对手
    {
      refName: 'depSituationRef',
      com: shallowRef(counterpartyTen),
    },
  ],
  custInfo: {
    custId: route.params.custId,
    custName: route.params.custName,
  },
});
const { comps, custInfo } = toRefs(dataMap);
</script>

<style lang="less" scoped>
.funds-relationship {
  padding: 0 32px 32px;
}
</style>
