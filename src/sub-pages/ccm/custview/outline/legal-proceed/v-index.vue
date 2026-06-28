<template>
  <div>
    <van-tabs v-model:active="active" sticky>
      <van-tab v-for="(item, index) in legalLists" :key="index" :title="item.legalName" :name="item.legalName">
        <component v-if="active === item.legalName" :is="item.comp" :queryParams="queryParams" :legal="item"></component>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { legalList } from '@/sub-pages/ccm/custview/outline/legal-proceed/hook';
defineOptions({ name: 'legal-proceed' });
const route = useRoute();
const dataMap = reactive({
  active: '0',
  queryParams: {
    custId: route.params.custId,
  },
  legalLists: legalList,
});
const { active, queryParams, legalLists } = toRefs(dataMap);

onMounted(() => {});
</script>

<style lang="less" scoped>
:deep(.van-list) {
  padding: 32px 30px;
  .items {
    display: inline-block;
    width: 50%;
    .label {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
      line-height: 24px;
      font-weight: 400;
    }
    .value {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #222222;
      letter-spacing: 0;
      line-height: 44px;
      font-weight: 400;
      margin-top: 12px;
      margin-bottom: 30px;
      width: 100%;
    }
  }
}
</style>
