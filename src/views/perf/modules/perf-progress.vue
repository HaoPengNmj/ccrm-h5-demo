<!--
 * @desc: 业绩-进度分析
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-09-27 14:36:03
-->
<template>
  <div class="perf-index">
    <dadp-card class="perf-index-list" :style="isHome ? 'box-shadow: none' : ''">
      <van-form @submit="searchBtn">
        <dadp-date
          v-model="queryParam.dataDate"
          label="数据日期"
          value-fmt="yyyyMMdd"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择数据日期' }]"
        ></dadp-date>
        <dadp-select
          v-model="queryParam.taskId"
          :options="taskOptions"
          label="任务名称"
          input-align="right"
          placeholder="请选择"
          clearable
          required
          :rules="[{ required: true, message: '请选择任务' }]"
          @change="getIndexList"
        ></dadp-select>
        <busi-org
          v-model="queryParam.orgId"
          label="选择机构"
          org-tree-type="BM"
          :top-orgId="userInfo.bmDataRightOrgId"
          multiple
          input-align="right"
          placeholder="请选择"
          :disabled="!userInfo.isManager"
        ></busi-org>
        <busi-user
          v-model="queryParam.users"
          label="选择员工"
          multiple
          org-tree-type="BM"
          :top-orgId="userInfo.bmDataRightOrgId"
          :disabled="!userInfo.isManager"
          input-align="right"
          placeholder="请选择"
          @do-select="selectUser"
        ></busi-user>
        <div class="perf-index-btn">
          <van-button type="primary" size="large" round native-type="submit">查询</van-button>
        </div>
      </van-form>
    </dadp-card>
    <dadp-card class="perf-index-list2" v-show="isShowCard">
      <van-tabs v-model:active="queryParam.pageType" type="card" :ellipsis="false" @click-tab="clickTabFn">
        <van-tab title="按指标" name="1"></van-tab>
        <van-tab title="按任务对象" name="2">
          <dadp-select
            v-model="queryParam.indexId"
            :options="indexOptions"
            label="指标名称"
            input-align="right"
            placeholder="请选择"
            clearable
          ></dadp-select>
          <dadp-select
            v-model="queryParam.orgLevel"
            :options="getCombo('appOrgLevelBm')"
            label="机构层级"
            input-align="right"
            placeholder="请选择"
            clearable
            :disabled="dataMap.queryParam.users.length > 0"
          ></dadp-select>
        </van-tab>
      </van-tabs>

      <div class="perf-index-list">
        <span>单位：万元</span>
        <van-image class="myeye" @click="isMark = !isMark" :src="isMark ? eyesClose : eyesOpen" />
      </div>
      <index-list
        v-if="queryParam.pageType === '1'"
        ref="indexRef"
        :queryParams="{
          planId: queryParam.taskId,
        }"
        :isMark="isMark"
        @click-index="clickIndexFn"
      ></index-list>
      <index-list-obj
        v-if="queryParam.pageType === '2'"
        ref="indexRef"
        :queryParams="{
          pageType: queryParam.pageType,
          indexId: queryParam.indexId,
          orgLevel: queryParam.orgLevel,
          dataDate: queryParam.dataDate,
          taskId: queryParam.taskId,
          orgId: queryParam.orgId,
          userId: queryParam.userId,
        }"
        :isMark="isMark"
      ></index-list-obj>
    </dadp-card>
  </div>
</template>
<script setup lang="ts">
import eyesOpen from '@/assets/images/common/eyes-open.png';
import eyesClose from '@/assets/images/common/eyes-close.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import busiOrg from '@/components/business/busi-org.vue';
import busiUser from '@/components/business/busi-user.vue';
import indexList from '@/sub-pages/perf/progress/index-list.vue';
import indexListObj from '@/sub-pages/perf/progress/index-list-obj.vue';
import { getStorage } from '@/storage/storage';
import { listPlan, getTaskIndexList } from '@/apis/perf';
import { getCombo } from '@/hook/code-hook';

const props = defineProps({
  // 是否首页引用
  isHome: {
    type: Boolean,
    defult: false,
  },
  // 首页条件
  query: {
    type: String,
    default: '',
  },
});
const router = useRouter();
const userInfo = getStorage('userInfo') || {}; // 用户信息

const indexRef = ref();

const dataMap = reactive({
  queryParam: {
    orgId: [],
    users: [],
    userId: [],
    dataDate: '',
  } as any,
  active: '',
  isShowCard: false,

  taskOptions: Array<any>(),
  indexOptions: Array<any>(),
  isMark: false,
});
const { queryParam, isShowCard, taskOptions, indexOptions, isMark } = toRefs(dataMap);
// 选择用户回调
const selectUser = (val: any) => {
  // 对选中的用户进行便利把userId放到要传的参数里
  dataMap.queryParam.userId = dataMap.queryParam.users.map((item: any) => item.userId);
  dataMap.queryParam.orgLevel = '';
};
// 查询方法
const searchBtn = () => {
  // 首页引用时点击查询跳转到业绩模块查询
  if (props.isHome) {
    router.push({
      name: 'perf',
      query: {
        active: 'perfProgressRef',
        queryParam: JSON.stringify(dataMap.queryParam),
      },
    });
  } else {
    dataMap.isShowCard = true;
    nextTick(() => {
      indexRef.value.loadData(true);
    });
  }
};
// 初始化选择方案
const initPlanList = async () => {
  const { data } = await listPlan({ pageNo: 1, pageSize: 99 });
  if (data) {
    dataMap.taskOptions = data.rows?.map((e: any) => ({
      content: e.planName,
      value: e.planId,
    }));
  }
};

// 选完任务后获取任务指标
const getIndexList = async () => {
  if (dataMap.queryParam.taskId) {
    const { data } = await getTaskIndexList({
      pageNo: 1,
      pageSize: 99,
      planId: dataMap.queryParam.taskId,
    });
    if (data) {
      dataMap.indexOptions = data.rows?.map((item: any) => {
        return {
          content: item.indexName,
          value: item.indexId,
        };
      });
    }
  }
};

// 切换页签为按对象时默认给指标赋值
const clickTabFn = () => {
  if (dataMap.queryParam.pageType == '2' && !dataMap.queryParam.indexId) {
    dataMap.queryParam.indexId = dataMap.indexOptions?.[0].value;
  }
  nextTick(() => {
    indexRef.value.loadData(true);
  });
};
// 点击指标名称切换到按对象页签
const clickIndexFn = (row: any) => {
  dataMap.queryParam.pageType = '2';
  dataMap.queryParam.indexId = row.indexId;
  nextTick(() => {
    indexRef.value.loadData(true);
  });
};
onMounted(() => {
  dataMap.queryParam.dataDate = userInfo.dataDate;
  initPlanList();
  // 是否带条件进入页面是的话赋值条件
  if (props.query) {
    dataMap.queryParam = JSON.parse(props.query);
    searchBtn();
  } else if (!userInfo.isManager) {
    // 判断是否管理人员 否的话默认机构跟用户且不可编辑
    dataMap.queryParam.users.push({ userId: userInfo.userId, userName: userInfo.userName });
    dataMap.queryParam.orgId.push(userInfo.orgId);
  }
});
</script>

<style lang="less" scoped>
.myeye {
  height: 26px;
  width: 40px;
}
.perf-index {
  margin-bottom: 200px;
  padding: 24px;
  .container {
    padding: 0 30px;
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 0;
      .title {
        font-family: PingFangSC-Medium;
        font-size: @font-size-32;
        letter-spacing: 0;
        line-height: 32px;
        font-weight: 500;
      }
      .more {
        font-family: PingFangSC-Regular;
        font-size: @font-size-26;
        color: @gray;
        letter-spacing: 0;
        text-align: right;
        line-height: 22px;
        font-weight: 400;
      }
    }
    &-content {
      border-radius: 20px;
      .content-header {
        padding: 30px 0;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        background-image: linear-gradient(180deg, #fdf6ea 0%, #ffffff 50%);
        .row {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          letter-spacing: 0;
          margin-top: 40px;
        }
        .col {
          flex: 1;
          text-align: center;
          letter-spacing: 0;
          &-value1 {
            font-family: DINAlternate-Bold;
            font-size: @font-size-36;
            line-height: 36px;
            font-weight: 700;
          }
          &-value2 {
            font-family: DINAlternate-Bold;
            font-size: @font-size-34;
            line-height: 34px;
            font-weight: 700;
          }
          &-label1 {
            font-family: PingFangSC-Regular;
            font-size: @font-size-28;
            line-height: 28px;
            font-weight: 400;
            margin-top: 16px;
          }
          &-label2 {
            font-family: PingFangSC-Regular;
            font-size: @font-size-22;
            color: @gray;
            line-height: 22px;
            font-weight: 400;
            margin-top: 13px;
          }
        }
      }
      .content-body {
        height: 500px;
      }
    }
  }
  &-list {
    padding: 12px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-list2 {
    padding: 32px 30px;
  }
  &-btn {
    margin: 24px 30px;
  }
}
</style>
