<!--
 * @Description: 底部导航栏组件，根据当前路由自动切换选中状态，并支持手动切换至不同路由。
-->
<template>
  <div class="bottom-bar">
    <van-tabbar v-model="active" @change="onChange">
      <template v-for="item in tabbars" :key="item.name">
        <van-tabbar-item :icon="(item.meta as any).icon" :name="(item.name as string)">
          {{ item.meta?.title }}
          <template #icon="props">
            <img :src="props.active ? (item.meta as any).iconActive : (item.meta as any).icon" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
import { constRouters } from '@/router/constant-modules';
const tabbars = [...constRouters].filter((e) => (e.meta.isShow as any)());

const currentRoute = useRoute();
const router = useRouter();
const active = ref('home');

// 监听当前路由变化，更新选中状态
watch(
  () => currentRoute.name,
  (newName) => {
    let routeName = tabbars.find((item) => item.name === newName);
    if (routeName) active.value = routeName.name as string;
  },
  { immediate: true }
);

// 切换标签页时更新路由
const onChange = () => {
  let currenItem = tabbars.find((item) => item.name === active.value);
  if (currenItem) {
    router.push(currenItem.path);
  }
};
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  height: 48px;
  margin: 0;

  img {
    width: 65px;
    height: auto;
  }
}
</style>
