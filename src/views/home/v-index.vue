<!--
 * @desc: 首页
 * @Date: 2024-08-02 11:08:50
 * @LastEditTime: 2024-10-01 02:03:39
-->
<template>
  <div class="home-page">
    <div class="home-page-top">
      <div class="top-header">
        <van-image class="avatar" :src="avatar" />
        <div class="text">
          Hi,
          <span class="text-blod">{{ userInfo.userName }}</span>
          {{ userInfo.roleName }}
        </div>
      </div>
      <div class="top-body">
        <div class="top-body-date">
          <span class="date">
            <span>
              {{ topTime.month < 10 ? '0' + topTime.month : topTime.month }}/{{ topTime.days < 10 ? '0' + topTime.days : topTime.days }}
            </span>
          </span>
          <span class="week">{{ topTime.weekList[topTime.week] }}</span>
        </div>
        <div class="top-body-word">
          <van-text-ellipsis rows="2" :content="topTime.remark" />
        </div>
      </div>
    </div>
    <div class="home-page-bottom">
      <div class="comp-item" v-for="item in showComps" :key="item.id">
        <component :is="item.comp.value" />
      </div>
    </div>
    <div class="logo">
      <van-image :src="logo" />
    </div>
    <van-dialog class="remind-dialog" v-model:show="showRemind" title="实时提醒">
      <div class="remind-content">
        <div v-for="item in remindList">
          {{ item.remindContent }}
        </div>
        <dadp-empty v-if="remindList.length == 0"></dadp-empty>
      </div>
    </van-dialog>
  </div>
</template>
<script lang="ts" setup>
import avatar from '@/assets/images/user/icon_user.png';
import logo from '@/assets/images/home/logo.png';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import { homeModuleComp } from '@/hook/auth-comp-hook';
import { getStorage } from '@/storage/storage';
import { getSysConfig } from '@/apis/home';
import { queryAppRealTimeRemindList, markAsRead } from '@/apis/home';
import { hasPermission } from '@/hook/use-common-hook';

defineOptions({ name: 'home' });

// 用户信息
const userInfo = getStorage('userInfo') || {};
const topTime = ref({
  month: new Date().getMonth() + 1,
  days: new Date().getDate(),
  week: new Date().getDay(),
  weekList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  remark: '',
});

const showComps = computed(() => {
  return homeModuleComp.filter((e) => e.permission());
});
const showRemind = ref(false);
const remindList = ref([] as any);

//获取首页头部每天不同的激励成长语录
const initData = async () => {
  let day = new Date().getDay();
  const { code, data } = await getSysConfig({ configId: `motivationalQuote${day}` });
  if (code === 200) {
    topTime.value.remark = data.remark;
  }
};

// 用户登录后进入首页，自动展示当天的未读状态的按事件提醒时间排序最新的3条准实时大额提醒
const initRemindData = async () => {
  const { data } = await queryAppRealTimeRemindList({ pageNo: 1, pageSize: 3, readStatus: '0' });
  if (data?.rows.length > 0) {
    remindList.value = data.rows;
    showRemind.value = true;
    markAsRead({ remindIds: data.rows?.map((e: any) => e.remindId).join(',') }); // 查询之后设置提醒已读
  }
};

onMounted(() => {
  initData();
  if (hasPermission('remind_app-query_app')) initRemindData();
});
</script>
<style lang="less" scoped>
.home-page {
  padding-top: 88px;
  background-color: @white;
  background-image: url('@/assets/images/home/bg_top.png');
  background-size: contain;
  background-repeat: no-repeat;
  &-top {
    width: 100%;
    padding: 0 40px;
    margin-bottom: 46px;
    .top-header {
      display: flex;
      align-items: center;
      padding-bottom: 56px;
      .avatar {
        width: 80px;
        height: 80px;
        margin-right: 24px;
      }
      .text {
        font-size: @font-size-26;
        font-family: PingFangSC-Medium;
        letter-spacing: 0;
        &-blod {
          font-size: @font-size-40;
        }
      }
    }
    .top-body {
      &-date {
        margin-bottom: 24px;
        .date {
          font-family: DINAlternate-Bold;
          font-size: @font-size-46;
          letter-spacing: -10;
          text-align: center;
          line-height: 46px;
          margin-right: 18px;
          font-weight: 700;
        }
        .week {
          font-family: PingFangSC-Medium;
          font-size: @font-size-24;
          letter-spacing: 0;
          text-align: center;
          line-height: 24px;
        }
      }
      &-word {
        width: 70%;
        min-height: 72px;
        :deep(.van-text-ellipsis) {
          font-size: @font-size-24;
        }
      }
    }
  }
  &-bottom {
    padding: 0 32px;
    .comp-item {
      margin-bottom: 24px;
      &_header {
        display: flex;
        justify-content: space-between;
        .header-left {
          font-family: PingFangSC-Semibold;
          font-size: @font-size-36;
          letter-spacing: 0;
          line-height: 36px;
          font-weight: 600;
        }
        .header-right {
          color: @gray;
        }
      }
    }
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    .van-image {
      width: 449px;
      height: 38px;
    }
  }
  .remind-content {
    min-height: 268px;
    background-size: 100%;
    padding: 32px;
    div {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #222222;
      letter-spacing: 0;
      line-height: 44px;
      font-weight: 400;
    }
  }
}
.remind-dialog {
  background-image: url('@/assets/images/common/message.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.remind-content {
  min-height: 268px;
  background-size: 100%;
  padding: 32px;
  div {
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @text;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
  }
}
</style>
