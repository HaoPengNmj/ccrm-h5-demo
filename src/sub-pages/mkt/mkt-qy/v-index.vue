<!--
 * @desc: 营销权益
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2024-10-09 10：38：00
-->
<template>
  <van-search v-model="reqParams.queryCond" shape="round" placeholder="请输入客户姓名/手机号/身份证号" @search="onSearch"></van-search>
  <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="queryPhy" :reqParams="reqParams">
    <template v-slot="{ data }">
      <dadp-card
        :avatar="data.prizeImgUrl"
        :title="data.prizeName"
        is-body-padding
        :buttons="data.phySts === '1' ? buttons2 : buttons1"
        @footer-click="(btn) => footerClickFn(btn, data)"
      >
        <div class="grow">
          <div class="gcol">
            <span class="glabel">客户姓名：</span>
            <span class="gvalue">{{ data.userName || '--' }}</span>
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">手机号：</span>
            <span class="gvalue">{{ data.phoneNo || '--' }}</span>
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">活动名称：</span>
            <span class="gvalue">{{ data.actName || '--' }}</span>
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">身份证号：</span>
            <span class="gvalue">{{ data.certNo || '--' }}</span>
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">领取权益：</span>
            <span class="gvalue">{{ data.prizeName || '--' }}</span>
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">申领时间：</span>
            <span class="gvalue">{{ data.receiveTm || '--' }}</span>
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">领取数量：</span>
            <span class="gvalue">{{ data.receiveNum || '--' }}</span>
          </div>
        </div>
        <div class="grow" v-if="data.phySts === '1'">
          <div class="gcol">
            <span class="glabel">领取时间：</span>
            <span class="gvalue">{{ data.receiveTm || '--' }}</span>
          </div>
        </div>
      </dadp-card>
    </template>
  </dadp-refresh-list>

  <van-dialog
    v-if="showDialog"
    v-model:show="showDialog"
    title="领取权益验证"
    :show-confirm-button="!!formData.smsCode"
    show-cancel-button
    @confirm="onConfirm"
  >
    <van-form class="gform" ref="formRef" @submit="sendVerificationCode">
      <van-cell-group>
        <van-field
          v-model="formData.phoneNo"
          name="phoneNo"
          label="手机号"
          label-width="4em"
          type="tel"
          placeholder="请输入"
          required
          clearable
          :rules="[{ required: true, message: '请先输入手机号' }]"
        ></van-field>
        <van-field
          v-model="formData.smsCode"
          name="smsCode"
          label="验证码"
          label-width="4em"
          maxlength="6"
          type="digit"
          center
          clearable
          placeholder="请输入"
        >
          <template #button>
            <van-button style="width: 7em" size="small" :type="!isSendSMS ? 'primary' : ''" :disabled="isSendSMS" native-type="submit">
              <span v-if="!isSendSMS">发送验证码</span>
              <van-count-down v-if="isSendSMS" :time="remainingTime * 1000">
                <template #default="timeData">
                  <span>{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
    </van-form>
  </van-dialog>
</template>
<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { queryPhy, receivePrize, sendSMS, checkSmsSendCode } from '@/apis/mkt';
import { getStorage } from '@/storage/storage';
import { showConfirmDialog, showToast } from 'vant';

defineOptions({ name: 'mkt-task-list' });

const userInfo = getStorage('userInfo') || {}; // 用户信息
const route = useRoute();
const router = useRouter();

const refreshListRef = ref(); // 列表Ref

const reqParams = ref({
  queryCond: '',
});
// 卡片底部按钮
const buttons1 = ref([
  {
    name: '领取',
    icon: '',
  },
]);
const buttons2 = ref([
  {
    name: '已领取',
    icon: '',
    disabled: true,
  },
]);
// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};

const showDialog = ref(false);
const prizeInfo = ref(null);
const formRef = ref(null);
const formData = ref({} as any);
const isSendSMS = ref(false);
const TIME = 60;
const remainingTime = ref(TIME); // 剩余时间，单位为秒
const nowTime = ref(TIME);
const timer = ref(null);

// 4 -领取权益
const receiveFn = async () => {
  const { code, data } = await receivePrize({
    prizeReceiveId: prizeInfo.value.prizeReceiveId,
    actNodeNo: prizeInfo.value.cpId,
    nodeId: prizeInfo.value.nodeId,
    myPrizeNodeId: prizeInfo.value.myPrizeNodeId,
    phoneNo: formData.value.phoneNo,
  });
  if (code === 200) {
    showToast('领取成功');
    onSearch();
  }
};
// 3- 短信验证码校验
const checkFn = async () => {
  const { code, data } = await checkSmsSendCode({
    phoneNo: formData.value.phoneNo,
    smsCode: formData.value.smsCode,
  });
  if (code === 200) {
    receiveFn();
  }
};
// 2- 发送验证码
const sendVerificationCode = () => {
  // 防止重复发送验证码
  if (isSendSMS.value) {
    return;
  }

  // 清除之前的定时器（如果有）
  if (timer.value) {
    clearTimeout(timer.value);
  }

  isSendSMS.value = true;
  // 重置剩余时间为60秒
  remainingTime.value = TIME;
  nowTime.value = remainingTime.value - 2;

  const interval = setInterval(() => {
    if (nowTime.value > 0) {
      nowTime.value--;
    } else {
      clearInterval(interval);
      isSendSMS.value = false;
    }
  }, 1000);

  timer.value = interval;

  // 发送验证码
  sendSMS({
    phoneNo: formData.value.phoneNo,
  });
};
// 1- 确认领取弹窗
const confirmRightsClaim = async (data) => {
  showConfirmDialog({
    message: `确定领取权益吗?`,
  })
    .then(async () => {
      showDialog.value = true;
      formData.value.phoneNo = data.phoneNo;
      remainingTime.value = nowTime.value + 2;
      prizeInfo.value = data;
      formData.value = {};
    })
    .catch(() => {});
};

// 卡片底部按钮事件
const footerClickFn = (btn: any, data: any) => {
  if (btn.name === '已领取') {
    return;
  }
  if (btn.name === '领取') confirmRightsClaim(data);
};
// 确认按钮
const onConfirm = () => {
  let res = formRef.value.validate();
  if (res) {
    checkFn();
  }
};

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>
<style lang="less" scoped>
.refresh-list {
  padding: 24px;
}
</style>
