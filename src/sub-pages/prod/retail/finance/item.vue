<!--
 * @desc: 零售-理财-item
 * @Date: 2024-10-08 18:10:35
 * @LastEditTime: 2024-10-09 15:55:56
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
    </div>
    <div class="item-content">
      <div class="content-ele">
        <div class="value">{{ codeTranslate(moduleComp.retail.finance.codeCombo, data.prodType) || '--' }}</div>
        <div class="label">产品类型</div>
      </div>
      <div class="content-ele">
        <div class="value">{{ codeTranslate('riskLevel', data.riskLevel) || '--' }}</div>
        <div class="label" style="text-align: center">风险等级</div>
      </div>
      <div class="content-ele">
        <div class="red-value">
          <span class="big">{{ fmtThousands(data.annualYield, 2) }}</span>
          %
        </div>
        <div class="label" style="text-align: right">年化收益率</div>
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
