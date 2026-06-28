<!--
 * @desc: 重要公告
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-08 20:17:56
-->
<template>
  <van-search v-model="reqParams.noticeTitle" shape="round" placeholder="请输入搜索关键词" @search="onSearch"></van-search>
  <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="listNotice" :reqParams="reqParams">
    <template v-slot="{ data }">
      <dadp-card :title="data.noticeTitle" is-arrow @click="handleClick(data)">
        <template #subTitle>
          <van-tag color="#fff3e7" text-color="#FF8812">{{ codeTranslate('importanceType', data.importanceType) }}</van-tag>
          公告时间：{{ data.releaseDate }}
        </template>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>

<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { listNotice } from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';

const router = useRouter();

const refreshListRef = ref(); // 列表Ref

// 请求参数
const reqParams = ref({
  noticeTitle: '',
  importanceType: '1',
});
// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};

// 点击事件
const handleClick = (val: any) => {
  router.push(`/notice-dtl/${val.noticeId}`);
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
