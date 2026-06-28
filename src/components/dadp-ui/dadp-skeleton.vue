<template>
  <div class="dadp-skeleton">
    <van-skeleton :loading="isLoading" :row="skeletonRow">
      <datp-empty v-if="!notEmpty" :emptyType="emptyType"></datp-empty>
      <slot v-else></slot>
    </van-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import datpEmpty from './dadp-empty.vue';

const props = defineProps({
  // 是否正在加载数据
  loading: {
    type: Boolean,
    default: false,
  },
  // Skeleton组件显示的行数
  row: {
    type: Number,
    default: 5,
  },
  // 是否非空数据
  notEmpty: {
    type: Boolean,
    default: false,
  },
  // 空白类型:见dadp-empty.vue
  emptyType: {
    type: String,
    default: 'dataEmpty',
  },
});

// 定义局部状态
const isLoading = ref(props.loading);

// 监听 loading 属性的变化
watch(
  () => props.loading,
  (newValue) => {
    isLoading.value = newValue;
  }
);

const skeletonRow = computed(() => {
  return props.row;
});
</script>

<style lang="less" scoped>
.dadp-skeleton {
  padding: 10px 0;

  &-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .van-skeleton-image {
      width: 100%;
    }
  }
}
</style>
