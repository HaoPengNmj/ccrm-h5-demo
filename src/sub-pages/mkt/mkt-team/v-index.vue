<!--
 * @desc: 营销团队
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-08 14:18:53
-->
<template>
  <van-search v-model="reqParams.teamName" shape="round" show-action placeholder="请输入团队节点名称" @search="getMktTeam">
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <dadp-select
              v-model="reqParams.taskId"
              :options="taskOptions"
              clearable
              label="营销任务"
              placeholder="请选择"
              input-align="right"
              :rules="[{ required: true, message: '请选择营销任务' }]"
              @change="taskChangeFn"
            ></dadp-select>
            <dadp-select
              v-model="reqParams.indexIdList"
              :options="indexOptions"
              clearable
              label="营销指标"
              placeholder="请选择"
              input-align="right"
              multiple
              :max="10"
              :disabled="!reqParams.taskId"
              @change="indexChangeFn"
            ></dadp-select>
            <div class="gform-footer">
              <van-button size="large" round plain @click="onClean">清空</van-button>
              <van-button type="primary" size="large" round native-type="submit">查询</van-button>
            </div>
          </van-form>
        </van-dropdown-item>
      </van-dropdown-menu>
    </template>
  </van-search>
  <div class="refresh-list">
    <template v-if="teamList.length > 0">
      <dadp-card v-for="(item, index) in teamList" :key="index" avatar="team" :title="item.teamName" is-body-padding is-arrow>
        <template #header-right>
          <div class="arrow-box" @click="handleClick(item)">
            团队视图
            <van-icon class="arrow" name="arrow" />
          </div>
        </template>
        <div class="index-row">
          <van-space size="1em">
            <div class="block" v-for="(_index, i) in selectedIndexList" :key="i">
              <div class="index-value">{{ fmtThousands(item[`indexVal${i + 1}`], 2) }}</div>
              <div class="index-name">{{ _index.name }}</div>
            </div>
          </van-space>
        </div>
      </dadp-card>
    </template>
    <template v-else>
      <dadp-empty></dadp-empty>
    </template>
  </div>
</template>
<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import { getPlanList, getIndexList, listTeamIndex } from '@/apis/mkt';
import { fmtThousands } from '@/utils/format';

defineOptions({ name: 'mkt-team' });

const router = useRouter();
const dropdownMenuRef = ref(); // 下拉菜单Ref
const dataMap = reactive({
  // 营销任务-选择数据
  taskOptions: Array<any>(),
  // 营销指标-选择数据
  indexOptions: Array<any>(),

  //请求参数
  reqParams: {
    teamName: '',
    teamId: '',
    taskId: '',
    indexIdList: [],
    pageNo: 1,
    pageSize: 10,
  },
  // 选中的指标数据
  selectedIndexList: Array<any>(),

  // 营销团队数据
  teamList: Array<any>(),
});
const { taskOptions, reqParams, indexOptions, selectedIndexList, teamList } = toRefs(dataMap);

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
//获取团队列表
const getMktTeam = async () => {
  let _indexIdList = [...reqParams.value.indexIdList] as any[];
  if (_indexIdList.length === 0) {
    selectedIndexList.value = indexOptions.value.slice(0, 10).map((item) => ({ id: item.value, name: item.content }));
    _indexIdList = selectedIndexList.value.map((item) => item.id);
  }
  const { code, data } = await listTeamIndex({
    ...reqParams.value,
    indexIdList: _indexIdList,
  });
  if (code === 200) {
    teamList.value = data;
  }
};

// 营销任务选择回调事件
const taskChangeFn = (val: any) => {
  if (val) getMktIndex();
  else reqParams.value.indexIdList = [];
};
// 营销指标选择回调事件
const indexChangeFn = (items: any) => {
  selectedIndexList.value = items;
};

// 提交
const onSubmit = () => {
  dropdownMenuRef.value.close();
  getMktTeam();
};
// 清空
const onClean = () => {
  reqParams.value.teamName = '';
  reqParams.value.taskId = '';
  reqParams.value.indexIdList = [];
};

// 点击事件
const handleClick = (val: any) => {
  router.push(`/mkt-team-dtl/${val.teamId}`);
};
onMounted(() => {
  getMktPlan();
});
</script>
<style lang="less" scoped>
.total {
  padding: 24px 32px 0;
  font-family: PingFangSC-Regular;
  font-size: @font-size-28;
  letter-spacing: 0;
  line-height: 28px;
  font-weight: 400;
}
.refresh-list {
  padding: 24px;
  padding-bottom: 0px;
  .arrow-box {
    color: @primary-color;
  }
  .index-row {
    overflow: hidden;
    overflow-x: auto;
  }
  .block {
    background: @gray-1;
    border-radius: 8px;
    padding: 12px 10px;
    text-align: center;
    white-space: nowrap;
    .index-value {
      font-family: DINAlternate-Bold;
      font-size: @font-size-34;
      color: @text;
      letter-spacing: 0;
      line-height: 34px;
      font-weight: 700;
    }
    .index-name {
      font-family: PingFangSC-Regular;
      font-size: @font-size-22;
      color: @gray;
      letter-spacing: 0;
      line-height: 24px;
      font-weight: 400;
      margin-top: 12px;
    }
  }
  .right-text {
    font-family: PingFangSC-Regular;
    font-size: @font-size-22;
    color: @sub-text;
    letter-spacing: 0;
    line-height: 30px;
    font-weight: 400;
  }
}
</style>
