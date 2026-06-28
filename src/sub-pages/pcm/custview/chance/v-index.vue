<!--
 * @desc: 营销商机
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-08 14:18:53
-->
<template>
  <div class="my-group">
    <div class="container">
      <dadp-refresh-list ref="refreshListRef" :requestApi="listChangeCust" :reqParams="{ ...listParams }">
        <template v-slot="{ data }">
          <dadp-card avatar="man" is-body-padding :buttons="buttons" @footer-click="(btn) => footerClick(btn, data)">
            <template #title>
              <span>{{ data.companyName || data.custName }}</span>
              <span v-if="data.custLevel" class="black-tag">
                <span v-if="data.companyName">
                  {{ codeTranslate('ccmCustBaseLevel', data.custLevel) }}
                </span>
                <span v-else>
                  {{ codeTranslate('pcmCustBaseLevel', data.custLevel) }}
                </span>
              </span>
            </template>
            <template #subTitle>
              <div>{{ data.custId }}</div>
            </template>
            <div class="grow row" v-for="(item, index) in data.pmmChangeVOList" :key="index" @click="handleClick(item)">
              <div class="gcol">
                <van-space>
                  <van-tag color="#fff3e7" text-color="#FF8812">{{ codeTranslate('chanceType', item.chanceType) }}</van-tag>
                  <span class="glabel">{{ fmtDate(item.beginDate) }}至{{ fmtDate(item.endDate) }}</span>
                </van-space>
                <div class="text">
                  <van-text-ellipsis :content="item.chanceName" rows="1" />
                </div>
              </div>
              <van-icon name="arrow"></van-icon>
            </div>
          </dadp-card>
        </template>
      </dadp-refresh-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { listChangeCust } from '@/apis/mkt';
import { getStorage } from '@/storage/storage';
import { fmtDate } from '@/utils/format';
import { codeTranslate } from '@/hook/code-hook';

defineOptions({ name: 'pcm-view-chance' });

const router = useRouter();
const route = useRoute();
const userInfo = getStorage('userInfo') || {};

const refreshListRef = ref(); // 列表Ref
const buttons = ref([
  {
    name: '意向反馈',
    icon: 'records-o',
  },
  {
    name: '营销接触',
    icon: 'records-o',
  },
]);
const custInfo = ref({
  custId: route.query.custId,
  custName: route.query.custName,
  custLevel: route.query.custLevel as string,
});
const listParams = ref({
  custId: route.query.custId,
  chanceSts: ['1', '2', '3'],
});

// 商机点击事件
const handleClick = (chanceInfo: any) => {
  router.push(`/mkt-chance-dtl/${chanceInfo.chanceId}/${chanceInfo.changeCustId}`);
};
// 底部按钮
const footerClick = (btn: any, val: any) => {
  if (btn.name === '营销接触') {
    let _tmp = val.pmmChangeVOList?.[0] || {};
    // 1-零售存量 2公司存量 3零售潜客 4公司潜客
    if (_tmp.changeCustType == '1' || _tmp.changeCustType == '3') {
      router.push({
        name: 'pcm-view-contact', // 零售客户-营销接触
        query: {
          isCust: _tmp.changeCustType === '1' ? '1' : '0', // 是否存量客户
          custId: val.custId,
          custName: val.companyName || val.custName,
          srcId: _tmp.changeCustId,
          exeRegSrc: '1', // 登记渠道:1-商机，3-客户视图，5-任务执行
        },
      });
    } else {
      router.push({
        name: 'ccm-view-service-info', // 对公客户-营销接触
        query: {
          isCust: _tmp.changeCustType === '2' ? '1' : '0', // 是否存量客户
          custId: val.custId,
          custName: val.companyName || val.custName,
          srcId: _tmp.changeCustId,
          exeRegSrc: '1', // 登记渠道:1-商机，3-客户视图，5-任务执行
        },
      });
    }
  }
  if (btn.name === '意向反馈') {
    router.push({
      name: 'mkt-chance-fb',
      query: {
        custId: val.custId,
      },
    });
  }
};
</script>
<style lang="less" scoped>
.my-group {
  padding: 24px;
  background-image: url('@/assets/images/cust/view/view-background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  .base-info {
    padding-bottom: 24px;
    .content {
      flex: auto;
      .content-row + .content-row {
        padding-top: 12px;
      }

      .content-row {
        display: flex;
        align-items: center;

        .name {
          font-family: PingFangSC-Semibold;
          font-size: @font-size-40;
          color: @text;
          line-height: 48px;
          font-weight: 600;
          word-break: break-all;
        }
        .age {
          font-family: PingFangSC-Regular;
          font-size: @font-size-24;
          color: @sub-text;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 400;
        }

        .level {
          margin-left: 16px;
          padding: 5px 8px;
          background: #222222;
          border: 1px solid rgba(196, 138, 19, 1);
          border-radius: 8px 0px 8px 0px;
          font-family: PingFangSC-Medium;
          font-size: @font-size-22;
          color: #ffcd64;
          line-height: 22px;
          font-weight: 500;
          white-space: nowrap;
        }

        .focus {
          display: flex;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: @font-size-24;
          color: @sub-text;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 400;
          &-icon {
            width: 30px;
            height: 30px;
          }
          div {
            height: 30px;
            line-height: 30px;
            margin-left: 4px;
          }
        }
      }
    }
  }
}
.container {
  .black-tag {
    background: #222222;
    border: 1px solid rgba(196, 138, 19, 1);
    border-radius: 8px 0px 8px 0px;
    padding: 5px 8px;
    font-family: PingFangSC-Medium;
    font-size: @font-size-22;
    color: #ffcd64;
    line-height: 22px;
    font-weight: 500;
    margin-left: 10px;
  }
  .row {
    white-space: nowrap;
    background-color: @gray-1;
    border-radius: 8px;
    padding: 10px;
    .text {
      font-family: PingFangSC-Regular;
      font-size: @font-size-24;
      color: @text;
      letter-spacing: 0;
      line-height: 24px;
      font-weight: 400;
    }
  }
  .row + .row {
    margin-top: 10px;
  }
}
</style>
