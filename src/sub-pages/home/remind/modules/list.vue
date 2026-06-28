<!--
 * @desc: 事件汇总列表
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-08 02:18:14
-->
<template>
  <div class="remind-list">
    <template v-if="props.custType != ''">
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
    </template>
    <template v-if="props.custType === ''">
      <div class="header">
        <div class="title">共{{ refreshListRef?.total }}项</div>
        <div class="right">
          <div class="btn" @click="showCheck = !showCheck">{{ !showCheck ? '选择提醒' : '取消选择' }}</div>

          <van-dropdown-menu ref="dropdownMenuRef">
            <van-dropdown-item>
              <template #title>
                <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
              </template>
              <van-form class="gform" @submit="onSubmit">
                <van-cell-group>
                  <dadp-datetime v-model="reqParams.startDate" label="推送开始时间" input-align="right" clearable></dadp-datetime>
                  <dadp-datetime v-model="reqParams.endDate" label="推送结束时间" input-align="right" clearable></dadp-datetime>
                  <van-field name="radio" label="阅读状态" input-align="right">
                    <template #input>
                      <dadp-radio v-model="reqParams.notifyState" :options="notifyStateOpt" />
                    </template>
                  </van-field>
                </van-cell-group>
                <div class="gform-footer">
                  <van-button size="large" round plain @click="onCancel">取消</van-button>
                  <van-button type="primary" size="large" round native-type="submit">查询</van-button>
                </div>
              </van-form>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
      </div>
      <dadp-refresh-list ref="refreshListRef" :requestApi="listMyNotify" :reqParams="{ ...reqParams }">
        <template v-slot="{ data }">
          <dadp-card avatar="task" :title="data.notifyTitle" is-body-padding @click="handleClick2(data)">
            <div class="dot" v-if="data.notifyState === '1'"></div>
            <template #subTitle>
              <van-space>
                <van-tag color="#ffe6e7" text-color="#FF0D12">{{ codeTranslate('notifyType', data.notifyType) }}</van-tag>
              </van-space>
            </template>
            <template #header-right v-if="showCheck">
              <van-checkbox :model-value="checkIds.includes(data.notifyId)" icon-size="0.35rem" shape="square"></van-checkbox>
            </template>
            <div class="grow">
              <div class="gcol">
                <span class="glabel">推送时间：</span>
                <span class="gvalue">{{ fmtDate(data.pushTime) || '--' }}</span>
              </div>
            </div>
            <div class="grow">
              <span class="glabel">消息内容：</span>
              <span class="gvalue">{{ data.notifyDetails || '--' }}</span>
            </div>
          </dadp-card>
        </template>
      </dadp-refresh-list>
    </template>
  </div>
  <van-action-bar v-if="showCheck">
    <div class="bottomBar">
      <div class="left">
        <van-checkbox v-model="isCheckAll" icon-size="0.35rem" shape="square" @change="checkAllFn">全选</van-checkbox>
      </div>
      <div class="right">
        <van-button size="large" plain round @click="showCheck = false">取消</van-button>
        <van-button type="primary" size="large" round @click="readCheckFn()">标记已读</van-button>
      </div>
    </div>
  </van-action-bar>
</template>

<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpDatetime from '@/components/dadp-ui/dadp-datetime.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import { listEventRemind, listMyNotify, readNotify } from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';
import { fmtDate } from '@/utils/format';
import { showToast } from 'vant';

const props = defineProps({
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

interface EmitsType {
  (e: 'readCheckFn'): void;
}
const emit = defineEmits<EmitsType>();

const router = useRouter();
const checkIds = ref([]);
const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

const dataMap = reactive({
  eventTotal: 0,
  eventReminds: Array<any>(),
  otherTotal: 0,
  otherReminds: Array<any>(),
  reqParams: {
    notifyState: '',
    endDate: '',
    startDate: '',
  },
  notifyStateOpt: [
    { content: '全部', value: '' },
    { content: '已阅', value: '3' },
    { content: '未阅', value: '1' },
  ],
  // 是否开启选择框
  showCheck: false,
  // 是否全选
  isCheckAll: false,
});
const { eventReminds, eventTotal, showCheck, isCheckAll, otherTotal, otherReminds, notifyStateOpt, reqParams } = toRefs(dataMap);

// 单选
const handleClick2 = (data: any) => {
  if (!showCheck.value) {
    return;
  }
  if (checkIds.value.includes(data.notifyId)) {
    checkIds.value.splice(checkIds.value.indexOf(data.notifyId), 1);
  } else {
    checkIds.value.push(data.notifyId);
  }
};

//一键勾选所有 若为已读也同样勾选
const checkAllFn = (val) => {
  if (val) {
    checkIds.value = refreshListRef.value.listData?.map((e) => e.notifyId);
  } else {
    checkIds.value = [];
  }
};
// 个人、公司事件提醒
const getEventRemindData = async () => {
  if (!props.eventType) {
    return;
  }
  const { code, data } = await listEventRemind({
    pageNo: 1,
    pageSize: 20,
    eventType: props.eventType,
    custType: props.custType,
  });
  if (code === 200) {
    dataMap.eventReminds = data.rows;
    dataMap.eventTotal = data.total;
  }
};
//其他提醒
const getOtherRemindData = () => {
  onSearch();
};

// 查询
const onSearch = () => {
  refreshListRef.value?.onRefresh();
};
// 取消
const onCancel = () => {
  dropdownMenuRef.value.close();
};
// 提交
const onSubmit = () => {
  dropdownMenuRef.value.close();
  onSearch();
};
// 已读选中提醒
const readCheckFn = async () => {
  if (checkIds.value.length === 0) {
    showToast('请选择提醒数据');
    return;
  }
  const { code } = await readNotify({ notifyIds: checkIds.value.join(',') });
  if (code == 200) {
    showToast('阅读成功');
    isCheckAll.value = false;
    showCheck.value = false;
    onSearch();
    emit('readCheckFn');
  }
};
watchEffect(() => {
  if (!showCheck.value) {
    checkIds.value = [];
    isCheckAll.value = false;
  }
});
// 个人、公司事件提醒-点击事件
const handleClick = (item: any) => {
  router.push({
    name: 'remind-dtl',
    query: {
      custType: props.custType,
      eventType: item.eventType,
      eventSmallType: item.eventSmallType,
    },
  });
};

defineExpose({
  getEventRemindData,
  getOtherRemindData,
});

watchEffect(() => {
  getEventRemindData();
});
onMounted(() => {
  getOtherRemindData();
});
</script>

<style lang="less" scoped>
.remind-list {
  padding: 24px;
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
.right {
  display: flex;
  align-items: center;
  .btn {
    color: @primary-color;
  }
}
.bottomBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 9px 32px;
  .left {
    white-space: nowrap;
  }
  .right {
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
  }
}
</style>
