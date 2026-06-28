<!--
 * @desc: 客户提醒
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-08 15:35:40
-->
<template>
  <van-nav-bar title="客户提醒" fixed left-arrow @click-left="router.back()">
    <template #right>
      <div @click="readAllFn">
        <van-image class="icon" :src="readAllImg" />
        <div class="text">一键已读</div>
      </div>
    </template>
  </van-nav-bar>
  <div class="my-group">
    <div class="base-info">
      <div class="content">
        <div class="content-row">
          <div class="name">{{ custInfo.custName }}</div>
          <div class="level">{{ codeTranslate('pcmCustBaseLevel', custInfo.custLevel) || '--' }}</div>
        </div>
        <div class="content-row" style="justify-content: space-between">
          <div class="age">{{ custInfo.custId }}</div>
        </div>
      </div>
    </div>
    <dadp-card is-body-padding>
      <dadp-radio v-model="eventType" :options="eventTypeOptions" isBadge />
    </dadp-card>
    <list ref="remindListRef" :eventType="eventType" :custType="custType" :custId="custId" />
  </div>
</template>
<script lang="ts" setup>
import readAllImg from '@/assets/images/home/readAll.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import list from '@/sub-pages/pcm/custview/remind/modules/list.vue';
import { listMyForBigTotal, markAsRead } from '@/apis/home';
import { codeTranslate, getCombo } from '@/hook/code-hook';
import { showConfirmDialog, showToast } from 'vant';

defineOptions({ name: 'pcm-view-remind' });

const router = useRouter();
const route = useRoute();
const remindListRef = ref();

const custInfo = ref({
  custId: route.query.custId,
  custName: route.query.custName,
  custLevel: route.query.custLevel as string,
});

// 事件提醒条线
const moduleComp = ref([
  {
    id: '1',
    title: '个人客户事件提醒',
    custType: 'P',
  },
]);
const custType = ref('P');

// 事件提醒类型
const eventType = ref(getCombo('eventType')?.[0].value);
const custId = ref(route.query.custId as string);
const bigTotal = ref([]);
const eventTypeOptions = computed(() => {
  return getCombo('eventType').map((e) => {
    return { ...e, count: bigTotal.value.find((x) => x.eventType === e.value)?.unreadNum || undefined };
  });
});

// 一键阅读
const readAllFn = async () => {
  showConfirmDialog({
    message: `是否将消息提醒全部标记为已读?`,
  })
    .then(async () => {
      const { code } = await markAsRead({ custType: custType.value, isReadAll: '1', custId: custId.value });
      if (code === 200) {
        showToast('全部已读');
        remindListRef.value.getEventRemindData();
      }
    })
    .catch(() => {});
};

const initNum = async () => {
  if (custType.value !== '') {
    const { data } = await listMyForBigTotal({ pageNo: 1, pageSize: 20, custId: custId.value, custType: custType.value });
    bigTotal.value = data.map((e) => ({ ...e, remindNum: Number(e.remindNum), unreadNum: Number(e.unreadNum) }));
  }
};

watchEffect(() => {
  initNum();
});
</script>
<style lang="less" scoped>
.base-info {
  padding-bottom: 24px;
  .content {
    flex: auto;
    .content-row + .content-row {
      padding-top: 12px;
    }

    .content-row {
      display: flex;
      align-items: center;

      .name {
        font-family: PingFangSC-Semibold;
        font-size: @font-size-40;
        color: @text;
        line-height: 48px;
        font-weight: 600;
        word-break: break-all;
      }
      .age {
        font-family: PingFangSC-Regular;
        font-size: @font-size-24;
        color: @sub-text;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: 400;
      }

      .level {
        margin-left: 16px;
        padding: 5px 8px;
        background: #222222;
        border: 1px solid rgba(196, 138, 19, 1);
        border-radius: 8px 0px 8px 0px;
        font-family: PingFangSC-Medium;
        font-size: @font-size-22;
        color: #ffcd64;
        line-height: 22px;
        font-weight: 500;
        white-space: nowrap;
      }

      .focus {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: @font-size-24;
        color: @sub-text;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: 400;
        &-icon {
          width: 30px;
          height: 30px;
        }
        div {
          height: 30px;
          line-height: 30px;
          margin-left: 4px;
        }
      }
    }
  }
}

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
  padding: 24px 32px 0;
  background-image: url('@/assets/images/cust/view/view-background.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
