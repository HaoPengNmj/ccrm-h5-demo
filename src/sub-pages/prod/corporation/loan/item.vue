<!--
 * @desc: 公司-贷款-item
 * @Date: 2024-10-08 18:10:35
 * @LastEditTime: 2024-10-09 15:58:35
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
    </div>
    <div class="item-content">
      <div class="content-ele">
        <div class="red-value">
          <span class="big">{{ fmtThousands(data.maxRate, 2) }}</span>
          %
        </div>
        <div class="label">最高利率</div>
      </div>
      <div class="content-ele">
        <div class="red-value">
          <span class="big">{{ fmtThousands(data.minRate, 2) }}</span>
          %
        </div>
        <div class="label" style="text-align: center">最低利率</div>
      </div>
      <div class="content-ele">
        <div class="value">{{ data.investMonth || '--' }}</div>
        <div class="label" style="text-align: right">贷款期限（月）</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
