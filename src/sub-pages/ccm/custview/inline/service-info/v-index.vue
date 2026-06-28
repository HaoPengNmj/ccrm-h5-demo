<template>
  <div class="service-info">
    <van-tabs v-model:active="active" sticky @click-tab="clickTab">
      <van-tab title="电访" name="tel"></van-tab>
      <van-tab title="面访" name="face"></van-tab>
    </van-tabs>
    <dadp-date
      v-model="queryParams.contactDates"
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
        :requestApi="active === 'tel' ? getTelServiceList : getFaceServiceList"
        :reqParams="{
          contactType: active === 'tel' ? '3' : '1',
          custId: route.query.custId,
          ...queryParams,
        }"
      >
        <template v-slot="{ data }">
          <dadp-card
            :title="active === 'tel' ? '电访时间：' + data.beginTime : '面访时间：' + data.signTime"
            is-arrow
            @click="viewFn(data)"
          >
            <template #subTitle>接触人：{{ data.createUserName || '--' }}</template>
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
import telIcon from '@/assets/images/cust/view/tel-icon.png';
import faceIcon from '@/assets/images/cust/view/face-icon.png';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getTelServiceList, getFaceServiceList } from '@/apis/cust';
import { resetFields } from '@/utils/global';

defineOptions({ name: 'ccm-view-service-info' });

const router = useRouter();
const route = useRoute();

const refreshListRef = ref();
const dataMap = reactive({
  active: 'tel',
  queryParams: Object(),
});
const { queryParams, active } = toRefs(dataMap);

// 切换tab
const clickTab = () => {
  refreshListRef.value.listData = [];
  resetFields(dataMap.queryParams);
  nextTick(() => refreshListRef.value.onRefresh());
};

const changeDate = (val: any) => {
  dataMap.queryParams.contactTimeFrom = dataMap.queryParams.contactDates?.[0] ? `${dataMap.queryParams.contactDates?.[0]} 00:00:00` : null;
  dataMap.queryParams.contactTimeTo = dataMap.queryParams.contactDates?.[1] ? `${dataMap.queryParams.contactDates?.[1]} 23:59:59` : null;
  nextTick(() => refreshListRef.value.onRefresh());
};

// 新增录入
const addFn = (val: any) => {
  router.push({
    name: val == 'tel' ? 'ccm-concat-tel' : 'ccm-concat-face',
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
      path: `/ccm-concat-tel-dtl/${val.exeRegId}`,
      query: {
        isCust: route.query.isCust,
      },
    });
  } else {
    router.push({
      path: `/ccm-concat-face-dtl/${val.exeRegId}`,
      query: {
        isCust: route.query.isCust,
      },
    });
  }
};

onMounted(() => {
  dataMap.active = (route.query.showTab || 'tel') as string;
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
