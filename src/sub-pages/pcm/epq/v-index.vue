<template>
  <div class="register-form">
    <van-form @submit="submit">
      <dadp-card>
        <van-field
          v-model="editForm.custName"
          label="客户名称"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入' }]"
        />
        <dadp-select
          v-model="editForm.certType"
          :options="getCombo('certType')"
          label="证件类型"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <van-field
          v-model="editForm.certNo"
          label="证件号码"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.mobile"
          label="手机号码"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入' }]"
        />
      </dadp-card>
      <dadp-card>
        <van-field
          v-model="editForm.mktOrgName"
          label="营销机构"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          disabled
        />
        <van-field
          v-model="editForm.mktUserName"
          label="营销人员"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          disabled
        />
      </dadp-card>
      <dadp-card>
        <dadp-select
          v-model="editForm.sex"
          :options="getCombo('userSex')"
          label="性别"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <van-field
          v-model="editForm.address"
          label="联系地址"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <dadp-select
          v-model="editForm.marStat"
          :options="getCombo('marStat')"
          label="婚姻状况"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <dadp-date
          v-model="editForm.birthday"
          label="出生日期"
          comp-type="picker"
          value-fmt="yyyyMMdd"
          input-align="right"
          placeholder="请选择日期"
        />
        <dadp-select
          v-model="editForm.nation"
          :options="getCombo('nation')"
          label="民族"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <dadp-select
          v-model="editForm.country"
          :options="getCombo('country')"
          label="国籍"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <dadp-select
          v-model="editForm.highestEdu"
          :options="getCombo('eduDegree')"
          label="最高学历"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
      </dadp-card>
      <dadp-card>
        <dadp-select
          v-model="editForm.trade"
          :options="getCombo('trade')"
          label="行业"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <dadp-select
          v-model="editForm.profession"
          :options="getCombo('duty')"
          label="职业"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <van-field
          v-model="editForm.unitNm"
          label="单位名称"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.position"
          label="职务"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <dadp-select
          v-model="editForm.salary"
          :options="getCombo('salary')"
          label="年薪"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
      </dadp-card>
      <dadp-card>
        <van-field
          v-model="editForm.age"
          label="年龄"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.hobby"
          label="爱好"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.remark"
          label="备注"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <dadp-date
          v-model="editForm.allowDate"
          type="range"
          label="有效期"
          input-align="right"
          placeholder="请选择日期"
          @change="changeDate"
        />
      </dadp-card>

      <van-action-bar>
        <van-button type="default" size="large" round plain @click="router.back()">取消</van-button>
        <van-button type="primary" size="large" round native-type="submit">提交</van-button>
      </van-action-bar>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import { addPotentialCust } from '@/apis/map';
import { getCombo } from '@/hook/code-hook';
import { showConfirmDialog, showToast } from 'vant';
import { getStorage } from '@/storage/storage';
const router = useRouter();
const route = useRoute();
const userInfo = getStorage('userInfo');

const editForm = ref({
  mktUserId: userInfo.userId,
  mktUserName: userInfo.userName,
  mktOrgId: userInfo.orgId,
  mktOrgName: userInfo.orgName,
} as any);

const changeDate = (val: any) => {
  editForm.value.allowStartDate = editForm.value.allowDate?.[0] ? `${editForm.value.allowDate?.[0]}` : null;
  editForm.value.allowEndDate = editForm.value.allowStartDate?.[1] ? `${editForm.value.allowDate?.[1]}` : null;
};

// 提交表单
const submit = async () => {
  const res = await addPotentialCust({
    ...editForm.value,
  });
  if (res.code === 200) {
    if (!res.data.msg && res.msg?.indexOf('操作成功') !== -1) {
      showToast('新增成功！');
      router.back();
    }
    if (res.data.msg && res.data.msg?.indexOf('继续新增') !== -1) {
      showConfirmDialog({
        message: res.data.msg,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        messageAlign: 'left',
      })
        .then(async () => {
          const res = await addPotentialCust({ ...editForm.value, confirmFlag: '1' });
          if (res.code == 200) {
            showToast('新增成功！');
            router.back();
          }
        })
        .catch(() => {
          showToast('取消新增！');
        });
    }
  }
};
</script>

<style lang="less" scoped>
.register-form {
  padding: 32px;
  padding-bottom: 320px;

  .operation {
    :deep(.van-cell__value) {
      padding: 16px 24px;
      background: @gray-1;
      border-radius: 20px;
    }
  }

  .tel-content {
    padding: 20.25px 32.25px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFangSC-Semibold;
    font-size: @font-size-36;
    color: @text;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 600;
    margin: 24px 32px;

    .right-text {
      font-family: PingFangSC-Regular;
      font-size: @font-size-28;
      color: @primary-color;
      letter-spacing: 0;
      text-align: right;
      line-height: 28px;
      font-weight: 400;
    }
  }
}
</style>
