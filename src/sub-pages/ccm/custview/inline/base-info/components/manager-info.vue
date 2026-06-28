<template>
  <div>
    <div class="title">管户信息</div>
    <dadp-card is-body-padding>
      <div class="items">
        <div class="label">主管人</div>
        <div class="value">{{ custInfo.mainMgrName || '--' }}</div>
      </div>
      <div class="items">
        <div class="label">主管机构</div>
        <div class="value">{{ custInfo.mainOrgName || '--' }}</div>
      </div>
      <div class="items">
        <div class="label">主管一级机构</div>
        <div class="value">{{ custInfo.levelOneOrgName || '--' }}</div>
      </div>
    </dadp-card>
    <van-swipe v-if="publicMangerInfo.length > 0" class="swipe" :autoplay="0">
      <van-swipe-item v-for="item in publicMangerInfo">
        <div class="new-card">
          <dadp-card is-body-padding>
            <div class="items">
              <div class="label">共管人</div>
              <div class="value">{{ item.mainMgrName || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">共管机构</div>
              <div class="value">{{ item.mainOrgName || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">共管一级机构</div>
              <div class="value">{{ item.mgrOneOrgName || '--' }}</div>
            </div>
          </dadp-card>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-swipe v-if="trustMangerInfo.length > 0" class="swipe" :autoplay="0">
      <van-swipe-item v-for="item in trustMangerInfo">
        <div class="new-card">
          <dadp-card is-body-padding>
            <div class="items">
              <div class="label">托管人</div>
              <div class="value">{{ item.mainMgrName || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">托管机构</div>
              <div class="value">{{ item.mainOrgName || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">托管一级机构</div>
              <div class="value">{{ item.mgrOneOrgName || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">托管开始日期</div>
              <div class="value">{{ item.beginDate || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">托管结束日期</div>
              <div class="value">{{ item.endDate || '--' }}</div>
            </div>
          </dadp-card>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-swipe v-if="authorizeInfo.length > 0" class="swipe" :autoplay="0">
      <van-swipe-item v-for="item in authorizeInfo">
        <div class="new-card">
          <dadp-card is-body-padding>
            <div class="items">
              <div class="label">授权人</div>
              <div class="value">{{ item.mainMgrName || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">授权一级机构</div>
              <div class="value">{{ item.firstOrgName || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">授权开始日期</div>
              <div class="value">{{ item.beginDate || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">授权结束日期</div>
              <div class="value">{{ item.endDate || '--' }}</div>
            </div>
          </dadp-card>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getCustManageInfo, getCustAuthorizeInfo } from '@/apis/cust';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});
const dataMap = reactive({
  publicMangerInfo: Array<any>(),
  trustMangerInfo: Array<any>(),
  authorizeInfo: Array<any>(),
});
const { publicMangerInfo, trustMangerInfo, authorizeInfo } = toRefs(dataMap);
// 获取共管信息
const getPublicManageInfo = async () => {
  const { code, data } = await getCustManageInfo({ pageNo: 1, pageSize: 99, custId: props.custInfo.custId, mainMgrType: '1' });
  if (code == 200 && data) {
    dataMap.publicMangerInfo = data;
  }
};
// 获取托管信息
const getTrustManageInfo = async () => {
  const { code, data } = await getCustManageInfo({ pageNo: 1, pageSize: 99, custId: props.custInfo.custId, mainMgrType: '4' });
  if (code == 200 && data) {
    dataMap.trustMangerInfo = data;
  }
};
// 获取授权信息
const getRelAuthApplyMx = async () => {
  let fromData = new FormData();
  fromData.append('custId', props.custInfo.custId);
  const { code, data } = await getCustAuthorizeInfo(fromData);
  if (code === 200) {
    dataMap.authorizeInfo = data;
  }
};
onMounted(() => {
  getPublicManageInfo();
  getTrustManageInfo();
  getRelAuthApplyMx();
});
</script>

<style lang="less" scoped>
.items {
  display: inline-table;

  width: 50%;
  margin: 15px 0;

  .label {
    font-family: PingFangSC-Regular;
    font-size: @font-size-24;
    color: @gray;
    letter-spacing: 0;
    line-height: 24px;
    font-weight: 400;
    margin-bottom: 12px;
  }

  .value {
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @text;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
  }
}
.new-card {
  padding-bottom: 60px;
}
.swipe {
  margin-top: 24px;
}
</style>
