<template>
  <div class="card-form">
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field v-model.trim="formData.oldPassword" required type="password" label="旧密码" placeholder="请填写旧密码"
          :rules="[{ required: true, message: '请填写旧密码' }]" />
        <van-field v-model.trim="formData.newPassword" required type="password" label="新密码" placeholder="请填写新密码"
          :rules="[{ required: true, message: '请填写新密码' }]" />
        <van-field v-model.trim="formData.confirmNewPassword" required type="password" label="确认密码" placeholder="请确认新密码"
          :rules="[
            { required: true, message: '请输入确认密码' },
            { validator, message: validatorMsg },
          ]" />
      </van-cell-group>
      <div class="form-btn-box">
        <van-button round block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { showToast } from 'vant';
import { updatePassword } from '@/apis/user';
import { getStorage } from '@/storage/storage';
import { autoLogout } from '@/hook/user-login-hook';
const router = useRouter();
const formData = ref({
  userId: getStorage('userInfo').userId,
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});
// 提交
const onSubmit = async () => {
  let res = await updatePassword(formData.value);
  if (res.code === 200) {
    showToast('修改密码成功，请重新登录');
    autoLogout();
  }
};
//新密码验证
const validator = (value: string) => {
  return value && value === formData.value.newPassword;
};
// 密码校验
const validatorMsg = (value: string) => {
  return value ? '密码输入不一致' : '';
};
</script>
<style lang="less" scoped>
.card-form {
  padding: 24px;

  :deep(.van-cell-group--inset) {
    margin: 0;
  }
}

.btn-box {
  width: 100%;
  height: 90px;
  margin-top: 24px;
}

.form-btn-box {
  margin: 32px 0;
}
</style>
