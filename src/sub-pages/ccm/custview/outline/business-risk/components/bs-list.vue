<template>
  <div class="hedtitle" v-if="bs.totalMoney">
    欠税总金额：
    <span class="money">{{ fmtThousands(riskOwnTaxTotal, 2) }}</span>
  </div>
  <dadp-refresh-list :requestApi="bs.apiUrl" :reqParams="queryParams">
    <template v-slot="{ data }">
      <dadp-card :title="bs.bsName ? bs.bsName : ''" is-body-padding :isArrow="bs.dtl" @click="handleClick(data)">
        <div class="grow">
          <span class="glabel">序号：</span>
          <span class="gvalue">{{ data.index + 1 }}</span>
        </div>
        <div class="grow" v-for="item in bs.fields">
          <span class="glabel">{{ item.label }}：</span>
          <span class="gvalue">{{ item.formatter ? item.formatter(data) || '--' : data[item.prop] || '--' }}</span>
        </div>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>

<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { riskOwnTaxList } from '@/apis/cust';
import { fmtThousands } from '@/utils/format';
const router = useRouter();
const props = defineProps({
  queryParams: {
    type: Object,
    default: () => {},
  },
  bs: {
    type: Object,
    default: () => {},
  },
});
const dataMap = reactive({
  riskOwnTaxTotal: 0, //欠税总金额
});
const { riskOwnTaxTotal } = toRefs(dataMap);
// 欠税信息
const RiskOwnTaxList = async () => {
  const { data } = await riskOwnTaxList({ custId: props.queryParams.custId, pageNo: 1, pageSize: 10 });
  if (data) {
    dataMap.riskOwnTaxTotal = data.ownTaxAmountTotal || 0;
  }
};
// 跳转法律诉讼详情
const handleClick = (val: any) => {
  //行政处罚详情页
  if (val.riskAdminPunishId) {
    router.push({
      name: 'details',
      query: {
        riskAdminPunishId: val.riskAdminPunishId,
      },
    });
  }
  //欠税信息详情页
  else if (val.riskOwnTaxId) {
    router.push({
      name: 'details',
      query: {
        riskOwnTaxId: val.riskOwnTaxId,
      },
    });
  }
  //税收违法详情页
  else if (val.taxPunishId) {
    router.push({
      name: 'details',
      query: {
        taxPunishId: val.taxPunishId,
      },
    });
  }
  //环保处罚详情页
  else if (val.environPunishId) {
    router.push({
      name: 'details',
      query: {
        environPunishId: val.environPunishId,
      },
    });
  }
};
onMounted(() => {
  //欠税信息详情页
  RiskOwnTaxList();
});
</script>
<style>
.money {
  color: red;
}
</style>
