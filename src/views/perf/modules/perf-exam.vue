<!--
 * @desc: 业绩-业绩计价
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-09-27 14:35:41
-->
<template>
  <div class="perf-index">
    <dadp-card class="perf-index-list" :style="isHome ? 'box-shadow: none' : ''">
      <van-form @submit="searchBtn">
        <dadp-date
          v-model="queryParams.dataDate"
          label="数据日期"
          value-fmt="yyyyMMdd"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择数据日期' }]"
        ></dadp-date>
        <dadp-select
          v-model="queryParams.scheType"
          label="方案类别"
          :options="getCombo('pbm_examType')"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择方案类别' }]"
          @change="selectScheType"
        ></dadp-select>
        <busi-exam
          v-model="queryParams.examIds"
          :examType="queryParams.scheType"
          ruleSts="5"
          label="方案名称"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择方案' }]"
          @do-select="selectExam"
        ></busi-exam>
        <busi-org
          v-model="queryParams.orgId"
          label="选择机构"
          org-tree-type="BM"
          :top-orgId="userInfo.bmDataRightOrgId"
          multiple
          input-align="right"
          placeholder="请选择"
          :disabled="!userInfo.isManager"
        ></busi-org>
        <busi-user
          v-model="queryParams.users"
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
    <div style="display: flex; justify-content: flex-end">
      <van-image class="perf-index-icon" :src="isMark ? eyesClose : eyesOpen" @click="isMark = !isMark" />
    </div>
    <dadp-card v-if="!isHome" class="container" is-body-padding>
      <div class="list">
        <div v-for="(item, index) in showData" :key="index" class="list-item">
          <div class="header">
            <span>{{ item.examIndexName }}</span>
          </div>
          <div>
            <span>考核对象：{{ item.objName || '--' }}</span>
          </div>
          <div v-if="dataMap.queryParams.scheType == 'ALLUSER'" class="content">
            <div class="item-left">
              <div class="text">
                {{ fmtMaskData(fmtThousands(item.indexValue, 2), dataMap.isMark) }}
              </div>
              <div>实际指标值</div>
            </div>
            <div class="item-right">
              <div class="red">{{ fmtMaskData(fmtThousands(item.perVal, 2), dataMap.isMark) }}</div>
              <div>绩效总价(单位:元)</div>
            </div>
          </div>
          <div v-else class="content">
            <div class="item-left">
              <div class="text">
                {{ fmtMaskData(fmtThousands(item.indexValue, 2), dataMap.isMark) }}
              </div>
              <div>指标完成值</div>
            </div>
            <div class="item-right">
              <div class="red">{{ item.rankInOrg }}</div>
              <div>一级支行内排名</div>
            </div>
          </div>
        </div>
        <dadp-empty v-if="showData.length === 0"></dadp-empty>

        <template v-if="total > 8">
          <div class="list-footer" @click="footerClickFn">
            <span class="text">{{ !isLoadData && isMore ? '收起' : '展示更多' }}</span>
            <van-icon :name="!isLoadData && isMore ? 'arrow-up' : 'arrow-down'" />
          </div>
        </template>
      </div>
    </dadp-card>
  </div>
</template>
<script setup lang="ts">
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import busiOrg from '@/components/business/busi-org.vue';
import busiUser from '@/components/business/busi-user.vue';
import busiExam from '@/components/business/busi-exam.vue';
import { fmtMaskData, fmtThousands } from '@/utils/format';
import eyesOpen from '@/assets/images/common/eyes-open.png';
import eyesClose from '@/assets/images/common/eyes-close.png';
import { getExamList } from '@/apis/perf';
import { getCombo } from '@/hook/code-hook';
import { getStorage } from '@/storage/storage';

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

const userInfo = getStorage('userInfo') || {};
const router = useRouter();

const dataMap = reactive({
  queryParams: {
    dataDate: '',
    examId: '',
    examObj: 'ORG',
    scheType: '',
    users: [] as any,
    orgId: Array<any>(),
    userId: Array<any>(),
    examIds: Array<any>(),
  },
  pageNo: 1,

  total: 0,
  tableData: Array<any>(),
  isLoadData: false, // 是否还需加载数据
  isMore: false, // 是否展示更多

  isMark: false,
});
const { queryParams, total, isMore, isLoadData, isMark } = toRefs(dataMap);

// 展示数据
const showData = computed(() => {
  return dataMap.isMore ? [...dataMap.tableData] : [...dataMap.tableData.slice(0, 8)];
});

// 回调-选择方案类型
const selectScheType = (val: any) => {
  dataMap.queryParams.examIds = Array<any>();
  dataMap.queryParams.examId = '';
};
// 回调-选择方案
const selectExam = (val: any) => {
  dataMap.queryParams.examId = dataMap.queryParams.examIds[0]?.ruleId;
  dataMap.queryParams.examObj = dataMap.queryParams.examIds[0]?.examObj;
};
// 回调-选择用户
const selectUser = (val: any) => {
  dataMap.queryParams.userId = dataMap.queryParams.users.map((item: any) => item.userId);
};

// 查询方法
const loadData = async (init = false) => {
  dataMap.pageNo = init ? 1 : dataMap.pageNo;
  const { data } = await getExamList({
    ...dataMap.queryParams,
    pageNo: dataMap.pageNo,
    pageSize: 8,
    examObj: dataMap.queryParams.users.length > 0 ? 'USER' : dataMap.queryParams.examObj,
  });
  const { rows, total } = data;
  let ans = [
    ...rows?.map((e) => {
      e.objName = e.examObj === 'ORG' ? e.orgName : e.userName;
      return e;
    }),
  ];
  dataMap.tableData = init ? ans : dataMap.tableData.concat(ans);
  dataMap.total = total;
  dataMap.isLoadData = dataMap.total > 0 && dataMap.total > dataMap.tableData.length;
};
// 展示更多
const footerClickFn = () => {
  if (dataMap.isLoadData) {
    dataMap.isMore = true;
    dataMap.pageNo++;
    loadData();
  } else {
    dataMap.isMore = !dataMap.isMore;
  }
};
// 搜索查询
const searchBtn = async () => {
  // 首页引用时点击查询跳转到业绩模块查询
  if (props.isHome) {
    router.push({
      name: 'perf',
      query: {
        active: 'perfExamRef',
        queryParam: JSON.stringify(dataMap.queryParams),
      },
    });
    return;
  }
  dataMap.tableData = Array<any>();
  dataMap.total = 0;
  dataMap.isLoadData = false;
  loadData(true);
};

onMounted(() => {
  dataMap.queryParams.dataDate = userInfo.dataDate;
  dataMap.queryParams.scheType = 'ALLUSER';
  // 是否带条件进入页面是的话赋值条件
  if (props.query) {
    dataMap.queryParams = JSON.parse(props.query);
    searchBtn();
  } else if (!userInfo.isManager) {
    // 判断是否管理人员 否的话默认机构跟用户且不可编辑
    dataMap.queryParams.users.push({ userId: userInfo.userId, userName: userInfo.userName });
    dataMap.queryParams.orgId.push(userInfo.orgId);
  }
});
</script>

<style lang="less" scoped>
.perf-index {
  padding: 24px;

  &-list {
    padding: 12px 0;
  }

  &-btn {
    margin: 24px 30px;
  }

  &-icon {
    box-sizing: content-box;
    padding: 12px 0;
    width: 40px;
    height: 26px;
  }
}
.container {
  padding-top: 12px;
  .list {
    &-item {
      border: 1px solid @gray-5;
      border-radius: 12px;
      padding: 24px;
      .header {
        font-family: PingFangSC-Medium;
        font-size: @font-size-32;
        letter-spacing: 0;
        font-weight: bold;
        text-align: justify;
        padding-bottom: 12px;
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item-left {
          font-size: @font-size-20;
          color: @gray;
          text-align: left;
          .text {
            font-family: PingFangSC-Regular;
            font-size: @font-size-32;
            color: @black;
            text-align: left;
            line-height: 46px;
          }
        }
        .item-right {
          font-size: @font-size-20;
          color: @gray;
          text-align: right;
          .red {
            font-family: PingFangSC-Regular;
            font-size: @font-size-32;
            color: @red;
            line-height: 46px;
          }
        }
      }
    }

    &-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px;
      color: @gray;
      .text {
        margin-right: 16px;
      }
    }
  }
  .list-item + .list-item {
    margin-top: 24px;
  }
}
</style>
