<!--
 * @desc: 我的业绩（营销岗）
 * @Date: 2024-09-23 08:58:56
 * @LastEditTime: 2024-10-01 01:20:03
-->
<template>
  <div class="home-perf">
    <div class="home-perf-header">
      <div class="title">我的业绩</div>
      <div class="more" @click="goPerf">更多</div>
    </div>

    <dadp-card>
      <div class="home-perf-body">
        <van-tabs v-model:active="active" type="card" :ellipsis="false">
          <van-tab title="业绩指标" v-if="hasPermission('perf_app-index_app')">
            <perf-index isHome></perf-index>
          </van-tab>
          <van-tab title="进度分析" v-if="hasPermission('perf_app-progress_app')">
            <perf-progress isHome></perf-progress>
          </van-tab>
          <van-tab title="业绩计价" v-if="hasPermission('perf_app-exam_app')">
            <perf-exam isHome></perf-exam>
          </van-tab>
          <van-tab title="业绩认领" v-if="hasPermission('perf_app-staff_app')">
            <perf-staff isHome></perf-staff>
          </van-tab>
        </van-tabs>
      </div>
    </dadp-card>
  </div>
</template>
<script setup lang="ts">
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import perfIndex from '@/views/perf/modules/perf-index.vue';
import perfProgress from '@/views/perf/modules/perf-progress.vue';
import perfExam from '@/views/perf/modules/perf-exam.vue';
import perfStaff from '@/views/perf/modules/perf-staff.vue';
import { getStorage } from '@/storage/storage';
import { hasPermission } from '@/hook/use-common-hook';

const router = useRouter();
const userInfo = getStorage('userInfo') || {}; // 用户信息
const active = ref(0);

const goPerf = async () => {
  router.push({
    name: 'perf',
    query: {
      active: 'perfIndexRef',
    },
  });
};
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
  &-body {
    padding: 32px 0;
    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 40px 30px 24px;
      .left {
        display: flex;
        align-items: center;
        .title {
          font-family: PingFangSC-Medium;
          font-size: @font-size-32;
          color: @text;
          letter-spacing: 0;
          line-height: 32px;
          font-weight: 500;
          margin-right: 16px;
        }
        img {
          height: 30px;
        }
      }

      .right-img {
        height: 30px;
        width: 30px;
      }
    }
    .content {
      padding: 0 30px;

      &-header {
        padding: 30px 0;
        background-image: linear-gradient(180deg, #fdf6ea 0%, #ffffff 50%);
        .row {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          letter-spacing: 0;
          margin-top: 40px;
        }
        .col {
          flex: 1;
          text-align: center;
          letter-spacing: 0;
          &-value1 {
            font-family: DINAlternate-Bold;
            font-size: @font-size-36;
            line-height: 36px;
            font-weight: 700;
          }
          &-value2 {
            font-family: DINAlternate-Bold;
            font-size: @font-size-34;
            line-height: 34px;
            font-weight: 700;
          }
          &-label1 {
            font-family: PingFangSC-Regular;
            font-size: @font-size-28;
            line-height: 28px;
            font-weight: 400;
            margin-top: 16px;
          }
          &-label2 {
            font-family: PingFangSC-Regular;
            font-size: @font-size-22;
            color: @gray;
            line-height: 22px;
            font-weight: 400;
            margin-top: 13px;
          }
        }
      }
      &-body {
        height: 500px;
      }
    }
  }
}
</style>
