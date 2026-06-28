<!--
 * @desc: 首页-应用列表
 * @Date: 2024-09-20 18:08:45
 * @LastEditTime: 2024-10-08 10:04:22
-->
<template>
  <div class="home-app">
    <div v-for="(item, index) in appData" class="home-app-item" :key="index" @click="handleClick(item)">
      <van-image class="item-img" :src="item.icon" />
      <div class="item-title">{{ item.title }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import appCust from '@/assets/images/home/app/app-cust.png';
import appProd from '@/assets/images/home/app/app-prod.png';
import appOpp from '@/assets/images/home/app/app-opp.png';
import appNotice from '@/assets/images/home/app/app-notice.png';
import appGrid from '@/assets/images/home/app/app-grid.png';
import appMore from '@/assets/images/home/app/app-more.png';
import { getHomeShortMenuList, saveShortMenuLog } from '@/apis/home';
import { getStorage } from '@/storage/storage';

const router = useRouter();
const userInfo = getStorage('userInfo');
const appData = ref([
  {
    title: '客户概览',
    icon: appCust,
    link: 'customer',
  },
  {
    title: '产品查询',
    icon: appProd,
    link: 'prod',
  },
  {
    title: '商机执行',
    icon: appOpp,
    link: 'opp',
  },
  {
    title: '公告查看',
    icon: appNotice,
    link: 'notice',
  },
  {
    title: '签到打卡',
    icon: appNotice,
    link: 'clock',
  },
  {
    title: '更多',
    icon: appMore,
    link: 'app',
  },
]);
// 图标
const iconMap = ref({
  appCust: appCust,
  appProd: appProd,
  appOpp: appOpp,
  appNotice: appNotice,
  appMore: appMore,
  appGrid: appGrid,
}) as any;
// 点击首页应用
const handleClick = async (item: any) => {
  if (item.title != '更多') {
    const { code } = await saveShortMenuLog({
      shortMenuId: item.shortMenuId,
      userId: userInfo.userId,
      roleId: userInfo.roleId,
    });
  }
  router.push(item.link);
};
// 获取首页应用
const getMenuList = async () => {
  // menuType  3——移动端首页应用 2——移动端工作台
  const { data } = await getHomeShortMenuList({ menuType: '3', pageNo: 1, pageSize: 9 });
  appData.value = data?.map((item: any) => {
    return {
      title: item.menuName,
      icon: iconMap.value[item.imageUrl],
      link: item.menuUrl,
      ...item,
    };
  });
  appData.value.push({
    title: '更多',
    icon: appMore,
    link: 'app',
  });
};
onMounted(() => {
  getMenuList();
});
</script>

<style lang="less" scoped>
.home-app {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    // display: inline-block;
    box-sizing: border-box;
    width: 20%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .item-img {
      width: 60px;
      height: 60px;
    }
    .item-title {
      margin-top: 12px;
      font-family: PingFangSC-Regular;
      font-size: @font-size-24;
      letter-spacing: 0;
      text-align: center;
      line-height: 24px;
      font-weight: 400;
      white-space: nowrap;
    }
  }
}
</style>
