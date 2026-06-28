<!--
 * @desc: 营销任务
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-08 14:18:53
-->
<template>
  <div class="container">
    <dadp-card>
      <van-cell class="header" title="查看营销任务清单" is-link arrow-direction="right" @click="router.push('/mkt-task-list')" />
    </dadp-card>
    <dadp-card is-body-padding>
      <van-form @submit="getData">
        <dadp-select
          v-model="queryParams.taskId"
          :options="taskList"
          name="taskId"
          label="营销任务"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择营销任务' }]"
        ></dadp-select>
        <dadp-date
          v-model="queryParams.dataDate"
          name="dataDate"
          label="数据日期"
          valueFmt="yyyyMMdd"
          input-align="right"
          placeholder="请选择"
        ></dadp-date>
        <dadp-select
          v-model="queryParams.objType"
          :options="getCombo('taskRsObjType')"
          name="objType"
          label="统计维度"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择统计维度' }]"
        ></dadp-select>
        <dadp-select
          v-model="queryParams.rankIndex"
          :options="getCombo('rankIndex')"
          name="rankIndex"
          label="排名指标"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择排名指标' }]"
        ></dadp-select>
        <br />
        <van-button type="primary" size="large" native-type="submit" round>查询</van-button>
      </van-form>
    </dadp-card>
    <dadp-card title="任务执行排名" is-body-padding>
      <dadp-table
        :tableColumns="tableColumns"
        :tableData="showTableData"
        :isMore="tableData.length > 8"
        @footer-click="isMore = !isMore"
        :isMoreText="isMore ? '收起更多' : '展示更多'"
      >
        <template #cell-successPer="{ row }">
          <div class="row">
            <div class="progress">
              {{ row.successNum }}/{{ row.custNum }}
              <van-progress
                stroke-width="0.5em"
                color="linear-gradient(90deg, #FCC824 0%, #FF8812 100%)"
                text-color="#fff"
                :show-pivot="false"
                :percentage="row.successPer > 100 ? 100 : row.successPer || 0"
              ></van-progress>
            </div>
            <div class="text">
              <span>{{ row.successPer }}%</span>
            </div>
          </div>
        </template>
      </dadp-table>
    </dadp-card>
    <dadp-card title="任务转化概况" is-body-padding>
      <div style="height: 400px">
        <echarts-funnel :data="funnelData"></echarts-funnel>
      </div>
    </dadp-card>
  </div>
</template>
<script lang="ts" setup>
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpTable from '@/components/dadp-ui/dadp-table.vue';
import echartsFunnel from '@/components/charts/echarts-funnel.vue';
import { taskRsSummary, taskRsSumGetIndexList } from '@/apis/mkt';
import { getCombo } from '@/hook/code-hook';
import { getStorage } from '@/storage/storage';
const router = useRouter();
const userInfo = getStorage('userInfo') || {}; // 用户信息
// 请求参数
const queryParams = ref({
  taskId: '',
  dataDate: userInfo.dataDate, //数据日期
  objType: 'ORG', //对象类型
  objId: userInfo.dataRightOrgId,
  rankIndex: '1', //接触率传1，转化率传2
});

// 任务执行排名
const tableColumns = ref([
  { title: '对象名称', prop: 'objName' },
  { title: '完成进度', prop: 'successPer' },
] as any[]);
const tableData = ref([] as any[]);
const isMore = ref(false);
const showTableData = computed(() => {
  if (isMore.value) {
    return tableData.value;
  } else {
    return tableData.value.slice(0, 8);
  }
});

// 任务转化概况
const funnelData = ref([] as any[]);

// 初始化数据
const getData = async () => {
  const { code, data } = await taskRsSummary({
    ...queryParams.value,
    dataDate: queryParams.value.dataDate,
    // dataStartDate: queryParams.value.dataDate?.[0],
    // dataEndDate: queryParams.value.dataDate?.[1],
  });
  if (code === 200) {
    tableData.value = data.taskExecuteRankList;
    funnelData.value = [
      { name: '任务客户数', value: data.taskConversion?.custNum || 0 },
      { name: '已分配客户数', value: data.taskConversion?.allocCustNum || 0 },
      { name: '已接触客户数', value: data.taskConversion?.touchCustNum || 0 },
      { name: '已转化客户数', value: data.taskConversion?.convertCustNum || 0 },
    ] as any;
  }
};
const taskList = ref([]);
const initTaskList = async () => {
  const { data } = await taskRsSumGetIndexList({});
  taskList.value = data.map((e) => {
    return { value: e.taskId, content: e.taskName };
  });
  if (taskList.value.length > 0) {
    queryParams.value.taskId = taskList.value[0].value;
    getData();
  }
};

onMounted(() => {
  initTaskList();
});
</script>
<style lang="less" scoped>
.header {
  color: @primary-color;
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
.list-content {
  display: flex;
  justify-content: space-between;
  height: 90px;
  line-height: 90px;
  padding-left: 30px;
  padding-right: 26px;
  &-progress {
    width: 46vw;
    margin: auto;
  }
}
.container {
  padding: 24px;
}
</style>
