<!--
 * @Description: 导航头部组件，显示标题和右侧按钮，支持左侧返回和右侧按钮点击事件。
-->
<template>
  <div class="nav-bar">
    <van-nav-bar :title="title" left-arrow :right-text="rightText" @click-left="onClickLeft" @click-right="onClickRight"></van-nav-bar>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  // 组件标题
  title: {
    type: String,
    default: '',
  },
  // 右侧按钮文本
  rightText: {
    type: String,
    default: '',
  },
});

const currentRoute = useRoute();
const router = useRouter();
const emits = defineEmits(['onClickRight']);

// 根据传入的 title 或路由元信息设置标题
const title = computed(() => props.title || (currentRoute.meta.title as string));

// 左侧箭头点击事件处理器
const onClickLeft = () => {
  router.back();
};

// 右侧文本点击事件处理器
const onClickRight = () => {
  emits('onClickRight');
};
</script>

<style lang="less" scoped>
.nav-bar {
  border-bottom: 1px solid @gray;
  :deep(.van-nav-bar__title) {
    font-weight: 500;
    color: @black;
  }
  :deep(.van-icon) {
    // color: @black;
  }
  :deep(.van-nav-bar__text) {
    color: @black;
  }
}
</style>
