<template>
  <div>
    <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="getBusinessClueList" :reqParams="reqParams">
      <template v-slot="{ data }">
        <dadp-card
          avatar="task"
          :title="data.chanceName"
          is-body-padding
          :status="statusTms(data.mockStatus)?.name"
          :status-color="statusTms(data.mockStatus)?.color"
        >
          <template #subTitle>
            <div class="taskk">
              <div class="filter-action">
                <van-tag color="#e8f4ff" text-color="#1F98FF">{{ codeTranslate('changeSrc', data.chanceSrc) || '--' }}</van-tag>
              </div>
            </div>
          </template>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">创建时间：</span>
              <span class="gvalue">{{ data.createTime || '--' }}</span>
            </div>
            <div class="gcol">
              <span class="glabel">是否营销成功：</span>
              <span class="gvalue">{{ codeTranslate('yesOrNo', data.isMktSucc) || '--' }}</span>
            </div>
          </div>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">创建机构：</span>
              <span class="gvalue">{{ data.createOrgName || '--' }}</span>
            </div>
            <div class="gcol">
              <span class="glabel">执行人：</span>
              <span class="gvalue">{{ data.performeUserName || '--' }}</span>
            </div>
          </div>
          <div class="grow">
            <span class="glabel">商机描述：</span>
            <span class="gvalue">{{ data.chancedesc || '--' }}</span>
          </div>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { getBusinessClueList } from '@/apis/cust';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { codeTranslate } from '@/hook/code-hook';

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
    custType: 'E',
    chanceSts: ['2', '3', '4'],
  },
});
const { reqParams } = toRefs(dataMap);
// 根据传入的val值，返回两个字段name和color,对应关系如下: 1-申请中 orange，2-已通过 blue，3-已驳回 red，4-已撤回 gray
const statusTms = (val: any) => {
  switch (val) {
    case '1':
      return { name: '已通过', color: 'blue' };
    case '2':
      return { name: '已拒绝', color: 'red' };
    case '3':
      return { name: '已驳回', color: 'red' };
    case '4':
      return { name: '已撤回', color: 'gray' };
    default:
      return { name: '申请中', color: 'orange' };
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
