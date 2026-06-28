<!--
 * @desc: 营销活动详情
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2025-01-17 18:29:43
-->
<template>
  <div class="container">
    <div class="container">
      <iframe :src="linkAddr" frameborder="0" height="100%" width="100%"></iframe>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getStorage } from '@/storage/storage';
import { showToast } from 'vant';

defineOptions({ name: 'mkt-active-dtl' });

const userInfo = getStorage('userInfo') || {}; // 用户信息
const router = useRouter();
const route = useRoute();

const linkAddr = ref(route.query.linkAddr as string);

const handleError = () => {
  showToast('请前往活动对应的渠道小程序参加活动！');
};

onMounted(() => {
  console.log('linkAddr :>> ', linkAddr.value);
});
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
