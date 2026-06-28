<template>
  <div class="app-box">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
// 获取可视化屏幕高度
const getViewportHeight = () => {
  if (typeof window.visualViewport !== 'undefined') {
    return window.visualViewport.height;
  } else {
    return window.innerHeight;
  }
};

// 获取可视化屏幕宽度
const getViewportWidth = () => {
  if (typeof window.visualViewport !== 'undefined') {
    return window.visualViewport.width;
  } else {
    return window.innerWidth;
  }
};

// 根据可视化屏幕高度设置外层布局高度
function applyViewportHeight() {
  const app = document.getElementById('app');
  app.style.height = `${getViewportHeight()}px`;
  document.documentElement.style.fontSize = `${getViewportWidth() / 10}px`;
}

// 初始化
applyViewportHeight();

// 监听窗口大小变化
window.addEventListener('resize', applyViewportHeight);
</script>
<style lang="less">
#app {
  height: 100%;
  width: 100%;
}
.app-box {
  height: 100%;
  width: 100vw;
  overflow: hidden;
  overflow-y: auto;
}
</style>
