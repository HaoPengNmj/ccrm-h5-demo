<!--
 * @desc: 公司-保函-item
 * @Date: 2024-10-08 18:10:35
 * @LastEditTime: 2024-10-09 16:01:44
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
    </div>
    <div class="item-content">
      <div class="content-ele">
        <div class="value">{{ codeTranslate('currency', data.currency) || '--' }}</div>
        <div class="label">币种</div>
      </div>
      <div class="content-ele">
        <div class="red-value">
          <span class="big">{{ fmtThousands(data.rate, 2) }}</span>
          %
        </div>
        <div class="label" style="text-align: center">费率</div>
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
