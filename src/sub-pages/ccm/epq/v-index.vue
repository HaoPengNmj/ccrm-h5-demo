<template>
  <div class="register-form">
    <van-form @submit="submit">
      <dadp-card>
        <van-field
          v-model="editForm.epqcustName"
          label="客户名称"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入' }]"
        />
        <van-field
          v-model="editForm.uniformCreditCode"
          label="统一社会信用代码"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.organCode"
          label="组织机构代码"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
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
        <dadp-date
          v-model="editForm.allowDate"
          type="range"
          label="有效期"
          input-align="right"
          placeholder="请选择日期"
          @change="changeDate"
        />
      </dadp-card>
      <dadp-card>
        <dadp-select
          v-model="editForm.marketType"
          :options="getCombo('marketType')"
          label="营销服务类型"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <dadp-select
          v-model="editForm.hyType"
          :options="getCombo('casesIndustry')"
          label="行业类型"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <dadp-select
          v-model="editForm.induType"
          :options="getCombo('induType')"
          label="重点发展产业类型"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
        />
        <van-field
          v-model="editForm.primPerAddr"
          label="主要联系人地址"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.custNeed"
          label="客户需求"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.mktDirece"
          label="营销方向"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.otherDetail"
          label="其他说明"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.officeAddress"
          label="客户地址"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
        />
        <van-field
          v-model="editForm.remak"
          label="备注"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
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
import { addEpqCust } from '@/apis/map';
import { getCombo } from '@/hook/code-hook';
import { showToast } from 'vant';
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
  const res = await addEpqCust({
    ...editForm.value,
  });
  if (res.code === 200) {
    showToast('提交成功');
    router.back();
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
