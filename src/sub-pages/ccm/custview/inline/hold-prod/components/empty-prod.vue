<template>
  <div>
    <van-empty :image="image" class="empty">
      <template #description>
        <slot name="emptyText">暂无数据</slot>
      </template>
    </van-empty>
  </div>
</template>

<script lang="ts" setup>
import image from '@/assets/images/common/empty.png';
</script>
