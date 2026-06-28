<!--
 * @desc: 上升/下降 数值展示组件
 * @Date: 2024-09-23 09:51:35
 * @LastEditTime: 2024-10-08 14:36:59
-->
<template>
  <div class="value" :class="valueClassFormatter()">
    {{ showPlusSign && valueClassFormatter() === 'value--up' ? '+' : '' }}{{ fmtThousands(value, toFixedNum) }}
    <van-image v-if="showIcon && getImageSrc()" class="value-icon" :src="getImageSrc()" />
  </div>
</template>
<script setup lang="ts">
import up from '@/assets/images/common/num-up.svg';
import down from '@/assets/images/common/num-down.svg';
import { fmtThousands } from '@/utils/format';
const props = defineProps({
  // 输入的数值或字符串形式的数值，默认为空字符串
  value: {
    type: [Number, String],
    default: '',
  },
  // 用于数值的toFixed方法的精度，默认为0
  toFixedNum: {
    type: Number,
    default: 0,
  },
  // 是否显示图标，默认为false
  showIcon: {
    type: Boolean,
    default: false,
  },
  // 是否显示+号，默认为false
  showPlusSign: {
    type: Boolean,
    default: false,
  },
});
/**
 * 此函数用于根据数值的不同返回不同的CSS类名，以标识属性值的变化方向
 * - 当输入的数值是NaN或0时，返回空字符串，因为这两种情况都不适合赋予一个方向类名
 * - 当输入的数值大于0时，返回'value--up'，表示属性值呈上升趋势
 * - 当输入的数值小于0时，返回'value--down'，表示属性值呈下降趋势
 *
 * @returns {string} 返回空字符串、'value--up'或'value--down'
 */
const valueClassFormatter = () => {
  const num = Number(props.value);
  if (isNaN(num)) return '';
  if (num === 0) return '';
  return num > 0 ? 'value--up' : 'value--down';
};

/**
 * 根据数值决定返回的图片源
 * 此函数用于确定根据给定的数值，返回哪个图片源更适合
 * 如果数值为NaN（非数字）或者0，则不返回任何图片源
 * 对于正数，返回一个向上的图片源；对于负数，则返回一个向下的图片源
 *
 * @returns {string | null} 根据数值情况返回对应的图片源，如果不符合条件则返回空字符串
 */
const getImageSrc = () => {
  const num = Number(props.value);
  if (isNaN(num)) return '';
  if (num === 0) return '';
  return num > 0 ? up : down;
};
</script>

<style lang="less" scoped>
.value {
  font-family: DINAlternate-Bold;
  font-size: @font-size-34;
  line-height: 34px;
  font-weight: 700;
  &--up {
    color: @red;
  }
  &--down {
    color: @green;
  }
  &-icon {
    width: 14px;
    height: 20px;
  }
}
</style>
