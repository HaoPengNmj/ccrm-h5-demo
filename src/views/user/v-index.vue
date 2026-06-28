<!--
 * @desc: 我的
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-01 02:03:27
-->
<template>
  <div class="user-box">
    <div class="user-box-title">个人中心</div>
    <div class="user-box-card">
      <div class="card-container">
        <div class="user-info">
          <van-image class="user-info-avatar" :src="avatar" />
          <div class="user-info-det">
            <div class="det-info">
              <div class="det-info-name">{{ userInfo.userName }}</div>
              <div class="det-info-id">{{ userInfo.userId }}</div>
            </div>
            <div class="det-tags">
              <van-tag round type="primary" class="det-tags-item">
                <span>{{ userInfo.roleName }}</span>
              </van-tag>
            </div>
          </div>
        </div>
        <div class="org-info">
          <span>{{ userInfo.orgName }}</span>
        </div>
      </div>
    </div>
    <div class="user-box-container">
      <van-cell class="info-item" icon="phone-o" title="企业微信号" :value="userInfo.wechatNo"></van-cell>
      <van-cell class="info-item" icon="manager-o" title="当前角色" :value="userInfo.roleName" @click="show = true"></van-cell>
    </div>
    <div class="user-box-options">
      <!-- <van-cell class="option-item" icon="warning-o" title="修改密码" is-link @click="changePassWord"></van-cell> -->
      <van-button type="primary" size="large" plain @click="doLogout">退出登录</van-button>
    </div>
  </div>
  <!--角色切换-->
  <van-action-sheet v-model:show="show">
    <template #default>
      <van-cell class="role-item" v-for="role in roleList" :title="role.roleName" @click="onSelect(role)" />
    </template>
  </van-action-sheet>
</template>
<script lang="ts" setup>
import avatar from '@/assets/images/user/icon_user.png';
import { getStorage } from '@/storage/storage';
import { doRoleChange } from '@/hook/user-login-hook';
import { doLogout } from '@/hook/user-login-hook';
// defineOptions({ name: 'user' });
const router = useRouter();

const userInfo = getStorage('userInfo') || {}; // 用户信息
const roleList = getStorage('roleList') || []; // 角色列表

const show = ref(false);
// 修改密码
const changePassWord = () => {
  router.push('/updatePassword');
};
// 角色选择
const onSelect = (role: any) => {
  show.value = false;
  doRoleChange(role.roleId);
};
</script>
<style lang="less" scoped>
.user-box {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/user/user_bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  &-title {
    padding: 69px 32px 40px;
    font-family: PingFangSC-Medium;
    font-size: @font-size-44;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 500;
  }
  &-card {
    width: 100%;
    padding: 0 24px;

    .card-container {
      width: 100%;
      height: 256px;
      background-image: url('@/assets/images/user/card.png');
      background-size: cover;
      background-repeat: no-repeat;
      box-sizing: border-box;
      padding: 34px 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .user-info {
        display: flex;
        align-items: center;
        &-avatar {
          width: 96px;
          height: 96px;
          margin-right: 20px;
        }
        &-det {
          .det-info {
            color: #6d3b05;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            &-name {
              font-size: @font-size-40;
              margin-right: 12px;
            }
            &-id {
              font-size: @font-size-30;
            }
          }
          .det-tags {
            display: flex;
            &-item {
              opacity: 0.3;
              background: #ffffff;
              border-radius: 4px;
              padding: 4px 8px;
              margin-right: 20px;
              span {
                font-family: PingFangSC-Regular;
                font-size: @font-size-24;
                color: #6d3b05;
                line-height: 24px;
                font-weight: 400;
                text-align: center;
                opacity: 1;
              }
            }
          }
        }
      }
      .org-info {
        position: relative;
        bottom: 0;
        opacity: 0.8;
        font-family: PingFangSC-Regular;
        font-size: @font-size-24;
        color: #6d3b05;
        text-align: center;
        line-height: 24px;
        font-weight: 400;
      }
    }
  }
  &-container {
    background-color: @white;
    border-radius: 20px;
    box-sizing: border-box;
    margin: 0 32px;
    margin-top: 24px;
    .info-item {
      width: 100%;
      border-radius: 20px;
      height: 100px;
      display: flex;
      align-items: center;
      :deep(.van-icon) {
        font: none !important;
        font-size: @font-size-40;
      }
      :deep(.van-cell__title) {
        flex: none;
      }
      :deep(.van-cell__value) {
        white-space: nowrap;
      }
    }
  }
  &-options {
    position: absolute;
    bottom: 44px;
    width: 100%;
    padding: 0 32px;
    .option-item {
      height: 100px;
      display: flex;
      align-items: center;
      :deep(.van-icon) {
        font: none !important;
        font-size: @font-size-40;
      }
    }
  }
}
.role-item {
  text-align: center;
}
</style>
