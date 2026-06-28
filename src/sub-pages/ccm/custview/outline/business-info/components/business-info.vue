<template>
  <div class="hedtitle">经营信息</div>
  <dadp-refresh-list ref="holderInfoRef" :requestApi="BusiInfoInfo" :reqParams="queryParams">
    <template v-slot="{ data }">
      <dadp-card is-body-padding>
        <div class="grow">
          <span class="glabel">期数:</span>
          <span class="gvalue">{{ data.periods }}</span>
        </div>
        <div class="grow">
          <span class="glabel">资产余额</span>
          <span class="gvalue">{{ fmtThousands(data.totalAssets, 2) }}</span>
        </div>
        <div class="grow">
          <span class="glabel">负债总额</span>
          <span class="gvalue">{{ fmtThousands(data.totalLiabilit, 2) }}</span>
        </div>
        <div class="grow">
          <span class="glabel">营业收入</span>
          <span class="gvalue">{{ fmtThousands(data.businImcome, 2) }}</span>
        </div>
        <div class="grow">
          <span class="glabel">营业利润</span>
          <span class="gvalue">{{ fmtThousands(data.businProfit, 2) }}</span>
        </div>
        <div class="grow">
          <span class="glabel">进口金额（美元）</span>
          <span class="gvalue">{{ fmtThousands(data.importAum, 2) }}</span>
        </div>
        <div class="grow">
          <span class="glabel">出口金额（美元）</span>
          <span class="gvalue">{{ fmtThousands(data.exportAum, 2) }}</span>
        </div>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>

<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { codeTranslate } from '@/hook/code-hook';
import { fmtThousands } from '@/utils/format';
import { BusiInfoInfo } from '@/apis/cust';
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
const { queryParams } = toRefs(dataMap);
</script>

<style lang="less" scoped></style>
