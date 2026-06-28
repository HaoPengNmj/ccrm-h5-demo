<!--
 * @desc: 基于van-overlay封装的全屏弹窗组件
 * @Date: 2024-09-23 09:51:35
 * @LastEditTime: 2024-10-08 14:36:59
-->
<template>
  <van-overlay class="full-screen" :show="visible" :z-index="1000" :lock-scroll="false">
    <van-nav-bar :title="title" fixed placeholder left-arrow @click-left="onClose"></van-nav-bar>
    <div class="full-screen-container">
      <slot></slot>
    </div>
  </van-overlay>
</template>

<script lang="ts" setup>

// 定义组件的 props
const props = defineProps({
  modelValue: {
    type: Boolean, // 类型为布尔值
    default: false, // 默认值为 false
  },
  title: {
    type: String,
    default: '客户标注',
  },
});

// 定义组件的 emits
const emit = defineEmits(['update:modelValue']); // 定义一个事件，用于更新父组件的绑定值

// 响应式变量，用于控制弹窗的显示状态
const visible = ref(props.modelValue);

// 监听 props 中的 modelValue 变化，同步到 visible
watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue;
  }
);

// 关闭弹窗时的处理函数
const onClose = () => {
  visible.value = false; // 设置 visible 为 false，关闭弹窗
  emit('update:modelValue', false); // 发送事件更新父组件的绑定值
};
</script>

<style lang="less">
.full-screen {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .van-nav-bar__placeholder {
    height: 90px;
  }
  &-container {
    flex: auto;
    width: 100%;
    height: 0;
    background-color: #fafafa;
    overflow: hidden;
    overflow-y: auto;
  }
}
.modal-content {
}
</style>
