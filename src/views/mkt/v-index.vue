<!--
 * @desc: 营销
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-10 09:36:31
-->
<template>
  <div class="mkt">
    <dadp-card>
      <div class="banner">
        <van-swipe :autoplay="0">
          <van-swipe-item v-for="item in (bannerImgs as any)">
            <van-image :src="item?.imgUrl" alt="" @click="imgCLickFn(item)"></van-image>
          </van-swipe-item>
        </van-swipe>
      </div>
    </dadp-card>
    <dadp-card>
      <div class="container">
        <div v-for="(item, index) in mktMenu" class="container-item" :key="index" @click="handleClick(item)">
          <van-image class="item-img" :src="item.icon" />
          <div class="item-title">{{ item.label }}</div>
        </div>
      </div>
    </dadp-card>
    <dadp-card title="精彩专区" is-body-padding>
      <div class="footer">
        <van-image v-for="(item, index) in jczqImgs" :src="item.imgUrl" alt="" @click="imgCLickFn(item)"></van-image>
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
import { listBannerInfo } from '@/apis/mkt';
import { getStorage } from '@/storage/storage';
import { hasMenu } from '@/hook/use-common-hook';

defineOptions({ name: 'mkt' });

const route = useRoute();
const router = useRouter();
const userInfo = getStorage('userInfo') || {}; // 用户信息
const mktMenu = ref([
  {
    label: '营销商机',
    name: 'mktChance',
    path: '/mkt-chance',
    icon: appOpp,
    show: hasMenu('mkt-chance_app'),
  },
  {
    label: '营销任务',
    name: 'mktTask',
    path: userInfo.isManager === true ? '/mkt-task' : '/mkt-task-list',
    icon: appNotice,
    show: hasMenu('mkt-task_app'),
  },
  {
    label: '营销团队',
    name: 'mktTeam',
    path: '/mkt-team',
    icon: appCust,
    show: hasMenu('mkt-team_app'),
  },
  {
    label: '网格营销',
    name: 'mktMap',
    path: '/mkt-map',
    icon: appGrid,
    show: hasMenu('mkt-map_app'),
  },
  {
    label: '营销活动',
    name: 'mktActive',
    path: '/mkt-active',
    icon: appMore,
    show: hasMenu('mkt-active_app'),
  },
  {
    label: '权益领取',
    name: 'mktQY',
    path: '/mkt-qy',
    icon: appProd,
    show: hasMenu('mkt-qy_app'),
  },
]);
const showMktMenu = computed(() => {
  return mktMenu.value.filter((e) => e.show);
});

const handleClick = (item) => {
  router.push({
    path: item.path,
  });
};

const bannerImgs = ref([]);
const jczqImgs = ref([]);
const initBannerImgs = async () => {
  const { data } = await listBannerInfo({
    /**
     * cnlNo
     * 01=企微微信
     * 02=企微微信（佛山农商银行客户全流程服务平台移动工作台）
     * 03=短信平台
     * 04=微信小程序（小狮Bank）
     * 05=手机银行
     * 06=柜面
     * 07=超级柜台
     */
    pageNo: 1,
    pageSize: 5,
    cnlId: '02',
    cnlPageType: '02',
    bannerStatusList: ['02', '03'],
    isMobileShow: '1',
  });
  let _data = data.rows || [];
  bannerImgs.value = _data;
  console.log('bannerImgs.value :>> ', bannerImgs.value);
};
const initJczqImgs = async () => {
  const { data } = await listBannerInfo({
    /**
     * cnlNo
     * 01=企微微信
     * 02=企微微信（佛山农商银行客户全流程服务平台移动工作台）
     * 03=短信平台
     * 04=微信小程序（小狮Bank）
     * 05=手机银行
     * 06=柜面
     * 07=超级柜台
     */
    pageNo: 1,
    pageSize: 3,
    cnlId: '02',
    cnlPageType: '01',
    bannerStatusList: ['02', '03'],
    isMobileShow: '1',
  });
  let _data = data.rows || [];
  jczqImgs.value = _data;
  console.log(' jczqImgs.value :>> ', jczqImgs.value);
};

const imgCLickFn = (item) => {
  if (item.bannerUrlType && item.urlAddr) {
    switch (item.bannerUrlType) {
      // h5模板
      case '01':
        window.location.href = item.urlAddr;
        break;
      // 内部链接
      case '02':
        router.push(item.urlAddr);
        break;
      // 外部链接
      case '03':
        window.location.href = item.urlAddr;
        break;
      default:
        break;
    }
  }
};

onMounted(() => {
  initJczqImgs();
  initBannerImgs();
});
</script>
<style lang="less" scoped>
.mkt {
  padding-bottom: 20px;
  .banner {
    .van-image {
      width: 750px;
      height: 300px;
      display: block;
    }
  }
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    &-item {
      box-sizing: border-box;
      width: 25%;
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
  .footer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .van-image {
      width: 340px;
      min-height: 200px;
      box-sizing: border-box;
      display: block;
      padding: 10px;
      border-radius: 20px;
      overflow: hidden;
    }
  }
}
</style>
