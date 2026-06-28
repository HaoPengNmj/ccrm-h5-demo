<template>
  <div>
    <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="getRecommendProdList" :reqParams="reqParams" >
      <template v-slot="{ data }">
        <dadp-card :title="data.prodName" is-body-padding :status="codeTranslate('prodTypeApp',data.prodType)" >
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { getRecommendProdList } from '@/apis/cust';
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
  },
});
const { reqParams } = toRefs(dataMap);
</script>

<style lang="less" scoped>
.glabel {
  padding: 0 10px;
}

.taskk {
  display: flex;
}
.gcol-left {
  font-size: @font-size-32;
  letter-spacing: 0;
  line-height: 32px;
  font-weight: bold;
}
.gcol-right {
  font-size: @font-size-24;
  color: @sub-text;
  text-align: right;
}
.refresh-list {
  padding: 24px;
}
</style>
