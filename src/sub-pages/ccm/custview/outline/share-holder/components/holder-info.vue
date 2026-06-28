<template>
  <div class="headTab">
    <van-tabs type="card" v-model:active="active">
      <van-tab title="股东信息" name="0"></van-tab>
      <van-tab title="主要人员" name="1"></van-tab>
    </van-tabs>
  </div>
  <div v-if="active == '0'">
    <div class="hedtitle">股东信息</div>
    <dadp-refresh-list ref="holderInfoRef" :requestApi="ShareholderInfo" :reqParams="queryParams">
      <template v-slot="{ data }">
        <dadp-card is-body-padding>
          <div class="grow">
            <span class="glabel">序号:</span>
            <span class="gvalue">{{ data.index + 1 }}</span>
          </div>
          <div class="grow">
            <span class="glabel">股东名称:</span>
            <span class="gvalue">{{ data.investorName }}</span>
          </div>
          <div class="grow">
            <span class="glabel">出资比例:</span>
            <span class="gvalue">{{ data.precent }}%</span>
          </div>
          <div class="grow">
            <span class="glabel">出资金额:</span>
            <span class="gvalue">{{ fmtThousands(data.capitallactl, 2) }}</span>
          </div>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </div>
  <div v-if="active == '1'">
    <div class="hedtitle">主要人员</div>
    <dadp-refresh-list ref="impeopleRef" :requestApi="SeniorManagement" :reqParams="queryParams">
      <template v-slot="{ data }">
        <dadp-card is-body-padding>
          <div class="grow">
            <span class="glabel">序号:</span>
            <span class="gvalue">{{ data.index + 1 }}</span>
          </div>
          <div class="grow">
            <span class="glabel">主要人员:</span>
            <span class="gvalue">{{ data.staffName }}</span>
          </div>
          <div class="grow">
            <span class="glabel">任职岗位</span>
            <span class="gvalue">{{ data.staffPost }}</span>
          </div>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </div>
</template>

<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { codeTranslate } from '@/hook/code-hook';
import { fmtThousands } from '@/utils/format';
import { ShareholderInfo, SeniorManagement } from '@/apis/cust';
const route = useRoute();
const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
  contacts: {
    type: Array,
    default: () => [],
  },
});
const dataMap = reactive({
  active: '0',
  queryParams: {
    custId: route.params.custId,
    pageNo: 1,
    pageSize: 10,
  },
});
const { queryParams, active } = toRefs(dataMap);
</script>

<style lang="less" scoped>
.headTab {
  padding-top: 10px;
}
</style>
