<!--
 * @desc: 首页-业绩指标分析
 * @Date: 2024-08-01 11:24:46
 * @LastEditTime: 2024-09-27 14:34:07
-->
<template>
  <div class="home-perf">
    <div class="home-perf-header">
      <div class="title">业绩指标分析</div>
    </div>
    <div class="home-perf-content" v-if="indexData.length > 0">
      <template v-for="(item, index) in indexData" :key="index">
        <div class="content-item" :class="`content-item-${index}`">
          <div>
            <span class="title">
              <van-text-ellipsis
                :content="
                  fmtThousands(
                    fmtNumber(item?.val, Math.abs(item?.val) / 10000 < 0 ? item.unit.replace('万', '亿') : item.unit.replace('万', ''))
                      .value,
                    2
                  ) +
                  fmtNumber(item?.val, Math.abs(item?.val) / 10000 < 0 ? item.unit.replace('万', '亿') : item.unit.replace('万', '')).unit
                "
                rows="1"
              />
            </span>
          </div>
          <!-- <div class="label">单位： {{ fmtNumber(item?.val, codeTranslate('unit', item.unit)).unit }}</div> -->
          <div class="label">
            {{ item.indexName }}
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
import { getIndexList } from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';
import { getStorage } from '@/storage/storage';
import { fmtThousands, fmtNumber } from '@/utils/format';
const userInfo = getStorage('userInfo') || {}; // 用户信息
const router = useRouter();
const dataMap = reactive({
  indexData: Array<any>(),
});
const { indexData } = toRefs(dataMap);
//业绩指标分析
const initData = async () => {
  const { data, code } = await getIndexList({ pageNo: 1, pageSize: 4, unit: '2' });
  if (code === 200) {
    //需求：按指标名称正序排序 显示前4个指标的进度完成情况
    dataMap.indexData = data.splice(0, 4) || [];
  }
};
onMounted(() => {
  initData();
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
      height: 200px;
      padding: 24px 20px;
      border-radius: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      margin-top: 24px;
      filter: hue-rotate(90deg);
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
        .van-text-ellipsis {
          font-family: DINAlternate-Bold;
          font-size: @font-size-40;
          letter-spacing: 0;
          line-height: 40px;
          font-weight: 700;
          width: 100%;
          white-space: nowrap;
        }
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
        color: @black;
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
