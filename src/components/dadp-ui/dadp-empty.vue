<template>
  <van-empty :image="emptyList[emptyType].image" :image-size="picSize" :description="emptyDesc || emptyList[emptyType].descText" />
</template>
<script lang="ts" setup>
import dataEmpty from '@/assets/images/common/empty.png';
const props = defineProps({
  /**
   * 空白类型 :
   * dataEmpty:暂无数据 ｜ loadError 页面加载失败 ｜ searchEmpty 暂无搜索结果 | netError 网络错误 | pageError 页面错误 | taskEmpty 暂无代办 ｜ msgEmpty 暂无消息
   * */
  emptyType: {
    type: String,
    default: 'dataEmpty',
  },
  //空白描述
  emptyDesc: {
    type: String,
    default: '',
  },
  // 图片大小
  imageSize: {
    type: [String, Number, Array],
    default: [211, 168],
  },
});
// 空白列表
const emptyList = ref({
  dataEmpty: {
    image: dataEmpty,
    descText: '暂无数据可以查看哦～',
  },
} as Record<string, any>);

const picSize = ref(computed(() => props.imageSize) as any);
</script>
<style lang="less" scoped>
:deep(.van-empty__description) {
  margin-top: 21px !important;
  color: @gray !important;
}
</style>
