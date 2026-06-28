<!--
 * @desc: 根据UI设计稿封装的单选组件
 * @Date: 2024-09-26 19:24:47
 * @LastEditTime: 2024-10-08 20:18:01
-->
<template>
  <div class="dadp-radio">
    <van-space wrap>
      <van-button
        v-for="(item, index) in options"
        :key="index"
        :class="{ 'dadp-radio-btn': !isSelected(item.value) }"
        :type="isSelected(item.value) ? 'primary' : 'default'"
        :disabled="disabled"
        size="small"
        round
        @click="selectOption(item.value)"
      >
        <van-badge v-if="isBadge" :content="item.count">
          {{ item.content }}
        </van-badge>
        <span v-else>{{ item.content }}</span>
      </van-button>
    </van-space>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'change']);
const props = defineProps({
  // v-model
  modelValue: {
    type: [String, Array],
    default: '',
  },
  // 选项数据，同码值类型
  options: {
    type: Array<{ content: string; value: string; count?: string }>,
    default: () => [],
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否清除
  clearable: {
    type: Boolean,
    default: false,
  },
  // 是否启用van-badge
  isBadge: {
    type: Boolean,
    default: false,
  },
});

let _modelValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit('update:modelValue', val);
    emit('change', val);
  },
});

const isSelected = (val: string) => {
  return props.multiple ? _modelValue.value.includes(val) : _modelValue.value === val;
};

// 选择选项
const selectOption = (val: string) => {
  if (props.disabled) {
    return;
  }
  if (!props.multiple) {
    if (_modelValue.value !== val) _modelValue.value = val;
    else if (props.clearable) _modelValue.value = '';
  } else {
    let index = (_modelValue.value as string[]).indexOf(val);
    if (index === -1) {
      (_modelValue.value as string[]).push(val);
    } else {
      (_modelValue.value as string[]).splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.dadp-radio {
  &-btn {
    background: @gray-1;
    border-radius: 35px;
  }
}
</style>
