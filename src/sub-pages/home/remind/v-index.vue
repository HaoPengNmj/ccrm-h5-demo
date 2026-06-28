<!--
 * @desc: 我的提醒
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-08 15:35:40
-->
<template>
  <van-nav-bar title="我的提醒" fixed left-arrow @click-left="router.back()">
    <template #right>
      <div @click="readAllFn">
        <van-image class="icon" :src="readAllImg" />
        <div class="text">一键已读</div>
      </div>
    </template>
  </van-nav-bar>
  <van-tabs v-model:active="custType">
    <van-tab v-for="(item, index) in showModuleComp" :key="index" :name="item.custType" :title="item.title" />
    <div v-if="isDOT" class="dot"></div>
  </van-tabs>
  <div v-if="custType != ''" class="my-group">
    <dadp-card is-body-padding>
      <dadp-radio v-model="curEventType" :options="eventTypeOptions" isBadge />
    </dadp-card>
  </div>
  <list ref="remindListRef" :eventType="curEventType" :custType="custType" @readCheckFn="hasOtherReminds" />
</template>
<script lang="ts" setup>
import readAllImg from '@/assets/images/home/readAll.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import list from '@/sub-pages/home/remind/modules/list.vue';
import { listMyForBigTotal, listMyNotify, markAsRead, readNotify } from '@/apis/home';
import { getCombo } from '@/hook/code-hook';
import { showConfirmDialog, showToast } from 'vant';
import { hasPermission } from '@/hook/use-common-hook';
import { codeInfoList } from '@/apis/common';

defineOptions({ name: 'remind' });

const router = useRouter();
const remindListRef = ref();

// 事件提醒条线
const moduleComp = ref([
  {
    id: '1',
    title: '个人客户事件提醒',
    custType: 'P',
    permission: hasPermission('home-remind_app-pevent_app'),
  },
  {
    id: '2',
    title: '公司客户事件提醒',
    custType: 'E',
    permission: hasPermission('home-remind_app-cevent_app'),
  },
  {
    id: '3',
    title: ' 其他提醒 ',
    custType: '',
    permission: hasPermission('home-remind_app-other_app'),
  },
]);
const showModuleComp = moduleComp.value.filter((e) => e.permission);
const custType = ref('P');

// 加载事件大类码值
const eventTypeList = ref([]);
const getCodeAll = async () => {
  const { data, code } = await codeInfoList({
    codeTypeId: 'eventType',
  });
  if (code == 200) eventTypeList.value = data;
};
// 过滤得到事件大类渲染项
const eventTypeOptions = computed(() => {
  let text = custType.value === 'P' ? '个人' : '公司';
  return eventTypeList.value
    .map((e) => {
      return { ...e, count: bigTotal.value.find((x) => x.eventType === e.value)?.unreadNum || undefined };
    })
    .filter((e) => e.remark.includes(text));
});
// 当前事件大类
const curEventType = ref();
watchEffect(() => {
  curEventType.value = eventTypeOptions.value?.[0]?.value;
});
// 当前大类未读数量
const bigTotal = ref([]);
const initBigTotal = async () => {
  if (custType.value !== '') {
    const { data } = await listMyForBigTotal({ pageNo: 1, pageSize: 20, custType: custType.value });
    bigTotal.value = data.map((e) => ({ ...e, remindNum: Number(e.remindNum), unreadNum: Number(e.unreadNum) }));
  }
};
watchEffect(() => {
  initBigTotal();
});

// 是否暂时其他提醒未读红点
const isDOT = ref(false);
const hasOtherReminds = async () => {
  const { data } = await listMyNotify({ notifyState: '1', pageNo: 1, pageSize: 10 });
  isDOT.value = data?.total > 0;
};

// 一键阅读
const readAllFn = async () => {
  showConfirmDialog({
    message: `是否将消息提醒全部标记为已读?`,
  })
    .then(async () => {
      custType.value ? readEventReminds() : readOtherReminds();
      initBigTotal();
      hasOtherReminds();
    })
    .catch(() => {});
};
// 个人客户、公司提醒
const readEventReminds = async () => {
  const { code } = await markAsRead({ custType: custType.value, isReadAll: '1' });
  if (code === 200) {
    showToast('全部已读');
    remindListRef.value.getEventRemindData();
  }
};
// 其他提醒
const readOtherReminds = async () => {
  const { code } = await readNotify({ isReadAll: '1', wpNotifyDTO4List: { pageNo: -1, pageSize: -1 } });
  if (code === 200) {
    showToast('全部已读');
    remindListRef.value.getOtherRemindData();
  }
};

onMounted(() => {
  hasOtherReminds();
  getCodeAll();
});
</script>
<style lang="less" scoped>
.icon {
  height: 28px;
  width: 28px;
}
.text {
  font-family: PingFangSC-Regular;
  font-size: @font-size-22;
  color: @gray;
  letter-spacing: 0;
  text-align: right;
  line-height: 22px;
  font-weight: 400;
}
.my-group {
  margin: 24px 32px 0;
}
.dot {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: @red;
  position: absolute;
  top: 32px;
  right: 32px;
}
</style>
