<!--
 * @desc: 团队视图-进度分析
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-08 14:18:53
-->
<template>
  <div class="container">
    <dadp-card is-body-padding>
      <van-form @submit="getData(true)">
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
          v-model="reqParams.statisticsType"
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
        <br />
        <van-button type="primary" round size="large" native-type="submit">查询</van-button>
      </van-form>
    </dadp-card>
    <dadp-card is-body-padding>
      <dadp-table :tableColumns="tableColumns" :tableData="tableData" :isMore="total > tableData.length" @footerClick="getMoreData">
        <template #cell-targetNumVal="{ row }">
          <div class="row">
            <div class="progress">
              {{ row.cpltNumVal }}/{{ row.targetNumVal }}
              <van-progress
                color="linear-gradient(90deg, #FCC824 0%, #FF8812 100%)"
                text-color="#fff"
                :show-pivot="false"
                :percentage="row.cpltNumRate * 100 > 100 ? 100 : row.cpltNumRate * 100"
              ></van-progress>
            </div>
            <div class="text">
              <span>{{ fmtPercent(row.cpltNumRate) }}</span>
            </div>
          </div>
        </template>
      </dadp-table>
    </dadp-card>
  </div>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpTable from '@/components/dadp-ui/dadp-table.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import busiTeam from '@/components/business/busi-team.vue';
import { listPmmTaskSche, getPlanList, getIndexList } from '@/apis/mkt';
import { fmtPercent } from '@/utils/format';
const props = defineProps({
  teamId: {
    type: String,
    default: '',
  },
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

const reqParams = ref({
  taskId: '', //营销任务ID
  indexId: '',
  teamIds: [props.teamId],
  statisticsType: '1', //排名维度:1-团队节点 2-团队成员
});

const tableColumns = ref([
  { title: '对象名称', prop: 'objName' },
  { title: '完成进度', prop: 'targetNumVal' },
] as any[]);

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

const pageNo = ref(1);
const total = ref(0);
const tableData = ref([] as any[]);

//获取团队视图详情-进度分析排名
const getData = async (init = false) => {
  if (init) {
    pageNo.value = 1;
  }
  const { code, data } = await listPmmTaskSche({
    pageNo: pageNo.value,
    pageSize: 8,
    ...reqParams.value,
    teamId: reqParams.value.teamIds?.[0] || props.teamId,
  });
  if (code === 200) {
    total.value = data.total;
    tableData.value = pageNo.value === 1 ? data.rows || [] : tableData.value.concat(data.rows || []);
  }
};
const getMoreData = () => {
  pageNo.value++;
  getData();
};

onMounted(() => {
  getMktPlan();
});
</script>
<style lang="less" scoped>
.container {
  padding: 24px;
}
.row {
  display: flex;
  align-items: center;
  .progress {
    width: 200px;
    flex: auto;
    overflow-x: hidden;
    text-align: right;
  }
  .text {
    font-family: PingFangSC-Regular;
    font-size: @font-size-26;
    color: @text;
    letter-spacing: 0;
    line-height: 26px;
    font-weight: 400;
    margin-left: 20px;
  }
}
</style>
