<!--
 * @desc: 基于van-list封装的刷新列表组件
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-09-27 16:40:03
-->
<template>
  <div class="refresh-list">
    <van-pull-refresh v-model="refreshing" style="min-height: 100vh" head-height="1.5rem" @refresh="onRefresh">
      <!--下拉刷新-->
      <template #pulling>
        <slot name="pulling">
          <div v-if="pullingText">{{ pullingText }}</div>
        </slot>
      </template>
      <!--列表组件-->
      <van-list v-model:loading="loading" :finished="finished" :offset="12" @load="onLoad">
        <template v-if="listData.length">
          <template v-for="(item, index) in listData" :key="index">
            <!--默认插槽-->
            <slot :data="{ ...item, index: index }"></slot>
          </template>
        </template>
        <!--空白列表-->
        <van-empty v-else :image="image" class="empty">
          <template #description>
            <slot name="emptyText">{{ emptyText }}</slot>
          </template>
        </van-empty>

        <!--上拉加载-->
        <template v-if="isRequest" #loading>
          <slot name="loading">
            <div v-if="loadingText">
              {{ loadingText }}
            </div>
          </slot>
        </template>
        <!--加载完毕-->
        <template v-if="listData.length && finished" #finished>
          <slot name="finished">
            <div v-if="finishedText">{{ finishedText }}</div>
          </slot>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import image from '@/assets/images/common/empty.png';
const props = defineProps({
  // 请求api
  requestApi: {
    type: Function,
    default: null,
    required: true,
  },
  // 请求参数
  reqParams: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 空白提示文本
  emptyText: {
    type: String,
    default: '暂无数据',
  },
  // 加载结束
  finishedText: {
    type: String,
    default: '没有更多数据了',
  },
  // 上拉刷新提示语
  pullingText: {
    type: String,
    default: '刷新中...',
  },
  // 下拉加载提示语
  loadingText: {
    type: String,
    default: '加载中...',
  },
  // 每页条数
  pageSize: {
    type: Number,
    default: 20,
  },
  // 是否静默加载
  isStaticLoad: {
    type: Boolean,
    default: false,
  },
});

// 是否刷新
const refreshing = ref(false);
// 是否加载
const loading = ref(false);
// 是否结束
const finished = ref(false);

const isRequest = ref(false);

// 请求参数
const getParams = ref(computed(() => props.reqParams));
// 响应结果
const listData = ref([] as any[]);
const total = ref(0);
const currenPage = ref(0);

// 更新状态
const loadStatus = (status: boolean) => {
  loading.value = status;
  refreshing.value = status;
  isRequest.value = status;
};
// 重置参数
const resetListState = () => {
  total.value = 0;
  currenPage.value = 0;
  finished.value = false;
};

// 获取接口数据
const getData = async (doInit = false) => {
  // 构建请求参数
  let params = {
    ...getParams.value,
    pageNo: currenPage.value,
    pageSize: props.pageSize,
  };
  const { code, data } = await props.requestApi({ ...params });
  // 更新加载状态
  loadStatus(false);

  let _data = data?.rows || data?.records || [];

  // 更新总数据量
  total.value = data?.total || 0;
  // 初始化或追加数据
  listData.value = doInit ? _data : listData.value.concat(_data);
  // 判断是否加载完毕
  finished.value = code !== 200 || listData.value.length >= total.value || _data.length === 0;
  // 如果允许自动加载且未加载完毕，则自动加载
  if (props.isStaticLoad && !finished.value) {
    isRequest.value = true;
    setTimeout(() => {
      onLoad();
    }, 1000);
  }
};
// 查询
const doQuery = (doInit = false) => {
  if (!props.requestApi) {
    return;
  }
  currenPage.value += 1;
  getData(doInit);
};

// 下拉刷新
const onRefresh = () => {
  refreshing.value = true;
  resetListState();
  doQuery(true);
};

// 上拉加载
const onLoad = () => {
  doQuery();
};

defineExpose({
  onRefresh,
  total,
  listData,
});
</script>

<style lang="less" scoped>
.empty {
  img {
    height: 300px;
    width: 352px;
  }
}
</style>
