<template>
  <dadp-refresh-list :requestApi="legal.apiUrl" :reqParams="queryParams">
    <template v-slot="{ data }">
      <dadp-card
        :title="legal.legalName ? legal.legalName : ''"
        is-body-padding
        is-arrow
        @click="handleClick(data)"
      >
      <div class="grow">
        <span class="glabel">序号：</span>
        <span class="gvalue">{{ data.index+1 }}</span>
      </div>
        <div class="grow" v-for="item in legal.fields">
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
const router = useRouter();
const props = defineProps({
  queryParams: {
    type: Object,
    default: () => {},
  },
  legal: {
    type: Object,
    default: () => {},
  },
});
// 跳转法律诉讼详情
const handleClick = (val: any) => {
  //法院公告详情
  if (val.courtDeclaredId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        courtDeclaredId: val.courtDeclaredId,
      },
    });
  }
  //立案信息详情
  else if (val.filingInfoId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        filingInfoId: val.filingInfoId,
      },
    });
  }
  //开庭公告详情
  else if (val.courtBulletinId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        courtBulletinId: val.courtBulletinId,
      },
    });
  }
  //裁判文书详情
  else if (val.riskLawsuitId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        riskLawsuitId: val.riskLawsuitId,
      },
    });
  }
  //被执行企业详情
  else if (val.executionId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        executionId: val.executionId,
      },
    });
  }
  //失信被执行企业详情
  else if (val.execillegalId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        execillegalId: val.execillegalId,
      },
    });
  }
  //限制高消费详情
  else if (val.limitHighConsumId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        limitHighConsumId: val.limitHighConsumId,
      },
    });
  }
  //终本信息详情
  else if (val.finalInfoId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        finalInfoId: val.finalInfoId,
      },
    });
  }
  //司法拍卖详情
  else if (val.judicialAuctionId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        judicialAuctionId: val.judicialAuctionId,
      },
    });
  }
  //财产保全详情
  else if (val.properiyPreservationId) {
    router.push({
      name: 'legal-proceed-dtl',
      query: {
        properiyPreservationId: val.properiyPreservationId,
      },
    });
  }
};
</script>
