<!--
 * @desc: 应用管理
 * @Date: 2024-09-25 16:35:48
 * @LastEditTime: 2024-10-08 10:10:06
-->
<template>
  <div class="app-page">
    <van-nav-bar right-text="完成" fixed placeholder left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #title>
        <div class="search-box">
          <van-search v-model="appName" shape="round" placeholder="请输入功能名称" @search="onSearch"></van-search>
        </div>
      </template>
    </van-nav-bar>

    <dadp-card v-if="!appName" title="首页应用">
      <div class="container" group="groupA" :list="homeItems" itemKey="link">
        <template v-for="(element, index) in homeItems" :key="index">
          <div class="container-item" @click.stop="handleClick(element)">
            <div class="round round__del" @click.stop="handleDel(element)"><van-icon size="0.3rem" name="minus" /></div>
            <van-image :src="element?.appImage"></van-image>
            <div class="label">{{ element?.name }}</div>
          </div>
        </template>
      </div>
    </dadp-card>

    <dadp-card v-if="!appName" title="最近使用">
      <div class="container" group="groupA" :list="usedItems" itemKey="link">
        <template v-for="(element, index) in usedItems" :key="index">
          <div class="container-item" @click.stop="handleClick(element)">
            <div v-if="isAdded(element)" class="round round__del" @click.stop="handleDel(element)">
              <van-icon size="0.3rem" name="minus" />
            </div>
            <div v-else class="round round__add" @click.stop="handleAdd(element)"><van-icon size="0.3rem" name="plus" /></div>
            <van-image :src="element?.appImage"></van-image>
            <div class="label">{{ element?.name }}</div>
          </div>
        </template>
      </div>
    </dadp-card>
    <dadp-card :title="appName ? '搜索结果' : '全部应用'">
      <div class="container" group="groupA" :list="filterItems" itemKey="link">
        <template v-for="(element, index) in filterItems" :key="index">
          <div class="container-item" @click.stop="handleClick(element)">
            <div v-if="isAdded(element)" class="round round__del" @click.stop="handleDel(element)">
              <van-icon size="0.3rem" name="minus" />
            </div>
            <div v-else class="round round__add" @click.stop="handleAdd(element)"><van-icon size="0.3rem" name="plus" /></div>
            <van-image :src="element?.appImage"></van-image>
            <div class="label">{{ element?.name }}</div>
          </div>
        </template>
      </div>
    </dadp-card>
  </div>
</template>

<script lang="ts" setup>
import appCust from '@/assets/images/home/app/app-cust.png';
import appProd from '@/assets/images/home/app/app-prod.png';
import appOpp from '@/assets/images/home/app/app-opp.png';
import appNotice from '@/assets/images/home/app/app-notice.png';
import appMore from '@/assets/images/home/app/app-more.png';
import appGrid from '@/assets/images/home/app/app-grid.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getAllHomeShortMenuList, saveHomeShortMenuList, getShortMenuList, getLastUseHomeShortMenuList } from '@/apis/home';
import { showToast } from 'vant';

defineOptions({ name: 'app' });

const router = useRouter();

// 左侧箭头点击事件处理器
const onClickLeft = () => {
  router.back();
};
// 右侧文本点击事件处理器
const onClickRight = async () => {
  let menuIds = homeItems.value.map((item: any) => item.shortMenuId);
  const { code } = await saveHomeShortMenuList({ shortMenuIds: menuIds.join(','), menuType: '3' });
  if (code == 200) {
    showToast('操作成功');
    router.back();
  }
};

// 应用查询
const appName = ref('');
const onSearch = () => {};

// 首页应用
const homeItems = ref([] as any[]);
// 最近使用
const usedItems = ref([] as any[]);
// 全部应用
const allItems = ref([
  {
    name: '我的待办',
    link: 'todo',
    appImage: appCust,
  },
  {
    name: '我的提醒',
    link: 'remind',
    appImage: appProd,
  },
  {
    name: '我的任务',
    link: 'task',
    appImage: appOpp,
  },
  {
    name: '平台公告',
    link: 'notice',
    appImage: appNotice,
  },
  {
    name: '我的日程',
    link: 'schedule',
    appImage: appMore,
  },
  {
    name: '金融计算器',
    link: 'calculator',
    appImage: appMore,
  },
] as any[]);

const iconMap = ref({
  appCust: appCust,
  appProd: appProd,
  appOpp: appOpp,
  appNotice: appNotice,
  appMore: appMore,
  appGrid: appGrid,
}) as any;

// 搜索结果
const filterItems = computed(() => {
  return allItems.value.filter((e: any) => e.name.includes(appName.value));
});

// 当前应用是否已添加到首页应用
const isAdded = (item: any) => {
  return homeItems.value.some((e: any) => e.name === item.name);
};

// 加号方法
const handleAdd = (item: any) => {
  if (homeItems.value.length < 9 && !homeItems.value.some((e: any) => e.name === item.name)) {
    homeItems.value.push(item);
  } else {
    showToast('首页应用最多可配置9个');
  }
};
// 减号方法
const handleDel = (item: any) => {
  const index = homeItems.value.findIndex((e: any) => e.name === item.name);
  if (index !== -1) {
    homeItems.value.splice(index, 1);
  }
};

const handleClick = (item: any) => {
  // router.push(item.link);
};
// 获取首页应用
const getHomeMenuList = async () => {
  const { data } = await getShortMenuList({ menuType: '3', pageNo: 1, pageSize: 99 });
  homeItems.value = data.map((item: any) => {
    return {
      name: item.menuName,
      appImage: iconMap.value[item.imageUrl],
      link: '',
      ...item,
    };
  });
};
// 获取最近应用
const getLastUseMenuList = async () => {
  const { data } = await getLastUseHomeShortMenuList({ menuType: '3' });
  usedItems.value = data.map((item: any) => {
    return {
      name: item.menuName,
      appImage: iconMap.value[item.imageUrl],
      link: '',
      ...item,
    };
  });
};
// 获取全部
const getAllMenu = async () => {
  const { data } = await getAllHomeShortMenuList({ menuType: '3' });
  allItems.value = data.map((item: any) => {
    return {
      name: item.menuName,
      appImage: iconMap.value[item.imageUrl],
      link: '',
      ...item,
    };
  });
};
onMounted(() => {
  getAllMenu();
  getLastUseMenuList();
  getHomeMenuList();
});
</script>

<style lang="less" scoped>
.app-page {
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .search-box {
    width: 510px;
    .van-search {
      padding: 0px;
    }
  }
  .dadp-card {
    border-radius: unset;
  }
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: content-box;
    min-height: 132px;
    padding-bottom: 32px;
    .container-item {
      position: relative;
      box-sizing: border-box;
      width: 25%;
      padding: 18px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .van-image {
        height: 60px;
        width: 60px;
      }

      .label {
        font-family: PingFangSC-Regular;
        font-size: @font-size-24;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: 400;
        margin-top: 12px;
      }
      .round {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid rgba(255, 255, 255, 1);
        border-radius: 20px;
        &__add {
          background: rgba(31, 152, 255, 0.1);
          color: @blue;
        }
        &__del {
          background: rgba(255, 13, 18, 0.1);
          color: @red;
        }
      }
    }
  }
}
</style>
