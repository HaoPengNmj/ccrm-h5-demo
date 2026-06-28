<!--
 * @desc: 零售-其他产品-item
 * @Date: 2024-10-09 11:18:57
 * @LastEditTime: 2024-10-09 15:54:51
-->
<template>
  <div class="item">
    <div class="item-header">
      <span class="title">{{ data.prodName }}</span>
    </div>
    <div class="item-header">
      <span class="sub-title">产品编号：{{ data.prodId }}</span>
      <van-tag color="#fff3e7" text-color="#FF8812">
        {{ codeTranslate('productStatus', data.prodStatus) }}
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
