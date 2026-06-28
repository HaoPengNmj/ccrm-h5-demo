<!--
 * @desc: 404页
 * @Date: 2024-09-25 16:08:18
 * @LastEditTime: 2024-09-27 14:32:26
-->
<template>
  <div class="not-found">
    <div class="content">
      <p>404</p>
      <h1>页面未找到</h1>
      <div class="illustration"></div>
      <van-button type="primary" size="large" @click="router.back()">返回上一页</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style lang="less" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: @white;
  background-image: url('@/assets/images/home/bg_top.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.content {
  text-align: center;
}

p {
  font-size: 1.5rem;
}

.illustration img {
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
}
</style>
