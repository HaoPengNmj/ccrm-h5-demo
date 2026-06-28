<!--
 * @desc: 零售-保险-列表
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-09 19:31:53
-->
<template>
  <van-sticky>
    <van-tabs v-model:active="reqParams.activeTab" @change="onSearch">
      <van-tab v-for="item in getCombo(moduleComp.retail.insure.codeCombo)" :name="item.value" :title="item.content"></van-tab>
    </van-tabs>
    <van-search v-model="reqParams.prodName" shape="round" placeholder="请输入产品名称" @search="onSearch"></van-search>
  </van-sticky>

  <dadp-refresh-list
    ref="refreshListRef"
    class="refresh-list"
    :requestApi="listPProd"
    :reqParams="{ ...reqParams, prodType: [reqParams.activeTab], isMobileShow: '1' }"
  >
    <template v-slot="{ data }">
      <dadp-card @click="handleClick(data)">
        <item :data="data"></item>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>

<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import item from './item.vue';

import { listPProd } from '@/apis/prod';
import { getCombo } from '@/hook/code-hook';
import { moduleComp } from '../../hook';
defineOptions({ name: 'retail-insure' });
const route = useRoute();
const router = useRouter();

const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

// 请求参数
const reqParams = ref({
  kindProdType: moduleComp.retail.insure.kindProdType,
  prodName: '',
  activeTab: route.query.tab as string,
  isHot: route.query.isHot,
  isNew: route.query.isNew,
} as any);
// 查询
const onSearch = () => {
  nextTick(() => {
    refreshListRef.value.onRefresh();
  });
};
// 取消
const onCancel = () => {
  dropdownMenuRef.value.close();
};
// 提交
const onSubmit = () => {
  dropdownMenuRef.value.close();
  onSearch();
};

// 点击事件
const handleClick = (item: any) => {
  router.push(`/prod-dtl/retail/insure/${item.prodId}`);
};
</script>

<style lang="less" scoped>
.total {
  padding: 24px 32px 0;
  font-family: PingFangSC-Regular;
  font-size: @font-size-28;
  letter-spacing: 0;
  line-height: 28px;
  font-weight: 400;
}
.refresh-list {
  padding: 24px;
}
</style>
