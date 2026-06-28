<template>
  <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="getRemindList" :reqParams="reqParams">
    <template v-slot="{ data }">
      <dadp-card :title="codeTranslate('eventSmallType', data.eventSmallType)" is-body-padding>
        <template #subTitle>
          {{ data.remindDate }}
        </template>
        <span class="text">
          {{ data.remindContent || '--' }}
        </span>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>

<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getRemindList } from '@/apis/cust';
import { codeTranslate } from '@/hook/code-hook';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});

const dataMap = reactive({
  reqParams: {
    custId: props.custInfo.custId,
  },
});
const { reqParams } = toRefs(dataMap);
</script>

<style lang="less" scoped>
.refresh-list {
  padding: 24px;
  .text {
    font-family: PingFangSC-Regular;
    font-size: @font-size-24;
    color: @text;
    letter-spacing: 0;
    line-height: 32px;
    font-weight: 400;
  }
}
</style>
