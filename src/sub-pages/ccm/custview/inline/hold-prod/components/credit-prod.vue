<template>
  <dadp-tabs v-if="prod.prodType === '0201'" v-model="subActive" :options="creditLineOptions" @change="changeSubTab"></dadp-tabs>
  <dadp-refresh-list ref="refreshRef" :requestApi="creditLineApiUrl" :reqParams="queryParams">
    <template v-slot="{ data }">
      <dadp-card v-if="prod.prodType === '0201'" is-body-padding>
        <div class="items" v-for="item in creditLineColKey">
          <span class="glabel">{{ item.label || '--' }}</span>
          <span class="gvalue">{{ item.formatter ? item.formatter(data) || '--' : data[item.prop] || '--' }}</span>
        </div>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>

<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpTabs from '@/components/dadp-ui/dadp-tabs.vue';
import { getInclusiveCreditLineHoldProdList, getCreditLineHoldProdList } from '@/apis/cust';
import { fmtThousands } from '@/utils/format';

const refreshRef = ref();
const props = defineProps({
  queryParams: {
    type: Object,
    default: () => {},
  },
  prod: {
    type: Object,
    default: () => {},
  },
});

const dataMap = reactive({
  creditLineOptions: [
    {
      value: '0',
      content: '公司授信额度',
      apiUrl: getCreditLineHoldProdList,
      fields: [
        {
          label: '授信额度',
          prop: 'creditLine',
          formatter: (row: any) => {
            return fmtThousands(row.creditLine, 2);
          },
        },
        {
          label: '数据更新日期',
          prop: 'updateDate',
        },
      ],
    },
    {
      value: '1',
      content: '普惠授信额度',
      apiUrl: getInclusiveCreditLineHoldProdList,
      fields: [
        {
          label: '授信额度',
          prop: 'creditLine',
          formatter: (row: any) => {
            return fmtThousands(row.creditLine, 2);
          },
        },
        {
          label: '贷款金额',
          prop: 'loanLine',
          formatter: (row: any) => {
            return fmtThousands(row.loanLine, 2);
          },
        },
        {
          label: '授信日期',
          prop: 'creditDate',
        },
        {
          label: '授信期限',
          prop: 'creditTerm',
        },
      ],
    },
  ],
  subActive: '0',

  creditLineApiUrl: getCreditLineHoldProdList,
  creditLineColKey: [
    {
      label: '授信额度',
      prop: 'creditLine',
      formatter: (row: any) => {
        return fmtThousands(row.creditLine, 2);
      },
    },
    {
      label: '数据更新日期',
      prop: 'updateDate',
    },
  ] as any,
});
const { creditLineOptions, subActive, creditLineApiUrl, creditLineColKey } = toRefs(dataMap);

// 切换授信额度页签
const changeSubTab = (val: any) => {
  dataMap.creditLineApiUrl = val.apiUrl as any;
  dataMap.creditLineColKey = val.fields as any;
  nextTick(() => {
    refreshRef.value.onRefresh();
  });
};
</script>
