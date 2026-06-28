<template>
  <div class="service-info">
    <van-tabs v-model:active="active" sticky @click-tab="clickTab">
      <van-tab title="电访" name="tel"></van-tab>
      <van-tab title="面访" name="face"></van-tab>
    </van-tabs>
    <dadp-date
      v-model="queryParams.telTime"
      type="range"
      label="服务记录时间"
      input-align="right"
      placeholder="请选择日期"
      clearable
      @change="changeDate"
    />

    <div class="service-info-list">
      <dadp-refresh-list
        ref="refreshListRef"
        class="refresh-list"
        :requestApi="active === 'tel' ? getTouchTelList : getTouchFaceList"
        :reqParams="{ ...queryParams, ...custInfo }"
      >
        <template v-slot="{ data }">
          <dadp-card :title="active === 'tel' ? '电访时间：' + data.endDate : '面访时间：' + data.signDate" is-arrow @click="viewFn(data)">
            <template #subTitle>接触人：{{ active === 'tel' ? data.telUserName : data.faceUserName }}</template>
          </dadp-card>
        </template>
      </dadp-refresh-list>
    </div>

    <van-action-bar class="service-info-footer">
      <div class="service-info-footer-item" @click="addFn('tel')">
        <van-image class="img" :src="telIcon"></van-image>
        <div>电访补录</div>
      </div>
      <div class="service-info-footer-item" @click="addFn('face')">
        <van-image class="img" :src="faceIcon"></van-image>
        <div>面访补录</div>
      </div>
    </van-action-bar>
  </div>
</template>

<script lang="ts" setup>
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import telIcon from '@/assets/images/cust/view/tel-icon.png';
import faceIcon from '@/assets/images/cust/view/face-icon.png';
import { getTouchFaceList, getTouchTelList } from '@/apis/cust';
import { resetFields } from '@/utils/global';

defineOptions({ name: 'pcm-view-contact' });

const router = useRouter();
const route = useRoute();

const dataMap = reactive({
  active: route.query.showTab || 'tel',
  queryParams: Object(),
  custInfo: {
    custId: route.query.custId,
  },
});
const refreshListRef = ref();
const { queryParams, active, custInfo } = toRefs(dataMap);
const clickTab = (val: any) => {
  resetFields(dataMap.queryParams);
  refreshListRef.value.listData = [];
  nextTick(() => {
    refreshListRef.value.onRefresh();
  });
};

const initTime = () => {
  if (dataMap.active === 'tel') {
    dataMap.queryParams.telStartTime = dataMap.queryParams.telTime ? `${dataMap.queryParams.telTime[0]} 00:00:00` : null;
    dataMap.queryParams.telEndTime = dataMap.queryParams.telTime ? `${dataMap.queryParams.telTime[1]} 23:59:59` : null;
  } else {
    dataMap.queryParams.faceTimeStart = dataMap.queryParams.telTime ? `${dataMap.queryParams.telTime[0]} 00:00:00` : null;
    dataMap.queryParams.faceTimeEnd = dataMap.queryParams.telTime ? `${dataMap.queryParams.telTime[1]} 23:59:59` : null;
  }
};

const changeDate = (val: any) => {
  initTime();
  nextTick(() => {
    // 刷新列表
    refreshListRef.value.onRefresh();
  });
};

// 新增录入
const addFn = (val: any) => {
  router.push({
    name: val == 'tel' ? 'pcm-contact-tel' : 'pcm-contact-face',
    query: {
      isCust: route.query.isCust,
      custId: route.query.custId,
      custName: route.query.custName,
      exeRegSrc: route.query.exeRegSrc,
      srcId: route.query.srcId,
      reason: route.query.reason,
    },
  });
};

// 查看详情
const viewFn = (val: any) => {
  if (dataMap.active == 'tel') {
    router.push({
      path: `/pcm-contact-tel-dtl/${val.touchTelId}`,
      query: {
        isCust: route.query.isCust,
      },
    });
  } else {
    router.push({
      path: `/pcm-contact-face-dtl/${val.touchFaceId}`,
      query: {
        isCust: route.query.isCust,
      },
    });
  }
};

onMounted(() => {
  dataMap.queryParams.active = route.query.showTab || 'tel';
});
</script>

<style scoped lang="less">
.service-info {
  &-list {
    padding: 32px 32px 220px 32px;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    height: 220px;
    width: 100%;
    &-item {
      width: 50%;
      text-align: center;
      margin: 50px 0 30px 0;
      .img {
        width: 90px;
        height: 70px;
        margin-bottom: 28px;
      }
    }
  }
}
</style>
