<!--
 * @desc: 我的业绩（管户人）
 * @Date: 2024-09-23 08:58:56
 * @LastEditTime: 2024-09-26 18:16:45
-->
<template>
  <div class="home-perf">
    <div class="home-perf-header">
      <div class="title">我的业绩</div>
      <div class="more" @click="goPerfDad">更多</div>
    </div>
    <div class="home-perf-content">
      <template v-for="(item, index) in indexData" :key="index">
        <div class="content-item" :class="`content-item-${index}`">
          <div>
            <span class="title">{{ item.examIndexName }}</span>
          </div>
          <div class="body">
            <div class="body-left">
              <span class="value1">
                {{ amountUnitConvert(item.indexValue) }}
              </span>
              <div class="label">完成值</div>
            </div>
            <div class="body-right">
              <span class="value2">
                {{ amountUnitConvert(item.perVal) }}
              </span>
              <div class="label">业绩计价(万元)</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <dadp-empty v-if="indexData.length === 0"></dadp-empty>
  </div>
</template>
<script setup lang="ts">
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import { getAssValList } from '@/apis/home';
import { getStorage } from '@/storage/storage';
import { amountUnitConvert } from '@/utils/global';
const router = useRouter();
const userInfo = getStorage('userInfo') || {}; // 用户信息
const dataMap = reactive({
  indexData: Array<any>(),
});
const { indexData } = toRefs(dataMap);
//获取我的业绩信息
const getMyBs = async () => {
  const { data, code } = await getAssValList({ pageSize: 10, pageNo: 1 });
  if (code === 200) {
    //需求：若有多个业绩指标，则按绩效总价从高到低排序 显示前4个指标的考核结果
    dataMap.indexData = data?.rows?.slice(0, 4) || [];
  }
};
//跳往业绩模块-业绩计价结果主界面
const goPerfDad = () => {
  router.push({
    name: 'perf',
    query: {
      active: 'perfExamRef',
    },
  });
};
onMounted(() => {
  getMyBs();
});
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
        font-family: PingFangSC-Semibold;
        font-size: @font-size-22;
        letter-spacing: 0;
        line-height: 22px;
        font-weight: 600;
        margin-bottom: 24px;
      }
      .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-left {
          width: 50%;
          text-align: left;
          white-space: nowrap;
        }
        &-right {
          width: 50%;
          text-align: right;
          white-space: nowrap;
        }
        .value1 {
          width: 100%;
          font-family: DINAlternate-Bold;
          font-size: @font-size-32;
          letter-spacing: 0;
          line-height: 32px;
          font-weight: 700;
        }
        .value2 {
          width: 100%;
          font-family: DINAlternate-Bold;
          font-size: @font-size-32;
          color: @primary-color;
          letter-spacing: 0;
          line-height: 32px;
          font-weight: 700;
        }
        .label {
          font-family: PingFangSC-Regular;
          font-size: @font-size-20;
          color: @gray;
          letter-spacing: 0;
          line-height: 18px;
          font-weight: 400;
          margin-top: 10px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
