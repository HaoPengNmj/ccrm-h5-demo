<template>
  <div class="base-info">
    <component v-for="item in comps" :key="item.refName" :is="item.com" :ref="item.refName" :custInfo="custInfo"></component>
  </div>
</template>
<script lang="ts" setup>
import coreInfo from './components/core-info.vue';
import managerInfo from './components/manager-info.vue';
import contactsInfo from './components/contacts-info.vue';
import { getCustCoreInfo } from '@/apis/cust';

defineOptions({ name: 'ccm-view-base-info' });

const route = useRoute();
const dataMap = reactive({
  comps: [
    {
      // 核心信息
      refName: 'coreInfoRef',
      com: shallowRef(coreInfo),
    },
    {
      // 管户信息
      refName: 'managerInfoRef',
      com: shallowRef(managerInfo),
    },
    {
      // 联系人信息
      refName: 'contactsfoRef',
      com: shallowRef(contactsInfo),
    },
  ],
  custInfo: {
    custId: route.params.custId,
  },
});
const { comps, custInfo } = toRefs(dataMap);

// 获取客户基本信息
const getBaseInfo = async () => {
  const { data } = await getCustCoreInfo({ custId: route.params.custId });
  if (data) {
    dataMap.custInfo = data;
  }
};

onMounted(() => {
  getBaseInfo();
});
</script>

<style lang="less" scoped>
.base-info {
  padding: 0 32px 32px;
  :deep(.title) {
    font-family: PingFangSC-Semibold;
    font-size: @font-size-36;
    color: @text;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 600;
    padding: 32px 5px;
  }
}
</style>
