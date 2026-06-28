<template>
  <div class="register-form">
    <van-form @submit="submit">
      <dadp-card>
        <van-field
          v-model="editForm.gorgUserName"
          label="网格营销人员"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <dadp-file
          label="门头照片"
          :moduleId="'T_CCM_KYC_BASE1'"
          :business-id="editForm.doorPhotoId"
          required
          :rules="[{ required: true, message: '请上传' }]"
          :readonly="opType === 'view'"
        ></dadp-file>
        <van-field
          v-model="editForm.doorName"
          label="经营门头名称"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入' }]"
          :disabled="opType === 'view'"
        ></van-field>
        <van-field
          v-model="editForm.actAddr"
          label="实际经营地址"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入' }]"
          :disabled="opType === 'view'"
        ></van-field>
      </dadp-card>
      <dadp-card>
        <van-field
          v-model="editForm.actual"
          label="实际控制人姓名"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入' }]"
          :disabled="opType === 'view'"
        ></van-field>
        <van-field
          v-model="editForm.actCont"
          type="tel"
          label="实际控制人联系方式"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入电话号码' }]"
          :disabled="opType === 'view'"
        ></van-field>
        <van-field
          v-model="editForm.actContBak"
          type="tel"
          label="实际控制人联系方式（备用）"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <van-field
          v-model="editForm.actCentNo"
          label="实际控制人证件号（应收尽收）"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <dadp-select
          v-model="editForm.actIsHouse"
          :options="getCombo('yesOrNo')"
          label="实际控制人是否本地有房"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择' }]"
          :disabled="opType === 'view'"
        ></dadp-select>
      </dadp-card>
      <dadp-card>
        <van-field
          v-model="editForm.uniformCreditCode"
          label="营业执照统一社会信用代码"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入' }]"
          :disabled="opType === 'view'"
        ></van-field>
        <van-field
          v-model="editForm.businessLicenseNo"
          label="营业执照名称"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <dadp-file
          label="营业执照照片"
          :moduleId="'T_CCM_KYC_BASE2'"
          :business-id="editForm.busiPhotoId"
          :readonly="opType == 'view'"
        ></dadp-file>
        <van-field
          v-model="editForm.busiAddr"
          label="营业执照地址"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <dadp-select
          v-model="editForm.entType"
          :options="getCombo('entType')"
          label="企业类型"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
      </dadp-card>
      <dadp-card>
        <dadp-select
          v-model="editForm.legIsAct"
          :options="getCombo('yesOrNo')"
          label="法人是否为实际控制人"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择' }]"
          :disabled="opType === 'view'"
        ></dadp-select>
        <van-field
          v-model="editForm.legName"
          label="法人姓名"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <van-field
          v-model="editForm.legCont"
          type="tel"
          label="法人联系方式"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <van-field
          v-model="editForm.legContBak"
          type="tel"
          label="法人联系方式（备用）"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <van-field
          v-model="editForm.legCentNo"
          label="法人证件号"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
      </dadp-card>
      <dadp-card>
        <dadp-select
          v-model="editForm.enterpriseScale"
          :options="getCombo('entScaleBQType')"
          label="企业规模"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.regStatus"
          :options="getCombo('kycRegStatus')"
          label="工商登记状态"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.busiStatus"
          :options="getCombo('busiStatus')"
          label="营业状态"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择' }]"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.followStatus"
          :options="getCombo('followStatus')"
          label="跟进状态"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.areaType"
          :options="getCombo('areaType')"
          label="经营区域类型"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.busiPre"
          :options="getCombo('yesOrNo')"
          label="经营场地所有权"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择' }]"
          :disabled="opType === 'view'"
        ></dadp-select>
        <van-field
          v-model="editForm.busiArea"
          label="经营场所建筑面积"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <van-field
          v-model="editForm.employeeNumber"
          label="员工人数"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
      </dadp-card>
      <dadp-card>
        <van-field
          v-model="editForm.indProfit"
          label="行业利润率"
          label-width="8em"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          :disabled="opType === 'view'"
        ></van-field>
        <dadp-select
          v-model="editForm.industry"
          :options="tradeOne"
          label="所属一级行业"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          @change="(editForm.industryTwo = ''), (editForm.industryThree = ''), (editForm.industryFour = '')"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.industryTwo"
          :options="tradeTwo"
          label="所属二级行业"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          @change="(editForm.industryThree = ''), (editForm.industryFour = '')"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.industryThree"
          :options="tradeThree"
          label="所属三级行业"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          @change="editForm.industryFour = ''"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.industryFour"
          :options="tradeFour"
          label="所属四级行业"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
      </dadp-card>
      <dadp-card>
        <dadp-select
          v-model="editForm.demandIntention"
          :options="getCombo('demandIntention')"
          label="需求意向"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.busiHabits"
          :options="getCombo('busiHabits')"
          label="老板经营习惯"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.custValue"
          :options="getCombo('custValue')"
          label="客户价值"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.wechatTag"
          :options="getCombo('wechatTag')"
          label="企业微信标签"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.isBankBusi"
          :options="getCombo('yesOrNo')"
          label="是否与金融业务机构有业务往来"
          label-width="8em"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-if="custType === '1'"
          v-model="editForm.ourBankBusi"
          :options="getCombo('ourBankBusi')"
          label="我行已有业务"
          label-width="8em"
          disabled
          input-align="right"
          placeholder="请选择"
        ></dadp-select>
        <dadp-select
          v-model="editForm.mktRecList"
          :options="getCombo('mktRec')"
          label="营销推荐"
          label-width="8em"
          multiple
          disabled
          input-align="right"
          placeholder="请选择"
        ></dadp-select>
      </dadp-card>
      <van-action-bar v-if="opType != 'view'">
        <van-button type="default" size="large" round plain @click="router.back()">取消</van-button>
        <van-button type="primary" size="large" :loading="loading" round native-type="submit">提交</van-button>
      </van-action-bar>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
import { updateCcmKyc, getCcmKyc } from '@/apis/cust';
import { getFileBizId } from '@/apis/common';
import { getCombo } from '@/hook/code-hook';
import { showToast } from 'vant';
import { splitFn } from '@/utils/global';
const router = useRouter();
const route = useRoute();

const opType = ref(route.query.opType || 'view');
const custId = ref(route.query.custId);
const custName = ref(route.query.custName);
const custType = ref(route.query.custType);

const editForm = ref({ industry: '', industryTwo: '', industryThree: '', industryFour: '', mktRecList: [] } as any);

// 初始化附件ID
const initDoorPhotoId = async () => {
  const { data, code } = await getFileBizId();
  if (code == 200) {
    editForm.value.doorPhotoId = data;
  }
};
const initBusiPhotoId = async () => {
  const { data, code } = await getFileBizId();
  if (code == 200) {
    editForm.value.busiPhotoId = data;
  }
};
// 获取详情
const initData = async () => {
  const { data } = await getCcmKyc({ custId: custId.value });
  if (data) {
    editForm.value = { ...data, mktRecList: [] };
    if (!editForm.value.custId) {
      editForm.value.custId = custId.value;
    }
    if (!editForm.value.custName) {
      editForm.value.custName = custName.value;
    }
    if (editForm.value.mktRec) {
      editForm.value.mktRecList = splitFn(editForm.value.mktRec);
    }
    if (!editForm.value.doorPhotoId) {
      initDoorPhotoId();
    }
    if (!editForm.value.busiPhotoId) {
      initBusiPhotoId();
    }
  }
};

// 所属行业
const combo = getCombo('trade') || [];
const _tradeOne = combo.filter((e) => e.value.length === 1);
const tradeOne = computed(() => {
  return _tradeOne;
});
const _tradeTwo = combo.filter((e) => e.value.length === 3);
const tradeTwo = computed(() => {
  return _tradeTwo.filter((e) => (editForm.value.industry ? e.value.includes(editForm.value.industry) : true));
});
const _tradeThree = combo.filter((e) => e.value.length === 4);
const tradeThree = computed(() => {
  return _tradeThree.filter((e) => (editForm.value.industryTwo ? e.value.includes(editForm.value.industryTwo) : true));
});
const _tradeFour = combo.filter((e) => e.value.length === 5);
const tradeFour = computed(() => {
  return _tradeFour.filter((e) => (editForm.value.industryThree ? e.value.includes(editForm.value.industryThree) : true));
});

const loading = ref(false);
// 提交表单
const submit = async () => {
  loading.value = true;
  const res = await updateCcmKyc({ ...editForm.value, custId: custId.value, custType: custType.value });
  if (res.code === 200) {
    showToast('提交成功');
    router.back();
  }
};

onMounted(() => {
  initData();
});
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
