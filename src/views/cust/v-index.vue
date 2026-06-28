<!--
 * @desc: 客户
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-16 15:56:36
-->
<template>
  <div class="cust-page">
    <div id="cust-page-header" class="contianer">
      <dadp-card is-body-padding>
        <van-tabs v-model:active="businessLine" type="card" :ellipsis="false" @change="handleChange">
          <van-tab v-for="(item, index) in showBusinessLineList" :key="index" :title="item.content" :name="item.value"></van-tab>
        </van-tabs>
        <div class="tabs-row">
          <template v-if="businessLine === '4'">
            <dadp-tabs v-if="userInfo.isManager" v-model="custType" :options="custTypeOptions"></dadp-tabs>
            <dadp-tabs v-else v-model="incluCustMgrType" :options="incluCustMgrTypeOptions"></dadp-tabs>
          </template>
          <dadp-tabs v-else-if="!userInfo.isManager" v-model="custMgrType" :options="custMgrTypeOptions"></dadp-tabs>

          <div class="tabs-row-right">
            <van-image class="image" :src="!maskStatus ? eyesOpen : eyesClose" @click="maskStatus = !maskStatus"></van-image>
          </div>
        </div>
        <div class="mian-content">
          <div class="content-header">
            <dadp-tabs v-model="activeOverView" :options="overviewOptions"></dadp-tabs>
          </div>
          <component
            :is="currentOverView?.comp.value"
            :businessLine="businessLine"
            :custType="businessLine === '4' && userInfo.isManager ? custType : ''"
            :incluCustMgrType="businessLine === '4' && !userInfo.isManager ? incluCustMgrType : ''"
            :custMgrType="businessLine !== '4' && !userInfo.isManager ? custMgrType : ''"
            :maskStatus="maskStatus"
          />
        </div>
      </dadp-card>
    </div>
    <van-tabs id="list-ele" ref="tabRef" v-model:active="activeTab" @click-tab="scrollTop">
      <van-tab v-for="item in listComp" :title="item.title" :name="item.id">
        <component :is="item.comp.value" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import eyesOpen from '@/assets/images/common/eyes-open.png';
import eyesClose from '@/assets/images/common/eyes-close.png';
import dadpTabs from '@/components/dadp-ui/dadp-tabs.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { custModuleComp } from '@/hook/auth-comp-hook';
import { getStorage } from '@/storage/storage';
import { hasPermission } from '@/hook/use-common-hook';

defineOptions({ name: 'cust' });

const scrollTop = () => {
  let dom = document.getElementById('list-ele');
  if (dom) dom.scrollIntoView({ behavior: 'smooth' });
};

// 是否脱敏
const maskStatus = ref(false);

// 用户信息
const userInfo = getStorage('userInfo') || {};

// 条线
const businessLineList = ref([
  { content: '个人客户', value: '3', hasPermission: () => hasPermission('cust-list_app-p_app') },
  { content: '公司客户', value: '2', hasPermission: () => hasPermission('cust-list_app-c_app') },
  { content: '普惠客户', value: '4', hasPermission: () => hasPermission('cust-list_app-p&w_app') },
]);
const showBusinessLineList = computed(() => {
  return businessLineList.value.filter((e) => e.hasPermission());
});
const businessLine = ref(showBusinessLineList.value?.[0].value);

// 当条线切换为普惠时，因普惠无资产概况，做一下页面切换
const handleChange = (val: string) => {
  if (val === '4' && activeOverView.value === 'overviewAssetsComp') {
    activeOverView.value = 'overviewClientComp';
  }
};

/**
 * 普惠条线
 */
// 客户类型：管理员角色
const custType = ref('3');
const custTypeOptions = [
  { content: '个人客户', value: '3' },
  { content: '公司客户', value: '2' },
];
// 普惠客户管户类型：非管理员角色
const incluCustMgrType = ref('P0');
const incluCustMgrTypeOptions = [
  { content: '个人主管', value: 'P0' },
  { content: '个人共管', value: 'P1' },
  { content: '公司主管', value: 'E0' },
  { content: '公司共管', value: 'E1' },
];
/**
 * 非普惠条线
 */
// 管户类型：非管理员
const custMgrType = ref('0');
const custMgrTypeOptions = [
  { content: '主管', value: '0' },
  { content: '共管', value: '1' },
];

// 概况视图：普惠无资产概况
const activeOverView = ref('overviewClientComp');
const overviewComp = custModuleComp.filter((item) => item.type === 'OVERVIEW');
const overviewOptions = computed(() =>
  overviewComp
    .filter((item) => !(businessLine.value === '4' && item.id === 'overviewAssetsComp'))
    .map((item) => ({ content: item.title, value: item.id }))
);

const currentOverView = computed(() => {
  return overviewComp.find((item) => item.id === activeOverView.value);
});

// 列表视图
const activeTab = ref('retailListComp');
const listComp = custModuleComp.filter((item) => item.type === 'LIST' && item.permission());
</script>
<style lang="less" scoped>
.cust-page {
  .contianer {
    padding: 24px;
    .tabs-row {
      height: 80px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      backface-visibility: hidden; // 处理因为position: relative导致的模糊
      &-right {
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100%;
        display: flex;
        align-items: center;
        .image {
          width: 40px;
          height: 26px;
        }
      }
    }
    .mian-content {
      background-image: linear-gradient(180deg, #fdf6ea 0%, #ffffff 15%);
      border-radius: 20px;
      .content-header {
        padding: 15px 0 10px;
      }
    }
  }
}
</style>
