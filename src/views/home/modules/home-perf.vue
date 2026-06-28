<!--
 * @desc: 首页-业绩完成情况-管理岗
 * @Date: 2024-08-01 11:24:46
 * @LastEditTime: 2024-09-27 14:34:07
-->
<template>
  <div class="home-perf">
    <div class="home-perf-header">
      <div class="title">业绩完成情况</div>
      <div class="more" @click="goPerfDad">更多</div>
    </div>
    <div class="home-perf-content" v-if="indexData.length > 0">
      <template v-for="(item, index) in indexData" :key="index">
        <div class="content-item" :class="`content-item-${index}`">
          <div>
            <span class="title">
              {{ fmtThousands(fmtNumber(item?.taskCpltVal, codeTranslate('unit', item.unit)).value, 2) }}
              {{ fmtNumber(item?.taskCpltVal, codeTranslate('unit', item.unit)).unit }}
            </span>
          </div>
          <div class="label">
            {{ item.indexName }}
          </div>
          <div>
            <van-progress
              stroke-width="0.5em"
              :color="colorList[index]"
              :show-pivot="false"
              :percentage="item.taskCpltRate < 0 ? 0 : item.taskCpltRate > 100 ? 100 : item.taskCpltRate || 0"
            />
          </div>
          <div>
            <span class="rate">{{ item.taskCpltRate }}%</span>
          </div>
        </div>
      </template>
    </div>
    <div v-else>
      <dadp-empty></dadp-empty>
    </div>
  </div>
</template>
<script setup lang="ts">
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import { getPlanScheList } from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';
import { getStorage } from '@/storage/storage';
import { fmtThousands, fmtNumber } from '@/utils/format';
const userInfo = getStorage('userInfo') || {}; // 用户信息
const router = useRouter();
const dataMap = reactive({
  indexData: Array<any>(),
});
const { indexData } = toRefs(dataMap);
//获取我的业绩完成情况
const getMybsOk = async () => {
  const { data, code } = await getPlanScheList({});
  if (code === 200) {
    //需求：按指标名称正序排序 显示前4个指标的进度完成情况
    dataMap.indexData = data.slice(0, 4);
  }
};
//跳往业绩模块-业绩进度分析主界面
const goPerfDad = () => {
  router.push({
    name: 'perf',
    query: {
      active: 'perfProgressRef',
    },
  });
};
onMounted(() => {
  getMybsOk();
});
const colorList = ['#1F98FF', '#FF8812', '#ff0d12', '#43bb67'];
</script>

<style lang="less" scoped>
.home-perf {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: @font-size-36;
      letter-spacing: 0;
      line-height: 36px;
      font-weight: 600;
    }
    .more {
      font-family: PingFangSC-Regular;
      font-size: @font-size-26;
      color: @gray;
      letter-spacing: 0;
      text-align: right;
      line-height: 22px;
      font-weight: 400;
    }
  }
  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .content-item {
      position: relative;
      box-sizing: border-box;
      width: calc(50% - 12px);
      padding: 24px 20px;
      border-radius: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      margin-top: 24px;
      &-0 {
        background-image: url('@/assets/images/home/perf1.png');
      }
      &-1 {
        background-image: url('@/assets/images/home/perf2.png');
      }
      &-2 {
        background-image: url('@/assets/images/home/perf3.png');
      }
      &-3 {
        background-image: url('@/assets/images/home/perf4.png');
      }
      &:first-child,
      &:nth-child(2) {
        margin-top: 0px;
      }

      .title {
        font-family: DINAlternate-Bold;
        font-size: @font-size-40;
        letter-spacing: 0;
        line-height: 40px;
        font-weight: 700;
        width: 100%;
        white-space: nowrap;
      }
      .label {
        font-family: PingFangSC-Regular;
        font-size: @font-size-22;
        line-height: @font-size-24;
        height: @font-size-24*2;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: @gray;
        letter-spacing: 0;
        font-weight: 400;
        margin: 16px 0;
      }
      .rate {
        font-family: PingFangSC-Regular;
        font-size: @font-size-28;
        color: @sub-text;
        letter-spacing: 0;
        line-height: 26px;
        font-weight: 400;
        margin-top: 12px;
        white-space: nowrap;
      }
    }
  }
}
</style>
