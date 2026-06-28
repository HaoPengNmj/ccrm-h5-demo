<!--
 * @desc: 营销任务详情-客户列表
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2025-01-15 16:54:03
-->
<template>
  <van-search v-model="reqParams.custName" shape="round" placeholder="请输入客户名称" @search="onSearch" />
  <div class="refresh-list">
    <dadp-card is-body-padding>
      <div class="pie-box">
        <echarts-pie
          text="名单客户总数"
          :subtext="fmtThousands(custNum || refreshListRef?.total, 0)"
          :data="xData"
          :tooltip="tooltip"
          show-legend
        ></echarts-pie>
      </div>
    </dadp-card>
  </div>
  <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="queryPmmTaskCustList" :reqParams="reqParams">
    <template v-slot="{ data }">
      <dadp-card
        :avatar="data.sex === '2' ? 'woman' : 'man'"
        is-body-padding
        :buttons="!userInfo.isManager ? buttons : []"
        :subTitle="data.custId"
        @footer-click="(btn) => footerClickFn(btn, data)"
      >
        <template #title>
          <span @click="gotoCustView(data)">{{ data.companyName || data.custName }}</span>
          <span v-if="data.custLevel" class="black-tag">
            <span v-if="data.line === '1'">
              {{ codeTranslate('pcmCustBaseLevel', data.custLevel) }}
            </span>
            <span v-else>
              {{ codeTranslate('ccmCustBaseLevel', data.custLevel) }}
            </span>
          </span>
        </template>
        <template v-if="userInfo.isManager">
          <div class="grow">
            <div class="gcol">
              <span class="glabel">主管机构所属一级支行：</span>
              <span class="gvalue">{{ data.oneOrgName || '--' }}</span>
            </div>
          </div>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">主管机构：</span>
              <span class="gvalue">{{ data.mainOrgName || '--' }}</span>
            </div>
            <div class="gcol">
              <span class="glabel">主管人：</span>
              <span class="gvalue">{{ data.mainMgrName || '--' }}</span>
            </div>
          </div>
        </template>
        <!-- 未有执行人不显示 -->
        <template v-if="data.exeMgrName || !userInfo.isManager">
          <div class="grow">
            <div class="gcol">
              <span class="glabel">执行机构所属一级支行：</span>
              <span class="gvalue">{{ data.exeOneOrgName || '--' }}</span>
            </div>
          </div>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">执行机构：</span>
              <span class="gvalue">{{ data.exeOrgName || '--' }}</span>
            </div>
            <div class="gcol">
              <span class="glabel">{{ userInfo.isManager ? '任务' : '' }}执行人：</span>
              <span class="gvalue">{{ data.exeMgrName || '--' }}</span>
            </div>
          </div>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">执行次数：</span>
              <span class="gvalue">{{ data.touchNum || '--' }}</span>
            </div>
          </div>
          <div class="grow" v-if="!userInfo.isManager">
            <div class="gcol">
              <span class="glabel">距离任务结束剩余天数：</span>
              <span class="gvalue">
                {{ differenceInDays(parseDate(taskInfo.taskEndDate, 'yyyy-MM-dd HH:mm:ss'), new Date()) || '--' }}天
              </span>
            </div>
          </div>
        </template>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import echartsPie from '@/components/charts/echarts-pie.vue';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import { queryPmmTaskCustList, taskRsSummary } from '@/apis/mkt';
import { codeTranslate } from '@/hook/code-hook';
import { fmtPercent, fmtThousands, parseDate } from '@/utils/format';
import { getStorage } from '@/storage/storage';
import { differenceInDays } from 'date-fns';
const userInfo = getStorage('userInfo') || {}; // 用户信息
const router = useRouter();
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
const buttons = ref([
  {
    name: '意向反馈',
    icon: 'records-o',
  },
  {
    name: '营销接触',
    icon: 'records-o',
  },
]);

// 客户名单列表请求参数
const reqParams = ref({
  taskId: props.taskId,
  custName: '',
});
const refreshListRef = ref(); // 列表Ref
// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};

const custNum = ref();
const xData = ref([] as any);
const tooltip = (object: any) => {
  return `${object.marker} ${object.data.name}<br/>人数：${fmtThousands(object.data.value, 0)}<br/>占比：${object.data.rate}`;
};
// 初始化饼图数据
const initPieData = async () => {
  const { code, data } = await taskRsSummary({
    taskId: props.taskId,
    objType: userInfo.isManager ? 'ORG' : 'USER',
    objId: userInfo.isManager ? userInfo.dataRightOrgId : userInfo.userId,
  });
  if (code === 200) {
    let _tmp = data.taskConversion;
    custNum.value = _tmp?.custNum;
    xData.value = [];
    if (custNum.value) {
      _tmp?.unallocCustNum &&
        xData.value.push({
          name: '未分配任务名单客户',
          value: _tmp?.unallocCustNum,
          rate: fmtPercent(_tmp?.unallocCustNum / _tmp?.custNum),
        });
      _tmp?.touchCustNum &&
        xData.value.push({
          name: '已接触任务名单客户',
          value: _tmp?.touchCustNum,
          rate: fmtPercent(_tmp?.touchCustNum / _tmp?.custNum),
        });
      _tmp?.untouchCustNum &&
        xData.value.push({
          name: '未接触任务名单客户',
          value: _tmp?.untouchCustNum,
          rate: fmtPercent(_tmp?.untouchCustNum / _tmp?.custNum),
        });
      _tmp?.convertCustNum &&
        xData.value.push({
          name: '已转化任务名单客户',
          value: _tmp?.convertCustNum,
          rate: fmtPercent(_tmp?.convertCustNum / _tmp?.custNum),
        });
    }
  }
};
// 客户视图
const gotoCustView = (custInfo) => {
  if (custInfo.custType === '1' && custInfo.custId) {
    if (custInfo.line == '1') {
      router.push(`/pcm-view/${custInfo.custId}`);
    } else {
      router.push(`/ccm-view/${custInfo.custId}`);
    }
  }
};
// 点击事件
const footerClickFn = (btn: any, val: any) => {
  if (btn.name === '营销接触') {
    // 判断是否零售客户
    if (val.line == '1') {
      router.push({
        name: 'pcm-view-contact', // 零售客户-营销接触
        query: {
          isCust: val.custType === '1' ? '1' : '0', // 是否存量客户
          custId: val.custId,
          custName: val.companyName || val.custName,
          srcId: props.taskId,
          exeRegSrc: '5', // 登记渠道:1-商机，3-客户视图，5-任务执行
          reason: props.taskInfo.taskName,
        },
      });
    } else {
      router.push({
        name: 'ccm-view-service-info', // 对公客户-营销接触
        query: {
          isCust: val.custType === '1' ? '1' : '0', // 是否存量客户
          custId: val.custId,
          custName: val.companyName || val.custName,
          srcId: props.taskId,
          exeRegSrc: '5', // 登记渠道:1-商机，3-客户视图，5-任务执行
          reason: props.taskInfo.taskName,
        },
      });
    }
  }
  if (btn.name === '意向反馈') {
    router.push({
      name: 'mkt-task-fb',
      query: {
        custId: val.custId,
        custName: val.companyName || val.custName,
        taskId: props.taskId,
      },
    });
  }
};

onMounted(() => {
  initPieData();
});
</script>
<style lang="less" scoped>
.refresh-list {
  padding: 24px;

  .pie-box {
    height: 300px;
  }
}

.black-tag {
  background: #222222;
  border: 1px solid rgba(196, 138, 19, 1);
  border-radius: 8px 0px 8px 0px;
  padding: 5px 8px;
  font-family: PingFangSC-Medium;
  font-size: @font-size-22;
  color: #ffcd64;
  line-height: 22px;
  font-weight: 500;
  margin-left: 10px;
}
</style>
