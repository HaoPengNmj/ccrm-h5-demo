<!--
 * @desc: 零售-贷款-item
 * @Date: 2024-10-08 18:10:35
 * @LastEditTime: 2024-10-09 15:55:12
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
      <!-- <van-tag color="#fff3e7" text-color="#FF8812">定期</van-tag> -->
    </div>
    <div class="item-content">
      <div class="content-ele">
        <div class="red-value">
          <span class="big">{{ fmtThousands(data.lprRateOneYear, 2) }}</span>
          %
        </div>
        <div class="label">1年期LPR利率</div>
      </div>
      <div class="content-ele">
        <div class="red-value">
          <span class="big">{{ fmtThousands(data.lprRateFiveYear, 2) }}</span>
          %
        </div>
        <div class="label" style="text-align: center">5年期LPR利率</div>
      </div>
      <div class="content-ele">
        <div class="value">{{ fmtThousands(data.investMonth, 0) }}</div>
        <div class="label" style="text-align: right">贷款期限上限（月）</div>
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
