<!--
 * @desc: 营销商机
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-08 14:18:53
-->
<template>
  <div class="headEchar">
    <dadp-card title="商机客户执行情况" sub-title="单位：人" is-body-padding>
      <div class="chart-box">
        <echarts-bar :x-data="xData" :series="series"></echarts-bar>
      </div>
    </dadp-card>
  </div>
  <van-search v-model="listParams.custName" shape="round" @search="onSearch" show-action placeholder="请输入客户名称">
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <van-field label="商机名称" v-model="listParams.chanceName" input-align="right" placeholder="请输入"></van-field>
              <busi-org
                v-model="listParams.mgrOrgIds"
                :topOrgId="userInfo.orgId"
                label="主管机构"
                input-align="right"
                placeholder="请选择"
              ></busi-org>
              <van-field label="客户号" v-model="listParams.custId" input-align="right" placeholder="请输入"></van-field>
              <van-field label="手机号" v-model="listParams.phone" type="digit" input-align="right" placeholder="请输入"></van-field>
            </van-cell-group>
            <div class="gform-footer">
              <van-button size="large" round plain @click="onClear">清空</van-button>
              <van-button type="primary" size="large" round native-type="submit">确认</van-button>
            </div>
          </van-form>
        </van-dropdown-item>
      </van-dropdown-menu>
    </template>
  </van-search>
  <div class="container">
    <dadp-refresh-list
      ref="refreshListRef"
      :requestApi="listChangeCust"
      :reqParams="{ ...listParams, mgrOrgId: listParams.mgrOrgIds?.[0] }"
    >
      <template v-slot="{ data }">
        <dadp-card
          :avatar="data.sex === '2' ? 'woman' : 'man'"
          is-body-padding
          :buttons="buttons"
          @footer-click="(btn) => footerClick(btn, data)"
        >
          <template #title>
            <span @click="gotoCustView(data)">{{ data.companyName || data.custName }}</span>
            <span v-if="data.custLevel" class="black-tag">
              <span v-if="data.companyName">
                {{ codeTranslate('ccmCustBaseLevel', data.custLevel) }}
              </span>
              <span v-else>
                {{ codeTranslate('pcmCustBaseLevel', data.custLevel) }}
              </span>
            </span>
          </template>
          <template #subTitle>
            <div>{{ data.custId }}</div>
          </template>
          <div class="grow row" v-for="(item, index) in data.pmmChangeVOList" :key="index" @click="handleClick(item)">
            <div class="gcol" style="position: relative">
              <van-space>
                <van-tag color="#fff3e7" text-color="#FF8812">{{ codeTranslate('chanceType', item.chanceType) }}</van-tag>
                <span class="glabel">{{ fmtDate(item.beginDate) }}至{{ fmtDate(item.endDate) }}</span>
              </van-space>
              <div class="text">
                <van-text-ellipsis :content="item.chanceName" rows="1" />
              </div>
              <div
                class="text"
                style="user-select: none"
                @touchstart="handleTouchstart(item)"
                @touchmove="handleTouchmove(item)"
                @touchend="handleTouchend(item)"
              >
                <van-text-ellipsis :content="'商机地址：' + (item.registerAddress ? item.registerAddress : '--')" rows="1" />
              </div>
            </div>
            <van-icon name="arrow"></van-icon>
          </div>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </div>
</template>
<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import echartsBar from '@/components/charts/echarts-bar.vue';
import busiOrg from '@/components/business/busi-org.vue';
import { listChangeCust, getChanceAnal, getDataAuthParam } from '@/apis/mkt';
import { getStorage } from '@/storage/storage';
import { fmtDate } from '@/utils/format';
import { codeTranslate } from '@/hook/code-hook';
import { copyToClipboard } from '@/utils/global';

defineOptions({ name: 'mkt-chance' });

const userInfo = getStorage('userInfo') || {};
const router = useRouter();
const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref
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
const listParams = ref({
  chanceName: '',
  custId: '',
  custName: '',
  phone: '',
  mgrOrgIds: [],
  chanceSts: ['1', '2', '3'],
});
const chartParams = ref({
  // 统计维度：管理-1（机构） 非管理人员-2（员工）
  statDimension: '1',
  // 是否有下级：管理-1（有） 非管理人员-0（无）
  isSub: '1',

  //执行人ID：非管理人员
  performeUserId: '',
  changeExcuteFirstOrgId: '', //执行人ID：非管理人员
  changeExcuteSecondOrgId: '', //执行人ID：非管理人员
});
const xData = ref([]);
const series = ref([
  {
    type: 'bar',
    colorBy: 'data',
    data: [],
  },
]);

const timerId = ref(null);
// 取消
const onClear = () => {
  listParams.value.chanceName = '';
  listParams.value.phone = '';
  listParams.value.custName = '';
  listParams.value.mgrOrgIds = [];
  listParams.value.custId = '';
};
// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};
// 提交
const onSubmit = () => {
  onSearch();
  dropdownMenuRef.value.close();
};
// 商机点击事件
const handleClick = (chanceInfo: any) => {
  router.push(`/mkt-chance-dtl/${chanceInfo.chanceId}/${chanceInfo.changeCustId}`);
};
// 底部按钮
const footerClick = (btn: any, val: any) => {
  if (btn.name === '营销接触') {
    let _tmp = val.pmmChangeVOList?.[0] || {};
    // 1-零售存量 2公司存量 3零售潜客 4公司潜客
    if (_tmp.changeCustType == '1' || _tmp.changeCustType == '3') {
      router.push({
        name: 'pcm-view-contact', // 零售客户-营销接触
        query: {
          isCust: _tmp.changeCustType === '1' ? '1' : '0', // 是否存量客户
          custId: val.custId,
          custName: val.companyName || val.custName,
          srcId: _tmp.changeCustId,
          exeRegSrc: '1', // 登记渠道:1-商机，3-客户视图，5-任务执行
        },
      });
    } else {
      router.push({
        name: 'ccm-view-service-info', // 对公客户-营销接触
        query: {
          isCust: _tmp.changeCustType === '2' ? '1' : '0', // 是否存量客户
          custId: val.custId,
          custName: val.companyName || val.custName,
          srcId: _tmp.changeCustId,
          exeRegSrc: '1', // 登记渠道:1-商机，3-客户视图，5-任务执行
        },
      });
    }
  }
  if (btn.name === '意向反馈') {
    router.push({
      name: 'mkt-chance-fb',
      query: {
        custId: val.custId,
      },
    });
  }
};

const initParams = async () => {
  const { data } = await getDataAuthParam({ authId: 'pmmChanceAnaly-chanceAnal' });
  const firstOrgId = userInfo.orgLevel == '1' ? userInfo.orgId : userInfo.oneOrgId;
  const secondOrgId = userInfo.orgLevel == '1' ? '' : userInfo.orgId;
  switch (data?.authScope) {
    // 查全部数据：机构和人 当前只能选择客户管理中的默认最高权限机构（总行）
    case '7':
      chartParams.value.changeExcuteFirstOrgId = '03100';
      chartParams.value.changeExcuteSecondOrgId = '';
      chartParams.value.performeUserId = '';
      chartParams.value.statDimension = '1';
      chartParams.value.isSub = '1';
      break;
    // 查询本级及下级：机构默认显示当前用户所属一级、二级机构且可修改。
    case '4':
      chartParams.value.changeExcuteFirstOrgId = firstOrgId;
      chartParams.value.changeExcuteSecondOrgId = '';
      chartParams.value.performeUserId = '';
      chartParams.value.statDimension = '1';
      chartParams.value.isSub = '1';
      break;
    // 查询本级机构：机构默认显示当前用户所属一级、二级机构且不可修改。统计维度=员工时，执行人可选本级所有员工数据
    case '3':
      chartParams.value.changeExcuteFirstOrgId = firstOrgId;
      chartParams.value.changeExcuteSecondOrgId = secondOrgId;
      chartParams.value.performeUserId = '';
      chartParams.value.statDimension = '1';
      chartParams.value.isSub = '0';
      break;
    // 查本人数据：机构默认显示当前用户所属机构且不可修改，执行人显示当前登录人不可修改;统计维度=员工，执行人可选默认根据归属机构查询机构及其数据权限范围内员工数据
    case '5':
      chartParams.value.changeExcuteFirstOrgId = firstOrgId;
      chartParams.value.changeExcuteSecondOrgId = secondOrgId;
      chartParams.value.performeUserId = data.userId;
      chartParams.value.statDimension = '2';
      chartParams.value.isSub = '0';
      break;
    default:
      break;
  }
};

// 获取商机客户执行情况
const getChartData = async () => {
  await initParams();
  const { data } = await getChanceAnal({ ...chartParams.value });
  if (data) {
    let ans = data.stsList.filter((item: any) => item.pieName != '未分配');
    xData.value = ans.map((item: any) => item.pieName);
    series.value[0].data = ans.map((item: any) => item.pieNum);
  }
};
// 接触事件
const handleTouchstart = (val: any) => {
  // 加定时器超过1秒就把复制按钮展示
  timerId.value = setTimeout(() => {
    copyToClipboard(val.registerAddress ? val.registerAddress : '--');
  }, 500);
};
// 移开事件
const handleTouchmove = (val: any) => {
  // 清除定时器
  clearTimeout(timerId.value);
  window.event.preventDefault();
};
// 结束结束事件
const handleTouchend = (val: any) => {
  // 清除定时器
  clearTimeout(timerId.value);
  window.event.preventDefault();
};
// 客户视图
const gotoCustView = (data) => {
  if (data.custId.indexOf("EP") !== 0) {
    if (data.changeCustType === '1') {
      router.push(`/pcm-view/${data.custId}`);
    } else if (data.changeCustType === '2'){
      router.push(`/ccm-view/${data.custId}`);
    }
  }
};``
onMounted(() => {
  getChartData();
  onSearch();
});
onActivated(() => {
  getChartData();
});
</script>
<style lang="less" scoped>
.headEchar {
  padding: 24px;
  .chart-box {
    height: 400px;
  }
}

.container {
  padding: 24px;
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
  .row {
    white-space: nowrap;
    background-color: @gray-1;
    border-radius: 8px;
    padding: 10px;
    .text {
      font-family: PingFangSC-Regular;
      font-size: @font-size-24;
      color: @text;
      letter-spacing: 0;
      line-height: 24px;
      font-weight: 400;
    }
  }
  .row + .row {
    margin-top: 10px;
  }
}
.copyBtn {
  position: absolute;
  background: #333;
  color: #fff;
  border-radius: 20px;
  padding: 0 24px;
  font-size: 24px;
  margin-left: 120px;
  // left: 150px;
}
.van-overlay {
  background: transparent;
}
</style>
