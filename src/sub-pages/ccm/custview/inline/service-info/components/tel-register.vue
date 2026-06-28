<template>
  <div class="register-form">
    <van-form @submit="submit">
      <dadp-card>
        <van-field
          v-model="editForm.custName"
          label="客户姓名"
          input-align="right"
          error-message-align="right"
          disabled
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请输入客户姓名' }]"
          placeholder="请输入"
        ></van-field>
        <!-- <dadpSelect
          v-if="opType !== 'view'"
          v-model="editForm.contactUserId"
          :options="contactsOpts"
          label="联系人"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择联系人' }]"
          @change="changeContacts"
        ></dadpSelect> -->
        <van-field
          v-model="editForm.contactUserName"
          label="联系人"
          input-align="right"
          error-message-align="right"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请输入联系人' }]"
          placeholder="请输入"
        ></van-field>
        <van-field
          v-model="editForm.contactPhoneNum"
          label="电话号码"
          input-align="right"
          error-message-align="right"
          :disabled="opType === 'view'"
          placeholder="请输入"
        ></van-field>
        <dadpSelect
          v-model="editForm.contactThemes"
          :options="getCombo('telTheme')"
          :multiple="true"
          label="电访主题"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择电访主题' }]"
        ></dadpSelect>
        <van-field
          v-if="editForm.contactThemes?.includes('9')"
          v-model="editForm.contactThemeRemark"
          label="其他主题"
          input-align="right"
          error-message-align="right"
          :disabled="opType === 'view'"
          placeholder="请输入"
        ></van-field>
        <dadp-datetime
          v-model="editForm.beginTime"
          label="开始通话时间"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择开始通话时间' }]"
          :max-date="editForm.endTime ? parseDate(editForm.endTime, 'yyyy-MM-dd HH:mm:ss') : new Date()"
          :disabled-moment="!!editForm.endTime"
          @change="handleTimeChange"
        ></dadp-datetime>
        <dadp-datetime
          v-model="editForm.endTime"
          label="结束通话时间"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择结束通话时间' }]"
          :min-date="editForm.beginTime ? parseDate(editForm.beginTime, 'yyyy-MM-dd HH:mm:ss') : undefined"
          :max-date="new Date()"
          :disabled-moment="false"
          @change="handleTimeChange"
        ></dadp-datetime>
        <van-field
          v-model="editForm.callDuration"
          type="digit"
          label="通话时长(秒)"
          label-width="10em"
          input-align="right"
          placeholder="请输入"
          disabled
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请输入通话时长' }]"
        ></van-field>
      </dadp-card>
      <dadp-card>
        <div class="operation">
          <van-field
            v-model="editForm.visitReason"
            type="textarea"
            rows="5"
            label="电访原因目标"
            label-align="top"
            placeholder="请输入"
            maxlength="200"
            :show-word-limit="true"
            autosize
            :disabled="opType === 'view'"
            :required="opType != 'view'"
            :rules="[{ required: true, message: '请输入电访原因目标' }]"
          ></van-field>
        </div>
      </dadp-card>
      <dadp-card>
        <dadpSelect
          v-model="editForm.feedback"
          :options="getCombo('custFb')"
          label="客户反馈"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择客户反馈' }]"
        ></dadpSelect>
      </dadp-card>
      <dadp-card>
        <div class="operation">
          <van-field
            v-model="editForm.contactContent"
            type="textarea"
            rows="5"
            label="电访内容"
            label-align="top"
            placeholder="请输入"
            maxlength="200"
            :show-word-limit="true"
            autosize
            :disabled="opType === 'view'"
            :required="opType != 'view'"
            :rules="[{ required: true, message: '请输入电访内容' }]"
          ></van-field>
        </div>
        <div class="tel-content" v-if="opType != 'view'">
          <van-space wrap>
            <van-tag type="primary" plain v-for="(item, index) in getCombo('telContent')" :key="index" @click="clickFn(item)">
              {{ item.value }}
            </van-tag>
          </van-space>
        </div>
      </dadp-card>

      <div v-if="route.query.exeRegSrc !== '3'" class="title">
        <span></span>
        <span v-if="opType != 'view'" class="right-text" @click="gotoFeedBack">登记客户意向</span>
      </div>

      <dadp-card>
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
          v-model="editForm.isFollowAgain"
          :options="getCombo('yesOrNo')"
          label="是否再次跟进"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择是否再次跟进' }]"
        ></dadpSelect>
        <dadp-date
          v-if="editForm.isFollowAgain === '1'"
          v-model="editForm.followDate"
          label="待跟进日期"
          value-fmt="yyyyMMdd"
          input-align="right"
          placeholder="请选择"
          :min-date="new Date()"
          :disabled="opType === 'view'"
          :required="opType != 'view'"
          :rules="[{ required: true, message: '请选择待跟进日期' }]"
        ></dadp-date>
      </dadp-card>
      <dadp-card>
        <dadp-file
          label="图片"
          :moduleId="'T_CMM_EXE_REG'"
          :business-id="editForm.exeRegId"
          :readonly="opType == 'view'"
          :rules="[{ required: false, message: '请上传图片' }]"
        ></dadp-file>
      </dadp-card>
      <van-action-bar v-if="opType != 'view'">
        <van-button type="default" size="large" round plain @click="router.back()">取消</van-button>
        <van-button type="primary" size="large" round native-type="submit">提交</van-button>
      </van-action-bar>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpDatetime from '@/components/dadp-ui/dadp-datetime.vue';
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
import busiProd from '@/components/business/busi-prod.vue';
import busiProdKind from '@/components/business/busi-prod-kind.vue';
import { saveTelRegister, getTelRegisterDetail, getContactsList, getEpqContactsList } from '@/apis/cust';
import { getFileBizId } from '@/apis/common';
import { getCombo } from '@/hook/code-hook';
import { splitFn } from '@/utils/global';
import { showToast } from 'vant';
import { fmtDate, parseDate } from '@/utils/format';
import { differenceInSeconds } from 'date-fns';
import { touchNumAdd } from '@/apis/home';

const router = useRouter();
const route = useRoute();

const dataMap = reactive({
  editForm: { contactThemes: [], contactContent: '1.客户实际的经营情况；\n2.客户真实的融资需求；\n3.客户对银行服务建议。' } as any,
  opType: '',
  contactsOpts: Array<any>(),
});
const { opType, editForm, contactsOpts } = toRefs(dataMap);

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

// 获取联系人列表
const initContactsOpts = async () => {
  // 1-存量客户、否则潜客
  if (route.query.isCust === '1') {
    const { data } = await getContactsList({ custId: dataMap.editForm.custId });
    dataMap.contactsOpts = data.map((item: any) => {
      return {
        value: item.custContactsId,
        content: item.contactsName,
        ...item,
      };
    });
  } else {
    const { data } = await getEpqContactsList({ epqcustId: dataMap.editForm.custId });
    dataMap.contactsOpts = data.map((item: any) => {
      return {
        value: item.custContactsId,
        content: item.contactsName,
        ...item,
      };
    });
  }
};
// 初始化附件ID
const initFileId = async () => {
  const { data, code } = await getFileBizId();
  if (code == 200 && !!data) {
    dataMap.editForm.exeRegId = data;
  } else {
    initFileId();
  }
};
// 获取详情
const initData = async () => {
  const { data } = await getTelRegisterDetail({ exeRegId: route.params.exeRegId });
  if (data) {
    dataMap.editForm = data;
    dataMap.editForm.intentionProdKindIdList = splitFn(dataMap.editForm.intentionProdKindIds);
    let _intentionProdId = splitFn(dataMap.editForm.intentionProdId);
    let _intentionProdName = splitFn(dataMap.editForm.intentionProdName);
    dataMap.editForm.intentionProdIdList = _intentionProdId.map((item, index) => ({ prodId: item, prodName: _intentionProdName[index] }));
    dataMap.editForm.contactThemes = splitFn(dataMap.editForm.contactTheme);
    initContactsOpts();
  }
};
// 意向产品目录回调事件
const doSelectFn1 = (checkData: any) => {
  dataMap.editForm.intentionProdKindNames = checkData.map((e: any) => e.name).join(',');
};
// 意向产品回调事件
const doSelectFn2 = (checkData: any) => {
  dataMap.editForm.intentionProdName = checkData.map((e: any) => e.prodName).join(',');
};
// 选中联系人回调
const changeContacts = (val: any) => {
  let _tmp = dataMap.contactsOpts.find((item) => item.value === val);
  dataMap.editForm.contactUserName = _tmp?.content;
  dataMap.editForm.contactPhoneNum = _tmp?.phone;
};
// 获取通话时长
const handleTimeChange = () => {
  if (dataMap.editForm.endTime && dataMap.editForm.beginTime) {
    let beginTime = parseDate(dataMap.editForm.beginTime, 'yyyy-MM-dd HH:mm:ss');
    let endTime = parseDate(dataMap.editForm.endTime, 'yyyy-MM-dd HH:mm:ss');
    dataMap.editForm.callDuration = differenceInSeconds(endTime, beginTime);
  }
};
// 快速录入电访内容
const clickFn = (item: any) => {
  dataMap.editForm.contactContent = item.content;
};
// 提交表单
const submit = async () => {
  dataMap.editForm.intentionProdId = (dataMap.editForm.intentionProdIdList || []).map((item) => item.prodId).join(',');
  dataMap.editForm.intentionProdKindIds = (dataMap.editForm.intentionProdKindIdList || []).join(',');
  dataMap.editForm.contactTheme = (dataMap.editForm.contactThemes || []).join(',');
  const res = await saveTelRegister({ ...dataMap.editForm, contactType: '3' });
  if (res.code === 200) {
    if (dataMap.editForm.exeRegSrc === '5') {
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
  if (route.params.exeRegId) {
    opType.value = 'view';
    initData();
  } else {
    opType.value = 'add';
    dataMap.editForm.custId = route.query.custId;
    dataMap.editForm.custName = route.query.custName;
    dataMap.editForm.exeRegSrc = route.query.exeRegSrc;
    dataMap.editForm.srcId = route.query.srcId;
    dataMap.editForm.visitReason = route.query.reason;
    initContactsOpts();
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
