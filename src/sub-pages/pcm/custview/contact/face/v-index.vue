<template>
  <div class="register-form">
    <van-form @submit="submit">
      <dadp-card>
        <van-field
          v-model="editForm.custName"
          label="客户姓名"
          disabled
          input-align="right"
          error-message-align="right"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请输入客户姓名' }]"
          placeholder="请输入"
        ></van-field>
        <van-field
          v-model="editForm.contactName"
          label="联系人"
          input-align="right"
          error-message-align="right"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请输入联系人' }]"
          placeholder="请输入"
        ></van-field>
        <van-field
          v-model="editForm.contactTel"
          label="电话号码"
          input-align="right"
          error-message-align="right"
          :disabled="opType === 'view'"
          placeholder="请输入"
        ></van-field>
        <dadp-select
          v-model="editForm.faceThemes"
          :options="getCombo('faceTheme')"
          label="面访主题"
          input-align="right"
          placeholder="请选择"
          multiple
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择面访主题' }]"
        ></dadp-select>
        <van-field
          v-if="editForm.faceThemes?.includes('9')"
          v-model="editForm.faceThemeRemark"
          label="其他主题"
          input-align="right"
          error-message-align="right"
          :disabled="opType === 'view'"
          placeholder="请输入"
        ></van-field>
        <dadp-datetime
          v-model="editForm.signDate"
          label="面访时间"
          input-align="right"
          placeholder="请选择"
          :max-date="new Date()"
          :disabled-moment="false"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择面访时间' }]"
        ></dadp-datetime>
        <van-field
          v-model="editForm.signAddr"
          label="面访地点"
          type="textarea"
          rows="1"
          autosize
          right-icon="location-o"
          input-align="right"
          error-message-align="right"
          placeholder="点击获取地址"
          readonly
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请输入面访地点' }]"
          @click-right-icon="showMap = true"
        ></van-field>
      </dadp-card>
      <dadp-card>
        <div class="operation">
          <van-field
            v-model="editForm.faceReason"
            type="textarea"
            rows="5"
            label="面访原因"
            label-align="top"
            placeholder="请输入"
            maxlength="200"
            :show-word-limit="true"
            autosize
            :disabled="opType === 'view'"
            :required="opType != 'view'"
            :rules="[{ required: true, message: '请输入面访原因' }]"
          ></van-field>
        </div>
      </dadp-card>

      <div v-if="route.query.exeRegSrc !== '3'" class="title">
        <span></span>
        <span v-if="opType != 'view'" class="right-text" @click="gotoFeedBack">登记客户意向</span>
      </div>

      <dadp-card>
        <dadpSelect
          v-model="editForm.custFb"
          :options="getCombo('custFb')"
          label="客户反馈"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择客户反馈' }]"
        ></dadpSelect>

        <dadpSelect
          v-model="editForm.ifAccom"
          :options="getCombo('yesOrNo')"
          label="是否需要陪访"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择是否需要陪访' }]"
        ></dadpSelect>
        <busi-user
          v-if="editForm.ifAccom === '1'"
          v-model="editForm.accomUsers"
          label="陪访人员"
          multiple
          :top-orgId="userInfo.orgId"
          :disabled="opType === 'view'"
          input-align="right"
          placeholder="请选择"
          @do-select="selectUser"
        ></busi-user>

        <busi-prod-kind
          v-model="editForm.intentionProdKindIdList"
          label="意向产品目录"
          input-align="right"
          placeholder="请选择"
          multiple
          :disabled="opType === 'view'"
          @doSelect="doSelectFn1($event)"
        ></busi-prod-kind>
        <busi-prod
          v-model="editForm.intentionProdIdList"
          label="意向产品"
          input-align="right"
          placeholder="请选择"
          multiple
          :disabled="opType === 'view'"
          @doSelect="doSelectFn2($event)"
        ></busi-prod>
        <dadpSelect
          v-model="editForm.ifNext"
          label="是否再次跟进"
          :options="getCombo('yesOrNo')"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择是否再次跟进' }]"
        ></dadpSelect>
        <dadp-date
          v-if="editForm.ifNext === '1'"
          v-model="editForm.followDate"
          label="待跟进日期"
          input-align="right"
          placeholder="请选择"
          :min-date="new Date()"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择待跟进日期' }]"
        ></dadp-date>
      </dadp-card>

      <dadp-card>
        <div class="operation">
          <van-field
            v-model="editForm.faceContent"
            type="textarea"
            rows="5"
            label="拜访内容"
            label-align="top"
            placeholder="请输入"
            maxlength="200"
            :show-word-limit="true"
            autosize
            :disabled="opType === 'view'"
          ></van-field>
        </div>
      </dadp-card>
      <dadp-card>
        <dadp-file
          label="图片"
          :moduleId="'T_PMM_TOUCH_FACE'"
          :business-id="editForm.touchFaceId"
          :readonly="opType == 'view'"
          required
          :rules="[{ required: true, message: '请上传图片' }]"
        ></dadp-file>
      </dadp-card>
      <van-action-bar v-if="opType != 'view'">
        <van-button type="default" size="large" round plain @click="router.back()">取消</van-button>
        <van-button type="primary" size="large" :loading="loading" round native-type="submit">提交</van-button>
      </van-action-bar>
    </van-form>
  </div>
  <dadp-location v-model="showMap" @confirm="confirmAddress"></dadp-location>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpLocation from '@/components/dadp-ui/dadp-location.vue';
import dadpDatetime from '@/components/dadp-ui/dadp-datetime.vue';
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
import busiProd from '@/components/business/busi-prod.vue';
import busiProdKind from '@/components/business/busi-prod-kind.vue';
import busiUser from '@/components/business/busi-user.vue';
import { saveTouchFace, getTouchFace, getPotentialCust, getPerCustBaseInfo } from '@/apis/cust';
import { showToast } from 'vant';
import { onMounted, reactive, toRefs } from 'vue';
import { getCombo } from '@/hook/code-hook';
import { getFileBizId } from '@/apis/common';
import { splitFn } from '@/utils/global';
import { getStorage } from '@/storage/storage';
import { touchNumAdd } from '@/apis/home';

const router = useRouter();
const route = useRoute();

const userInfo = getStorage('userInfo') || {};
const dataMap = reactive({
  opType: '',
  editForm: { faceThemes: [], faceContent: '1.客户实际的经营情况；\n2.客户真实的融资需求；\n3.客户对银行服务建议。' } as any,
  contactsOpts: Array<any>(),
});
const { editForm, opType, contactsOpts } = toRefs(dataMap);

// 地图展示
const showMap = ref(false);
// 确认地址
const confirmAddress = (tmp: any) => {
  dataMap.editForm.signAddr = tmp.address + tmp.name;
  dataMap.editForm.adrrLng = tmp.location.lng;
  dataMap.editForm.adrrLat = tmp.location.lat;
  showMap.value = false;
};

const custInfo = ref({} as any);
// 初始化客户基本信息
const initCustData = async () => {
  if (route.query.isCust === '1') {
    const { data } = await getPerCustBaseInfo({ custId: route.query.custId });
    if (data) custInfo.value = { ...data };
    dataMap.editForm.contactName = custInfo.value?.custName;
    dataMap.editForm.contactTel = custInfo.value?.mobile;
  } else {
    const { data } = await getPotentialCust({ potentialCustId: route.query.custId });
    if (data) custInfo.value = { ...data };
    dataMap.editForm.contactName = custInfo.value?.custName;
    dataMap.editForm.contactTel = custInfo.value?.mobile;
  }
};
// 初始化附件ID
const initFileId = async () => {
  const { data, code } = await getFileBizId();
  if (code == 200 && !!data) {
    dataMap.editForm.touchFaceId = data;
  } else {
    initFileId();
  }
};
// 获取详情
const initData = async () => {
  const { data } = await getTouchFace({ touchFaceId: route.params.touchFaceId });
  if (data) {
    dataMap.editForm = data;
    dataMap.editForm.intentionProdKindIdList = splitFn(dataMap.editForm.intentionProdKindIds);
    let _intentionProdId = splitFn(dataMap.editForm.intentionProdId);
    let _intentionProdName = splitFn(dataMap.editForm.intentionProdName);
    dataMap.editForm.intentionProdIdList = _intentionProdId.map((item, index) => ({ prodId: item, prodName: _intentionProdName[index] }));

    dataMap.editForm.faceThemes = splitFn(dataMap.editForm.faceTheme);

    let _accomUserId = splitFn(dataMap.editForm.accomUserId);
    let _accomUserName = splitFn(dataMap.editForm.accomUserName);
    dataMap.editForm.accomUsers = _accomUserId.map((item, index) => ({ userId: item, userName: _accomUserName[index] }));
  }
};

// 登记客户意向
const gotoFeedBack = (val: any) => {
  // 登记渠道:1-商机，3-客户视图，5-任务执行
  if (route.query.exeRegSrc === '1') {
    router.push({
      name: 'mkt-chance-fb',
      query: {
        custId: route.query.custId,
      },
    });
  } else if (route.query.exeRegSrc === '5') {
    router.push({
      name: 'mkt-task-fb',
      query: {
        custId: dataMap.editForm.custId,
        custName: dataMap.editForm.custName,
        taskId: dataMap.editForm.srcId,
      },
    });
  }
};
// 回调-选择用户
const selectUser = (val: any) => {
  dataMap.editForm.accomUserId = dataMap.editForm.accomUsers.map((item: any) => item.userId).join(',');
  dataMap.editForm.accomUserName = dataMap.editForm.accomUsers.map((item: any) => item.userName).join(',');
};
// 意向产品目录回调事件
const doSelectFn1 = (checkData: any) => {
  dataMap.editForm.intentionProdKindNames = checkData.map((e: any) => e.name).join(',');
};
// 意向产品回调事件
const doSelectFn2 = (checkData: any) => {
  dataMap.editForm.intentionProdName = checkData.map((e: any) => e.prodName).join(',');
};
const loading = ref(false);
// 提交表单
const submit = async () => {
  loading.value = true;
  dataMap.editForm.intentionProdId = (dataMap.editForm.intentionProdIdList || []).map((item) => item.prodId).join(',');
  dataMap.editForm.intentionProdKindIds = (dataMap.editForm.intentionProdKindIdList || []).join(',');
  dataMap.editForm.faceTheme = dataMap.editForm.faceThemes.join(',');
  dataMap.editForm.faceDate = dataMap.editForm.signDate?.slice(0, 10);
  const res = await saveTouchFace({ ...dataMap.editForm });
  if (res.code === 200) {
    if (dataMap.editForm.faceSrc === '5') {
      touchNumAdd({
        custId: dataMap.editForm.custId,
        taskId: dataMap.editForm.srcId,
      });
    }
    showToast('提交成功');
    router.back();
  }
};

onMounted(async () => {
  if (route.params.touchFaceId) {
    opType.value = 'view';
    initData();
  } else {
    opType.value = 'add';
    dataMap.editForm.custId = route.query.custId;
    dataMap.editForm.custName = route.query.custName;
    dataMap.editForm.faceSrc = route.query.exeRegSrc;
    dataMap.editForm.srcId = route.query.srcId;
    dataMap.editForm.faceReason = route.query.reason;
    initCustData();
    initFileId();
  }
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
