<!--
 * @desc: 零售-保险-item
 * @Date: 2024-10-08 18:10:35
 * @LastEditTime: 2024-10-09 15:55:27
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
    </div>
    <div class="item-content">
      <div class="content-ele">
        <div class="value">{{ codeTranslate(moduleComp.retail.insure.codeCombo, data.prodType) || '--' }}</div>
        <div class="label">产品类型</div>
      </div>
      <div class="content-ele">
        <div class="value">{{ fmtThousands(data.insurancePeriod, 0) }}</div>
        <div class="label" style="text-align: center">保险期限（年）</div>
      </div>
      <div class="content-ele">
        <div class="value">{{ codeTranslate('payWay', data.payWay) || '--' }}</div>
        <div class="label" style="text-align: right">缴费方式</div>
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
