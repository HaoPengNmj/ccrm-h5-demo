<!--
 * @desc: 零售-基金-item
 * @Date: 2024-10-08 18:10:35
 * @LastEditTime: 2024-10-09 15:55:47
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
    </div>
    <div class="item-content" style="justify-content: space-around">
      <div class="content-ele" style="text-align: center">
        <div class="value">{{ codeTranslate(moduleComp.retail.fund.codeCombo, data.prodType) || '--' }}</div>
        <div class="label">产品类型</div>
      </div>
      <div class="content-ele" style="text-align: center">
        <div class="value">{{ codeTranslate('riskLevel', data.riskLevel) }}</div>
        <div class="label">风险等级</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { codeTranslate } from '@/hook/code-hook';
import { fmtThousands } from '@/utils/format';
import { moduleComp } from '../../hook';

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="less" scoped>
@import '@/sub-pages/prod/prod-item.less';
</style>
