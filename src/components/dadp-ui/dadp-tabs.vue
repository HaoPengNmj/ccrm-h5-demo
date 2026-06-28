<!--
 * @desc: 下拉框选择器
 * @Date: 2024-09-29 09:13:42
 * @LastEditTime: 2024-10-12 19:03:21
-->
<template>
  <div class="dadp-tabs">
    <div
      v-for="(item, index) in options"
      :key="index"
      class="dadp-tab"
      :class="{ 'dadp-tab--active': item.value === modelValue }"
      @click.stop="handleClick(item)"
    >
      <div>
        {{ item.content }}
      </div>
      <van-image :src="selectedIcon"></van-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
import selectedIcon from '@/assets/images/common/selected.png';
// 码值类型
type Code = {
  content: string;
  value: string | Number;
};
const props = defineProps({
  // v-model: 绑定值
  modelValue: {
    type: [String, Number],
    default: '',
  },
  // 码值选择器数据
  options: {
    type: Array<Code>,
    default: () => [],
  },
});
const emits = defineEmits(['update:modelValue', 'change']);
const handleClick = (item: any) => {
  emits('update:modelValue', item.value);
  emits('change', item);
};
</script>
<style lang="less" scoped>
.dadp-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  .dadp-tab {
    position: relative;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @gray;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: 400;
    padding: 6px 15px;
    white-space: nowrap;
    backface-visibility: hidden; // 处理因为position: relative导致的模糊

    .van-image {
      position: absolute;
      display: none;
      height: 10px;
      width: 24px;
      margin-top: 6px;
      left: calc(50% - 12px);
    }
    &--active {
      color: @primary-color;
      font-weight: 500;
      .van-image {
        display: block;
      }
    }
  }
}
</style>
