<!--
 * @desc: 零售-贵金属-item
 * @Date: 2024-10-08 18:10:35
 * @LastEditTime: 2024-10-09 15:55:37
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
    </div>
    <div class="item-content">
      <div class="content-ele">
        <div class="value">{{ codeTranslate(moduleComp.retail.gold.codeCombo, data.prodType) || '--' }}</div>
        <div class="label">产品类型</div>
      </div>
      <div class="content-ele">
        <div class="value">{{ data.prodStandard || '--' }}</div>
        <div class="label" style="text-align: center">产品规格</div>
      </div>
      <div class="content-ele">
        <div class="value">{{ fmtThousands(data.prodSalePrice, 2) }}</div>
        <div class="label" style="text-align: right">产品售价</div>
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
