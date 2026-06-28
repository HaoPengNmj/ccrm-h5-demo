<!--
 * @Description: 主布局组件，根据路由配置动态展示顶部导航栏和底部导航栏。
-->
<template>
  <div class="layout-box">
    <nav-bar v-if="hasType === 'header' || hasType === 'both'" />
    <div id="layout-box-main" class="layout-box-main">
      <router-view #="{ Component, route }">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </div>
    <bottom-bar v-if="hasType === 'footer' || hasType === 'both'"></bottom-bar>
  </div>
  <van-dialog v-model:show="showNotify">
    <div class="notify">
      <div class="notify-title">实时提醒</div>
      <div class="notify-content" v-for="(item, index) in remindList" :key="index">
        {{ item.remindContent }}
      </div>
    </div>
  </van-dialog>
  <busi-remind v-if="hasPermission('remind_app-query_app')"></busi-remind>
  <van-watermark :width="autoRem(200)" :gap-x="autoRem(150)" :gap-y="autoRem(150)" :opacity="0.5">
    <template #content>
      <div :style="`padding: ${autoRem(16)}px`">
        <span :style="`color: #999; font-size: ${autoRem(24)}px`">{{ userInfo.userId }}-{{ userInfo.userName }}</span>
      </div>
    </template>
  </van-watermark>
</template>

<script lang="ts" setup>
import NavBar from './nav-bar.vue';
import BottomBar from './bottom-bar.vue';
import busiRemind from '@/components/business/busi-remind.vue';
import { getCachedViewsName } from '@/hook/cached-view-hook';
import { queryAppCurrentRemindList } from '@/apis/home';
import { getStorage } from '@/storage/storage';
import { hasPermission } from '@/hook/use-common-hook';
import useWeCom from '@/hook/use-qywx-hook';
import { autoRem } from '@/components/charts/charts-hook';
(window as any).$qywx = useWeCom();

// 根据路由meta.hasType判断是否显示header/footer
const currentRoute = useRoute();
const userInfo = getStorage('userInfo');
const hasType = computed(() => currentRoute.meta.hasType as string);
const cachedViews = computed(() => {
  console.log('cachedViews :>> ', getCachedViewsName.value);
  return getCachedViewsName.value;
});

/**
 * 实时提醒
 */
const timeoutId = ref(null);
const showNotify = ref(false);
const remindList = ref([] as any);
// 获取准实时提醒
const getNotify = () => {
  timeoutId.value = setTimeout(async () => {
    const { data } = await queryAppCurrentRemindList({ pageNo: 1 });
    if (data?.length > 0) {
      remindList.value = data;
      showNotify.value = true;
      setTimeout(() => {
        showNotify.value = false;
      }, 5000);
    }
    getNotify();
  }, 15 * 60 * 1000); // 设置15分钟定时
};

onMounted(() => {
  if (hasPermission('remind_app-query_app')) getNotify();
});

// 清除定时器
onBeforeUnmount(() => {
  if (!!timeoutId.value) clearTimeout(timeoutId.value);
});
</script>

<style lang="less">
@import '@/styles/layout/index.less';

.notify {
  background: url('@/assets/images/home/bg_remind.png');
  width: 100%;
  background-size: 100%;
  padding: 44px 32px;
  border-radius: 16px;
  text-align: left;
  &-title {
    font-family: PingFangSC-Semibold;
    font-size: @font-size-36;
    color: @text;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 600;
    padding-bottom: 50px;
  }
  &-content {
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @text;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
  }
}
// .notify {
//   background: transparent;
// }
</style>
