<!--
 * @desc: 公司-银承-item
 * @Date: 2024-10-08 18:10:35
 * @LastEditTime: 2024-10-09 16:04:18
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
    </div>
    <div class="item-content" style="justify-content: space-around">
      <div class="content-ele" style="text-align: center">
        <div class="value">{{ codeTranslate(moduleComp.corporation.silver.codeCombo, data.prodType) || '--' }}</div>
        <div class="label">产品类型</div>
      </div>
      <div class="content-ele" style="text-align: center">
        <div class="value">{{ codeTranslate('currency', data.currency) || '--' }}</div>
        <div class="label">币种</div>
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
