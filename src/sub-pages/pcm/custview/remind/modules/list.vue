<!--
 * @desc: 事件汇总列表
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-08 02:18:14
-->
<template>
  <div class="remind-list">
    <div class="header">
      <div class="title">共{{ eventTotal }}项</div>
    </div>
    <template v-if="eventReminds.length > 0">
      <dadp-card
        v-for="(item, index) in eventReminds"
        :key="index"
        :title="codeTranslate('eventSmallType', item.eventSmallType)"
        avatar="task"
        is-arrow
        @click="handleClick(item)"
      >
        <template #subTitle>
          <van-space>
            <div>提醒数:{{ item.remindNum }}</div>
            <div>未读数:{{ item.unreadNum }}</div>
          </van-space>
        </template>
      </dadp-card>
    </template>
    <dadp-empty v-else></dadp-empty>
  </div>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import { listEventRemind } from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';

const props = defineProps({
  custId: {
    type: String,
    default: '',
  },
  // 客户类型（条线）
  custType: {
    type: String,
    default: '',
  },
  // 事件大类
  eventType: {
    type: String,
    default: '',
  },
});

const router = useRouter();

const dataMap = reactive({
  eventTotal: 0,
  eventReminds: Array<any>(),
});
const { eventReminds, eventTotal } = toRefs(dataMap);

// 个人事件提醒
const getEventRemindData = async () => {
  const { code, data } = await listEventRemind({
    pageNo: 1,
    pageSize: 20,
    eventType: props.eventType,
    custType: props.custType,
    custId: props.custId,
  });
  if (code === 200) {
    dataMap.eventReminds = data.rows;
    dataMap.eventTotal = data.total;
  }
};

// 个人事件提醒-点击事件
const handleClick = (item: any) => {
  router.push({
    name: 'pcm-view-remind-dtl',
    query: {
      custType: props.custType,
      eventType: item.eventType,
      eventSmallType: item.eventSmallType,
      custId: props.custId,
    },
  });
};

defineExpose({
  getEventRemindData,
});

watchEffect(() => {
  getEventRemindData();
});
</script>

<style lang="less" scoped>
.remind-list {
  padding: 24px 0px;
}
.title {
  font-family: PingFangSC-Regular;
  font-size: @font-size-28;
  letter-spacing: 0;
  line-height: 28px;
  font-weight: 400;
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
</style>
