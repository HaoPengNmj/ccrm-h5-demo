<template>
  <div>
    <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="getMarketActiveList" :reqParams="reqParams">
      <template v-slot="{ data }">
        <dadp-card
          avatar="task"
          :title="data.taskName"
          is-body-padding
          :status="codeTranslate('taskSts', data.taskSts)"
          :status-color="getColor(data.taskSts)"
        >
          <template #subTitle>
            <van-space>
              <van-tag color="#e8f4ff" text-color="#1F98FF">
                {{ codeTranslate('taskBigType', data.taskBigType) }}
              </van-tag>
              <van-tag color="#fff3e7" text-color="#FF8812">
                {{ codeTranslate('taskType', data.taskType) }}
              </van-tag>
            </van-space>
          </template>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">任务有效期：</span>
              <span class="gvalue">{{ data.taskStartDate || '--' }}至{{ data.taskEndDate || '--' }}</span>
            </div>
          </div>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">创建机构：</span>
              <span class="gvalue">{{ data.createOrgName }}</span>
            </div>
          </div>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { getMarketActiveList } from '@/apis/cust';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { codeTranslate } from '@/hook/code-hook';
import { fmtDate } from '@/utils/format';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const dataMap = reactive({
  reqParams: {
    custId: props.custInfo.custId,
    taskSts: '5',
    custType: 'E',
  },
});
const { reqParams } = toRefs(dataMap);

// 根据传入的val值，返回两个字段name和color,对应关系如下: 1-申请中 orange，2-已通过 blue，3-已驳回 red，4-已撤回 gray
const getColor = (val: any) => {
  switch (val) {
    case '1':
      return 'blue';
    case '2':
      return 'red';
    case '3':
      return 'blue';
    case '4':
      return 'orange';
    case '5':
      return 'orange';
    case '6':
      return 'red';
    case '7':
      return 'gray';
    case '8':
      return 'gray';
    default:
      return 'orange';
  }
};
</script>

<style lang="less" scoped>
.glabel {
  padding: 0 10px;
}

.taskk {
  display: flex;
}

.refresh-list {
  padding: 24px;
}
</style>
