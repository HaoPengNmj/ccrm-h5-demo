<!--
 * @desc: 零售-卡产品-item
 * @Date: 2024-10-08 18:10:35
 * @LastEditTime: 2024-10-09 15:56:10
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
      <van-tag v-if="data.prodType" color="#fff3e7" text-color="#FF8812">
        {{ codeTranslate(moduleComp.retail.card.codeCombo, data.prodType) }}
      </van-tag>
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
