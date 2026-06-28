<template>
  <div class="holdProd-index">
    <van-tabs v-model:active="active">
      <van-tab v-for="item in bsLists" :key="item.bsName" :title="item.bsName" :name="item.bsName">
        <component v-if="active === item.bsName" :is="item.comp" :queryParams="queryParams" :bs="item"></component>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { bsList } from '@/sub-pages/ccm/custview/outline/business-risk/hook';
defineOptions({ name: 'business-risk' });
const route = useRoute();
const dataMap = reactive({
  active: '0',
  queryParams: {
    custId: route.params.custId,
  },
  bsLists: bsList,
});
const { active, queryParams, bsLists } = toRefs(dataMap);

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
:deep(.hedtitle) {
  font-family: PingFangSC-Semibold;
  font-size: @font-size-36;
  color: @text;
  letter-spacing: 0;
  line-height: 36px;
  font-weight: 600;
  padding-top: 32px;
  padding-left: 5px;
}
</style>
