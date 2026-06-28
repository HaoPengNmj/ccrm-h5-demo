<!--
 * @desc: 营销任务详情-客户转化分析
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2024-10-09 10：38：00
-->
<template>
  <dadp-date
    v-model="queryParams.statisticsDates"
    type="range"
    name="statisticsDates"
    label="统计时间范围"
    input-align="right"
    required
    :rules="[{ required: true, message: '请选择统计时间范围' }]"
    valueFmt="yyyyMMdd"
    placeholder="开始日期-结束日期"
    @change="onSearch"
  />
  <busi-org
    v-model="queryParams.belongOrgIds"
    name="belongOrgIds"
    label="选择机构"
    input-align="right"
    placeholder="请选择"
    required
    :rules="[{ required: true, message: '请选择机构' }]"
    @doSelect="doSelect"
  ></busi-org>
  <div class="refresh-list">
    <dadp-card title="客户转化情况" is-body-padding>
      <div class="pie-box">
        <echarts-funnel :data="funnelData"></echarts-funnel>
      </div>
    </dadp-card>
    <dadp-card title="客户转化排行榜" is-body-padding>
      <dadp-select
        v-model="queryParams.statDimension"
        :options="getCombo('taskRsObjType')"
        name="statDimension"
        label="统计维度"
        input-align="right"
        placeholder="请选择"
        required
        :rules="[{ required: true, message: '请选择统计维度' }]"
      ></dadp-select>
      <dadp-select
        v-model="queryParams.rankType"
        :options="getCombo('rankIndex')"
        name="rankType"
        label="排名方式"
        input-align="right"
        placeholder="请选择"
        required
        :rules="[{ required: true, message: '请选择排名方式' }]"
      ></dadp-select>
      <div class="gform-footer">
        <van-button type="primary" size="large" round native-type="submit" @click="initTableData(true)">查询</van-button>
      </div>
    </dadp-card>
    <dadp-card is-body-padding>
      <dadp-table :tableColumns="tableColumns" :tableData="tableData" :isMore="total > tableData.length" @footerClick="getMoreTableData">
        <template #cell-targetNumVal="{ row }">
          <div class="row">
            <div class="progress">
              {{ row.successCustNum }}/{{ row.taskTotNum }}
              <van-progress
                color="linear-gradient(90deg, #FCC824 0%, #FF8812 100%)"
                text-color="#fff"
                :show-pivot="false"
                :percentage="row.successPer > 100 ? 100 : row.successPer || 0"
              ></van-progress>
            </div>
            <div class="text">
              <span>{{ row.successPer || '--' }}%</span>
            </div>
          </div>
        </template>
      </dadp-table>
    </dadp-card>
  </div>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpTable from '@/components/dadp-ui/dadp-table.vue';
import echartsFunnel from '@/components/charts/echarts-funnel.vue';
import busiOrg from '@/components/business/busi-org.vue';
import { getFunnelData, histogramData } from '@/apis/mkt';
import { codeTranslate, getCombo } from '@/hook/code-hook';
import { getStorage } from '@/storage/storage';
const userInfo = getStorage('userInfo') || {};
const props = defineProps({
  taskId: {
    type: String,
    default: '',
  },
  taskInfo: {
    type: Object,
    default: () => {},
  },
});
const funnelData = ref([] as any);
const tableColumns = ref([
  { title: '对象名称', prop: 'objName', width: '200px' },
  { title: '完成进度', prop: 'targetNumVal', width: '400px' },
] as any[]);

const queryParams = ref({
  taskId: props.taskId,
  rankType: '1', // 排名方式
  statDimension: 'ORG', // 统计维度
  belongOrgIds: [userInfo.dataRightOrgId],
  belongOrgName: codeTranslate('orgId', userInfo.dataRightOrgId),
  statisticsDates: [userInfo.dataDate, userInfo.dataDate], //数据日期
});

const initPieData = async () => {
  const { code, data } = await getFunnelData({
    taskId: props.taskId,
    belongOrgId: queryParams.value.belongOrgIds?.[0],
    statisticsEndDate: queryParams.value.statisticsDates?.[1] || '',
  });
  if (code === 200) {
    funnelData.value = [
      { name: '任务客户数', value: data?.delineCustNum || 0 },
      { name: '已分配客户数', value: data?.taskTotNum || 0 },
      { name: '已接触客户数', value: data?.custNumTouched || 0 },
      { name: '达标转化客户数', value: data?.custNumReach || 0 },
    ];
  }
};
const pageNo = ref(1);
const total = ref(0);
const tableData = ref([] as any[]);
const initTableData = async (init = false) => {
  if (init) {
    pageNo.value = 1;
  }
  const { code, data } = await histogramData({
    pageNo: pageNo.value,
    pageSize: 8,
    ...queryParams.value,
    belongOrgId: queryParams.value.belongOrgIds?.[0],
    statisticsStartDate: queryParams.value.statisticsDates?.[0] || '',
    statisticsEndDate: queryParams.value.statisticsDates?.[1] || '',
  });
  if (code === 200) {
    total.value = data.total;
    let _tmp = pageNo.value === 1 ? data.rows || [] : tableData.value.concat(data.rows || []);

    tableData.value = Array.from(
      new Map(
        _tmp.map((x: any) => {
          if (x.objName === queryParams.value.belongOrgName) {
            return [x.objName, { ...x, sticky: true }];
          } else {
            return [x.objName, x];
          }
        })
      ).values()
    );
  }
};
const getMoreTableData = () => {
  pageNo.value++;
  initTableData();
};

const belongOrgName = ref('');
// 机构选择回调
const doSelect = (_checkData) => {
  queryParams.value.belongOrgName = _checkData[0]?.name || '';
  onSearch();
};
// 查询
const onSearch = () => {
  initPieData();
  initTableData(true);
};

onMounted(() => {
  onSearch();
});
</script>
<style lang="less" scoped>
.refresh-list {
  padding: 24px;
  .pie-box {
    height: 300px;
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
}
</style>
