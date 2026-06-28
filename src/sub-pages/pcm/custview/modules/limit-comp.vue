<template>
  <dadp-card title="限额信息">
    <van-swipe v-if="tableData.length > 0" :autoplay="0">
      <van-swipe-item v-for="item in tableData">
        <van-cell title="账号" :value="item.acctNo || '--'" />
        <van-cell title="卡号" :value="item.cardNo || '--'" />
        <van-cell title="开户网点" :value="item.openDotName || '--'" />
        <van-cell title="在控黑名单类别" :value="codeTranslate('blacklistType', item.blacklistType) || '--'" />
        <van-cell title="账户风险等级" :value="codeTranslate('custLimitRiskLevel', item.riskLevel) || '--'" />
        <van-cell title="账户柜面渠道日借记限额" :value="item.debitLimitForCounter || '--'" />
        <van-cell title="账户柜面渠道日借记笔数" :value="item.debitNumForCounter || '--'" />
        <van-cell title="账户全渠道日借记限额(剔除公共事业性收费)" :value="item.debitLimitForAll || '--'" />
        <van-cell title="账户全渠道日借记笔数(剔除公共事业性收费)" :value="item.debitNumForAll || '--'" />
        <van-cell title="账户非柜面渠道日借记限额(剔除公共事业性收费)" :value="item.debitLimitNotCounter || '--'" />
        <van-cell title="账户非柜面渠道日借记笔数(剔除公共事业性收费)" :value="item.debitNumNotCounter || '--'" />
        <van-cell title="黑名单代码" :value="item.blacklistCodeName || '--'" />
        <van-cell title="期望限额" :value="item.expectedLimit || '--'" />
        <br />
        <br />
      </van-swipe-item>
    </van-swipe>
    <dadp-empty v-else></dadp-empty>
  </dadp-card>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import { listCustLimit } from '@/apis/cust';
import { codeTranslate } from '@/hook/code-hook';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});

const tableData = ref([]);
// 查询
const initData = async () => {
  const { data } = await listCustLimit({
    custId: props.custInfo.custId,
    pageNo: 1,
    pageSize: 100,
  });
  tableData.value = data?.rows || [];
};

onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped></style>
