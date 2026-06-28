<!--
 * @desc: 登录页
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-12-12 16:36:01
-->
<template>
  <div v-if="!isWXWork" class="login">
    <div class="login-header">
      <van-image class="login-header-logo" :src="logoPng"></van-image>
      <div class="login-spec_large">您好，</div>
      <div class="login-spec_medium">欢迎登录移动工作台！</div>
    </div>
    <div class="login-form">
      <van-form :show-error="true" :show-error-message="false" @submit="onSubmit">
        <div class="login-form-item">
          <van-field
            v-model="formData.loginName"
            placeholder="请输入用户名"
            clearable
            autocomplete="new-password"
            :rules="[{ required: true, message: '请填写用户名' }]"
          >
            <template #left-icon>
              <div class="login-form-logo">
                <van-image :src="accountPng"></van-image>
              </div>
            </template>
          </van-field>
        </div>
        <div class="login-form-item">
          <van-field
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            :right-icon="showPassword ? 'eye-o' : 'closed-eye'"
            autocomplete="new-password"
            placeholder="请输入密码"
            clearable
            :rules="[{ required: true, message: '请填写密码' }]"
            @click-right-icon="changeShowPass"
          >
            <template #left-icon>
              <div class="login-form-logo">
                <van-image :src="passwordPng"></van-image>
              </div>
            </template>
          </van-field>
        </div>
        <div class="login-form-btn">
          <van-button type="primary" size="large" native-type="submit" round>登 录</van-button>
        </div>
      </van-form>
    </div>
  </div>
  <div v-else class="qywx-container">
    <van-loading color="#ff8812">企业微信用户登录中...</van-loading>
  </div>
</template>

<script lang="ts" setup>
import logoPng from '@/assets/images/login/logo.png';
import accountPng from '@/assets/images/login/account.png';
import passwordPng from '@/assets/images/login/password.png';
import { loginByAccount, loginByCode } from '@/hook/user-login-hook';
import { getAppUrl } from '@/config/app';

const router = useRouter();
const route = useRoute();

let isWXWork = navigator.userAgent.indexOf('wxwork') !== -1 || navigator.userAgent.indexOf('WXWork') !== -1;

const formData = ref({
  loginName: '',
  password: '',
});
//提交
const onSubmit = async () => {
  await loginByAccount(formData.value);
  redirectFn();
};
//提交
const doQWLogin = async (code) => {
  await loginByCode(code);
  redirectFn();
};
// 重定向
const redirectFn = () => {
  const redirect = route.query.redirect as string;
  if (redirect) {
    router.push(redirect);
  } else {
    router.push('/home');
  }
};

// 重定向获取企业微信code
const oauthByWx = async () => {
  try {
    window.location.href = getAppUrl(window.location.href);
  } catch (error) {
    console.error('登录失败 :>> ', error);
  }
};

const showPassword = ref(false);
//更改显示密码
const changeShowPass = () => {
  showPassword.value = !showPassword.value;
};

onMounted(() => {
  if (isWXWork) {
    const code = new URL(window.location.href).searchParams.get('code');
    code ? doQWLogin(code) : oauthByWx();
  }
});
</script>
<style lang="less" scoped>
@import '@/styles/login/login.less';
.qywx-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
