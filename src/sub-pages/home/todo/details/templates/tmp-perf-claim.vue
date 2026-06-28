<!--
 * @desc: 待办（申请、审批）详情-基础信息
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-10-01 01:25:17
-->
<template>
  <div class="title">业务信息</div>
  <dadp-card is-body-padding>
    <van-cell
      v-for="item in busiKey"
      :title="item.label"
      :value="(item.formatter ? item.formatter(result) : result[item.prop]) || '--'"
    ></van-cell>
    <dadp-table :tableColumns="tableColumns" :tableData="tableData"></dadp-table>
  </dadp-card>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpTable from '@/components/dadp-ui/dadp-table.vue';
import { perfCliamData } from './tmp-perf-claim-hook';
import { getClaimInstance } from '@/apis/home';
import { fmtPercent } from '@/utils/format';

const props = defineProps({
  // 业务主键
  busiId: {
    type: String,
    default: '',
  },
});

// 响应数据
const busiKey = ref([] as any);
const result = ref({} as any);
// 定义列
const tableColumns = ref([
  { title: '认领对象编号', prop: 'objNo' },
  { title: '认领对象名称', prop: 'objName' },
  { title: '认领比例', prop: 'rate', formatter: (row: any) => fmtPercent(row.rate) },
] as any[]);
// 定义数据
const tableData = ref([] as any[]);

// 获取详情数据
const getDetail = async () => {
  const { code, data } = await getClaimInstance({
    claimId: props.busiId,
  });
  if (code === 200) {
    // 给业绩信息赋值
    result.value = data.perfList[0];
    // 给认领信息赋值
    tableData.value = data.applyList;

    if (data.applyList.length > 0) {
      busiKey.value = perfCliamData.filter((item: any) => item.name == data.applyList[0].perfType)[0].data;
    }
  }
};

watchEffect(() => {
  if (props.busiId) {
    getDetail();
  }
});
</script>
<style lang="less" scoped>
.todo-dtl {
  .title {
    font-family: PingFangSC-Semibold;
    font-size: @font-size-36;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 600;
    margin: 32px 0px 24px;
  }
}
.glabel {
  width: 150px;
}
</style>
