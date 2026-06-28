<!--
 * @desc: 团队视图-营销指标
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-08 14:18:53
-->
<template>
  <div class="container">
    <dadp-card is-body-padding>
      <van-form @submit="getData">
        <dadp-select
          v-model="reqParams.taskId"
          :options="taskOptions"
          label="营销任务"
          input-align="right"
          placeholder="请选择"
          clearable
          required
          :rules="[{ required: true, message: '请选择营销任务' }]"
          @change="taskChangeFn"
        ></dadp-select>
        <dadp-select
          v-model="reqParams.indexId"
          :options="indexOptions"
          label="营销指标"
          input-align="right"
          placeholder="请选择"
          :disabled="!reqParams.taskId"
          clearable
          required
          :rules="[{ required: true, message: '请选择营销指标' }]"
        ></dadp-select>
        <dadp-select
          v-model="reqParams.rankType"
          :options="rankOptions"
          label="排名维度"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择排名维度' }]"
        ></dadp-select>
        <busi-team
          v-model="reqParams.teamIds"
          :topTeamId="teamId"
          name="teamIds"
          label="团队节点名称"
          input-align="right"
          placeholder="请选择"
        ></busi-team>
        <dadp-select
          v-model="reqParams.rankNum"
          :options="ramkIndexList"
          label="选择排名数量"
          input-align="right"
          placeholder="请选择"
        ></dadp-select>
        <br />
        <van-button type="primary" size="large" native-type="submit" round>查询</van-button>
      </van-form>
    </dadp-card>
    <dadp-card is-body-padding>
      <dadp-table :tableColumns="tableColumns" :tableData="tableData"></dadp-table>
    </dadp-card>
  </div>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpTable from '@/components/dadp-ui/dadp-table.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import busiTeam from '@/components/business/busi-team.vue';
import { pmmTaskIndexRank, getPlanList, getIndexList } from '@/apis/mkt';

const props = defineProps({
  teamId: {
    type: String,
    default: '',
  },
});
const reqParams = ref({
  taskId: '', //营销任务ID
  indexId: '',
  rankType: '1', //排名维度
  rankNum: '1',
  teamIds: [props.teamId],
});

// 营销任务选择框
const taskOptions = ref([] as any[]);
// 营销指标选择框
const indexOptions = ref([] as any[]);
//排名维度选择框
const rankOptions = [
  {
    content: '团队结点',
    value: '1',
  },
  {
    content: '团队成员',
    value: '2',
  },
];
//排名数量选择框
const ramkIndexList = [
  {
    content: 'top5',
    value: '1',
  },
  {
    content: 'top10',
    value: '2',
  },
  {
    content: '全部',
    value: '3',
  },
];

// 定义列
const tableColumns = ref([
  { title: '对象名称', prop: 'objName' },
  { title: '指标值', prop: 'targetNumVal' },
  { title: '排名', prop: 'rank' },
] as any[]);
// 定义数据
const tableData = ref([] as any[]);

//获取营销任务下拉框数据
const getMktPlan = async () => {
  const { code, data } = await getPlanList({});
  if (code === 200) {
    taskOptions.value = data.map((item: any) => {
      return {
        content: item.planName,
        value: item.planId,
      };
    });
  }
};
//获取营销指标下拉框数据
const getMktIndex = async () => {
  const { code, data } = await getIndexList({ planId: reqParams.value.taskId });
  if (code === 200) {
    indexOptions.value = data.map((item: any) => {
      return {
        content: item.indexName,
        value: item.indexId,
      };
    });
  }
};

// 营销任务选择回调事件
const taskChangeFn = (val: any) => {
  if (val) getMktIndex();
  else reqParams.value.indexId = '';
};

//获取团队视图详情-营销指标
const getData = async () => {
  const { code, data } = await pmmTaskIndexRank({ ...reqParams.value, teamId: reqParams.value.teamIds?.[0] || props.teamId });
  if (code === 200) {
    tableData.value = data;
  }
};

onMounted(() => {
  getMktPlan();
});
</script>
<style lang="less" scoped>
.container {
  padding: 24px;
}
</style>
