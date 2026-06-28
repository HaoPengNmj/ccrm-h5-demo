<!--
 * @desc: 公司-贸易融资-item
 * @Date: 2024-10-08 18:15:17
 * @LastEditTime: 2024-10-09 16:06:38
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
    </div>
    <div class="item-content">
      <div class="content-ele">
        <div class="value">{{ codeTranslate(moduleComp.corporation.trade.codeCombo, data.prodType) || '--' }}</div>
        <div class="label">产品类型</div>
      </div>
      <div class="content-ele">
        <div class="value">{{ codeTranslate('currency', data.currency) || '--' }}</div>
        <div class="label">币种</div>
      </div>
      <div class="content-ele">
        <div class="value">{{ data.investMonth || '--' }}</div>
        <div class="label" style="text-align: right">期限（月）</div>
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
